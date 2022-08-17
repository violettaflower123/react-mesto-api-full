const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = async (req, res, next) => {
  await User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const id = (req.params.userId === undefined ? req.user._id : req.params.userId);
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') { // распознаём ошибку и возвращаем с нужным кодом
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  if (!validator.isEmail(email)) {
    next(new BadRequestError('Некорректные данные')); // валидируем email
  } else {
    bcrypt.hash(password, 10) // в случае успеха хэшируем пароль и создаём пользователя
      .then((hash) => User.create({
        email, password: hash, name, about, avatar,
      })
        .then((newUser) => {
          // eslint-disable-next-line no-shadow
          const { password, ...response } = newUser._doc;
          res.send({ response });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректные данные'));
          } else if (err.code === 11000) {
            next(new ConflictError('Email уже зарегистрирован'));
          } else {
            next(err);
          }
        }));
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // используем кастомный метод для проверки логина и пароля
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'default-secret-key',
        { expiresIn: '7d' }, // создали JWT-токен сроком на неделю
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((updUser) => {
      if (!updUser) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ updUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const newAvatar = req.body.avatar;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: newAvatar },
    { new: true },
  )
    .then((updUser) => {
      if (!updUser) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ updUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

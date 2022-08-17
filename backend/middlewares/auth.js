const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация')); // выкидываем ошибку, если токена нет в req.headers
  }

  const token = authorization.replace('Bearer ', ''); // получаем чистый токен
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key'); // попытка верификации токена с помощью секретной строки
  } catch (e) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // будем обращаться к payload токена через req.user
  next();
};

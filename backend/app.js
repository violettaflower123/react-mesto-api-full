const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const errorRoutes = require('./routes/error');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);
app.use('/', authRoutes);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);
app.use('/', errorRoutes);

app.use(errorLogger);
app.use(errors()); // ошибки валидатора celebrate
app.use(errorHandler);

app.listen(PORT, (error) => {
  // eslint-disable-next-line no-unused-expressions, no-console
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const AutorizationError = require('../errors/authorization-err');
const MongoError = require('../errors/mongo-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.getUserByID = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Невалидный id.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({
        data: {
          name: user.name, about: user.about, avatar: user.avatar, email: user.email,
        },
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        throw new RequestError('Переданы некорректные данные при создании пользователя.');
      }
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new MongoError('Пользователь с таким email уже зарегистрирован.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Невалидный id.');
      }
      if (error.name === 'ValidationError') {
        throw new RequestError('Переданы некорректные данные при обновлении профиля.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Невалидный id.');
      }
      if (error.name === 'ValidationError') {
        throw new RequestError('Переданы некорректные данные при обновлении аватара.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },

      );
      res.send({ token });
    })
    .catch(() => {
      next(new AutorizationError('Ошибка авторизации'));
    });
};

module.exports.getLoggedUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Невалидный id.');
      }
      next(error);
    })
    .catch(next);
};

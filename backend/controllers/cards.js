const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const RequestError = require('../errors/request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new RequestError('Переданы некорректные данные при создании карточки.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      const cardUserId = card.owner.toString();
      const UserId = req.user._id;
      if (cardUserId !== UserId) {
        throw new ForbiddenError('Нельзя удалить чужую карточку.');
      }
      card.remove();
      return res.send(card);
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Невалидный id.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Переданы некорректные данные для постановки лайка.');
      }
      next(error);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (error.name === 'CastError') {
        throw new RequestError('Переданы некорректные данные для постановки лайка. ');
      }
      next(error);
    })
    .catch(next);
};

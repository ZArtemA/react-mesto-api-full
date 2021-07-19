const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserByID, patchUser, patchUserAvatar, getLoggedUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getLoggedUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}),
getUserByID);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(30),
  }),
}),
patchUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .pattern(/^(http:|https:)\/\/(w{3}\.)?[^а-яё\s]*$/)
      .required().min(2)
      .max(80),
  }),
}),
patchUserAvatar);

module.exports = router;

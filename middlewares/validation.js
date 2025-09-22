const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Joi + Celebrate validations
const validateClothingItem = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      imageUrl: Joi.string().required().custom(validateURL),
      weather: Joi.string().valid("hot", "warm", "cold").required(),
    })
    .messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogInUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateIdParam = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) return value;
        return helpers.error("string.uri");
      }),
  }),
});

module.exports = {
  validateClothingItem,
  validateCreateUser,
  validateLogInUser,
  validateIdParam,
  validateUpdateUser,
};

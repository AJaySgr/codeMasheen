const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuery = {
  body: Joi.object().keys({
    name: Joi.string().required().trim().min(2).max(50),
    email: Joi.string().required().email(),
    mobile: Joi.string()
      .required()
      .pattern(/^[0-9]{10}$/)
      .messages({
        'string.pattern.base': 'Mobile number must be a valid 10-digit number',
      }),
    message: Joi.string().required().trim().min(5).max(500),
  }),
};

const getQueries = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().optional().email(),
    mobile: Joi.string()
      .optional()
      .pattern(/^[0-9]{10}$/),
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().min(1).default(10),
    page: Joi.number().integer().min(1).default(1),
  }),
};

const getQuery = {
  params: Joi.object().keys({
    queryId: Joi.string().custom(objectId),
  }),
};

const updateQuery = {
  params: Joi.object().keys({
    queryId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim().min(2).max(50),
      email: Joi.string().email(),
      mobile: Joi.string().pattern(/^[0-9]{10}$/),
      message: Joi.string().trim().min(5).max(500),
    })
    .min(1), // Ensure at least one field is being updated
};

const deleteQuery = {
  params: Joi.object().keys({
    queryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createQuery,
  getQueries,
  getQuery,
  updateQuery,
  deleteQuery,
};

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { queryService, emailService } = require('../services');

const createQuery = catchAsync(async (req, res) => {
  const query = await queryService.createQuery(req.body);
  await emailService.sendQueryEmail('tusharkumar9871@gmail.com', req.body);
  res.status(httpStatus.CREATED).send(query);
});

const getAllQuery = catchAsync(async (req, res) => {
  const query = await queryService.getQueryAll();
  res.status(httpStatus.CREATED).send(query);
});

const getQueries = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'email']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await queryService.queryQueries(filter, options);
  res.send(result);
});

const getQuery = catchAsync(async (req, res) => {
  const query = await queryService.getQueryById(req.params.queryId);
  if (!query) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Query not found');
  }
  res.send(query);
});

const updateQuery = catchAsync(async (req, res) => {
  const query = await queryService.updateQueryById(req.params.queryId, req.body);
  if (!query) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Query not found');
  }
  res.send(query);
});

const deleteQuery = catchAsync(async (req, res) => {
  const query = await queryService.deleteQueryById(req.params.queryId);
  if (!query) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Query not found');
  }
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createQuery,
  getAllQuery,
  getQueries,
  getQuery,
  updateQuery,
  deleteQuery,
};

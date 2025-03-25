const httpStatus = require('http-status');
const { Query } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a query
 * @param {Object} queryBody
 * @returns {Promise<Query>}
 */
const createQuery = async (queryBody) => {
  return Query.create(queryBody);
};

/**
 * Query for queries (with pagination and filtering)
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQueries = async (filter, options) => {
  const queries = await Query.paginate(filter, options);
  return queries;
};

/**
 * Get query by id
 * @param {ObjectId} id
 * @returns {Promise<Query>}
 */
const getQueryById = async (id) => {
  return Query.findById(id);
};

const getQueryAll = async () => {
  return Query.find({}).sort({ createdAt: -1 });
};
/**
 * Update query by id
 * @param {ObjectId} queryId
 * @param {Object} updateBody
 * @returns {Promise<Query>}
 */
const updateQueryById = async (queryId, updateBody) => {
  const query = await getQueryById(queryId);
  if (!query) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Query not found');
  }
  Object.assign(query, updateBody);
  await query.save();
  return query;
};

/**
 * Delete query by id
 * @param {ObjectId} queryId
 * @returns {Promise<Query>}
 */
const deleteQueryById = async (queryId) => {
  const query = await getQueryById(queryId);
  if (!query) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Query not found');
  }
  await query.remove();
  return query;
};

module.exports = {
  createQuery,
  queryQueries,
  getQueryById,
  updateQueryById,
  deleteQueryById,
  getQueryAll,
};

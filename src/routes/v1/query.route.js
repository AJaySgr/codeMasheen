const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const queryValidation = require('../../validations/query.validation');
const queryController = require('../../controllers/query.controller');

const router = express.Router();

router.route('/').post(validate(queryValidation.createQuery), queryController.createQuery).get(queryController.getQueries);

router.route('/get-all-query').get(queryController.getAllQuery);

router
  .route('/:queryId')
  .get(validate(queryValidation.getQuery), queryController.getQuery)
  .patch(auth('manageQueries'), validate(queryValidation.updateQuery), queryController.updateQuery)
  .delete(auth('manageQueries'), validate(queryValidation.deleteQuery), queryController.deleteQuery);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Queries
 *   description: Customer Queries Management
 */

/**
 * @swagger
 * /queries:
 *   post:
 *     summary: Create a query
 *     description: Customers can submit queries.
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               message:
 *                 type: string
 *                 example: "I need help with my order."
 *     responses:
 *       "201":
 *         description: Query created successfully
 *       "400":
 *         description: Validation error
 *
 *   get:
 *     summary: Get all queries
 *     description: Fetch a list of customer queries.
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field:asc/desc
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       "200":
 *         description: List of queries
 *       "401":
 *         description: Unauthorized
 */

/**
 * @swagger
 * /queries/{queryId}:
 *   get:
 *     summary: Get a query by ID
 *     description: Retrieve a specific query by its ID.
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: queryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Query ID
 *     responses:
 *       "200":
 *         description: Query found
 *       "404":
 *         description: Query not found
 *
 *   patch:
 *     summary: Update a query
 *     description: Modify details of an existing query.
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: queryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Query ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               mobile:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Query updated successfully
 *       "400":
 *         description: Validation error
 *       "404":
 *         description: Query not found
 *
 *   delete:
 *     summary: Delete a query
 *     description: Remove a query by ID.
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: queryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Query ID
 *     responses:
 *       "204":
 *         description: Query deleted successfully
 *       "404":
 *         description: Query not found
 */

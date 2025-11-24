const express = require('express');
const router = express.Router();

// TODO: Import database connection
// const connection = require('../db/connection');

/**
 * GET /schools
 * Retrieve all schools from the database
 */
router.get('/', (req, res) => {
  // TODO: Write SQL query to SELECT all schools
  // TODO: Execute query using database connection
  // TODO: Send response with school data
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement GET /schools endpoint' });
});

/**
 * POST /schools
 * Create a new school
 */
router.post('/', (req, res) => {
  // TODO: Extract school data from req.body
  // TODO: Validate required fields
  // TODO: Write SQL INSERT query
  // TODO: Execute query using database connection
  // TODO: Send response with created school data
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement POST /schools endpoint' });
});

/**
 * DELETE /schools/:id
 * Delete a school by ID
 */
router.delete('/:id', (req, res) => {
  // TODO: Extract school ID from req.params.id
  // TODO: Write SQL DELETE query
  // TODO: Execute query using database connection
  // TODO: Send appropriate response (success or not found)
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement DELETE /schools/:id endpoint' });
});

module.exports = router;


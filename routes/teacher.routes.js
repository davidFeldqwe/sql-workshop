const express = require('express');
const router = express.Router();

// TODO: Import database connection
// const connection = require('../db/connection');

/**
 * GET /teachers
 * Retrieve all teachers from the database
 */
router.get('/', (req, res) => {
  // TODO: Write SQL query to SELECT all teachers
  // TODO: Execute query using database connection
  // TODO: Send response with teacher data
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement GET /teachers endpoint' });
});

/**
 * POST /teachers
 * Create a new teacher
 */
router.post('/', (req, res) => {
  // TODO: Extract teacher data from req.body
  // TODO: Validate required fields
  // TODO: Write SQL INSERT query
  // TODO: Execute query using database connection
  // TODO: Send response with created teacher data
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement POST /teachers endpoint' });
});

/**
 * DELETE /teachers/:id
 * Delete a teacher by ID
 */
router.delete('/:id', (req, res) => {
  // TODO: Extract teacher ID from req.params.id
  // TODO: Write SQL DELETE query
  // TODO: Execute query using database connection
  // TODO: Send appropriate response (success or not found)
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement DELETE /teachers/:id endpoint' });
});

module.exports = router;


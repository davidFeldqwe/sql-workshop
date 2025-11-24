const express = require('express');
const router = express.Router();

// TODO: Import database connection
// const connection = require('../db/connection');

/**
 * GET /students
 * Retrieve all students from the database
 */
router.get('/', (req, res) => {
  // TODO: Write SQL query to SELECT all students
  // TODO: Execute query using database connection
  // TODO: Send response with student data
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement GET /students endpoint' });
});

/**
 * POST /students
 * Create a new student
 */
router.post('/', (req, res) => {
  // TODO: Extract student data from req.body (name, password, classroom_id)
  // TODO: Validate required fields
  // TODO: Write SQL INSERT query
  // TODO: Execute query using database connection
  // TODO: Send response with created student data
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement POST /students endpoint' });
});

/**
 * DELETE /students/:id
 * Delete a student by ID
 */
router.delete('/:id', (req, res) => {
  // TODO: Extract student ID from req.params.id
  // TODO: Write SQL DELETE query
  // TODO: Execute query using database connection
  // TODO: Send appropriate response (success or not found)
  // TODO: Handle errors appropriately
  
  res.json({ message: 'TODO: Implement DELETE /students/:id endpoint' });
});

module.exports = router;


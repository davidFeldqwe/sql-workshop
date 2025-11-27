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

module.exports = router;


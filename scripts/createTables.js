const connection = require('../db/connection');
const fs = require('fs');
const path = require('path');

/**
 * Creates database tables based on entity definitions in /entities directory
 */
async function createTables() {
  // TODO: Read all JSON files from the /entities directory
  // Hint: Use fs.readdirSync() to get list of files
  // Hint: Filter for .json files only
  
  // TODO: For each entity file:
  //   1. Read and parse the JSON file
  //   2. Extract the table name from the filename (e.g., 'student.json' -> 'students')
  //   3. Convert the JSON structure to CREATE TABLE SQL statement
  //   4. Handle the field types and constraints (PRIMARY KEY, AUTO_INCREMENT, etc.)
  
  // TODO: Execute each CREATE TABLE query using the connection
  // Hint: Use connection.promise().query() for async/await or connection.query() for callbacks
  // Hint: Add error handling for each query execution
  
  // TODO: Close the connection after all tables are created
  // Hint: Use connection.end()
  
  console.log('TODO: Implement table creation logic');
}

// Export the function
module.exports = { createTables };

// Uncomment the line below to run this script directly
// createTables();


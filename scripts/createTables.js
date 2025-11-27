const connection = require('../db/connection');
const fs = require('fs');
const path = require('path');

/**
 * Creates database tables based on entity definitions in /entities directory
 */
async function createTables() {
  const entitiesPath = path.join(__dirname, '../src/entities');
  const promiseConnection = connection.promise();
  
  try {
    // Read all JSON files from the /entities directory
    const files = fs.readdirSync(entitiesPath).filter(file => file.endsWith('.json'));
    
    console.log(`Found ${files.length} entity files: ${files.join(', ')}`);
    
    // Define foreign key relationships
    const foreignKeys = {
      'students': [
        { column: 'classroom_id', references: 'classrooms(id)', onDelete: 'SET NULL' }
      ],
      'admins': [
        { column: 'school_id', references: 'schools(id)', onDelete: 'SET NULL' }
      ],
      'classrooms': [
        { column: 'teacher_id', references: 'teachers(id)', onDelete: 'SET NULL' }
      ]
    };
    
    // Create tables in order (schools and teachers first, then classrooms, then students and admins)
    const tableOrder = ['schools', 'teachers', 'classrooms', 'students', 'admins'];
    
    for (const tableName of tableOrder) {
      const fileName = tableName.slice(0, -1) + '.json'; // Remove 's' and add .json
      const filePath = path.join(entitiesPath, fileName);
      
      if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${tableName} - file ${fileName} not found`);
        continue;
      }
      
      // Drop table if exists
      await promiseConnection.query(`DROP TABLE IF EXISTS ${tableName}`);
      console.log(`Dropped table ${tableName} if it existed`);
      
      // Read and parse the JSON file
      const entityData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Build CREATE TABLE SQL statement
      // Escape column names with backticks to handle reserved keywords (like 'index')
      const columns = [];
      for (const [fieldName, fieldDefinition] of Object.entries(entityData)) {
        const escapedFieldName = `\`${fieldName}\``;
        columns.push(`${escapedFieldName} ${fieldDefinition}`);
      }
      
      // Add foreign keys if they exist for this table
      const fks = foreignKeys[tableName] || [];
      let createTableQuery = `CREATE TABLE ${tableName} (${columns.join(', ')}`;
      
      if (fks.length > 0) {
        const fkStatements = fks.map(fk => 
          `FOREIGN KEY (\`${fk.column}\`) REFERENCES ${fk.references} ON DELETE ${fk.onDelete}`
        );
        createTableQuery += ', ' + fkStatements.join(', ');
      }
      
      createTableQuery += ')';
      
      // Execute CREATE TABLE query
      await promiseConnection.query(createTableQuery);
      console.log(`✓ Created table ${tableName}`);
    }
    
    console.log('\nAll tables created successfully!');
    
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    // Close the connection
    connection.end();
    console.log('Database connection closed');
  }
}

// Export the function
module.exports = { createTables };

// Run this script directly if called from command line
if (require.main === module) {
  createTables()
    .then(() => {
      console.log('Table creation completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Table creation failed:', error);
      process.exit(1);
    });
}

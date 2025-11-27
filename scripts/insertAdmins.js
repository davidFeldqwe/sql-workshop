const connection = require('../db/connection');

/**
 * Inserts initial admin users into the database
 * Run this after creating tables
 */
async function insertAdmins() {
  const promiseConnection = connection.promise();
  
  try {
    // Insert two admins
    // Note: In production, passwords should be hashed
    const admins = [
      { name: 'Admin One', password: 'admin123', school_id: 1 },
      { name: 'Admin Two', password: 'admin456', school_id: 2 }
    ];
    
    for (const admin of admins) {
      const [result] = await promiseConnection.query(
        'INSERT INTO admins (name, password, school_id) VALUES (?, ?, ?)',
        [admin.name, admin.password, admin.school_id]
      );
      console.log(`✓ Inserted admin: ${admin.name} (ID: ${result.insertId})`);
    }
    
    console.log('\nAll admins inserted successfully!');
    
  } catch (error) {
    console.error('Error inserting admins:', error);
    throw error;
  } finally {
    connection.end();
    console.log('Database connection closed');
  }
}

// Run this script directly if called from command line
if (require.main === module) {
  insertAdmins()
    .then(() => {
      console.log('Admin insertion completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Admin insertion failed:', error);
      process.exit(1);
    });
}

module.exports = { insertAdmins };


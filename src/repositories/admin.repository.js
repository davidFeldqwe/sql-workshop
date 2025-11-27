const connection = require('../../db/connection');

class AdminRepository {
  /**
   * Find admin by ID
   */
  async findById(id) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  /**
   * Find all admins
   */
  async findAll() {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query('SELECT * FROM admins');
    return rows;
  }
}

module.exports = new AdminRepository();


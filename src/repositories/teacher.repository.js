const connection = require('../../db/connection');

class TeacherRepository {
  /**
   * Create a new teacher
   */
  async create(name, password, email) {
    const promiseConnection = connection.promise();
    const [result] = await promiseConnection.query(
      'INSERT INTO teachers (name, password, email) VALUES (?, ?, ?)',
      [name, password, email]
    );
    return result.insertId;
  }

  /**
   * Find all teachers
   */
  async findAll() {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query('SELECT * FROM teachers');
    return rows;
  }

  /**
   * Find teacher by ID
   */
  async findById(id) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      'SELECT * FROM teachers WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  /**
   * Find teacher by email
   */
  async findByEmail(email) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      'SELECT * FROM teachers WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  /**
   * Update teacher by ID
   */
  async update(id, updates) {
    const promiseConnection = connection.promise();
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    if (fields.length === 0) {
      return { affectedRows: 0 };
    }
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const [result] = await promiseConnection.query(
      `UPDATE teachers SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
    return result;
  }
}

module.exports = new TeacherRepository();


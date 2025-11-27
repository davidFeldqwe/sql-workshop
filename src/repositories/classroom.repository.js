const connection = require('../../db/connection');

class ClassroomRepository {
  /**
   * Create a new classroom
   */
  async create(grade, index, teacherId) {
    const promiseConnection = connection.promise();
    const [result] = await promiseConnection.query(
      'INSERT INTO classrooms (grade, `index`, teacher_id) VALUES (?, ?, ?)',
      [grade, index, teacherId || null]
    );
    return result.insertId;
  }

  /**
   * Find all classrooms
   */
  async findAll() {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query('SELECT * FROM classrooms');
    return rows;
  }

  /**
   * Find classroom by ID
   */
  async findById(id) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      'SELECT * FROM classrooms WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }
}

module.exports = new ClassroomRepository();


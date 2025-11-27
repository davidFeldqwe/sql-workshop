const connection = require('../../db/connection');

class SchoolRepository {
  /**
   * Create a new school
   */
  async create(name, schoolCode) {
    const promiseConnection = connection.promise();
    const [result] = await promiseConnection.query(
      'INSERT INTO schools (name, school_code) VALUES (?, ?)',
      [name, schoolCode]
    );
    return result.insertId;
  }

  /**
   * Find all schools
   */
  async findAll() {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query('SELECT * FROM schools');
    return rows;
  }

  /**
   * Find school by ID
   */
  async findById(id) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      'SELECT * FROM schools WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  /**
   * Find school by school code
   */
  async findBySchoolCode(schoolCode) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      'SELECT * FROM schools WHERE school_code = ?',
      [schoolCode]
    );
    return rows[0] || null;
  }
}

module.exports = new SchoolRepository();


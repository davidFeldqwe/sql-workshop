const connection = require('../../db/connection');

class StudentRepository {
  /**
   * Create a new student
   */
  async create(name, password, classroomId) {
    const promiseConnection = connection.promise();
    const [result] = await promiseConnection.query(
      'INSERT INTO students (name, password, classroom_id) VALUES (?, ?, ?)',
      [name, password, classroomId || null]
    );
    return result.insertId;
  }

  /**
   * Find all students
   */
  async findAll() {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query('SELECT * FROM students');
    return rows;
  }

  /**
   * Find all student names only
   */
  async findAllNames() {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      'SELECT id, name FROM students ORDER BY name'
    );
    return rows;
  }

  /**
   * Find student by ID
   */
  async findById(id) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      'SELECT * FROM students WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  /**
   * Delete student by ID
   */
  async deleteById(id) {
    const promiseConnection = connection.promise();
    const [result] = await promiseConnection.query(
      'DELETE FROM students WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  /**
   * Find students by classroom grade and index
   */
  async findByClassroomGradeAndIndex(grade, index) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(`
      SELECT 
        st.id,
        st.name,
        st.classroom_id,
        c.grade,
        c.\`index\` as classroom_index
      FROM students st
      INNER JOIN classrooms c ON st.classroom_id = c.id
      WHERE c.grade = ? AND c.\`index\` = ?
      ORDER BY st.name
    `, [parseInt(grade), parseInt(index)]);
    return rows;
  }
}

module.exports = new StudentRepository();


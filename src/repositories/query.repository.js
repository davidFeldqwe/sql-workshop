const connection = require('../../db/connection');

class QueryRepository {
  /**
   * Get schools with their admins
   */
  async getSchoolsWithAdmins() {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(`
      SELECT 
        s.id as school_id,
        s.name as school_name,
        s.school_code,
        a.id as admin_id,
        a.name as admin_name
      FROM schools s
      LEFT JOIN admins a ON s.id = a.school_id
      ORDER BY s.name
    `);
    return rows;
  }
}

module.exports = new QueryRepository();


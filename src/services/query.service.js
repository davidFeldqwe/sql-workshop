const queryRepository = require('../repositories/query.repository');
const schoolService = require('./school.service');
const studentService = require('./student.service');

class QueryService {
  /**
   * Get all student names
   */
  async getAllStudentNames() {
    return await studentService.getAllStudentNames();
  }

  /**
   * Get schools with their admins
   */
  async getSchoolsWithAdmins() {
    return await queryRepository.getSchoolsWithAdmins();
  }

  /**
   * Get students by school code and classroom
   * @throws {Error} If school not found or validation fails
   */
  async getStudentsBySchoolAndClassroom(schoolCode, grade, index) {
    // Verify school exists
    await schoolService.verifySchoolExists(schoolCode);

    // Get students
    return await studentService.getStudentsBySchoolAndClassroom(schoolCode, grade, index);
  }
}

module.exports = new QueryService();


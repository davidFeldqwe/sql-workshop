const schoolRepository = require('../repositories/school.repository');

class SchoolService {
  /**
   * Create a new school
   * @throws {Error} If validation fails or school code already exists
   */
  async createSchool(name, schoolCode) {
    // Check if school code already exists
    const existingSchool = await schoolRepository.findBySchoolCode(schoolCode);
    if (existingSchool) {
      const error = new Error('School code already exists');
      error.code = 'DUPLICATE_SCHOOL_CODE';
      throw error;
    }

    // Create school
    const schoolId = await schoolRepository.create(name.trim(), schoolCode.trim());
    return { id: schoolId, name: name.trim(), school_code: schoolCode.trim() };
  }

  /**
   * Get all schools
   */
  async getAllSchools() {
    return await schoolRepository.findAll();
  }

  /**
   * Get school by ID
   */
  async getSchoolById(id) {
    const school = await schoolRepository.findById(id);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  }

  /**
   * Verify school exists by code
   */
  async verifySchoolExists(schoolCode) {
    const school = await schoolRepository.findBySchoolCode(schoolCode);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  }
}

module.exports = new SchoolService();


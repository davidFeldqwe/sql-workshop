const studentRepository = require('../repositories/student.repository');
const classroomRepository = require('../repositories/classroom.repository');

class StudentService {
  /**
   * Create a new student
   * @throws {Error} If validation fails
   */
  async createStudent(name, password, classroomId) {
    // Validation
    if (!name || !password) {
      throw new Error('Name and password are required');
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Name must be a non-empty string');
    }

    if (typeof password !== 'string' || password.length === 0) {
      throw new Error('Password must be a non-empty string');
    }

    // Validate classroom exists if provided
    if (classroomId !== undefined && classroomId !== null) {
      const classroom = await classroomRepository.findById(classroomId);
      if (!classroom) {
        throw new Error('Classroom not found');
      }
    }

    // Create student
    const studentId = await studentRepository.create(
      name.trim(),
      password,
      classroomId || null
    );
    return { id: studentId, name: name.trim(), classroom_id: classroomId || null };
  }

  /**
   * Delete student
   * @throws {Error} If student not found
   */
  async deleteStudent(id) {
    if (!id) {
      throw new Error('Student ID is required');
    }

    const deleted = await studentRepository.deleteById(id);
    if (!deleted) {
      throw new Error('Student not found');
    }

    return { id: parseInt(id) };
  }

  /**
   * Get all students
   */
  async getAllStudents() {
    return await studentRepository.findAll();
  }

  /**
   * Get all student names
   */
  async getAllStudentNames() {
    return await studentRepository.findAllNames();
  }

  /**
   * Get students by classroom grade and index
   * @throws {Error} If school not found
   */
  async getStudentsBySchoolAndClassroom(schoolCode, grade, index) {
    // Validate inputs
    if (!schoolCode || grade === undefined || index === undefined) {
      throw new Error('school_code, grade, and index are required');
    }

    if (typeof grade !== 'number' && isNaN(parseInt(grade))) {
      throw new Error('Grade must be a number');
    }

    if (typeof index !== 'number' && isNaN(parseInt(index))) {
      throw new Error('Index must be a number');
    }

    // Note: School verification would require school_id in classrooms table
    // For now, we'll just get students by classroom
    const students = await studentRepository.findByClassroomGradeAndIndex(
      parseInt(grade),
      parseInt(index)
    );

    return students;
  }

  /**
   * Get student by ID
   */
  async getStudentById(id) {
    const student = await studentRepository.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }
}

module.exports = new StudentService();


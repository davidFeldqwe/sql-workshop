const classroomRepository = require('../repositories/classroom.repository');
const teacherRepository = require('../repositories/teacher.repository');

class ClassroomService {
  /**
   * Create a new classroom
   * @throws {Error} If validation fails
   */
  async createClassroom(grade, index, teacherId) {
    // Validation
    if (grade === undefined || index === undefined) {
      throw new Error('Grade and index are required');
    }

    if (typeof grade !== 'number' && isNaN(parseInt(grade))) {
      throw new Error('Grade must be a number');
    }

    if (typeof index !== 'number' && isNaN(parseInt(index))) {
      throw new Error('Index must be a number');
    }

    // Validate teacher exists if provided
    if (teacherId !== undefined && teacherId !== null) {
      const teacher = await teacherRepository.findById(teacherId);
      if (!teacher) {
        throw new Error('Teacher not found');
      }
    }

    // Create classroom
    const classroomId = await classroomRepository.create(
      parseInt(grade),
      parseInt(index),
      teacherId || null
    );
    return {
      id: classroomId,
      grade: parseInt(grade),
      index: parseInt(index),
      teacher_id: teacherId || null
    };
  }

  /**
   * Get all classrooms
   */
  async getAllClassrooms() {
    return await classroomRepository.findAll();
  }

  /**
   * Get classroom by ID
   */
  async getClassroomById(id) {
    const classroom = await classroomRepository.findById(id);
    if (!classroom) {
      throw new Error('Classroom not found');
    }
    return classroom;
  }
}

module.exports = new ClassroomService();


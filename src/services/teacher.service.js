const teacherRepository = require('../repositories/teacher.repository');

class TeacherService {
  /**
   * Create a new teacher
   * @throws {Error} If validation fails or email already exists
   */
  async createTeacher(name, password, email) {
    // Validation
    if (!name || !password || !email) {
      throw new Error('Name, password, and email are required');
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Name must be a non-empty string');
    }

    if (typeof password !== 'string' || password.length === 0) {
      throw new Error('Password must be a non-empty string');
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Check if email already exists
    const existingTeacher = await teacherRepository.findByEmail(email);
    if (existingTeacher) {
      const error = new Error('Email already exists');
      error.code = 'DUPLICATE_EMAIL';
      throw error;
    }

    // Create teacher
    const teacherId = await teacherRepository.create(
      name.trim(),
      password,
      email.trim().toLowerCase()
    );
    return { id: teacherId, name: name.trim(), email: email.trim().toLowerCase() };
  }

  /**
   * Update teacher
   * @throws {Error} If validation fails or teacher not found
   */
  async updateTeacher(id, updates) {
    if (!id) {
      throw new Error('Teacher ID is required');
    }

    // Validate that at least one field is provided
    const { name, password, email } = updates;
    if (!name && !password && !email) {
      throw new Error('At least one field (name, password, email) must be provided');
    }

    // Check if teacher exists
    const existingTeacher = await teacherRepository.findById(id);
    if (!existingTeacher) {
      throw new Error('Teacher not found');
    }

    // Build update object with only provided fields
    const updateData = {};
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Name must be a non-empty string');
      }
      updateData.name = name.trim();
    }
    if (password !== undefined) {
      if (typeof password !== 'string' || password.length === 0) {
        throw new Error('Password must be a non-empty string');
      }
      updateData.password = password;
    }
    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
      // Check if email is already taken by another teacher
      const teacherWithEmail = await teacherRepository.findByEmail(email);
      if (teacherWithEmail && teacherWithEmail.id !== parseInt(id)) {
        const error = new Error('Email already exists');
        error.code = 'DUPLICATE_EMAIL';
        throw error;
      }
      updateData.email = email.trim().toLowerCase();
    }

    // Update teacher
    const result = await teacherRepository.update(id, updateData);
    if (result.affectedRows === 0) {
      throw new Error('Teacher not found');
    }

    return { id: parseInt(id), ...updateData };
  }

  /**
   * Get all teachers
   */
  async getAllTeachers() {
    return await teacherRepository.findAll();
  }

  /**
   * Get teacher by ID
   */
  async getTeacherById(id) {
    const teacher = await teacherRepository.findById(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    return teacher;
  }
}

module.exports = new TeacherService();


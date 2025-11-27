const express = require('express');
const router = express.Router();
const studentService = require('../services/student.service');
const { handleServiceError } = require('../utils/errorHandler');

/**
 * POST /students
 * Add a new student
 */
router.post('/', async (req, res) => {
  try {
    const { name, password, classroom_id } = req.body;
    const student = await studentService.createStudent(name, password, classroom_id);
    
    res.status(201).json({
      message: 'Student created successfully',
      student_id: student.id
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

/**
 * DELETE /students/:id
 * Delete a student
 */
router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const result = await studentService.deleteStudent(studentId);
    
    res.json({
      message: 'Student deleted successfully',
      student_id: result.id
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

/**
 * GET /students
 * Get all students
 */
router.get('/', async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    handleServiceError(error, res);
  }
});

module.exports = router;


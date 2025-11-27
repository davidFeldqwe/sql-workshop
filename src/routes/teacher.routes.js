const express = require('express');
const router = express.Router();
const teacherService = require('../services/teacher.service');
const { handleServiceError } = require('../utils/errorHandler');

/**
 * POST /teachers
 * Add a new teacher
 */
router.post('/', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const teacher = await teacherService.createTeacher(name, password, email);
    
    res.status(201).json({
      message: 'Teacher created successfully',
      teacher_id: teacher.id
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

/**
 * PUT /teachers/:id
 * Update teacher fields
 */
router.put('/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { name, password, email } = req.body;
    const teacher = await teacherService.updateTeacher(teacherId, { name, password, email });
    
    res.json({
      message: 'Teacher updated successfully',
      teacher_id: teacher.id
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

/**
 * GET /teachers
 * Get all teachers
 */
router.get('/', async (req, res) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    res.json(teachers);
  } catch (error) {
    handleServiceError(error, res);
  }
});

module.exports = router;


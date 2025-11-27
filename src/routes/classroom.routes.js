const express = require('express');
const router = express.Router();
const classroomService = require('../services/classroom.service');
const { handleServiceError } = require('../utils/errorHandler');

/**
 * POST /classrooms
 * Add a new classroom
 */
router.post('/', async (req, res) => {
  try {
    const { grade, index, teacher_id } = req.body;
    const classroom = await classroomService.createClassroom(grade, index, teacher_id);
    
    res.status(201).json({
      message: 'Classroom created successfully',
      classroom_id: classroom.id
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

/**
 * GET /classrooms
 * Get all classrooms
 */
router.get('/', async (req, res) => {
  try {
    const classrooms = await classroomService.getAllClassrooms();
    res.json(classrooms);
  } catch (error) {
    handleServiceError(error, res);
  }
});

module.exports = router;


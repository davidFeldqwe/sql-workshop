const express = require('express');
const router = express.Router();
const queryService = require('../services/query.service');
const { handleServiceError } = require('../utils/errorHandler');

/**
 * GET /queries/all-students
 * Display all student names
 */
router.get('/all-students', async (req, res) => {
  try {
    const students = await queryService.getAllStudentNames();
    res.json(students);
  } catch (error) {
    handleServiceError(error, res);
  }
});

/**
 * GET /queries/schools-with-admins
 * Display list of schools and their admin names
 */
router.get('/schools-with-admins', async (req, res) => {
  try {
    const schools = await queryService.getSchoolsWithAdmins();
    res.json(schools);
  } catch (error) {
    handleServiceError(error, res);
  }
});

/**
 * GET /queries/students-by-school-classroom
 * Display all student names given a school code and specific classroom
 * Query params: school_code, grade, index
 */
router.get('/students-by-school-classroom', async (req, res) => {
  try {
    const { school_code, grade, index } = req.query;
    const students = await queryService.getStudentsBySchoolAndClassroom(
      school_code,
      grade,
      index
    );
    res.json(students);
  } catch (error) {
    handleServiceError(error, res);
  }
});

module.exports = router;


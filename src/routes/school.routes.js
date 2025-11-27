const express = require('express');
const router = express.Router();
const schoolService = require('../services/school.service');
const adminService = require('../services/admin.service');
const { handleServiceError } = require('../utils/errorHandler');

/**
 * Middleware to verify admin authentication
 */
async function verifyAdmin(req, res, next) {
  const adminId = req.body.admin_id || req.query.admin_id;
  
  try {
    const admin = await adminService.verifyAdmin(adminId);
    req.admin = admin;
    next();
  } catch (error) {
    return handleServiceError(error, res);
  }
}

/**
 * POST /schools
 * Add a new school (admin only)
 */
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, school_code } = req.body;

    // Validation
    if (!name || !school_code) {
      const error = new Error('Name and school_code are required');
      error.code = 'MISSING_REQUIRED_FIELDS';
      throw error;
    }
  
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Name must be a non-empty string');
    }
  
    if (typeof school_code !== 'string' || school_code.trim().length === 0) {
      throw new Error('School code must be a non-empty string');
    }

    const school = await schoolService.createSchool(name, school_code);
    
    res.status(201).json({
      message: 'School created successfully',
      school_id: school.id
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

/**
 * GET /schools
 * Retrieve all schools from the database
 */
router.get('/', async (req, res) => {
  try {
    const schools = await schoolService.getAllSchools();
    res.json(schools);
  } catch (error) {
    handleServiceError(error, res);
  }
});

module.exports = router;


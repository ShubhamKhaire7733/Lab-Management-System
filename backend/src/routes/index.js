import express from 'express';
import authRoutes from './authRoutes.js';
import assignmentRoutes from './assignmentRoutes.js';
import studentRoutes from './studentRoutes.js';
import teacherRoutes from './teacherRoutes.js';
import assessmentRoutes from './assessmentRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/assessments', assessmentRoutes);

export default router;
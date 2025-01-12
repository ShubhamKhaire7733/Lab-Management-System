import express from 'express';
import authRoutes from './authRoutes.js';
import assignmentRoutes from './assignmentRoutes.js';
import studentRoutes from './studentRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/students', studentRoutes);

export default router;
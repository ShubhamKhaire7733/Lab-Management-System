import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getStudentStats, updateStudentAttendance } from '../controllers/studentController.js';

const router = express.Router();

router.get('/:id/stats', authenticateToken, getStudentStats);
router.put('/:id/attendance', authenticateToken, updateStudentAttendance);

export default router;
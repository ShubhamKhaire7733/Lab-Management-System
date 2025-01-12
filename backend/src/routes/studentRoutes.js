import express from 'express';
import { auth } from '../middleware/auth.js';
import { 
  getStudentStats,
  updateStudentAttendance
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/:id/stats', auth, getStudentStats);
router.put('/:id/attendance', auth, updateStudentAttendance);

export default router;
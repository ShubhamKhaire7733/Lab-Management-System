import express from 'express';
import { 
  getAllTeachers, 
  getTeacherById, 
  createTeacher, 
  updateTeacher, 
  deleteTeacher 
} from '../controllers/teacherController.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all teachers (for dropdown) - protected route
router.get('/all', authenticateToken, getAllTeachers);

// Get all teachers - protected route, admin only
router.get('/', authenticateToken, authorizeAdmin, getAllTeachers);

// Get teacher by ID - protected route, admin only
router.get('/:id', authenticateToken, authorizeAdmin, getTeacherById);

// Create new teacher - protected route, admin only
router.post('/', authenticateToken, authorizeAdmin, createTeacher);

// Update teacher - protected route, admin only
router.put('/:id', authenticateToken, authorizeAdmin, updateTeacher);

// Delete teacher - protected route, admin only
router.delete('/:id', authenticateToken, authorizeAdmin, deleteTeacher);

export default router; 
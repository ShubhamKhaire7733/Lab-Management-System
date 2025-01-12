import Student from '../models/Student.js';
import Assignment from '../models/Assignment.js';

export const getStudentStats = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [Assignment]
    });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const stats = {
      totalAssignments: student.Assignments.length,
      completedAssignments: student.Assignments.filter(a => a.status === 'Completed').length,
      totalMarks: student.Assignments.reduce((sum, a) => sum + (a.assignmentMarks || 0), 0),
      maxMarks: student.Assignments.length * 10,
      attendanceMarks: student.attendanceMarks,
      maxAttendanceMarks: 20
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student stats' });
  }
};

export const updateStudentAttendance = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    await student.update({
      attendanceMarks: req.body.attendanceMarks
    });
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance marks' });
  }
};
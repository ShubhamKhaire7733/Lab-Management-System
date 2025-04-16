// File to establish all model associations
// Import all models
import Student from './Student.js';
import Assignment from './Assignment.js';
import User from './User.js';
import Teacher from './Teacher.js';
import Assessment from './Assessment.js';
import Batch from './Batch.js';
import Subject from './Subject.js';
import TeacherSubjectBatch from './TeacherSubjectBatch.js';
import Attendance from './Attendance.js';

// Define associations
const setupAssociations = () => {
  // User associations
  User.hasOne(Student, {
    foreignKey: 'userId',
    as: 'student'
  });

  User.hasOne(Teacher, {
    foreignKey: 'userId',
    as: 'teacher'
  });

  // Student associations
  Student.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

  Student.hasMany(Assignment, {
    foreignKey: 'studentId',
    as: 'assignments'
  });

  Student.hasMany(Assessment, {
    foreignKey: 'studentRollNo',
    sourceKey: 'rollNumber',
    as: 'assessments'
  });

  Student.belongsToMany(Batch, {
    through: 'StudentBatches',
    foreignKey: 'studentId',
    otherKey: 'batchId'
  });

  // Teacher associations
  Teacher.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

  Teacher.belongsToMany(Subject, {
    through: TeacherSubjectBatch,
    foreignKey: 'teacherId',
    otherKey: 'subjectId'
  });

  Teacher.belongsToMany(Batch, {
    through: TeacherSubjectBatch,
    foreignKey: 'teacherId',
    otherKey: 'batchId'
  });

  // Batch associations
  Batch.belongsToMany(Student, {
    through: 'StudentBatches',
    foreignKey: 'batchId',
    otherKey: 'studentId'
  });

  Batch.belongsToMany(Teacher, {
    through: TeacherSubjectBatch,
    foreignKey: 'batchId',
    otherKey: 'teacherId'
  });

  Batch.belongsToMany(Subject, {
    through: TeacherSubjectBatch,
    foreignKey: 'batchId',
    otherKey: 'subjectId'
  });

  // Subject associations
  Subject.belongsToMany(Teacher, {
    through: TeacherSubjectBatch,
    foreignKey: 'subjectId',
    otherKey: 'teacherId'
  });

  Subject.belongsToMany(Batch, {
    through: TeacherSubjectBatch,
    foreignKey: 'subjectId',
    otherKey: 'batchId'
  });

  // Assignment associations
  Assignment.belongsTo(Student, {
    foreignKey: 'studentId',
    as: 'student'
  });

  // Assessment associations
  Assessment.belongsTo(Student, {
    foreignKey: 'studentRollNo',
    targetKey: 'rollNumber',
    as: 'student'
  });

  // Attendance associations
  Attendance.belongsTo(Student, {
    foreignKey: 'studentId'
  });

  Attendance.belongsTo(Batch, {
    foreignKey: 'batchId'
  });

  console.log('Model associations set up successfully');
};

export default setupAssociations;

export { 
  User, 
  Teacher, 
  Student, 
  Assignment, 
  Assessment, 
  Batch, 
  Subject, 
  TeacherSubjectBatch,
  Attendance 
}; 
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TeacherSubjectBatch = sequelize.define('TeacherSubjectBatch', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Teachers',
      key: 'id'
    }
  },
  subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Subjects',
      key: 'id'
    }
  },
  batchId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Batches',
      key: 'id'
    }
  },
  division: {
    type: DataTypes.STRING,
    allowNull: false
  },
  academicYear: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['teacherId', 'subjectId', 'batchId', 'division', 'academicYear'],
      name: 'tsb_unique_allocation'
    }
  ]
});

export default TeacherSubjectBatch; 
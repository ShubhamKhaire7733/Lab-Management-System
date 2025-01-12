import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  performanceDate: {
    type: DataTypes.DATE,
  },
  submissionDate: {
    type: DataTypes.DATE,
  },
  rppMarks: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 5
    }
  },
  spoMarks: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 5
    }
  },
  assignmentMarks: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 10
    }
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Submitted', 'Completed'),
    defaultValue: 'Pending'
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

export default Assignment;
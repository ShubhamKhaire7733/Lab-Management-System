import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Assignment from './Assignment.js';

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  rollNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  attendanceMarks: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 20
    }
  }
});

Student.belongsTo(User);
Student.hasMany(Assignment);
Assignment.belongsTo(Student);

export default Student;
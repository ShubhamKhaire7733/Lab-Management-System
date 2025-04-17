import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Teacher from '../models/Teacher.js';

const register = async (req, res) => {
  try {
    const { email, password, role, department, phone, subjects } = req.body;
    
    console.log('Register request received:', { email, role, department, subjects });

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user account
    const user = await User.create({ email, password, role });
    console.log('User created successfully:', user.id);

    // If registering as a teacher, create teacher profile
    if (role === 'teacher') {
      // Validate teacher-specific fields
      if (!department) {
        await user.destroy(); // Rollback user creation
        return res.status(400).json({ message: 'Department is required for teacher registration' });
      }

      try {
        // Parse subjects if provided, otherwise use empty array
        let parsedSubjects = [];
        if (subjects) {
          // If subjects is already an array, use it as is
          if (Array.isArray(subjects)) {
            parsedSubjects = subjects;
          } 
          // If subjects is a string, try to parse it
          else if (typeof subjects === 'string' && subjects.trim()) {
            parsedSubjects = subjects.split(',').map(s => s.trim());
          }
        }

        // Create teacher profile
        const teacher = await Teacher.create({
          userId: user.id,
          name: email.split('@')[0], // Use email username as initial name
          email,
          department,
          phone: phone || null,
          subjects: parsedSubjects
        });

        console.log('Teacher profile created successfully:', teacher.id);

        res.status(201).json({ 
          message: 'Teacher registered successfully',
          userId: user.id,
          teacherId: teacher.id
        });
      } catch (teacherError) {
        console.error('Error creating teacher profile:', teacherError);
        // If teacher creation fails, delete the user and return error
        await user.destroy();
        throw teacherError;
      }
    } else {
      // For non-teacher roles, just return success
      res.status(201).json({ 
        message: 'User registered successfully',
        userId: user.id 
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error registering user', 
      error: error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    console.log('Login attempt for:', email, 'with role:', role);

    // Validate input data
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    const user = await User.findOne({ 
      where: { email },
      include: role === 'teacher' ? [{
        model: Teacher,
        as: 'teacher' // Use the correct alias defined in associations
      }] : []
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify if the provided role matches the user's role
    if (user.role !== role) {
      return res.status(401).json({ 
        message: `Invalid role. This account is registered as a ${user.role}.` 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        ...(role === 'teacher' && user.teacher ? {
          teacherId: user.teacher.id,
          department: user.teacher.department
        } : {})
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        ...(role === 'teacher' && user.teacher ? {
          teacherId: user.teacher.id,
          department: user.teacher.department
        } : {})
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // This will come from the auth middleware

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword; // This will be hashed by the User model's beforeUpdate hook
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
};

export default {
  register,
  login,
  changePassword
};
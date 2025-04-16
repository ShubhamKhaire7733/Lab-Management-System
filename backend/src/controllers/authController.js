import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Teacher from '../models/Teacher.js';

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    console.log('Register request received:', { email, role });

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ email, password, role });
    console.log('User created successfully:', user.id);
    
    res.status(201).json({ 
      message: 'User registered successfully',
      userId: user.id 
    });
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

    const user = await User.findOne({ where: { email } });
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
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error during login', 
      error: error.message 
    });
  }
};

export { register, login };
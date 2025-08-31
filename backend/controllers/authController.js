// backend/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ... registerUser function remains the same ...
exports.registerUser = async (req, res) => { /* ... no changes here ... */ };

// THIS IS THE EXISTING FUNCTION FOR CITIZENS
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // We can add a check here to ensure admins don't use the citizen login
    if (user.role === 'admin') {
        return res.status(403).json({ message: 'Admins must use the admin login page.' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


// ✨ NEW FUNCTION FOR ADMIN LOGIN
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        // 🔐 Security Check: Ensure the user is an admin
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
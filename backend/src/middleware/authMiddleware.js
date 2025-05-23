const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded);

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ User fetched from DB:', req.user);
    next();
  } catch (error) {
    console.error('❌ JWT error:', error);
    const message = error.name === 'TokenExpiredError' ? 'Token has expired' : 'Not authorized, token failed';
    res.status(401).json({ message });
  }
};

const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  console.log('🔍 Checking admin role:', req.user.role);
  if (req.user.role === 'admin') {
    console.log('✅ Access granted: Admin');
    next();
  } else {
    console.log('❌ Access denied: Not an admin');
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };

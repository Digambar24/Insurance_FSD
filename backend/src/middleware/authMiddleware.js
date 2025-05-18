const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Protect route: Check if the user is logged in (valid JWT)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!process.env.JWT_SECRET) {
        return res
          .status(500)
          .json({ message: 'JWT_SECRET is not defined in the environment' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// ✅ Admin route: Check if the logged-in user has admin privileges
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };

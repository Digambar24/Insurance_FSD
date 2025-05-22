// middleware/adminMiddleware.js
const adminOnly = (req, res, next) => {
  console.log('🔍 [adminOnly] Checking user role:', req.user?.role);
  if (req.user && req.user.role === 'admin') {
    console.log('✅ [adminOnly] User is admin');
    next();
  } else {
    console.log('❌ [adminOnly] Access denied: Not an admin');
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { adminOnly };

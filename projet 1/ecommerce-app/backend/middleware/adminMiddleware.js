// backend/middleware/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    next();
  };
  
  module.exports = adminMiddleware;
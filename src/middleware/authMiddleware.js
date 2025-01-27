const jwt = require("jsonwebtoken");
const User = require("../models/User");


const authMiddleware = (req, res, next) => {
 
  
  const token = req.headers.authorization?.split(' ')[1];
 
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
 
  try {
    const decoded = jwt.decode(token);
      req.user = decoded;
      

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};


const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied, insufficient permissions" });
    }
    next();
};

module.exports = { authMiddleware, roleMiddleware };

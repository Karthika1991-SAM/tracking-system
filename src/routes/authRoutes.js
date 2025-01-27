const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", register); // Handler should be a function
router.post("/login", login);       // Handler should be a function
router.get("/profile", authMiddleware, getProfile); // Middleware and handler are functions

// Protected route
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
  });

module.exports = router;


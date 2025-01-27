const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try {
       
        const { username, email, password,role } = req.body;
        const user = await User.create({ username, email, password, role });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
      
        const token = jwt.sign({ id: user._id ,role: user.role}, process.env.JWT_SECRET, { expiresIn: "1h" });
        user_id=user._id;
        res.status(200).json(
            { message: 'Login successful', 
                token,
                user_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

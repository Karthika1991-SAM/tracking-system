const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
   
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Create a new user (Admin only)
exports.createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = new User({
            username,
            email,
            password, // Make sure to hash the password before saving
            role, // Admin or user
        });

        await user.save();
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user by ID (Admin only)
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update a user by ID (Admin only)
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user details
        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();
        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all roles (Admin only)
exports.getAllRoles = async (req, res) => {
    try {
        // Assuming roles are predefined in your system
        const roles = await Role.find(); // Modify this according to your roles
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

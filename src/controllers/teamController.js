const Team = require("../models/Team");
const User = require("../models/User");

// Create a new team
exports.createTeam = async (req, res) => {
   
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Team name is required" });
        }

        const team = await Team.create({
            name,
            description,
            createdBy: req.user.id,
            members: [req.user.id], // Add the creator as a member by default
        });

        res.status(201).json({
            message: "Team created successfully",
            team,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all teams the user is a member of
exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find({ members: req.user.id })
            .populate("members", "username email")
            .populate("createdBy", "username email");

        res.status(200).json({ teams });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Join a team
exports.joinTeam = async (req, res) => {
    try {
        const { teamId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // Check if the user is already a member
        if (team.members.includes(req.user.id)) {
            return res.status(400).json({ error: "You are already a member of this team" });
        }

        team.members.push(req.user.id);
        await team.save();

        res.status(200).json({
            message: "Joined the team successfully",
            team,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a member to a team (Admin/Team Owner only)
exports.addMember = async (req, res) => {
    try {
        const { teamId, userId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // Only the creator or an admin can add members
        if (team.createdBy.toString() !== req.user.id.toString() && req.user.role !== "Admin") {
            return res.status(403).json({ error: "You are not authorized to add members to this team" });
        }

        // Check if the user is already a member
        if (team.members.includes(userId)) {
            return res.status(400).json({ error: "User is already a member of this team" });
        }

        team.members.push(userId);
        await team.save();

        res.status(200).json({
            message: "Member added successfully",
            team,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a member from a team (Admin/Team Owner only)
exports.removeMember = async (req, res) => {
    try {
        const { teamId, userId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        // Only the creator or an admin can remove members
        if (team.createdBy.toString() !== req.user.id.toString() && req.user.role !== "Admin") {
            return res.status(403).json({ error: "You are not authorized to remove members from this team" });
        }

        team.members = team.members.filter((member) => member.toString() !== userId);
        await team.save();

        res.status(200).json({
            message: "Member removed successfully",
            team,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

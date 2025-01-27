const express = require("express");
const { createTeam, getTeams, joinTeam, addMember, removeMember } = require("../controllers/teamController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, roleMiddleware(["Admin", "Manager"]), createTeam);
router.get("/", authMiddleware, getTeams);
router.post("/join", authMiddleware, joinTeam);
router.post("/add-member", authMiddleware, roleMiddleware(["Admin", "Manager"]), addMember);
router.post("/remove-member", authMiddleware, roleMiddleware(["Admin", "Manager"]), removeMember);

module.exports = router;

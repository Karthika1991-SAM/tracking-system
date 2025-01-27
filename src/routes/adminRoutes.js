const express = require("express");
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllRoles,
} = require("../controllers/adminController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware(["Admin"]), getAllUsers);
router.get("/users/:id", authMiddleware, roleMiddleware(["Admin"]), getUserById);
router.post("/users", authMiddleware, roleMiddleware(["Admin"]), createUser);
router.put("/users/:id", authMiddleware, roleMiddleware(["Admin"]), updateUser);
router.delete("/users/:id", authMiddleware, roleMiddleware(["Admin"]), deleteUser);
router.get("/roles", authMiddleware, roleMiddleware(["Admin"]), getAllRoles);

module.exports = router;

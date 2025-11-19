const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/authMiddleware");

// Decides whether the admin button is visible
router.get("/", requireAdmin, adminController.adminPage);

router.post("/deleteUser/:id", requireAdmin, adminController.deleteUser);
router.post("/deleteRecipe/:id", requireAdmin, adminController.deleteRecipe);

module.exports = router;

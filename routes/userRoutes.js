const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/login", (req, res) => {
    res.render("login", { user: req.session.user || null });
});

router.post("/signup", userController.newUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);

module.exports = router;
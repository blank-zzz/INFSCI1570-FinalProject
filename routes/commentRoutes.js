const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        next();
    }
    else {
        res.redirect("/users/login");
    }
}

// Handle Add Comment Form Submission
router.post("/add/:recipeId", isLoggedIn, commentController.addComment);

module.exports = router;
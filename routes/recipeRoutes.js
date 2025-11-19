const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// Check user is logged in
function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) next();
    else res.redirect("/users/login");
}

// Add Recipe
router.get("/add", isLoggedIn, (req, res) => {
    res.render("addrecipe", { user: req.session.user });
});
router.post("/add", isLoggedIn, recipeController.addRecipe);

// My Recipes
router.get("/myrecipes", isLoggedIn, recipeController.getMyRecipes);

// Modify Recipe page
router.get("/modify/:id", isLoggedIn, recipeController.modifyRecipe);

// Update recipe
router.post("/update/:id", isLoggedIn, recipeController.updateRecipe);

// This right here is a bastard child
// View Recipe
router.get("/:id", recipeController.viewRecipe);

// Like Recipe
router.post("/:id/like", isLoggedIn, recipeController.likeRecipe);

module.exports = router;

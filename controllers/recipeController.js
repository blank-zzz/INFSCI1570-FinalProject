const Recipe = require("../models/recipe");
const Comment = require("../models/comment");


// Add Recipe
exports.addRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, instructions } = req.body;

        const ingredientsArr = Array.isArray(ingredients) ? ingredients : [ingredients];
        const instructionsArr = Array.isArray(instructions) ? instructions : [instructions];

        // Create new recipe
        const newRecipe = new Recipe({
            title,
            description,
            ingredients: ingredientsArr,
            instructions: instructionsArr,
            author: req.session.user.id
        });

        const savedRecipe = await newRecipe.save();

        // Add recipe ID to user recipesCreated array
        const User = require("../models/user");
        await User.findByIdAndUpdate(
            req.session.user.id,
            { $push: { recipesCreated: savedRecipe._id } }
        );

        res.redirect("/");
    }
    catch (err) {
        console.error(err);
        res.render("addrecipe", { addrecipeError: "Failed to create recipe.", user: req.session.user });
    }
};

// View Recipe
exports.viewRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate("author", "username")
            .lean();

        if (!recipe) return res.status(404).send("Recipe not found");

        const comments = await Comment.find({ recipe: recipe._id })
            .populate("createdBy", "username")
            .sort({ createdAt: 1 })
            .lean();

        res.render("viewrecipe", { recipe, comments, user: req.session.user || null });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// Like Recipe
exports.likeRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const userId = req.session.user.id;

    if (!recipe.likes.includes(userId)) {
        recipe.likes.push(userId);
    }
    else {
        recipe.likes = recipe.likes.filter(id => id.toString() !== userId);
    }

    await recipe.save();
    res.redirect(`/recipes/${req.params.id}`);
};

// My Recipes
exports.getMyRecipes = async (req, res) => {
    try {
        const User = require("../models/user");

        // Get user with their recipesCreated
        const userDoc = await User.findById(req.session.user.id)
            .populate({
                path: "recipesCreated",
                select: "title likes"
            })
            .lean();

        const recipes = userDoc.recipesCreated || [];

        res.render("myrecipes", {
            user: req.session.user,
            recipes
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving your recipes.");
    }
};

// Modify Recipe
exports.modifyRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        // Ensure only the author can edit
        if (!recipe || recipe.author.toString() !== req.session.user.id) {
            return res.status(403).send("Unauthorized: Only authors can modify their recipes");
        }

        res.render("modifyrecipe", { recipe, user: req.session.user });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error loading recipe");
    }
};

// Handles changing recipe data on submission
exports.updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, ingredients, instructions } = req.body;
        const recipe = await Recipe.findById(id);

        if (!recipe || recipe.author.toString() !== req.session.user.id) {
            return res.status(403).send("Unauthorized: Only authors can modify their recipes");
        }

        recipe.title = title;
        recipe.description = description;
        recipe.ingredients = Array.isArray(ingredients) ? ingredients : [ingredients];
        recipe.instructions = Array.isArray(instructions) ? instructions : [instructions];

        await recipe.save();
        res.redirect(`/recipes/${id}`);
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Error updating recipe");
    }
};

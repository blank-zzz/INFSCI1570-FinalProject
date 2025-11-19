exports.adminPage = async (req, res) => {
    try {
        const adminId = req.session.user.id;

        // Fetch all users EXCEPT admin
        const users = await User.find({ _id: { $ne: adminId } });

        // Fetch all recipes with author username
        const recipes = await Recipe.find({}).populate("author", "username");

        res.render("admin", {
            user: req.session.user, // logged in admin
            users,
            recipes
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error loading admin page");
    }
};

const User = require("../models/user");
const Recipe = require("../models/recipe");
const Comment = require("../models/comment");

exports.deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) return res.status(404).send("Recipe not found");

        // Delete all comments linked to the recipe
        await Comment.deleteMany({ recipe: recipeId });
        // Remove recipe from author's recipesCreated[]
        await User.findByIdAndUpdate(recipe.author, {
            $pull: { recipesCreated: recipeId }
        });
        // Delete the recipe
        await Recipe.findByIdAndDelete(recipeId);

        res.redirect("/admin");
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Error deleting recipe");
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).send("User not found");

        // Get all recipes the user created
        const recipes = await Recipe.find({ author: userId }).select("_id");

        const recipeIds = recipes.map(r => r._id);

        // Delete all comments linked to user's recipes
        await Comment.deleteMany({ recipe: { $in: recipeIds } });
        // Delete all recipes authored by the user
        await Recipe.deleteMany({ author: userId });
        // Delete all comments created by the user
        await Comment.deleteMany({ createdBy: userId });
        // Delete user
        await User.findByIdAndDelete(userId);

        res.redirect("/admin");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
};

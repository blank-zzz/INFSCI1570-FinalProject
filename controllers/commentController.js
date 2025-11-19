const Comment = require("../models/comment");

exports.addComment = async (req, res) => {
    const { recipeId } = req.params;
    const { content } = req.body;

    try {
        const newComment = new Comment({
            content,
            createdBy: req.session.user.id,
            recipe: recipeId
        });
        await newComment.save();

        // Redirect back to the recipe page
        res.redirect(`/recipes/${recipeId}`);
    }
    catch (err) {
        console.error("Failed to add comment:", err);
        res.status(500).send("Server error: could not add comment.");
    }
};

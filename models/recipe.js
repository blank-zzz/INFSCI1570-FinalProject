const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // tracks which users liked recipe
    // might have to ditch img idea, storage issues could complicate things
    imageUrl: { type: String, default: "/images/placeholder.jpg" } 
}, { timestamps: true });

module.exports = mongoose.model("Recipe", RecipeSchema);

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
    content: { type: String, required: true, trim: true, maxlength: 500 },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);

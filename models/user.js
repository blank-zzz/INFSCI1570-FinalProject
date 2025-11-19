const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    password: { type: String, required: true, trim: true, minlength: 3 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    recipesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    // Only hash if password is new or modified
    // But i aint letting users modify shit cause fuck u
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);   // should hash
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

/* Compare Passords */
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// OLD (Compare Passwords) OLD
// No hashing because security isnt a requirement on project
// UserSchema.methods.comparePassword = function (candidatePassword) {
//     return this.password === candidatePassword;
// };

module.exports = mongoose.model("User", UserSchema);

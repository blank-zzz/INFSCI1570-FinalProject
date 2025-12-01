const User = require("../models/user");

// Create New User
exports.newUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render("login", { signupError: "Username taken", user: null });
        }
        const newUser = new User({ username, password });
        await newUser.save();

        req.session.user = {
            id: newUser._id,
            username: newUser.username,
            role: newUser.role
        };

        res.redirect("/");
    }
    catch (err) {
        console.error(err);
        res.render("login", { signupError: "Error creating account", user: null });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        const isMatch = await user.comparePassword(password);

        if (!user || !isMatch) {
            return res.render("login", { loginError: "Invalid credentials", user: null });
        }
        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        res.redirect("/");
    }
    catch (err) {
        console.error(err);
        res.render("login", { loginError: "Error logging in", user: null });
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect("/users/login"));
};

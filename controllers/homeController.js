const Recipe = require("../models/recipe");

exports.getHomePage = async (req, res) => {
    const user = req.session.user || null;

    try {
        const recipes = await Recipe.find()
            .sort({ likes: -1 })
            .limit(5)
            .lean();

        res.render("home", { user, recipes });
    }
    catch (err) {
        console.error(err);
        res.render("home", { user, recipes: [] });
    }
};
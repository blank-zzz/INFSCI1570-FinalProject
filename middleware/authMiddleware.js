// For admin checking
// Prevents unauthorized viewing end deleting
exports.requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).send("Access denied.");
    }
    next();
};
const jwt = require("jsonwebtoken");
const userModel = require("../model/user-model");

module.exports = async function (req, res, next) {
    try {
        // Check if the token exists in cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Sorry 😒, you have to log in first" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SALT_KEY);

        // Find the user by email from the token payload
        const user = await userModel.findOne({ email: decoded.email }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found. Please log in again." });
        }

        // Attach user to the request object
        req.user = user;
        next();
    } catch (err) {
        console.error("Authentication Error:", err.message);

        // Handle token verification or other errors
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        }

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};

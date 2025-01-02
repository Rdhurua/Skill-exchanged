import jwt from "jsonwebtoken";
import  userModel from "../model/user-model.js";

export default async function (req, res, next) {
    try {
        // Check if the token exists in cookies
        const token = await req.cookies.token;
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
        //  console.log("you are in");

        req.user = user;
        next();
    } catch (err) {
        console.error("Authentication Error:", err.message);
      
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        }

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};

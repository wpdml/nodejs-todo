const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyToken = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Bearer token
    if (!token) {
        return res.status(403).json({ message: "Access denied" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded._id).select('-password'); // Exclude password from the response
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;

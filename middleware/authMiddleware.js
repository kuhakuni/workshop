const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // Check if the Authorization header is present
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Auth failed. Authorization header missing.",
            });
        }

        // Check if the Authorization header starts with "Bearer "
        const tokenArray = authHeader.split(" ");
        if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
            return res.status(401).json({
                message: "Auth failed. Invalid Authorization header format.",
            });
        }

        // Extract the token from the Authorization header
        const token = tokenArray[1];

        // Verify the token using the SESSION_SECRET
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);

        // Attach the decoded user data to the request object
        req.userData = decoded;

        // Continue with the next middleware
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed. Invalid token.",
        });
    }
};

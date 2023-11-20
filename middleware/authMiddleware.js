const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Auth failed. Authorization header missing.",
            });
        }
        const tokenArray = authHeader.split(" ");
        if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
            return res.status(401).json({
                message: "Auth failed. Invalid Authorization header format.",
            });
        }

        const token = tokenArray[1];

        const decoded = jwt.verify(token, process.env.SESSION_SECRET);

        req.userData = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed. Invalid token.",
        });
    }
};

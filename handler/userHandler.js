const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repository/userRepository");

module.exports = {
    register: async (req, res) => {
        const { email, username, password } = req.body;
        const user = await userRepository.create(email, username, password);
        res.json(user);
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await userRepository.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user.id },
                process.env.SESSION_SECRET,
                {
                    expiresIn: "2h",
                }
            );
            res.json({ user, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    },
};
    
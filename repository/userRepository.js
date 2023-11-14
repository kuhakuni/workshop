const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
    create: async (email, username, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await User.create({ email, username, password: hashedPassword });
    },
    findByEmail: async (email) => {
        return await User.findOne({ where: { email } });
    },
    findById: async (id) => {
        return await User.findByPk(id);
    },
};

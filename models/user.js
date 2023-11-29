const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
});


class User extends Model {}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
    }
);

module.exports = User;

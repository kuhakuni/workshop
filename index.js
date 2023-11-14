// index.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const User = require("./models/user");
const Note = require("./models/note");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

// Sync models
User.sync().then(() => {
    console.log("The User table has been created.");
});

Note.sync().then(() => {
    console.log("The Note table has been created.");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

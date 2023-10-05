// Dependencies
const mongoose = require("mongoose");

// create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name is too short."],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// create model
const userModel = mongoose.model("User", userSchema);

// Export model
module.exports = userModel;
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        minLength : [5, "Name must be atleast 5 character."],
        maxLength : [50, "Name must be less than 50 character."],
        trim: true
    },
    username: {
        type: String,
        required: [true, "Username is required."],
        minLength : [5, "Username must be atleast 5 character."],
        maxLength : [50, "Username must be less than 10 character."],
        unique : [true, 'username already taken'],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Username is required."],
        unique : [true, 'email already registered'],
        lowercase : true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength : [8, "Password must be atleast 8 character."],
        maxLength : [60, "Password must be less than 16 character."],
    },
    bio: {
        type: String,
    }
})

module.exports = mongoose.model("user", userSchema);
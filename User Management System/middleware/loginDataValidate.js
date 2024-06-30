const validator = require("email-validator");
const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginDataValidate = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Every field must be fill."
        })
    }

    const validEmail = validator.validate(email)
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Please give valid email."
        })
    }

    
    next()
}

module.exports = loginDataValidate;
const validator = require("email-validator");
const userModel = require("../models/user");

const signupDataValidate = async (req,res,next)=>{
    const {name, username, email, password} = req.body;
    if(!name || !username || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Every field must be fill."
        })
    }

    const validEmail = validator.validate(email)
    if(!validEmail){
        return res.status(400).json({
             success: false,
            message: "Please give valid email."
        })
    }

    const alreadyUsername = await userModel.findOne({ username });
        if (alreadyUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already in use."
            });
        }

        const alreadyUser = await userModel.findOne({email});
        if(alreadyUser){
            return res.status(400).json({
                success: false,
            message: "Email already in use."
        })
        }
    next()
}

module.exports = {
    signupDataValidate
}
const userModel = require("../models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const signup =  async (req,res,next)=>{
    const {name, username, email, password, bio} = req.body;

    try {
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password, salt, async (err,hash)=>{
                const user = await userModel.create({
                    name,
                    username,
                    email,
                    password: hash,
                    bio
                })
            })
        })
        res.status(200).redirect("/signup")
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                success: false,
               message: "Duplicate Username"
           })
            
        }
        return res.status(400).json({
            success: false,
           message: error.message
       })
    }

}

const login = async (req,res,next)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid Details."
            })
        }

        bcrypt.compare(password, user.password, (err,result)=>{
            if(err){
                return res.status(400).json({
                    success: false,
                    message: "Server error."
                })
            }
            if(result){
                const token = jwt.sign({email, id: user._id}, process.env.SECRET_KEY, { expiresIn: '1h' })
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 3600000
                });
                return res.status(200).redirect("/")
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    signup,
    login
}
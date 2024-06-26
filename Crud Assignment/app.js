const express = require("express");
const userModel = require("./models/user")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.send("Home page");
})

app.post("/register", async (req,res)=>{
    const {name, password, email} = req.body;
    const user = await userModel.findOne({email : req.body.email});
    if(user) return res.send("user already there!")
    try {
        if(!email || !name || !password){
            return res.send("detail is missing");
        }
        userModel.create({
            name,
            password,
            email
        })
        res.send("register")

    } catch (error) {
        return res.send(error.message)
    }
})


app.post("/login", async (req,res)=>{
    try {
        const user = await userModel.findOne({email : req.body.email});
        if(!user){
            return res.send("no user");
        }
        if(user.password === req.body.password){
            return res.send("Home page after login")
        }
        return res.send("wrong user details");
    } catch (error) {
        return res.send(error.message)
    }
})


app.listen(3000);
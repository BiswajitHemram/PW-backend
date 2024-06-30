const express = require("express");
const app = express();

const path = require("path")
const authRouter = require("./routers/authRouter")
const database = require("./config/databaseConnection");
const cookieParser = require("cookie-parser");
const islogged = require("./middleware/islogged")
const userModel = require("./models/user")

database()
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth", authRouter);

app.get("/signup", (req,res)=>{
    res.render("signup")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/", islogged, async (req,res)=>{
    const user = await userModel.findOne({_id : req.user.id}).select("-password");
    res.render("index", {user})
})

app.get("/logout", (req,res)=>{
    res.cookie("token", null);
    res.redirect("/login")
})
module.exports = app;
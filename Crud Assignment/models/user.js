const mongoose = require("mongoose");

try{
    mongoose.connect("mongodb://localhost:27017/testing");
    const userSchema = mongoose.Schema({
        name : String,
        email : String,
        password : String
    })
    module.exports = mongoose.model("user", userSchema);
    console.log("connect");
} catch (err){
    console.log(err.message);
}

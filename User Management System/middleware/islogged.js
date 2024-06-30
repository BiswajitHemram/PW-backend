const jwt = require("jsonwebtoken");
const islogged = (req,res,next)=>{
    if(req.cookies.token === null){
        return res.redirect("/login")
    }
    
    try {
        const token = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        req.user = {id : token.id, email : token.email}
    } catch (error) {
        return res.redirect("/login")
    }
    next()
}

module.exports = islogged
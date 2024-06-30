require("dotenv").config()
const PORT = process.env.PORT || 8080;
const app = require("./app");

app.listen(PORT, (req,res)=>{
    console.log(`Server listen at http://localhost:${PORT}`);
})
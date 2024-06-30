const mongoose = require("mongoose");
const databaseConnection = ()=>{
    mongoose.connect(`${process.env.MONOGDB_URL}/pwskill`)
    .then((conn) => console.log(`connect to DB: ${conn.connection.host}`))
    .catch((e) => console.log(e.message))
}

module.exports = databaseConnection
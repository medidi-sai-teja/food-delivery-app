const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STR)
        console.log("DB Connected Successfully!")
    }catch(err){
        console.log(`DB Connection Failed: ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;
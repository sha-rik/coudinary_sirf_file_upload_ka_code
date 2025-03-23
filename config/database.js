// mongoose ko import
const mongoose = require("mongoose");

// dov env file se connection
require("dotenv").config();

// database se connetion
exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(
        console.log("Connection succesfull")
    )
    .catch((err)=>{
        console.error(err);
        console.log("DB connection error");
        process.exit(1);
    });
}
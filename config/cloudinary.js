// cloudinary ko import karenge
const cloudinary = require("cloudinary").v2;
require("dotenv").config;

// ab ham loog cloud se connection stablish karnge
exports.cloudinaryConnect = () =>{
    try
    {
        // .config se ham connection statblish karnege
        cloudinary.config({
            // iske andar 3 paraments cloud name, api key, api secret
            cloud_name:process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,

        })
    }
    catch (err){
        console.log(err);
    }
}
// ye coludinary wala package hamare media ko server par upload karke fir media server par upload karte h
// aur fir server se delete kar deta h
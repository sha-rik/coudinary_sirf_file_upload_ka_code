// schema create karne ke liye hame  mongoose ka use karna hoga
const mongoose = require("mongoose");

// see you might see ki .. yahan imageUrl likha hua h.. par.. tum yahan 
// video bhi upload kar sakte ho... image url me koi sa bhi url aa sakta h...

const fileSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    imageUrl:
    {
        type:String,
    },
    tags:
    {
        type:String,
    },
    email:
    {
        type:String,
    }

});

module.exports = mongoose.model("File", fileSchema);
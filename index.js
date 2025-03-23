// app create karna h
const express = require("express");
const app = express();

// PORT find karna h
require("dotenv").config();
const PORT = process.env.PORT || 3000;
// middleware add karna h

// agar hame json data mile toh usse parse karne ke liye
app.use(express.json());

// agar hame file se interaction karna ho to uske liye
const fileupload = require("express-fileupload"); // ye server par upload karta h

// agar ham file upload me kuch flag send karte to... tempFilePath me kuch value aata
app.use(fileupload());


// db  se connect karna
const db = require("./config/database");
db.connect();

// cloud se connect karna h
const cloud = require("./config/cloudinary");
cloud.cloudinaryConnect();

// api route mount karna h

const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

// activate server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

// this is how we print something in home page
app.get("/",(req,res)=>{
    res.send(`<h1>This is home page baby</h1>`);
})

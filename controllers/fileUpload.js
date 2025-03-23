// controller function me ham...
// phele jo bhi model  h usko import karenge
// uske baad ham handler function banayenge

// ek localfile hadler function banayenge jo client ke path se media lega 
// aur server ke path se usko upload kar dega

const File = require("../models/File");

exports.localFileUpload = async (req, res) =>{
    try
    {
        // is method se ham request ki body se "file" naam ka file access kar rahe h
        const file = req.files.file;
        console.log("this is pur file --> ",file);

        // ye ab ham server ka path add kar rahe h
        // __dirname se ham present directory ka path jan rahe h
        // fir ham files folder ka name add kar kare h
        // fir abhi ka jo date h uske basis par ek unique naam de rahe h path ko
        // fir file ke name se split karke uska extension nikal rahe h , taki ye .jpg ya .png type kuch bane
        let path = __dirname + "/files/" + Date.now() +`.${file.name.split(".")[1]}`;
        console.log("this is path --> ",path);
        // __dirname se ham present directory ka path jan rahe h

        // ab ham file ko move kar rahe h jo client se aaya tha... to server ke path par with the help of file.mv
        file.mv(path, (err) =>{
            console.log(err);
        });

        res.status(200).json({
            success: true,
            msg: "local file uploaded successfully"
        })
    }
    catch(err)
    {
        console.log("dfgzdfhszdf  dfgsfd");
        console.log(err);
    }
}
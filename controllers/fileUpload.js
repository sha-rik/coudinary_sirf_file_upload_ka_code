// controller function me ham...
// phele jo bhi model  h usko import karenge
// uske baad ham handler function banayenge

// ek localfile hadler function banayenge jo client ke path se media lega 
// aur server ke path se usko upload kar dega

const File = require("../models/File");
// ham ab cloudinary ka use karenge
const cloudinary = require("cloudinary").v2;

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

// is function ke help se ham check karenge ki hamare pass jo file aaya h wo hamare supported types me h ya nahi
function isFileTypeSupported (filetype, supportedTypes)
{
    return supportedTypes.includes(filetype);
}

// is function ke help se ham file ko cloudinary par upload karenge
async function uploadFileToCloudinary(file, folder)
{
    const options ={folder};
    // ek question jo mann me aata h... 
    // ye file.tempFilePath kya h???
    // to ye kuch aishe h...
    // hamare local machine se data kisi server ke tempory folder par upload hota h,
    // fir server se wo data media folder par jata h
    // fir server ke media folder se delete ho jata h
    console.log("this is file.tempFilePath --> ",file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// to ab ham specifically image upload ke bare me janege

// at uska handler function banate h
exports.imageUpload = async (req, res) =>{
    try{
        // ab ham req ki body me se alag alag paraments fetch karenge
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        // ab ham file recive karnege by using req.files
        const file = req.files.imagefile;
        console.log("this is file --> ",file);

        // ab ham validation karna chate h.. ki hamare pass sahi data aa raha h ki nahi

        // to hamare supported types kya kya h
        const supportedTypes = ["png", "jpg", "jpeg"];
        const filetype = file.name.split(".")[1].toLowerCase();


        console.log("this is filetype that we have --> ",filetype);

        // ab ham check karenge ki ye file hamare supported types me h ya nahi
        if(!isFileTypeSupported(filetype, supportedTypes))
        {
            return res.status(400).json({
                success: false,
                msg: "file type not supported"
            })
        }

        // ab ham file ko move karenge cloudaniry par
        const response =await uploadFileToCloudinary(file, "LoveBabbar")
        console.log("this is response --> ",response);

        // ab ham db me entry save karenge... but wiat isse phele ham run kar ke dekhenge... 
        // to hamne kion nahi starting me hi likh diya tha.. ki databse me kya store karenge??
        // koion ki..... hame data base me image ka url bhi add karna hoga.. aur wo to hamare pass tab hi aaega jab ham cloudinary se response recive karenge
        // aur... abhi jab cloudinary se response recive hua h to ham uska url nikal sakte h ... kion ki hamne response of console log kiya hua...

        // so lets get started with db me store karne ka code... and BTW yahan jo File.create likhe ho.. wo hamne model me likha hua h
        // na ki  ye --> "const file = req.files.imagefile;" wala file h
        const fileData = await File.create({
            name,
            imageUrl: response.secure_url,
            tags,
            email
        })
        


        res.json({
            success: true,
            imageUrl: response.secure_url,
            msg: "image uploaded successfully"
        })


    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Something Went Wrong"
        })
    }
}

function isFileTypeSupported(filetype, supportedTypes)
{
    return supportedTypes.includes(filetype);
}

async function uploadVideoToCloudinary(file, folder)
{
    const options = {folder};
    // is tarike se hamne ye kaha ki...
    // khud se tum decide karo ki kya type h uploded file ka
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.videoUpload = async (req, res) =>{
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file =req.files.videoFile  
        console.log(file);

        // ab karenge validation
        const supportedTypes = ["mp4", "mkv", "avi", "mov"];

        const filetype = file.name.split(".")[1].toLowerCase();

        console.log("this is filetype --> ",filetype);

        if(!isFileTypeSupported(filetype, supportedTypes))
        {
            res.status(400).json({
                success: false,
                msg: "file type not supported"
            })
        }
        console.log("this is file.tempFilePath --> ",file.tempFilePath);

        const response =await uploadVideoToCloudinary(file, "LoveBabbar");

        

        console.log("this is response --> ",response);

        // const response =await uploadFileToCloudinary(file, "LoveBabbar")

        const fileData = await File.create({
            name,
            imageUrl: response.secure_url,
            tags,
            email
        })

        res.status(200).json({
            success:true,
            imageUrl: response.secure_url,
            message:"Video Uploaded Successfully"
        })

        

    }
    catch (err){
        console.log("asdjkfaoisd___!!!___")
        console.log(err);
        res.status(500).json({
            success: false,
            message:"Something went Wrong"
        })
    }
}


// ab ham image ko reduce karenge
function istypesupported(fileType,supportedTypes)
{
    return supportedTypes.includes(fileType);
}

async function cloudupload(file, folder, quality)
{
    const options = {folder};
    // is tarike se hamne ye kaha ki...
    // khud se tum decide karo ki kya type h uploded file ka
    options.resource_type = "auto";
    if(quality)
    {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageReducerUpload = async(req,res) => {
    try{
        const {name,email,tags}=req.body;
        console.log(name,email,tags);

        const file=req.files.reduceImage;
        console.log(file);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType= file.name.split(".")[1].toLowerCase()
        console.log("this is filetype that we have --> ",fileType);
        if(!istypesupported(fileType,supportedTypes))
        {
            res.status(500).json({
                success: false,
                message:"Image type not supported"
            })
        }
        // hamne ek extra parameter diya.. jisme ham image ko reduce kar rahe h
        const response= await cloudupload(file,"LoveBabbar",30);
        console.log("this is response --> ",response);

        const fileData = await File.create({
            name,
            imageUrl: response.secure_url,
            tags,
            email
        })

        res.status(200).json({
            success: true,
            message:"Reduced file uploaded"
        })



    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        })

    }

}
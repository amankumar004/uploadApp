const File = require("../models/FileModel");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");

// local file upload - handler function
exports.localfileUpload = async (req, res) => {
    try{

        // fetch file
        const file = req.files.file;
        console.log("FILE ->", file);

        // create path where file to be stored
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`
        console.log("Path -> ", path)

        // add path to move function
        file.mv(path, (err) => {
            console.log(err);
        });
        // successfully send the response
        res.json({
            success:true,
            message:"Local file uploaded successfully",
        })

    } catch(err){
        console.log("Error in uploading local file")
    }
}


async function uploadFiletoCloudinary(file, folder){
    const options = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

function isSupportedType(type, supportedTypes){
    return supportedTypes.includes(type);
}

// image upload handler
exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });

    }
}


// video upload handler
exports.videoUpload = async (req, res) => {
    try{

        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        console.log(req.body);

        const file = req.files.videoFile;
        console.log(file);

        // validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // uploading to cloudinary
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })


    } catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
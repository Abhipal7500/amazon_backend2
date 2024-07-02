const multer = require('multer');
const randomString=require('randomstring');
const path=require('path');

// Function to check file type
function checkFileType(file, cb) {
    // Regular expression to test for allowed file types
    const allowedType = /jpeg|png|jpg|gif/;

    // Test the file extension
    const isMatchExt = allowedType.test(path.extname(file.originalname).toLowerCase());

    // Test the MIME type
    const isMimeMatch = allowedType.test(file.mimetype);

    // If both the extension and MIME type match, proceed; otherwise, return an error
    if (isMatchExt && isMimeMatch) {
        cb(null, true);
    } else {
        cb("File type not supported"); 
    }
}

function getProfilePicUpload(){
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/profile_pic');
    },
    filename:function(req,file,cb){
       let p1=randomString.generate(5);
       let p2=randomString.generate(5);
       let ext=(path.extname(file.originalname)).toLowerCase();
       cb(null,p1 + "_" + p2 + ext);

    }
});
return multer({
    storage:storage,
    limits:{
        fileSize:1000000
    },
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('profile_pic');
}

module.exports ={
    getProfilePicUpload
}
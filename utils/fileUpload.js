const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// specify file format that can be saved
function fileFilter(req,file,cb){

    if(
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" || 
        file.mimetype === "image/jpeg"
    ){
    // To accpet the file pass "true" like so:
    cb(null ,true)

    }else{
    // To reject this file pass 'false' , like so:
    cb(null,false)

    }
   

}

const upload = multer({ storage: storage , fileFilter : fileFilter});

module.exports = upload;

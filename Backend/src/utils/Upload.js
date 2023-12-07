const multer = require('multer');

const storage = multer.diskStorage({
    destination:function (req,file,callback){
        callback(null,'D:/Pdf_Upload/My_development/frontend/public/PDFFiles');
    },
    filename:function (req,file,callback){
        callback(null,Date.now() + file.originalname);
    }
})

const upload  = multer({
    storage:storage
})

module.exports = {upload}

// G:/Envirment authoroty project/circular/DB_Project/CU_DB/circular_database/Frontend/public/PDFFiles
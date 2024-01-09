const router = require("express").Router();
const FileUploadCtrl = require("../controllers/QmsFileUpload.Ctrl");
const {upload} = require("../../utils/Upload");

//save upload data
router.post( "/",upload.single('document'),FileUploadCtrl.createFileUpload);

//update upload data
router.put( "/:id",FileUploadCtrl.updateFileUpload);

//delete upload data
router.delete( "/:id",FileUploadCtrl.deleteFileUpload);

//Get all details
router.get( "/",FileUploadCtrl.readAllFileUploads);

//Get a upload
router.get( "/:name",FileUploadCtrl.getFileUpload);

//Get uploads by division
router.post( "/division",FileUploadCtrl.getFileUploadByDivision);

//Get uploads by division and date
router.post( "/division-date",FileUploadCtrl.getFileUploadByDivisionAndDate);

//Get uploads by division and title
router.post( "/division-title",FileUploadCtrl.getFileUploadByDivisionAndTitles);

//Get uploads by division and keywords
router.post( "/division-keywords",FileUploadCtrl.getFileUploadByDivisionAndKeywords);

router.post( "/viewAllByDocumentLevel",FileUploadCtrl.getFileUploadByDocumentLevel);

router.get( "/getFileUploadById/:id",FileUploadCtrl.getFileUploadById);

module.exports = router;
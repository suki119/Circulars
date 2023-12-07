const router = require("express").Router();
const LogCtrl = require("../controllers/Log.Ctrl");

//create log data
router.post( "/",LogCtrl.createLog);

//update log data
router.put( "/:id",LogCtrl.updateLog);

//Get all details
router.get( "/",LogCtrl.readAllLogs);

module.exports = router;
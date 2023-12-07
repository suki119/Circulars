const router = require("express").Router();
const UserCtrl = require("../controllers/User.Ctrl");

//save user data
router.post( "/register",UserCtrl.createUser);

//update user data
router.put( "/:id",UserCtrl.updateUser);

//delete user data
router.delete( "/:id",UserCtrl.deleteUser);

//Get all details
router.get( "/",UserCtrl.readAllUsers);

//Get a user
router.get( "/:name",UserCtrl.getUser);

//Login
router.post( "/login",UserCtrl.login);

module.exports = router;
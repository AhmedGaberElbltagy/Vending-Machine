const router = require("express").Router();

const usersController = require('./users.controller')

const isAuth = require("../../middleware/isAuth")
const isValid = require("../../middleware/validateRequest");
const { registerValid ,signInValid} = require("./users.validation");

router.post("/signIn",isValid(signInValid),usersController.signin)
router.post("/Register",isValid(registerValid),usersController.Register)
router.put("/reset",usersController.reset)
router.get("/allusers",isAuth(),usersController.Getusers)
router.post("/adduser",usersController.adduser);
router.put("/updateuser/:id",isAuth(),usersController.updateuser)
router.delete("/deleteuser/:id",usersController.deleteuser);
router.post("/user/deposite",isAuth(),usersController.deposite)

module.exports =router;

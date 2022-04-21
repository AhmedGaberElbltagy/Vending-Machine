const router = require("express").Router();

const { 
        adduser, updateuser, deleteuser
        ,Getusers,deposite,reset,Register,
        signIn
         } = require("../controllers/users.controller");


const isAuth = require("../../../Middleware/Authentication")
const isValid = require("../../../Middleware/validation");
const { RegisterValid ,signInValid} = require("../Validation/user.validation");

router.post("/signIn",isValid(signInValid),signIn)
router.post("/Register",isValid(RegisterValid),Register)
router.put("/reset",reset)
router.get("/allusers",isAuth(),Getusers)
router.post("/adduser",adduser);
router.put("/updateuser/:id",isAuth(),updateuser)
router.delete("/deleteuser/:id",deleteuser);
router.post("/user/deposite",isAuth(),deposite)

module.exports =router;

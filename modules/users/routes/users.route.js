const app = require("express").Router();

const {adduser, updateuser, deleteuser,getusers,deposite,reset} = require("../controllers/users.controller");
const signIn = require("../controllers/signIn.controller");
const Register= require("../controllers/Register.controller");
const isAuth = require("../config/isAuthorized")
const validator = require("../handleValidation/user.handleValidation");
const { RegisterValid ,signInValid} = require("../Validation/user.validation");

app.post("/signIn",validator(signInValid),signIn)
app.post("/Register",validator(RegisterValid),Register)
app.put("/reset/:id",reset)
app.get("/allusers",getusers)
app.post("/adduser",adduser);
app.put("/updateuser/:id",updateuser)
app.delete("/deleteuser/:id",deleteuser);
app.post("/user/deposite",isAuth(),deposite)

module.exports =app;

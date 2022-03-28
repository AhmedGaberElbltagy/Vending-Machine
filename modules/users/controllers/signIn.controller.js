const User = require("../../users/Model/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signIn =async (req,res)=>{
    const {userName,password,role}= req.body;
    try {
        let userValid= await User.findOne({userName})
        if (!userValid) {
            res.send("no userName exist")
        }
        else{
            const match = await bcrypt.compare(password,userValid.password);
            if (match == true ) {

    var token = jwt.sign({ role:userValid.role,id:userValid.id,deposite:userValid.deposit, }, 'shhhhh');
    
                res.json({Message:"login successful",token})
            }else{

                res.send("wrong password")
            }
        }
    } catch (error) {
        res.json({Message:"error",error})
        console.log(error);
    }
}
module.exports = signIn;
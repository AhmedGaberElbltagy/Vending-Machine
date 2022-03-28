const User = require("../../users/Model/user.model");
const bcrypt = require("bcrypt");


const Register =async(req,res)=>{
    const {userName,password,deposit,role}= req.body;
    try {
        const user =await User.findOne({userName})
        if (user) {
            res.send("this userName is already exist")
        }else{
            bcrypt.hash(password, 5, async function (err, hash) {
                await User.insertMany({ userName,password: hash,deposit,role })
                
                res.send("Register successfully")
            })
        }
    } catch (error) {
        res.send("something wrong")
        console.log(error);
    }
}
module.exports= Register;



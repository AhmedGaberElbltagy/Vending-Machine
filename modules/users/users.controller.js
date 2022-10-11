const User = require("./users.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adduser= async (req, res) => {
    const { userName, password, deposit,role} = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {
     const user = await User.insertMany({ userName, password: hash,deposit ,role })
        res.json({message:"user Added",user})
    })
}

exports.Getusers = async (req, res) => {
    if (req.user.role =="admin") {
     data = await User.find({}).select("-password"); //show all the data of the users
     res.json({ message: "success", data })
    }else{
        data = await User.findOne({email:req.user.email})//only view user information
        res.send("you can only see your information")
    }
}

exports.updateuser = async (req, res) => {
    const {id} = req.params;
    const userRole = await User.findById({_id:req.user.id})
    if (userRole.role == "admin" ) {
       const updateduser = await User.findByIdAndUpdate({ _id: id},
        {userName:req.body.userName,password:req.body.password})
        
        res.json({message:"updated",updateduser})
    }else{
        res.send("your not allowed to update")
    }
}

exports.deleteuser = async (req, res) => {
    const { id } = req.params;
    const userRole = await User.findById({_id:req.user.id})
    if (userRole.role =="admin") {
    await User.deleteOne({ _id: id })
    res.send("deleted");
    }else{
        res.send("your not allowed to delete ")
    }
}

const coin = [5,10,20,50,100]
exports.deposite = async(req,res)=>{
    const {userName,password,deposit}= req.body;
    const userValid = await User.findOne({userName})
    if (!userValid) {
        res.send("no userName exist")
    }else{
        const match = await bcrypt.compare(password,userValid.password);
            if (match == true ) {
                if (req.user.role == "buyer") {
                    var depose = req.body.deposit;
                    if (coin.includes(depose)) {
                        let ahmed = userValid.deposit + depose;
                        await User.findOneAndUpdate(userName,{deposit:ahmed})
                        res.send("depose added")
                    }else{
                        res.send("[5,10,20,50,100] are allowed")
                    }

                }else{
                    res.send("your are not Authorized");
                }
                }else{
                    res.send("wrong password")
                }
    }
}

exports.reset = async (req,res)=>{
    const {userName,password}= req.body;
    try {
        let userValid= await User.findOne({userName})
        if (!userValid) {
            res.send("no userName exist")
        }
        else{
            const match = await bcrypt.compare(password,userValid.password);
            if (match == true ) {    
                const resetDeposite = 0;
                let ahmed =userValid.deposit;
                await User.replaceOne({userName:userValid.userName},{deposit:0,userName,role:userValid.role,
                    password:userValid.password})
                res.send("deposite reset")
            }else{

                res.send("wrong password")
            }
        }
    } catch (error) {
        res.json({Message:"error",error})
        console.log(error);
    }
}
exports.Register = async( req , res ,next)=>{
try {
    const user_info = req.body;
    //check that user not already exist
    const isExist = await User.findOne({userName:user_info.userName})
    if (isExist) {
        res.send("this userName is already exist").status(401)
    }
    // hash the user password
    bcrypt.hash(user_info.password, 5, async function (err, hash) {
    await User.insertMany({ user_info,password:user_info.password}) 
    res.send("Register successfully")
    })   
}catch (err) {
    next(err)
    }
}
exports.signin = async (req,res)=>{
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
    }
}





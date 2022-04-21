const User = require("../../../Database/Models/users.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




const adduser = async (req, res) => {
    const { userName, password, deposit,role} = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {
     const user = await User.insertMany({ userName, password: hash,deposit ,role })
        res.json({message:"user Added",user})
    })
}

const Getusers = async (req, res) => {
    if (req.user.role =="admin") {
     data = await User.find({}).select("-password"); //show all the data of the users
     res.json({ message: "success", data })
    }else{
        data = await User.findOne({email:req.user.email})//only view user information
        res.send("you can only see your information")
    }
}

const updateuser = async (req, res) => {
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

const deleteuser = async (req, res) => {
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
const deposite = async(req,res)=>{
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

const reset=async (req,res)=>{
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
    }
}


module.exports ={adduser,updateuser,deleteuser,Getusers,deposite,reset,Register,signIn};


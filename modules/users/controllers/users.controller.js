const User = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




const adduser = async (req, res) => {
    const { userName, password, deposit} = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {
     const user = await User.insertMany({ userName, password: hash,deposit ,role })
        res.json({message:"Register successfully",token})
    })
}

const getusers = async (req, res) => {
    let data = await User.find({}).select("-password"); 
    res.json({ message: "success", data })
}

const updateuser = async (req, res) => {
    const { id } = req.params;
    await User.updateOne({ _id: id })
    res.send("updated")
}

const deleteuser = async (req, res) => {
    const { id } = req.params;
    await User.deleteOne({ _id: id })
    res.send("deleted");
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
const reset =async (req,res)=>{

    const { id } = req.params;
    const userValid = User.findById(id)
    if (!userValid) {
        res.send("no such username")
    }else{
        await User.findOneAndUpdate(id,{deposit:0})
    res.send("deposite is resets");
    }
    
}

module.exports ={adduser,updateuser,deleteuser,getusers,deposite,reset};


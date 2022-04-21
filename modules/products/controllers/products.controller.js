const Product = require("../../../Database/Models/products.model");
const User = require("../../../Database/Models/users.model")
const jwt = require("jsonwebtoken");


const addProduct = async (req, res) => {
    const {amountAvaliable,cost,productName} = req.body;
    await Product.insertMany({ amountAvaliable,cost,productName,sellerId:req.user.id})
    res.json({message:"added"})
}


const AllProducts = async (req, res) => {
     data = await Product.find({}); 
    res.json({ message: "AllProducts", data })
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    let product = await Product.findById(id)
    if (product.sellerId == req.user.id) {
        await Product.findByIdAndUpdate(id,{amountAvaliable:req.body.amountAvaliable,
            cost:req.body.cost, productName:req.body.productName,
        })
        res.send("updated")
    }else{
        res.send("you are not authorized")
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    let product = await Product.findById(id)
    if (product.sellerId == req.user.id) {
        await Product.findOneAndDelete({id})
        res.send("deleted");
    }else{
        res.send("you are not Authorized")
    }   
}

const buy =async (req,res)=>{
   var finalPrice = [];
   var charge = [];
    if (req.user.role == "buyer"){
        const {amount} = req.body;
        const {id} = req.params;
        let product = await Product.findById(id)
        if (product) {
            finalPrice = req.body.amount * product.cost;
            
            charge= req.user.deposite - finalPrice;
            let userid = req.user.id;
            await User.findByIdAndUpdate(userid,{deposit:charge})
            res.json({message:"we are happy to serve you",finalPrice,product})
        }else{
            res.send("No product Found")
        }
    }else{
        res.send("you are not allowed")
    }
}

module.exports ={ addProduct,AllProducts,updateProduct,deleteProduct,buy};

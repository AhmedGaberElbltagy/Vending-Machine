const Product = require("./products.model");
const User = require("../users/users.model")
const jwt = require("jsonwebtoken");


const addProduct = async (req, res) => {
    const {amount,cost,name} = req.body;
    const product = await Product.insertMany({
        amountAvaliable:amount,
        cost,
        productName:name,
        sellerId:req.user.id
    })
    res.status(201).json({message:"Product added",product})
}
const GetProduct =async(req,res)=>{
    const productId = req.params.id 
    let product = await Product.findById(productId)
    res.status(200).json({message:"Done",product})
}

const GetProducts = async (req, res) => {
    let Products = await Product.find({}).then({}) 
    if (Products == null) return

    res.status(200).json({ message: "AllProducts", Products })
}

const updateProduct = async (req, res) => {
    const productId = req.params.id
    let product = await Product.findById(productId)
    if (product.sellerId == req.user.id) {
        await Product.findByIdAndUpdate({_id:productId},
            {
            amountAvaliable:req.body.amountAvaliable,
            cost:req.body.cost,
            productName:req.body.name,
        })
        res.status(202).send("updated")
    }else{
        res.status(401).send("you are not authorized")
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    let product = await Product.findById(productId)
    if (product.sellerId == req.user.id) {
        await Product.findOneAndDelete({productId})
        res.status(201).send("deleted");
    }else{
        res.status(401).send("you are not Authorized")
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

module.exports ={ addProduct,GetProducts,GetProduct,updateProduct,deleteProduct,buy};

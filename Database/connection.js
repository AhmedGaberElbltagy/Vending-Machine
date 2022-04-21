const mongoose = require("mongoose");


const connection = async() =>{
return await mongoose.connect("mongodb://localhost/VendingMachine").then(()=>console.log("mongodb is running"));
}
module.exports =connection ;

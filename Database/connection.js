const mongoose = require("mongoose");

process.env.CONNECTION_STRING
const connection = async() =>{
return await mongoose.connect("mongodb://localhost/VendingMachine").then(()=>console.log("mongodb is running"));
}
module.exports =connection ;

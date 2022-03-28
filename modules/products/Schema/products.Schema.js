
const mongoose = require("mongoose");

const productSchema =
    mongoose.Schema({
        amountAvaliable: 
        { type:Number
        },
        cost:
        { type:Number ,
        },
        productName: 
        { 
            type: String,
         },
         sellerId :{type: mongoose.Schema.Types.ObjectId, ref:'user'},
    })
    module.exports = productSchema;

const mongoose = require("mongoose");

const usersSchema =
    mongoose.Schema({
        userName: { type: String },
        password: { type: String },
        deposit: { type: Number },
        role:{type:String}
    })
    module.exports =usersSchema;
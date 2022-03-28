const mongoose = require("mongoose")




const usersSchema = require("../Schema/users.Schema");
const User = mongoose.model("users",usersSchema);

module.exports =User;

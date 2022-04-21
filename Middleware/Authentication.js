const jwt = require("jsonwebtoken");

module.exports = ()=>{

    return async(req,res,next)=>{
        let barearToken = req.headers.authorization;
        let token = barearToken.split(" ")[1];
        var decoded = jwt.verify(token,'shhhhh')
        req.user = decoded;
        next()
        }   
    }


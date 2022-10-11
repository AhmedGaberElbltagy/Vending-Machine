const joi = require("joi");


module.exports={
    registerValid:{
        body:joi.object().required().keys({
            userName:joi.string().required(),
            deposit:joi.number().required().messages({
                "string.empty":"deposit can not be empty"
            }),
            password:joi.string().required().messages({
                "string.empty":"Password can not be empty"
            }),
            role:joi.string().required().messages({
                "string.empty":"role can not be empty"
            }),
            
        })

    },
    signInValid:{
        body:joi.object().required().keys({
            
            userName:joi.string().required().messages({
                "string.empty":"userName can not be empty"
            }),
            password:joi.string().required().messages({
                "string.empty":"Password can not be empty"
            }),
            
        })

        

    }
}
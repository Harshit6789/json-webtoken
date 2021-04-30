const Joi = require('joi');

let validate = function(req,res, next){
        
    const data = req.body;
    
    const validateSchema =  Joi.object().keys({
        name : Joi.string().min(3).max(20).required(),
        email : Joi.string().email().lowercase().required(),
        phone : Joi.number().integer().required(),
        password : Joi.string().min(4),
    });
    
    const { error } = validateSchema.validate(data);
    if(error){
        return res.status(400).send(error.details[0].message);        
    }else{
        next()
    }
}

module.exports = validate;



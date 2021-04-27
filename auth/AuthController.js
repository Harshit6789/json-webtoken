require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.secret;

module.exports = { 
authPost : async(req , res , next)=>{
try{
        const data = {
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            password : req.body.password
        }

        const token = jwt.sign(data , secret , {expiresIn:'500s'},(err,token)=>{
            // console.log( "Token : " + token );
        })
        next();
}catch(err){
        console.log("Error in token : " + err);
    }
},


 authGet : async(req , res , next)=>{
    
        const bearerHeader = req.headers['authorization'];
        
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ')[1];
            console.log(bearer);
            req.token = bearer;
            jwt.verify(req.token , secret , (err , authData)=>{
                if(err){
                    res.json({
                        Error : err
                    })
                }else{
                    next();
                }
            })
        }else{
            res.send({"result" : "Token not provided"});
        }
    }
}

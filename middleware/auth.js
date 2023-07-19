const jwt=require('jsonwebtoken');

const User=require('../model/user');


     exports.authorization=(req,res,next) =>{
    try{

        const token=req.header('authorization');
        //console.log(token);
        const secretkey=process.env.SECRET_KEY;

        const user=jwt.verify(token , secretkey );
        console.log('====>',user.name);
       
        User.findByPk(user.id)
        .then(users=>{
            req.user=users;
            next();
        })
        .catch(err=>{
            console.log(err);
        })

    }catch(err){
        console.log(err);
    }
}

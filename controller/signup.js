const user=require('../model/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function isStringvalid(string)
{
    if(string === undefined || string.length === 0)
    {
        return true;
    }else{
        return false;
    }
}

    

    const generatetoken=(userid,name) =>
{
    const secretkey=process.env.SECRET_KEY;
    return jwt.sign({ id:userid, name:name} , secretkey); 
}


 const postData=async(req,res,next)=>{
    const names=req.body.nm;
    const emails=req.body.em;
    const passwords=req.body.pwd;
    const numbers=req.body.nmbr;

    try{

    const alreadyregistered=await user.findOne({ where : {email : emails}}).catch(err => console.log(err));

    if(alreadyregistered){
        return res.status(400).json({message: "already registed user"});
    }

   else if(isStringvalid(names) || isStringvalid(emails) || isStringvalid(passwords)){
         return res.status(400).json({ message: "something went wrong"});      
    }
    else{
        

        // storing password with the help of bcrypt hashing technique
        // blow fish cryption
        bcrypt.hash(passwords,10, async(err,hash) =>{
            const data=await user.create({name:names,email:emails,Password: hash, number: numbers},  (err) =>{
                return res.status(404).json({message:"connot register at this moment"});
           })
           if(data)
           {
               return res.status(201).json({details:data});
           }
           
        })   
   }
    }
  catch(err) {
    throw err;
  }
  
}

const getlogin= async (req,res,next) =>{
    const emails=req.body.em;
    const passwords=req.body.pwd;
    
   
    try{

        const alreadyregistered=await user.findOne({ where : {email : emails}}).catch(err => console.log(err));
        
        if(isStringvalid(emails) || isStringvalid(passwords)){
             return res.status(400).json({sucsces: false, message: "something went wrong"});      
        }

        if(!alreadyregistered){
            return res.status(404).json({sucsces: false, message:" user doesn't exist"});
        }
                
        bcrypt.compare(passwords , alreadyregistered.Password, (err,result) =>{
                if(err){
                     return res.status(401).json({message:"password doesn't match",sucsces:true,
                    token:generatetoken(alreadyregistered.id,alreadyregistered.name)});
                    // console.log('password error');
                }
                if(result)
                {
                    return res.status(200).json({message:"User login succesfully" , sucsces: true , 
                    token:generatetoken(alreadyregistered.id,alreadyregistered.name)});
                }
                else{     
                    
                    return res.status(401).json({sucsces : false , message: "password doesn't match"}); 
               }
            })     
    }
    
      catch(err) {
        throw err;
      }
      
}

const getUser = async (req, res, next) => {
    try {
        const userID = req.user.id
        const allUser = await user.findAll()
        res.status(201).json({ allUser: allUser, userid: userID })
    } catch (err) {
        res.status(401).json({ err: "no user found" })
    }

}

module.exports={
    getlogin,
    postData,
    getUser
};
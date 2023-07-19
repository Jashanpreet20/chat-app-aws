const Message=require('../model/chat');
const { where } = require('sequelize');
const User=require('../model/user')
const Group=require('../model/group')


const messageSent=async(req,res,next)=>{
    console.log('user message sent',req.body);
    console.log(req.user.id)
    await Message.create({
        message:req.body.message,
        userId:req.user.id,
        groupId:req.body.groupid
    }).then(result=>{
        console.log(result);
    })
};

const getreply=async(req,res,next)=>{
    try{
        console.log('group id',req.query.group);
        console.log(typeof(req.query.Group))
        console.log('another req  query:',req.query)
       // const totalMessage=await Message.count();
        await Message.findAll({
            where:{groupId:Number(req.query.group)},
            include:[User,Group],
        }).then((messages)=>{
            // console.log(messages);
            res.json({message:messages})
        })
    }catch(err){
        console.log(err);
    }
    
};

const lastMessage=async(req,res,next)=>{
    console.log('what is request',req.query);
    try{
        const groupId = parseInt(req.query.group);
        const lastMessageid=parseInt(req.query.lastmessageid)
        console.log(groupId,lastMessageid);
        const totalMessage=await Message.count();
        if(totalMessage>lastMessageid){
            const lastMessage = await Message.findAll({
                where: {
                    groupId: groupId
                },
                include:[User,Group],
                offset:lastMessageid
            }).then(result=>{
                console.log(result)
                res.status(200).json(result);
            })
        }
        // const lastMessage = await Message.findAll({
        //     where: {
        //         groupId: groupId
        //     },
        //     include:[User,Group],
        //     offset:lastMessageid,
        //     limit:1
        // }).then(result=>{
        //     console.log(result)
        //     res.status(200).json(result);
        // })
    }
    catch(err){
        console.log(err);
    }


}

module.exports={
    messageSent,
    getreply,
    lastMessage
}
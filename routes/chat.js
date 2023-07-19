const express=require('express');

const routes=express.Router();

const auth=require('../middleware/auth');
const chatcontroller=require('../controller/chat');

routes.post('/message',auth.authorization,chatcontroller.messageSent);

routes.get('/allreply',auth.authorization,chatcontroller.getreply);

//get last message
routes.get('/lastmessage',auth.authorization,chatcontroller.lastMessage);

module.exports=routes;
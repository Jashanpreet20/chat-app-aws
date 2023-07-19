
const express=require('express');

const routes=express.Router();

const auth=require('../middleware/auth');
const admincontroller=require('../controller/signup');

routes.post('/user/post',admincontroller.postData);

routes.post('/user/login',admincontroller.getlogin);

routes.get('/get-user',auth.authorization,admincontroller.getUser);

module.exports=routes;
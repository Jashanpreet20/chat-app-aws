const express=require('express');

const routes=express.Router();
const auth=require('../middleware/auth');
const groupcontroller=require('../controller/group');

routes.post('/create-group',auth.authorization,groupcontroller.groupCreate);
routes.get('/fetch-group',auth.authorization,groupcontroller.fetchGroup);
routes.post('/adduser',auth.authorization,groupcontroller.adduser);
routes.delete('/removeuser',auth.authorization,groupcontroller.removeuser);


module.exports=routes;
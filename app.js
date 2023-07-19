const express=require('express');
const body=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
const path=require('path')
const app=express();


const sequelize=require('./util/database');

const userRoute=require('./routes/admin');
const grouproutes=require('./routes/group');
const chatroutes=require('./routes/chat');


const user=require('./model/user');
const chat=require('./model/chat');
const group=require('./model/group');
const userInGroup=require('./model/userInGroup');


dotenv.config();

// get config vars and you will declare before util database otherwise you will get error like access denied

app.use(body.json());
app.use(cors(
    {
        origin:"*",
    }
));

    //Association
    
     user.hasMany(chat);
     chat.belongsTo(user);

     group.hasMany(chat);
     chat.belongsTo(group);


     user.belongsToMany(group, {through: userInGroup});
     group.belongsToMany(user, {through: userInGroup});

     

     app.use(userRoute);
     app.use(grouproutes);
     app.use(chatroutes);
   
    
sequelize.sync({ force: false })
.then(chat=>{
    app.listen(3000 ,() =>{
          console.log('server run at 3000');        
})
})
.catch(err => console.log(err));



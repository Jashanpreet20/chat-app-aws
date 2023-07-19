
const Sequelize=require('sequelize');   

const sequelize=require('../util/database');

const chat=sequelize.define('chat',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true
    },
    name:Sequelize.STRING,
    message:Sequelize.STRING,
});

// chat.sync({force:true}).then(result =>{
//     console.log('chat created');
// }).catch(err =>{
//     console.log(err);
// })

module.exports=chat;
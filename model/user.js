
const Sequelize=require('sequelize');   

const sequelize=require('../util/database');

const user=sequelize.define('user',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true
    },
    Password:Sequelize.STRING,
    number:Sequelize.INTEGER,
});




module.exports=user;
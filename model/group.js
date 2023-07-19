
const Sequelize=require('sequelize');   

const sequelize=require('../util/database');

const group=sequelize.define('group',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true
    },
    groupName:Sequelize.STRING,
    Admin:Sequelize.INTEGER
});
module.exports=group;
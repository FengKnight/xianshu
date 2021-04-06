'use strict';
module.exports = (sequelize, DataTypes) => {
    const user_info = sequelize.define('user_info', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_name:{
            type: DataTypes.STRING(20),
            allowNull:false,
            primaryKey: true
        },
        u_password:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        u_email:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        street_name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        post_code:{
            type:DataTypes.STRING,
            allowNull:true
        },
        tel:{
            type:DataTypes.STRING,
            allowNull:true
        },
        is_default:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 0
        },
        credits:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 0
        },


    }, {
        tableName: 'user_info'
    });
    user_info.associate = function(models) {
        user_info.hasMany(models.books_info,{
            foreignKey:'user_name'
        })
        user_info.hasMany(models.message_info,{
            foreignKey:'user_name'
        })
        user_info.hasMany(models.messageReturn,{
            foreignKey:'user_name'
        })
    };
    return user_info;
};
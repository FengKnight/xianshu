'use strict';
module.exports = (sequelize, DataTypes) => {
    const message_info = sequelize.define('message_info', {
        message_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        user_name: {
            type: DataTypes.STRING(20),
            allowNull:false
        },
        like_sum:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },
        mes_content:{
            type: DataTypes.STRING(200),
            allowNull:false
        },
    }, {
        tableName: 'message_info'
    });
    message_info.associate = function(models) {
        message_info.belongsTo(models.user_info,{
            foreignKey:'user_name'
        })
        message_info.hasMany(models.messageReturn,{
            foreignKey:'message_id'
        })
    };
    return message_info;
};
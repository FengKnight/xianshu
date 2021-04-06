'use strict';
module.exports = (sequelize, DataTypes) => {
    const messageReturn = sequelize.define('messageReturn', {
        return_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        user_name: {
            type: DataTypes.STRING(20),
            allowNull:false
        },
        message_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        re_content:{
            type: DataTypes.STRING(200),
            allowNull:false
        },

    }, {
        tableName: 'messageReturn'
    });
    messageReturn.associate = function(models) {
        messageReturn.belongsTo(models.user_info,{
            foreignKey:'user_name'
        })
        messageReturn.belongsTo(models.message_info,{
            foreignKey:'message_id'
        })
    };
    return messageReturn;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
    const order_info = sequelize.define('order_info', {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user_name:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        consignee:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        address:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        tel: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        order_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        send: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

    }, {
        tableName: 'order_info'
    });
    order_info.associate = function(models) {
        order_info.hasOne(models.content,{
            foreignKey:'order_id'
        })
    };
    return order_info;
};
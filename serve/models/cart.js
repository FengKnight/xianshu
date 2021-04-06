'use strict';
module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define('cart', {
        cart_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        user_name: {
            type: DataTypes.STRING(20),
            allowNull:false
        },
        books_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        books_name: {
            type: DataTypes.STRING(20),
            allowNull:false
        },
        books_secprice:{
            type: DataTypes.FLOAT,
            allowNull:false
        },
        books_sums:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        sumMax:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        condition:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        checked:{
            type: DataTypes.INTEGER(1),
            allowNull:false,
            defaultValue: 0
        },
        picture:{
            type:DataTypes.STRING(50),
            allowNull:false
        },

    }, {
        tableName: 'cart'
    });
    cart.associate = function(models) {
        cart.hasOne(models.user_info,{
            foreignKey:'user_name'
        })
        cart.belongsTo(models.books_info,{
            foreignKey:'books_name'
        })
    };
    return cart;
};
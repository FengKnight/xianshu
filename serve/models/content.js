'use strict';
module.exports = (sequelize, DataTypes) => {
    const content = sequelize.define('content', {
        content_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        order_id: {
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
        books_price:{
            type: DataTypes.FLOAT,
            allowNull:false
        },
        books_sum:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        content_cost:{
            type: DataTypes.FLOAT,
            allowNull:false
        },

    }, {
        tableName: 'content'
    });
    content.associate = function(models) {
        content.hasOne(models.order_info,{
            foreignKey:'order_id'
        })
        content.belongsTo(models.books_info,{
            foreignKey:'books_name'
        })
    };
    return content;
};
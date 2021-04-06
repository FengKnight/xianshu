'use strict';
module.exports = (sequelize, DataTypes) => {
    const books_info = sequelize.define('books_info', {
        books_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        books_name:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        books_author:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        press:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        intro:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        picture:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        small_sort_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        secprice:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        condition:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        user_name:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        books_sums:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        is_exchange:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        buy_year:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        is_write:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        is_lack:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        is_sells:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        is_taste:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        is_changeColor:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        is_check:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },

    }, {
        tableName: 'books_info'
    });
    books_info.associate = function(models) {
        books_info.belongsTo(models.user_info,{
            foreignKey:'user_name'
        })
        books_info.hasMany(models.activity,{
            foreignKey:'books_id'
        })
        books_info.hasMany(models.content,{
            foreignKey:'books_id'
        })

    };
    return books_info;
};
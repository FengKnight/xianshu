'use strict';
module.exports = (sequelize, DataTypes) => {
    const big_sort = sequelize.define('big_sort', {
        big_sort_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        big_sort_name:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },

    }, {
        tableName: 'big_sort'
    });
    big_sort.associate = function(models) {
        big_sort.hasMany(models.small_sort,{
            foreignKey:'big_sort_id'
        })
    };
    return big_sort;
};
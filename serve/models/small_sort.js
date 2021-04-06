'use strict';
module.exports = (sequelize, DataTypes) => {
    const small_sort = sequelize.define('small_sort', {
        small_sort_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        small_sort_name:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        big_sort_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        tableName: 'small_sort'
    });
    small_sort.associate = function(models) {
        small_sort.belongsTo(models.big_sort,{
            foreignKey:'big_sort_id'
        })
    };
    return small_sort;
};
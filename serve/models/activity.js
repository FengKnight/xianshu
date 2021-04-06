'use strict';
module.exports = (sequelize, DataTypes) => {
    const activity = sequelize.define('activity', {
        activity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        port_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        books_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        tableName: 'activity'
    });
    activity.associate = function(models) {
        activity.belongsTo(models.port,{
            foreignKey:'port_id'
        })
        activity.belongsTo(models.books_info,{
            foreignKey:'books_id'
        })
    };
    return activity;
};
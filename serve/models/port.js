'use strict';
module.exports = (sequelize, DataTypes) => {
    const port = sequelize.define('port', {
        port_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        is_show:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        img:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        content:{
            type: DataTypes.STRING(200),
            allowNull:false,
        },



    }, {
        tableName: 'port'
    });
    port.associate = function(models) {
        port.hasMany(models.activity,{
            foreignKey:'port_id'
        })
    };
    return port;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
    const admin_info = sequelize.define('admin_info', {
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        admin_name:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        a_password:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        a_email:{
            type:DataTypes.STRING(50),
            allowNull:false
        },

    }, {
        tableName: 'admin_info'
    });

    return admin_info;
};
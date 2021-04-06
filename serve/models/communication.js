'use strict';
module.exports = (sequelize, DataTypes) => {
    const communication = sequelize.define('communication', {
        communication_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user_name:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        user_name_buy:{
            type: DataTypes.STRING(20),
            allowNull:false,
        },
        content:{
            type: DataTypes.STRING(200),
            allowNull:false,
        },
        create_time:{
            type: DataTypes.DATE,
            allowNull:false,
        },

    }, {
        tableName: 'communication'
    });

    return communication;
};
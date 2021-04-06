'use strict';
module.exports = (sequelize, DataTypes) => {
    const advert = sequelize.define('advert', {
        advert_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
        tableName: 'advert'
    });
    return advert;
};
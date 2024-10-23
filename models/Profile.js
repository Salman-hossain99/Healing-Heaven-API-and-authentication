
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profiles extends Model {
        
        static associate({Users}) {
            
            this.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
            
        }
    }
    Profiles.init({
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        profilePicture: { 
            type: DataTypes.STRING, 
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Profiles',
        tableName: 'Profiles',
        timestamps: true, 
    });
    return Profiles;
};
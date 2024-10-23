
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        
        static associate({Profiles}) {
            
            this.hasOne(Profiles, { foreignKey: 'userId', as: 'profile'})
                
        }
    }
    Users.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                isEmail: true, 
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Users',
        tableName: 'Users',
        timestamps: true, 
    });
    return Users;
};
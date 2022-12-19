const { DataTyes } = require('sequelize');
const { createDB } = require('../config/db');

const User = createDB.define('users', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTyes.INTEGER
    },
    name: DataTyes.STRING,
    email: DataTyes.STRING,
    password: DataTyes.STRING,
    isSeller: {
        type: DataTyes.BOOLEAN,
        defaultValue: false,
    }

});

module.exports = User;
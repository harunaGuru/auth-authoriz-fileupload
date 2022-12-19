const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const User = createDB.define("users", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  //   name: {
  //     type: DataTypes.STRING,
  //   },
  //   email: {
  //     type: DataTypes.STRING,
  //   },
  //   password: {
  //     type: DataTypes.STRING,
  //   },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  isSeller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

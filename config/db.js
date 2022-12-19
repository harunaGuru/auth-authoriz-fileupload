const { Sequelize } = require("sequelize");
const createDB = new Sequelize("test-db", "haroon", "guru123", {
  dialect: "sqlite",
  host: "./config/db.sqlite",
});

const connectDB = () => {
  createDB
    .sync()
    .then(() => {
      console.log("connected to db");
    })
    .catch((e) => {
      console.log("db connection fail", e);
    });
};

module.exports = { connectDB, createDB };

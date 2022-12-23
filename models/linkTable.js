const userMOdel = require("./userModel");
const OrderModel = require("./orderModel");

OrderModel.belongsTo(userMOdel, { foreignKey: "buyerId" });
userMOdel.hasMany(OrderModel, { foreignKey: "id" });
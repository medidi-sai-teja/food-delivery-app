const express = require("express");
const { verifyToken, checkAdmin } = require("../../middlewares/auth.middleware");
const { getOrders, createOrder,updateOrderStatus } = require("../../controllers/admin.controllers/order.controller");
const orderRouter = express.Router();

orderRouter
// order placing
  .post("/orders", verifyToken, createOrder)
  .get("/orders", checkAdmin, getOrders)
  .patch("/orders/:orderId/", checkAdmin, updateOrderStatus)

  module.exports = orderRouter 
const express = require("express");
const customerMiddlewares = require("../../middlewares/customer/auth.customer.middleware");
const customerOrderControllers = require("../../controllers/customer/order.customer.controller");
const orderRouter = express.Router();

orderRouter
// order placing
  .post("/orders", customerMiddlewares.verifyToken, customerOrderControllers.createOrder)
  .get("/orders", customerMiddlewares.verifyToken, customerOrderControllers.getOrders)

  module.exports = orderRouter 
const express = require("express");
const adminMiddlewares = require("../../middlewares/admin/auth.admin.middleware");
const adminOrderControllers = require("../../controllers/admin/order.admin.controller");
const adminOrderRouter = express.Router();

adminOrderRouter
  // order placing
  .post("/orders", adminMiddlewares.checkAdmin, adminOrderControllers.createOrder)
  .get("/orders", adminMiddlewares.checkAdmin, adminOrderControllers.getOrders)
  .patch("/orders/:orderId", adminMiddlewares.checkAdmin, adminOrderControllers.updateOrderStatus);

module.exports = adminOrderRouter;

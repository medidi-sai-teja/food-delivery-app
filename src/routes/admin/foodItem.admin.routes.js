const express = require("express");
const adminMiddlewares = require("../../middlewares/admin/auth.admin.middleware");
const adminFoodItemControllers = require("../../controllers/admin/foodItem.admin.controller");
const jwt = require("jsonwebtoken");
const { FoodItem } = require("../../models/FoodItem");

const adminFoodItemRouter = express.Router();

adminFoodItemRouter
  .post("/food-items", adminMiddlewares.checkAdmin, adminFoodItemControllers.createFoodItem)
  .get("/food-items", adminMiddlewares.checkAdmin, adminFoodItemControllers.getFoodItems)
  .patch(
    "/food-items/:fid",
    adminMiddlewares.checkAdmin,
    adminFoodItemControllers.updateFoodItem,
  )
  .delete(
    "/food-items/:fid",
    adminMiddlewares.checkAdmin,
    adminFoodItemControllers.deleteFoodItem,
  );

module.exports = adminFoodItemRouter;

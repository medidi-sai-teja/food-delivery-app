const express = require("express");
const customerMiddlewares = require("../../middlewares/customer/auth.customer.middleware");
const customerFoodItemControllers = require("../../controllers/customer/foodItem.customer.controller");
const jwt = require("jsonwebtoken");
const foodItemRouter = express.Router();

foodItemRouter.get(
  "/food-items",
  customerMiddlewares.verifyToken,
  customerFoodItemControllers.getAllFoodItems,
); // all or specific


foodItemRouter.get(
  "/food-items/:fid",
  customerMiddlewares.verifyToken,
  customerFoodItemControllers.getFoodItemDetails,
); 

module.exports = foodItemRouter;

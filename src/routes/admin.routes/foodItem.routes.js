const express = require("express");
const { verifyToken, checkAdmin } = require("../../middlewares/auth.middleware");
const {
  createFoodItem,
  getFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require("../../controllers/admin.controllers/foodItem.controller");
const jwt = require("jsonwebtoken");
const { FoodItem } = require("../../models/FoodItem");

const foodItemRouter = express.Router();

foodItemRouter
  .post("/food-items", checkAdmin, createFoodItem)
  .get("/food-items",checkAdmin, getFoodItem)
  .patch("/food-items/:fid", checkAdmin, updateFoodItem)
  .delete("/food-items/:fid",  checkAdmin, deleteFoodItem);

module.exports = foodItemRouter;
  
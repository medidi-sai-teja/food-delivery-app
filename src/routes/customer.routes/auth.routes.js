const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
} = require("../../controllers/admin.controllers/auth.controller");
const { verifyToken } = require("../../middlewares/auth.middleware");

const customerAuthRouter = express.Router();

customerAuthRouter
  .post("/signup", signupController)
  .post("/login", loginController)
  .post("/logout", verifyToken, logoutController);

module.exports = customerAuthRouter; 

const express = require("express");
const customerAuthControllers = require("../../controllers/customer/auth.customer.controller");
const customerMiddlewares = require("../../middlewares/customer/auth.customer.middleware");

const customerAuthRouter = express.Router();

customerAuthRouter
  .post("/signup", customerAuthControllers.signup)
  .post("/login", customerAuthControllers.login)
  .post("/logout", customerMiddlewares.verifyToken, customerAuthControllers.logout);

module.exports = customerAuthRouter; 

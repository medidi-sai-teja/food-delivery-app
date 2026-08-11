const path = require("path");
const adminUserControllers = require("../../controllers/admin/user.admin.controller");
const adminMiddlewares = require("../../middlewares/admin/auth.admin.middleware");


const express = require("express");
const userRouter = express.Router();

userRouter
  .get("/users", adminMiddlewares.checkAdmin, adminUserControllers.getUsers)
  .delete("/users", adminMiddlewares.checkAdmin, adminUserControllers.deleteUser);

module.exports = userRouter;

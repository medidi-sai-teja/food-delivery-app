const express = require("express");
const adminAuthControllers = require("../../controllers/admin/auth.admin.controller");
const adminMiddlewares = require("../../middlewares/admin/auth.admin.middleware");

const adminAuthRouter = express.Router();

adminAuthRouter
  .post("/signup", adminAuthControllers.signup)
  .post("/login", adminAuthControllers.login)
  .post("/logout", adminMiddlewares.checkAdmin, adminAuthControllers.logout)

  .get("/signup-page", (req, res) => {
    res.status(200).render("admin/signup");
  })
  .get("/login-page", (req, res) => {
    res.status(200).render("admin/login");
  });

module.exports = adminAuthRouter;

const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
} = require("../../controllers/admin.controllers/auth.controller");
const { checkAdmin } = require("../../middlewares/auth.middleware");

const adminAuthRouter = express.Router();

adminAuthRouter
  .post("/admin/signup", signupController)
  .post("/admin/login", loginController)
  .post("/admin/logout", checkAdmin, logoutController)
  .get('/signup-page', (req, res)=>{
      res.status(200).render('admin.views/auth.views/signup')
  })
  .get('/login-page', (req, res)=>{
      res.status(200).render('admin.views/auth.views/login')
  })
  

module.exports = adminAuthRouter;

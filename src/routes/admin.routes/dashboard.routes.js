const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
} = require("../../controllers/admin.controllers/auth.controller");
const { checkAdmin } = require("../../middlewares/auth.middleware");

const dashboardRouter = express.Router();

dashboardRouter
  .get("/dashboard", checkAdmin, (req,res)=>{
    res.status(200).render('admin.views/dashboard')
  });

module.exports = dashboardRouter;

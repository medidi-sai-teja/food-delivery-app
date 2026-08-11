const express = require("express");
const adminMiddlewares = require("../../middlewares/admin/auth.admin.middleware");

const adminDashboardRouter = express.Router();

adminDashboardRouter.get("/dashboard", adminMiddlewares.checkAdmin, (req, res) => {
  res.status(200).render("admin/dashboard");
});

module.exports = adminDashboardRouter;

const express = require("express")


const adminAuthRouter = require("./auth.admin.routes")
const adminDashboardRouter = require("./dashboard.admin.routes")
const adminFoodItemRouter = require("./foodItem.admin.routes")
const adminOrderRouter = require("./order.admin.routes")
const adminUserRouter = require("./user.admin.routes")


const adminRouterHub = express.Router();

adminRouterHub
    .get("/", (req, res)=>{res.status(200).render("admin/home")}) 
    .use(adminAuthRouter)
    .use(adminDashboardRouter)
    .use(adminFoodItemRouter)
    .use(adminOrderRouter) 
    .use(adminUserRouter)
    
module.exports = adminRouterHub

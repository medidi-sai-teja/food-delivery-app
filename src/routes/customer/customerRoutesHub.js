const express = require("express")
const customerAuthRouter = require("./auth.customer.routes")
const foodItemRouter = require("./foodItem.customer.routes")
const orderRouter = require("./order.customer.routes")

const customerRouterHub = express.Router();

customerRouterHub
    .use(customerAuthRouter)
    .use(foodItemRouter)
    .use(orderRouter)
    

module.exports = customerRouterHub
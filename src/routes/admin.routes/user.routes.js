const path = require("path")
// const {getUsers}  = require(path.join(__dirname, 'src', 'controllers', 'user.controller' ))
const {getUsers, deleteUser}  = require('../../controllers/admin.controllers/user.controller')
// const {verifyToken, checkAdmin} = require(path.join(__dirname, 'src', 'middlewares', 'auth.middleware' ))
const {verifyToken, checkAdmin} = require('../../middlewares/auth.middleware')

const express = require('express')
const userRouter = express.Router();


userRouter
    .get("/users", checkAdmin ,getUsers)
    .delete("/users", checkAdmin, deleteUser)

module.exports = userRouter;  
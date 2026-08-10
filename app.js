require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")

const session = require('express-session');
const hbs = require("hbs");
const adminAuthRouter = require("./src/routes/admin.routes/auth.routes")
const dashboardRouter = require("./src/routes/admin.routes/dashboard.routes")
const customerAuthRouter = require("./src/routes/customer.routes/auth.routes")
const foodItemRouter = require("./src/routes/admin.routes/foodItem.routes")
const orderRouter = require("./src/routes/admin.routes/order.routes")
const userRouter = require("./src/routes/admin.routes/user.routes")
const path = require("path");
const connectDB = require("./src/config/db.config")
const app = express();



connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}/`);
    })
})
.catch(err=>{
    console.log(err) 
})
 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    } 
}))


app.use(adminAuthRouter)
app.use(customerAuthRouter)
app.use(dashboardRouter)
app.use(foodItemRouter)
app.use(orderRouter) 
app.use(userRouter)

app.get("/", (req, res)=>{
    res.status(200).render("home")  
}) 




hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

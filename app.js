require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session');
const cookieParser = require('cookie-parser')
const hbs = require("hbs");
const path = require("path");


const adminRouterHub = require("./src/routes/admin/adminRoutesHub")
const customerRouterHub = require("./src/routes/customer/customerRoutesHub")
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
 


hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

app
    .set('view engine', 'hbs')
    .set('views', path.join(__dirname, 'src', 'views'))

    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie:{
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        }
    }))
    
    .use('/admin', adminRouterHub)
    .use('/api/v1', customerRouterHub) 

    
// Dev Branch

const express = require ('express');
const { connectDB } = require ("./db/conn.js");
const mongoose=require('mongoose');
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { loginWithGoogle } = require ("./auth/passport.js");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


dotenv.config({
    path:".env"
});

connectDB();


const port = process.env.PORT;

app.use(session({
    secret: "copy cat bishnudev",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));


loginWithGoogle(passport);

app.use(passport.initialize())
app.use(passport.session())



app.get("/api",(req,res) => {
    res.status(200).json({
        message: "Server is working :)"
    });
});

const IndexRoute = require("./routes/index");
app.use(IndexRoute);

const AuthRoute = require("./routes/auth");
app.use("/auth",AuthRoute);


const Razorpay = require('razorpay');

export const razorpayInstance = new Razorpay({
    key_id: '',
    key_secret: ''
});

app.listen(port, () => {
    console.log(`Server has listening on http://localhost:${port}/`);
});
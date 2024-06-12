import express from 'express';
import  connectDB  from './db/conn';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { loginWithGoogle } from './auth/passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  IndexRoute  from './routes/index';
import  AuthRoute  from './routes/auth';
import  OrderRoutes  from './routes/order_routes';
import  UserRoutes  from './routes/user_routes';
import Razorpay from 'razorpay';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

connectDB();

const port = process.env.PORT;

app.use(
  session({
    secret: 'copy cat bishnudev',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

loginWithGoogle(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Server is working :)',
  });
});

app.use(IndexRoute);
app.use('/auth', AuthRoute);
app.use('/api', OrderRoutes);
app.use('/api', UserRoutes);

export const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_NH7DutCORAH6gm',
  key_secret: 'ON7sNQcvMc1YaNXdBFjd4wTs',
});

app.get('/api/get-key', (req, res) => {
  res.status(201).json({
    key: 'rzp_test_NH7DutCORAH6gm',
  });
});

app.listen(port, () => {
  console.log(`Server has listening on http://localhost:${port}/`);
});

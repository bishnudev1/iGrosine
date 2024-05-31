import React, {useEffect, useState} from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './Screens/Login'
import './App.css';
import Navbar from './Components/Navbar';
import Profile from './Screens/me/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './Redux/user/user_action';
import Home from './Screens/Home';
import { ProtectedRoute } from "protected-route-react";
import Cart from './Screens/order/MyCart';
import MyOrders from './Screens/me/MyOrders';
import MyCart from './Screens/order/MyCart';
import CheckOut from './Screens/order/CheckOut';
import OrderSuccess from './Screens/order/OrderSuccess';
import Footer from './Components/Footer';
import ViewItem from './Screens/ViewItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCityStateFromCoordinates, getMyOrdersAction } from './Redux/order/order_action';
import AdminLogin from './Admin/AdminLogin';
import AdminRegister from './Admin/AdminRegister';
import AdminHome from './Admin/AdminHome';
import axios from 'axios';
// import { ProtectedRoute } from 'protected-route-react';

const App = () => {

  const {user, isAuth} = useSelector(state => state.user);

  // const [userLocation, setUserLocation] = useState(null);

  const [data, setData] = useState({});
  const dispatch = useDispatch();

  // console.log(userLocation);

  useEffect(() => {
    dispatch(getUserData());
  },[dispatch]);

  // useEffect(() => {
  //   dispatch(getMyOrdersAction());
  // },[dispatch]);

  useEffect(() => {
    setData(user);
  }, [user]);

  useEffect(() => {
    // Check if geolocation is supported
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setUserLocation({ latitude, longitude });
          // dispatch(getCityStateFromCoordinates(latitude,longitude))
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Handle errors here
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle unsupported browser scenario
    }
  }, []);
  
  useEffect(async() =>{
    try {
      dispatch(getCityStateFromCoordinates())
    } catch (error) {
        console.log(error.message);
        toast("Error getting your location...")
    }
  },[])

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/my-carts' element={<MyCart />}/>
      <Route exact path='/admin/home' element={<AdminHome />}/>
      <Route exact path='/admin/login' element={<AdminLogin />}/>
      <Route exact path='/admin/signup' element={<AdminRegister />}/>
      <Route exact path='/order-success' element={ <OrderSuccess />}/>
      <Route exact path='/checkout-order' element={  <ProtectedRoute
                      isAuthenticated={isAuth}
                      redirect="/login"
                    >
                      <CheckOut user={data}/>
                    </ProtectedRoute>}/>
      <Route exact path='/view-item' element={<ViewItem />}/>
      <Route
                  exact
                  path="/my-orders"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuth}
                      redirect="/login"
                    >
                      <MyOrders />
                    </ProtectedRoute>
                  }
                />
        <Route
                  exact
                  path="/profile"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuth}
                      redirect="/login"
                    >
                      <Profile user={data} />
                    </ProtectedRoute>
                  }
                />
        <Route
                  path="/login"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuth}
                      redirect="/profile"
                    >
                      <Login />
                    </ProtectedRoute>
                  }
                />
      </Routes>
      {/* <Footer /> */}
      <ToastContainer />
    </BrowserRouter>
  )
}

export const backendURL = "http://localhost:5000";

export default App
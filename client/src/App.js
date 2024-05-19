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
import Cart from './Screens/Cart';
import MyOrders from './Screens/me/MyOrders';

const App = () => {

  const {user, isAuth} = useSelector(state => state.user);

  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  },[dispatch]);

  useEffect(() => {
    setData(user);
  }, [user]);

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/my-carts' element={<Cart />}/>
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
    </BrowserRouter>
  )
}

export const backendURL = "http://localhost:5000";

export default App
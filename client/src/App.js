import React, {useEffect, useState} from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './Screens/Login'
import './App.css';
import Navbar from './Components/Navbar';
import Profile from './Screens/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './Redux/user/user_action';

const App = () => {

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  },[dispatch]);

  useEffect(() => {
    setData(user);
  }, [user]);


  const [data, setData] = useState({});

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path='/profile' element={<Profile user={data} />}/>
        <Route path='/' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export const backendURL = "http://localhost:5000";

export default App
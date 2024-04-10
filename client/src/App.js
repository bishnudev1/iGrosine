import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './Screens/Home'
import Login from './Screens/Login'
import Cart from './Cart'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/log' element={<Home />}/>
        <Route path='/' element={<Login />}/>
        <Route path='/your-cart' element={<Cart />}/>
      </Routes>
    </BrowserRouter>
  )
}

export const backendURL = "http://localhost:5000";

export default App
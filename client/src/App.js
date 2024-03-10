import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './Screens/Home'
import Login from './Screens/Login'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/log' element={<Home />}/>
        <Route path='/' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export const backendURL = "http://localhost:5000";

export default App
import React from 'react'
import { FaGoogle } from "react-icons/fa";


const Login = () => {


  return (
    <div className='login-container'>
        <div className='login-btn'>
        <a href='http://localhost:5000/auth/google'>Login with <FaGoogle color='white' size={"20px"}/></a>
        </div>
    </div>
  )
}

export default Login
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import Logo from '../Assets/logo.jpeg'


const Login = () => {
  return (
    <div className='login-container'>
      <div className='sub-container'>
          <img className='login-into-your-ac-img' src={Logo} alt="Logo" />
          <p className='igrosine-in-login'>iGrosine.in</p>
          <p className='welcome-back'>Welcome back...</p>
        <div className='login-btn'>
        <FaGoogle color='black' size={"20px"}/><a href='http://localhost:5000/auth/google'>Sign in with Google</a>
        </div>
      </div>
    </div>
  );
}
export default Login;

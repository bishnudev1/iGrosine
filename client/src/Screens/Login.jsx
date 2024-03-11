import React from 'react'
import axios from 'axios';
import Logo from '../Assests/Logo.png';

const Login = () => {


  return (
    <div className='login-container'>
      <div className='login-sub-container'>
        <div>
        <img src={Logo} alt='logo' height={279} width={400} />
        <h1 className='heading-line'>I-Grocine</h1>
        <div className='format'>Login to Your Account</div>
        <a className='login' href='http://localhost:5000/auth/google'>Sign In with Google</a>
        </div>
      </div>
    </div>
  )
}

export default Login
import React from 'react'
import axios from 'axios';

const Login = () => {


    const login = async() => {
        await axios.get('http://localhost:5000/auth/google',
        {
            withCredentials: true
        }
        );
    }

  return (
    <>
        <a href='http://localhost:5000/auth/google'>Sign In</a>
        <button onClick={login}>Sign In</button>
    </>
  )
}

export default Login
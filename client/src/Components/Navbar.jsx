import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const {isAuth} = useSelector(state => state.user);

  return (
    <div className='navbar-container'>
        <Link to="/" className='navbar-title'>iGrosine</Link>
        {/* <a href='/'>iGrosine</a> */}
        <div className='navbar-links'>
                {
                    isAuth ? 
                    <>
                    <Link to='/'>Home</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/my-carts'>Cart</Link>
                    <a href='http://localhost:5000/auth/logout'>Sign Out</a>
                    </>
                    :
                    <>
                    <Link to='/'>Home</Link>
                    <Link to='/my-carts'>Cart</Link>
                    <a href='http://localhost:5000/auth/google'>Login</a>
                    </>
                }
        </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCartPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {

  const {isAuth} = useSelector(state => state.user);

  return (
    <div className='navbar-container'>
      <div className='navbar-title-container'>
      <Link to="/" className='navbar-title'>iGrosine</Link>
      <p className='navbar-title-desc'>Explore your needs💧</p>
      </div>
        {/* <a href='/'>iGrosine</a> */}
        <div className='navbar-links'>
                {
                    isAuth ? 
                    <>
                    <Link to='/'><FaHome /> Home</Link>
                    <Link to='/profile'><FaUser /> Profile</Link>
                    <Link to='/my-carts'><FaCartPlus /> Cart</Link>
                    <a href='http://localhost:5000/auth/logout'><FaSignOutAlt /> Sign Out</a>
                    </>
                    :
                    <>
                    <Link to='/'><FaHome /> Home</Link>
                    <Link to='/my-carts'><FaCartPlus /> Cart</Link>
                    <a href='http://localhost:5000/auth/google'> <FaSignInAlt /> Login</a>
                    </>
                }
        </div>
    </div>
  )
}

export default Navbar
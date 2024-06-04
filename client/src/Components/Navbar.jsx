import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { FaCartPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from 'react-icons/fa';
import { loginUser,logoutUser } from '../Redux/user/user_action';

const Navbar = () => {

  const {isAuth,user} = useSelector(state => state.user);

  const {admin} = useSelector(state => state.admin);
  const { carts } = useSelector(state => state.user);

  const dispatch = useDispatch()

  console.log(admin);

  // if (Object.keys(admin).length !== 0) {
  //   return (
  //     <nav className="navbar">
  //       <div className="navbar-center">
  //         <span className="admin-text">iGrosine Admin</span>
  //       </div>
  //     </nav>
  //   );
  // }

  if (admin !== null) {
    return (
      <nav className="navbar">
        <div style={{
          position: "relative"
        }} className="navbar-center">
          <span className="admin-text">iGrosine Admin</span>
          <Link style={{
            position: "absolute",
            right: 205,
            textAlign: "right",
            paddingRight:"25px"
          }} to='/admin/home'>Home</Link>
          <Link style={{
            position: "absolute",
            right: 100,
            textAlign: "right",
            paddingRight:"25px"
          }} to='/admin/add'>Add Product</Link>
                    <Link style={{
            position: "absolute",
            right: 0,
            textAlign: "right",
            paddingRight:"25px"
          }} to='/admin/items'>All Products</Link>
        </div>
      </nav>
    );
    
  }

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
                    <Link to='/my-carts' class="cart-link">
    <FaCartPlus /> Cart
    <div class="badge">{carts.length}</div>
</Link>

                    <button className='logout-btn-nav' onClick={()=> dispatch(logoutUser())}
                    //  href='http://localhost:5000/auth/logout'
                     >
                      <FaSignOutAlt /> Logout</button>
                    </>
                    :
                    <>
                    <Link to='/'><FaHome /> Home</Link>
                    <Link to='/my-carts'><FaCartPlus /> Cart</Link>
                    <button className='login-btn-nav' onClick={()=> dispatch(loginUser())} 
                    // href='http://localhost:5000/auth/google'
                    > <FaSignInAlt /> Login</button>
                    </>
                }
        </div>
    </div>
  )
}

export default Navbar
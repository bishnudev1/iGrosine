import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Profile = ({user}) => {

  console.log("User: ", user.image);

  if(user === undefined || user === null) {
    return (
      <div className='loader-container'>
        <div id='loader'></div>
      </div>
    );
  }

    return (
        <div className='profile-container'>
          <div className='image-container'>
           {
            user.image === null
 ?  <img id='profile' src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" alt='profile' /> :  <img id='profile' src={user.image} alt='profile' />           }
          </div>
          <div className='details-container'>
          <p className='details-text'>Google Login ID: {user.googleId ?? "Loading..."}</p>
            <p className='details-text'>Name: {user.displayName ?? "Loading..."}</p>
            <p className='details-text'>Email: {user.email ?? "Loading..."}</p>
            <div className='sub-details-data'>
                <Link className='others-profile-btn' to="/my-orders">My Orders</Link>
                <div className='spacer'></div>
                <Link className='others-profile-btn' to="/my-carts">My Carts</Link>
            </div>
            
            <a id='signout-btn' href='http://localhost:5000/auth/logout'>Sign Out</a>
          </div>
        </div>
      );
}

export default Profile
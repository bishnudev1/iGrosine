import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import {FaSignOutAlt} from 'react-icons/fa';
import { FaSellcast } from 'react-icons/fa';

const Profile = ({user}) => {

  console.log("User: ", user);

  const navigate = useNavigate();

  if(user === undefined || user === null) {
    return (
      <div className='loader-container'>
        <div id='loader'></div>
      </div>
    );
  }


  const faqQuestions = [
    {
      question: "Are my data really safe here ?",
      answer: "Yes. We don't use your personal data and it's coming through your Google account.So we don't have any access into it."
    },
    {
      question: "Can I change my email or name ?",
      answer: "No. As we're not storing your personal information in our database so you can't change it but you can through your Google account."
    },
  ];

    return (
        <div className='profile-container'>
          <div className='sub-left-profile-container'>
          <div className='image-container'>
           {
            user.image === null
 ?  <img id='profile' src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" alt='profile' /> :  <img id='profile' src={user.image} alt='profile' />           }
    <div className='header-profile-details'>
      <p className='profile-hello-text'>Hello,</p>
      <p className='profile-header-name'>{user.displayName ?? "Loading.."}</p>
    </div>
    </div>
    <div className='profile-cart-details-container'>
      <button onClick={() => navigate('/my-orders')} className='profile-cart-details-container-button'>< FaCartPlus/><hr /> My Orders</button>
      <button onClick={() => navigate('/my-carts')} className='profile-cart-details-container-button'>< FaCartPlus/><hr /> My Cart</button>
      <button onClick={() => {}} className='profile-cart-details-container-button'>< FaSellcast/><hr /> Become a seller</button>
      <button onClick={() => {window.location.href = 'http://localhost:5000/auth/logout';}} className='profile-cart-details-container-button'>< FaSignOutAlt/><hr /> Logout</button>
    </div>
          </div>
          <div className='sub-right-profile-container'>
          <div className='details-container'>
            <p className='details-container-personal-information-title'>Personal Information</p>
          <p className='details-text'>ID: {user.googleId ?? "Loading..."}</p>
            <p className='details-text'>Name: {user.displayName ?? "Loading..."}</p>
            {/* <p className='details-text'>Gender: {user.displayName ?? "Loading..."}</p> */}
            <p className='details-text'>Email: {user.email ?? "Loading..."}</p>
            <p className='details-text'>Joined at: {user.createdAt ?? "Loading..."}</p>
          </div>
          <div className='faq-sub-right-profile-container'>
            <p className='faq-sub-right-profile-container-title'>FAQs</p>
            {
              faqQuestions.map((item,index) => {
                return <div key={index} className='faq-sub-right-profile-container-qa'>
                  <p className='faq-sub-right-profile-container-questions'>{item.question}</p>
                  <p className='faq-sub-right-profile-container-answers'>{item.answer}</p>
                </div>
              })
            }
          </div>
          <button className='deactive-account'>Deactive Account</button>
          </div>
        </div>
      );
}

export default Profile
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onlineOrder, emptyOrder, onlineOrderMultiple} from '../../Redux/order/order_action';
import { toast } from 'react-toastify';


const CheckOut = () => {

  const dispatch = useDispatch()

  const location = useLocation();
  const [selectedFullName, setSelectedFullName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const { id,name, price, image } = location.state || {};

  const {items} = location.state || [];

  console.log(items);

  console.log(name,price,id);

  const handleFullNameChange = (event) => {
    setSelectedFullName(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleEmailChange = (event) => {
    setSelectedEmail(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleMobileNoChange = (event) => {
    setMobileNo(event.target.value);
  };

  const handleConfirmOrder = () => {
    // Check if any field is empty
    // if (!selectedFullName || !selectedState || !selectedCity || !mobileNo) {
    //   toast('Please fill out all fields before confirming the order.');
    //   return; // Exit the function if any field is empty
    // }
  
    // Implement your logic for confirming the order here
    console.log('Order confirmed!');
    if(items === undefined){
      dispatch(
        onlineOrder(
          price,
          selectedFullName,
          name,
          image,
          selectedEmail,
          id,
          mobileNo,
          selectedCity,
          selectedState
        )
      );
    }
    else{
      dispatch(onlineOrderMultiple(selectedFullName,selectedEmail,mobileNo,selectedCity,selectedState,items, calculateTotal()))
    }
  };

  const calculateTotal = () => {
    if(items === undefined){
      return price;
    }
    else{
      return items.reduce((total, item) => total + parseFloat(item.price), 0);
    }
  }
  

  return (
    <div className='checkout-container'>
      <div className='sub-checkout-container'>
      <div className='payment-options'>
        <p className='choose-payment-option'>Choose Payment Details</p>
        <input type='radio' id='razorpay' name='payment' value='razorpay' />
        <label htmlFor='razorpay'>Online (Razorpay)</label>
        <br />
        <input type='radio' id='cod' name='payment' value='cod' />
        <label htmlFor='cod'>Cash on Delivery (COD)</label>
      </div>
      <div className='grand-total-details'>
        <p className='items-no'>Total items: {items === undefined ? "1" : items.length}</p>
        <p className='grand-total-amount'>Grand Total: ${calculateTotal()}/- only</p>
        <button className='confirm-order' onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
      </div>


      <div className='place-details'>
        <p className='enter-delivary-address'>Enter Delivery Address</p>
        <input type='text' placeholder='Full name' value={selectedFullName} onChange={handleFullNameChange} />
        <br />
        <input type='text' placeholder='State' value={selectedState} onChange={handleStateChange} />
        <br />
        <input type='text' placeholder='City' value={selectedCity} onChange={handleCityChange} />
        <br />
        <input type='text' placeholder='Email' value={selectedEmail} onChange={handleEmailChange} />
        <br />
        <input type='text' placeholder='Mobile Number' value={mobileNo} onChange={handleMobileNoChange} />
        <br />
      </div>
    </div>
  );
};

export default CheckOut;

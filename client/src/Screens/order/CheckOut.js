import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { onlineOrder, emptyOrder, onlineOrderMultiple, onlineOrderCOD, onlineOrderMultipleCOD, getCityStateFromCoordinates} from '../../Redux/order/order_action';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loading';
const { v4: uuidv4 } = require('uuid');


const CheckOut = ({user}) => {

  const { userLocation,loading } = useSelector(state => state.order);

  console.log("userLocatiom",userLocation);

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getCityStateFromCoordinates())
  // },[dispatch])

  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedFullName, setSelectedFullName] = useState(user.displayName ?? "");
  const [selectedState, setSelectedState] = useState(userLocation.regionName ?? "");
  const [selectedCity, setSelectedCity] = useState(userLocation.city ?? "");
  const [selectedEmail, setSelectedEmail] = useState(user.email ?? "");
  const [mobileNo, setMobileNo] = useState('');

  const { id,name, price, image,realPrice,off, reviews, seller,desc } = location.state || {};

  const {items} = location.state || [];

  console.log(items);

  console.log("User: ", user);

  // console.log(myLocation);

  console.log(name,price,id);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);

    console.log(selectedPayment);
  };

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

  function generateRandomId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleConfirmOrder = () => {
    // Check if any field is empty
    if (!selectedFullName || !selectedState || !selectedCity || !mobileNo) {
      toast('Please fill out all fields before confirming the order.');
      return; // Exit the function if any field is empty
    }
  
    // // Implement your logic for confirming the order here
    // console.log('Order confirmed!');


    if(selectedPayment === "razorpay"){
      console.log("COD is selected");
      if(items === undefined){
        dispatch(
          onlineOrderCOD(
            price,
            realPrice,off, reviews, seller,
            generateRandomId(10),
            selectedFullName,
            name,
            image,
            selectedEmail,
            id,
            mobileNo,
            selectedCity,
            selectedState,desc
          )
        );
      }
      else{
        dispatch(onlineOrderMultipleCOD( generateRandomId(10),selectedFullName,selectedEmail,mobileNo,selectedCity,selectedState,items, Number(calculateTotal()),realPrice,off, reviews, seller,desc))
      }
    }
    else if(selectedPayment === "cod"){
      console.log("Razorpay is selected");
      if(items === undefined){
        dispatch(
          onlineOrder(
            price,
            realPrice,off, reviews, seller,
            generateRandomId(10),
            selectedFullName,
            name,
            image,
            selectedEmail,
            id,
            mobileNo,
            selectedCity,
            selectedState,desc
          )
        );
      }
      else{
        dispatch(onlineOrderMultiple( generateRandomId(10),selectedFullName,selectedEmail,mobileNo,selectedCity,selectedState,items, calculateTotal(),realPrice,off, reviews, seller,desc))
      }
    }
    else{
      toast("Please choose a payment method...");
    }
  };

  const calculateTotal = () => {
    if(items === undefined){
      return Number(price);
    }
    else{
      return Number(items.reduce((total, item) => total + parseFloat(item.price), 0));
    }
  }
  

  return (
    <div className='checkout-container'>
      <Loader loading={loading}/>
      <div className='sub-checkout-container'>
      <div className='payment-options'>
      <p className='choose-payment-option'>Choose Payment Details</p>
      <input 
        type='radio' 
        id='razorpay' 
        name='payment' 
        value='razorpay' 
        checked={selectedPayment === 'razorpay'} 
        onChange={handlePaymentChange} 
      />
      <label htmlFor='razorpay'>Cash on Delivery (COD)</label>
      <br />
      <input 
        type='radio' 
        id='cod' 
        name='payment' 
        value='cod' 
        checked={selectedPayment === 'cod'} 
        onChange={handlePaymentChange} 
      />
      <label htmlFor='cod'>Online (Razorpay)</label>
    </div>
    <div className='grand-total-details'>
          <p className='items-no'>Total items: {items === undefined ? "1" : items.length}</p>
          <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            // alignItems:"center"
          }}>
          <p className='grand-total-amount'>Grand Total: ₹{calculateTotal()}/- only</p>
          {selectedPayment === "razorpay" && <p className='delivery-charge' style={{
            marginLeft:"5px"
          }}> + ₹99</p>}
          </div>
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

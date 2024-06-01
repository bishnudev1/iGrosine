import React from 'react'
import { FaCartPlus, FaBuyNLarge, FaCheckCircle } from 'react-icons/fa'
import {useNavigate, useLocation} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { addToCart,removeCartItem } from '../Redux/user/user_action';
import Loader from '../Components/Loading';

const ViewItem = () => {

    const { carts,loading } = useSelector(state => state.user);
   
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { id,name, price, image,realPrice,off ,desc, seller} = location.state || {};

  console.log(name, price, image); 

    const dummyReviews = [
        {
            title: "Good choice",
            desc: "But no one said this major issue on every mac. If I touch or rub the mac body while charging, I can feel some electric sensation passing through my body.. when I searched about the issue, this issue has existed for the last 10 years on all mac devices because of 2 pin chargers without ground. This issue can be resolved only with a 3 pin charger with ground. This issue should be resolved by mac providing 3 pin charger but they didn't care about this issue. We should buy a 3 pin charger additionally to avoid the electric sensation which might affect us and the product. I didn't expect this issue from the Mac after paying a lot. Please like if you found it useful so that they will fix this issue in future by providing a 3 pin charger. Thanks",
            buyerName: "Bishnudev Khutia",
            buyerDate: "22nd May, 2024"
        },
        {
            title: "Excellent Machine",
            desc: `I won't compare it with windows laptops as we all are aware of it. This is more about M1 chip. People are worried about buying M1 version because of compatibility issues.
            Don't worry, this processor is so powerful and in terms of compatibility, this is handling pretty much everything we throw on it.
            For instance if you try downloading Chrome for mac, it will give an option to choose whether you want it for intel or M1. This is just an example to show how companies are making their products so as to be compatible with M1 chip.
            Even if application in not compatible with M1, it will still run via Rosetta and you cannot see the difference if application is running natively or as an emulated application.`,
            buyerName: "Ankan Chowdhury",
            buyerDate: "17th April, 2024"
        },
    ];

  return (
    <div className='view-item-container'>
        <Loader loading={loading}/>
        <div className='sub-left-view-item-container'>
            <div className='sub-left-view-sub-item-container'>
            <img src={image ?? ""} className='sub-left-view-item-image' />
                <div className='sub-left-view-sub-item-button-container'>
                <button 
  onClick={() => {
    const itemInCart = carts.find(cartItem => cartItem.id === id);
    if (itemInCart) {
      // Item exists in cart, dispatch action to remove it
      dispatch(removeCartItem(id));
    } else {
      // Item doesn't exist in cart, dispatch action to add it
      dispatch(addToCart({ id, name, price, image }));
    }
  }} 
  className='add-to-cart-button-view-item-container'>
  <FaCartPlus/> <br/>
  {carts.some(cartItem => cartItem.id === id) ? 'REMOVE CART' : 'ADD TO CART'}
</button>
  
                {/* <button onClick={() => {navigate('/my-carts')}} className='add-to-cart-button-view-item-container'><FaCartPlus/> ADD TO CART</button> */}
            <button onClick={() => {navigate('/checkout-order',{
                state: {
                    id:id,name:name,price:price,image:image
                }
            })}} className='buy-now-button-view-item-container'><FaBuyNLarge/> BUY NOW</button>
                </div>
            </div>
        </div>
        <div className='sub-right-view-item-container'>
            <p className='sub-right-view-item-container-title'>{name ?? "Loading..."}</p>
            <p className='spacial-price'>Spacial prize</p>
            <div className='view-item-price'>
                <p className='discounted-price'>₹{price ?? ""}</p>
                <p className='real-price'>₹{realPrice ?? ""}</p>
                <p className='percent-off'>{off ?? ""}% off</p>
            </div>
            <div className='sub-right-view-item-container-product-details'>
                <div className='sub-right-view-item-container-product-details-seller'>
                    <p className='sub-right-view-item-container-seller-title'>Seller</p>
                    <p className='sub-right-view-item-container-seller-desc'>{seller ?? ""}</p>
                </div>
                <div className='sub-right-view-item-container-product-details-description'>
                    <p className='sub-right-view-item-container-seller-title'>Description</p>
                    <p className='sub-right-view-item-container-seller-desc'>
                    {desc ?? ""}
                    </p>
                </div>
            </div>
            <div className='sub-right-view-item-container-product-reviews'>
                <p className='sub-right-view-item-container-product-reviews-header'>Reviews</p>
                {
                    dummyReviews.map((item,index) => {
                        return        <div key={index} className='sub-right-view-item-container-product-reviews-sub-map'>
                        <p className='sub-right-view-item-container-product-reviews-title'>
                            {item.title}
                        </p>
                        <p className='sub-right-view-item-container-product-reviews-desc'>
                        {item.desc}
                        </p>
                        <div className='sub-right-view-item-container-product-reviews-buyers-details'>
                            <p className='sub-right-view-item-container-product-reviews-buyers-details-name'>{item.buyerName}<FaCheckCircle /></p>
                            <p className='sub-right-view-item-container-product-reviews-buyers-details-date'>{item.buyerDate}</p>
                        </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ViewItem
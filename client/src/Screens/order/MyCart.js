import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getMyCartsAction, getUserData, removeCartItem } from '../../Redux/user/user_action';
import EmptyCart from '../../Assets/empty_cart.svg'


const MyCart = () => {

  const { carts } = useSelector(state => state.user);

  console.log("Carts:", carts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyCartsAction())
  },[dispatch])

  useEffect(() => {
    dispatch(getUserData());
  },[dispatch]);


  const navigate = useNavigate();

  const placeOrderCall = () => {
    navigate('/checkout-order',{state:{items:carts}})
  }

  const removeItem = (id) => {
    console.log(id);
    dispatch(removeCartItem(id))
  }

  const items = 
  
  [
    {
      image: 'https://pixlr.com/images/index/ai-image-generator-one.webp',
      name: 'Lord Krishna Poster',
      seller: 'Blue Angels Pvt. Ltd.',
      price: '299/-'
    },
    {
      image: 'https://techcrunch.com/wp-content/uploads/2020/11/2020-11-16-074520097.jpg?w=1024',
      name: 'MacBook Pro M1',
      seller: 'Apple Pvt Ltd.',
      price: '250000/-'
    },
    {
      image: 'https://idestiny.in/wp-content/uploads/2022/09/r1594_Blue_PDP_Image_Position-1A_Avail__en-IN.jpg',
      name: 'Iphone 14',
      seller: 'Apple Pvt Ltd.',
      price: '75000/-'
    },
  ]; // Assuming this is your array of items with each item having properties like name, image, price

  // Function to render individual items
  const renderItems = () => {
    return carts.map((item, index) => (
      <div key={index} className="item">
        <img className='item-image' src={item.image} alt={item.name} />
        <div className='item-desc'>
          <h3 className='item-name'>{item.name}</h3>
          <h3 className='item-seller'>{item.seller}</h3>
          <p className='item-price'>₹{item.price}</p>
          <button onClick={() => removeItem(item.id)} className='remove-item'>Remove</button>
        </div>
      </div>
    ));
  };

  // Calculate total amount
  const calculateTotal = () => {
    return carts.reduce((total, item) => total + parseFloat(item.price), 0);
  };
  

  return (
    <div className="cart-container">
      <div className="items-container">
        {carts.length === 0 ? (
          <div className='empty-cart'>
            <img className='empty-cart-image' src={EmptyCart} alt='empty-cart' />
            <p className='your-cart-is-empty'>Your cart is empty!</p>
            <p className='add-items-to-it-now'>Add items to it now.</p>
            <button onClick={() => navigate('/')} id='shop-now'>Shop now</button>
          </div>
        ) : (
          renderItems()
        )}
      </div>
      {carts.length > 0 && (
        <div className="checkout-details">
          <h2 className='price-details'>Price Details</h2>
          <div className='checkout-desc'>
            <p className='total-items'>Total Items: {carts.length}</p>
            <p className='total-amount'>Total Amount: ₹{calculateTotal()}</p>
          </div>
          <button onClick={placeOrderCall} className='place-order'>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default MyCart;

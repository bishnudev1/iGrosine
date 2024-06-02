import React,{useEffect,useState} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Picture1 from '../Assets/picture1.jpg';
import Picture2 from '../Assets/picture2.jpg';
import Picture3 from '../Assets/picture3.jpg';
import { useNavigate } from 'react-router-dom';
import { addToCart, getMyCartsAction, removeCartItem } from '../Redux/user/user_action';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux';
import Loader from '../Components/Loading';
import { getItems } from '../Redux/order/order_action';

const Home = () => {

  const { carts } = useSelector(state => state.user);
  const { items,loading } = useSelector(state => state.order);
  const dispatch = useDispatch();

  const [allItems,setAllItems] = useState([])

  const navigate = useNavigate();

  console.log(`carts:${carts.length}`);

  useEffect(() => {
    dispatch(getMyCartsAction())
    dispatch(getItems())
  },[dispatch])

  useEffect(()=>{
    setAllItems(items);
  },[items])

  console.log("allItems",allItems);




  const viewItem = (item) => {

    // console.log(item.name);

    if(item.name !== undefined){
      navigate('/view-item',{state:{id:item._id,name: item.name, price: item.price,
        realPrice:item.realPrice,
        off:item.off,desc:item.desc, seller:item.seller,
        reviews: item.reviews,
        image: item.image}})
    }
  }

  const addToCartItem = (item) => {
    if(item.name !== undefined){
      console.log(`Item in home ${item}`);
      dispatch(addToCart({
        id:item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        seller: item.seller
      }));
    }
  }

  const removeItem = (id) => {
    console.log(id);
    dispatch(removeCartItem(id))
  }


  return (
    <div className='home-container'>
      <Loader loading={loading}/>
      <div className='carousel-container'>
        <Carousel autoPlay infiniteLoop dynamicHeight="100px">
          <img src={Picture1} alt='picture1' />
          <img src={Picture2} alt='picture2' />
          <img src={Picture3} alt='picture3' />
        </Carousel>
      </div>
      <div onClick={viewItem} className='best-of-medicines'>
        <p className='best-of-medicines-title'>Best of Medicines</p>
        <div className='sub-best-of-medicine'>
        {
          allItems.map((item,index) => {
            if (item.category === 'medicine') {
            return       <div key={index} className='best-of-medicines-card'>
            <img src={item.image} className='best-of-medicines-card-image'/>
            <p className='best-of-medicines-card-title'>{item.name}</p>
            <p className='best-of-medicines-card-price'>₹{item.price}</p>
            <div className='best-of-medicines-card-buttons'>
  
            {
  carts.some(cartItem => cartItem.id === item.id) ? (
    <button key={item.id} onClick={() => removeItem(item.id)} className='remove-cart'>Remove</button>
  ) : (
    <button key={item.id} onClick={() => addToCartItem(item)} className='add-to-cart'>Add to cart</button>
  )
            }


            <button onClick={() => viewItem(item)} className='view-item'>View item</button>
            </div>
          </div>
          }})
        }
        </div>
        <p className='show-all-medicines'>Show all</p>
      </div>
      <div className='best-of-grossery'>
      <p className='best-of-grossery-title'>Best of Grocery</p>
      <div className='sub-best-of-grossery'>
      {
          allItems.map((item,index) => {
            if (item.category === 'grocery') {
            return         <div key={index} className='best-of-grossery-card'>
            <img src={item.image} className='best-of-grossery-card-image'/>
              <p className='best-of-grossery-card-title'>{item.name}</p>
              <p className='best-of-grossery-card-price'>₹{item.price}</p>
              <div className='best-of-medicines-card-buttons'>
              {
  carts.some(cartItem => cartItem.id === item.id) ? (
    <button key={item.id} onClick={() => removeItem(item.id)} className='remove-cart'>Remove</button>
  ) : (
    <button key={item.id} onClick={() => addToCartItem(item)} className='add-to-cart'>Add to cart</button>
  )
}<button onClick={() => viewItem(item)} className='view-item'>View item</button>
            </div>
            </div>
          }})
        }
      </div>
      <p className='show-all-grossery'>Show all</p>
      </div>
    </div>
  )
}

export default Home
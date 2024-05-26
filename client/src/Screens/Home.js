import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Picture1 from '../Assets/picture1.jpg';
import Picture2 from '../Assets/picture2.jpg';
import Picture3 from '../Assets/picture3.png';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../Redux/user/user_action';
import {useDispatch} from 'react-redux'

const Home = () => {

  const dummyMedicineData = [
    {
      image: 'https://www.orionlifes.com/wp-content/uploads/2021/01/Nimerion-P-tab-5.jpeg',
      name: 'Paracetamal',
      seller: "Apollo Farmacy",
      price: '29'
    },
    {
      image: 'https://www.netmeds.com/images/product-v1/600x600/854095/ventryl_ls_expectorant_60ml_2_0.jpg',
      name: 'Ventryl',
      seller: "Apollo Farmacy",
      price: '118'
    },
    {
      image: 'https://images.apollo247.in/pub/media/catalog/product/t/a/tak0011_2.jpg?tr=w-167.5,q-100,f-webp,c-at_max',
      name: 'Tecfresh Gel',
      seller: "Apollo Farmacy",
      price: '269'
    },
    {
      image: 'https://m.media-amazon.com/images/I/81368u7ZbcL.jpg',
      name: 'Manforce Super Thin',
      seller: "Apollo Farmacy",
      price: '29'
    },
    {
      image: 'https://www.pharmavends.com/userspics/2d6860a07cc0d2a10ab0883e35371317.jpg',
      name: 'Belovit-A',
      seller: "Apollo Farmacy",
      price: '78'
    },
    {
      image: 'https://www.jiomart.com/images/product/original/491961048/vicks-inhaler-with-keychain-0-5-ml-pack-of-2-product-images-o491961048-p590514111-0-202203170358.jpg?im=Resize=(420,420)',
      name: 'Vicks Inhaler (2 Pcs)',
      seller: "Apollo Farmacy",
      price: '79'
    },
  ];

  const dummyGroceryData = [
    {
      image: 'https://www.jiomart.com/images/product/original/rvduzcik7k/goodness-grocery-premium-flax-seeds-for-hair-growth-seeds-for-eating-alsi-seeds-250gm-product-images-orvduzcik7k-p595135258-0-202211080844.jpg?im=Resize=(420,420)',
      name: 'Flex Seeds',
      price: '228'
    },
    {
      image: 'https://m.media-amazon.com/images/I/61XnH090DJS._AC_UF1000,1000_QL80_.jpg',
      name: 'Soya Chunk',
      price: '65'
    },
    {
      image: 'https://cdn.zeptonow.com/production///tr:w-600,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/0106346e-a7ef-497b-a9ff-18da5cb8d602.jpeg',
      name: 'Ladies Finger',
      price: '75'
    },
    {
      image: 'https://5.imimg.com/data5/QX/FQ/MY-68428614/lemon.jpeg',
      name: 'Green Lemon',
      price: '8'
    },
    {
      image: 'https://5.imimg.com/data5/AN/TT/YF/SELLER-107321628/gram-flour.jpg',
      name: 'Gram Flour',
      price: '239'
    },
    {
      image: 'https://cdn.britannica.com/08/194708-050-56FF816A/potatoes.jpg',
      name: 'Fresh Potato',
      price: '48'
    },
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const viewItem = (item) => {

    console.log(item.name);

    if(item.name !== undefined){
      navigate('/view-item',{state:{name: item.name, price: item.price, image: item.image}})
    }
  }

  const addToCartItem = (item) => {
    if(item.name !== undefined){
      console.log(`Item in home ${item.name}`);
      dispatch(addToCart({
        name: item.name,
        price: item.price,
        image: item.image,
        seller: item.seller
      }));
    }
  }

  return (
    <div className='home-container'>
      <div className='carousel-container'>
        <Carousel
        autoPlay
        // autoFocus
        infiniteLoop
        >
          <img src={Picture1} alt='picture1'/>
          <img src={Picture2} alt='picture2'/>
          <img src={Picture3} alt='picture3'/>
        </Carousel>
      </div>
      <div onClick={viewItem} className='best-of-medicines'>
        <p className='best-of-medicines-title'>Best of Medicines</p>
        <div className='sub-best-of-medicine'>
        {
          dummyMedicineData.map((item,index) => {
            return       <div key={index} className='best-of-medicines-card'>
            <img src={item.image} className='best-of-medicines-card-image'/>
            <p className='best-of-medicines-card-title'>{item.name}</p>
            <p className='best-of-medicines-card-price'>₹{item.price}</p>
            <div className='best-of-medicines-card-buttons'>
            <button onClick={() => {addToCartItem(item)}} className='add-to-cart'>Add to cart</button>
            <button onClick={() => viewItem(item)} className='view-item'>View item</button>
            </div>
          </div>
          })
        }
        </div>
        <p className='show-all-medicines'>Show all</p>
      </div>
      <div className='best-of-grossery'>
      <p className='best-of-grossery-title'>Best of Grocery</p>
      <div className='sub-best-of-grossery'>
      {
          dummyGroceryData.map((item,index) => {
            return         <div key={index} className='best-of-grossery-card'>
            <img src={item.image} className='best-of-grossery-card-image'/>
              <p className='best-of-grossery-card-title'>{item.name}</p>
              <p className='best-of-grossery-card-price'>₹{item.price}</p>
              <div className='best-of-medicines-card-buttons'>
            <button onClick={() => {navigate('/my-carts')}} className='add-to-cart'>Add to cart</button>
            <button onClick={() => viewItem(item)} className='view-item'>View item</button>
            </div>
            </div>
          })
        }
      </div>
      <p className='show-all-grossery'>Show all</p>
      </div>
    </div>
  )
}

export default Home
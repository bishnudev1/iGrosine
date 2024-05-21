import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Picture1 from '../Assets/picture1.jpg';
import Picture2 from '../Assets/picture2.jpg';
import Picture3 from '../Assets/picture3.png';

const Home = () => {

  const dummyMedicineData = [
    {
      image: 'https://www.orionlifes.com/wp-content/uploads/2021/01/Nimerion-P-tab-5.jpeg',
      name: 'Paracetamal',
      price: '29'
    },
    {
      image: 'https://www.netmeds.com/images/product-v1/600x600/854095/ventryl_ls_expectorant_60ml_2_0.jpg',
      name: 'Ventryl',
      price: '118'
    },
    {
      image: 'https://images.apollo247.in/pub/media/catalog/product/t/a/tak0011_2.jpg?tr=w-167.5,q-100,f-webp,c-at_max',
      name: 'Tecfresh Gel',
      price: '269'
    },
    {
      image: 'https://m.media-amazon.com/images/I/81368u7ZbcL.jpg',
      name: 'Manforce Super Thin',
      price: '29'
    },
    {
      image: 'https://www.pharmavends.com/userspics/2d6860a07cc0d2a10ab0883e35371317.jpg',
      name: 'Belovit-A',
      price: '78'
    },
    {
      image: 'https://www.jiomart.com/images/product/original/491961048/vicks-inhaler-with-keychain-0-5-ml-pack-of-2-product-images-o491961048-p590514111-0-202203170358.jpg?im=Resize=(420,420)',
      name: 'Vicks Inhaler (2 Pcs)',
      price: '79'
    },
  ];

  const dummyGroceryData = [
    {
      image: 'https://d1s24u4ln0wd0i.cloudfront.net/mk-p/websiteV2/newly-launched-generic-medicines-1711545109.webp',
      name: 'Paracetamal',
      price: '29'
    },
    {
      image: 'https://d1s24u4ln0wd0i.cloudfront.net/mk-p/websiteV2/newly-launched-generic-medicines-1711545109.webp',
      name: 'Paracetamal',
      price: '29'
    },
    {
      image: 'https://d1s24u4ln0wd0i.cloudfront.net/mk-p/websiteV2/newly-launched-generic-medicines-1711545109.webp',
      name: 'Paracetamal',
      price: '29'
    },
    {
      image: 'https://d1s24u4ln0wd0i.cloudfront.net/mk-p/websiteV2/newly-launched-generic-medicines-1711545109.webp',
      name: 'Paracetamal',
      price: '29'
    },
  ];

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
      <div className='best-of-medicines'>
        <p className='best-of-medicines-title'>Best of Medicines</p>
        <div className='sub-best-of-medicine'>
        {
          dummyMedicineData.map((item,index) => {
            return       <div key={index} className='best-of-medicines-card'>
            <img src={item.image} className='best-of-medicines-card-image'/>
            <p className='best-of-medicines-card-title'>{item.name}</p>
            <p className='best-of-medicines-card-price'>₹{item.price}</p>
            <button className='add-to-cart'>Add to cart</button>
          </div>
          })
        }
        </div>
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
              <button className='add-to-cart'>Add to cart</button>
            </div>
          })
        }
      </div>
      </div>
    </div>
  )
}

export default Home
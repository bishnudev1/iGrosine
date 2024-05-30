import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Picture1 from '../Assets/picture1.jpg';
import Picture2 from '../Assets/picture2.jpg';
import Picture3 from '../Assets/picture3.png';
import { useNavigate } from 'react-router-dom';
import { addToCart, getMyCartsAction, removeCartItem } from '../Redux/user/user_action';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux';

const Home = () => {

  const { carts } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(`carts:${carts.length}`);

  React.  useEffect(() => {
    dispatch(getMyCartsAction())
  },[dispatch])

  const dummyMedicineData = [
    {
      id:1,
      image: 'https://www.orionlifes.com/wp-content/uploads/2021/01/Nimerion-P-tab-5.jpeg',
      name: 'Paracetamal Dolo 500',
      seller: "Apollo Farmacy",
      price: '14',
      realPrice: '30',
      off:'52',
      desc:`
      Paracetamol Dolo 500 is a staple in many medicine cabinets, renowned for its effective relief from pain and fever. Each 500mg tablet packs a punch against various discomforts, thanks to its active ingredient, Paracetamol. This powerhouse compound swiftly alleviates mild to moderate pain, including headaches, muscle aches, and dental pain. Additionally, it efficiently reduces fever, aiding in temperature regulation during bouts of illness. Its easy-to-swallow form ensures hassle-free administration, catering to individuals of all ages. Paracetamol Dolo 500 embodies reliability and efficacy, providing swift relief to help individuals resume their daily activities comfortably and confidently.`
    },
    { id:2,
      image: 'https://www.netmeds.com/images/product-v1/600x600/854095/ventryl_ls_expectorant_60ml_2_0.jpg',
      name: 'Ventryl Expectorant 60ml',
      seller: "Apollo Farmacy",
      realPrice:'66',
      price: '46',
      off:'33',
      desc:'Ventryl Expectorant, a trusted 60ml solution, offers relief from stubborn coughs and congestion. Crafted with precision, it combines active ingredients like Guaifenesin and Terbutaline to target respiratory discomfort. Guaifenesin works by thinning mucus, easing its expulsion, while Terbutaline facilitates smoother breathing by dilating airways. This potent blend ensures efficient clearing of chest congestion, allowing for easier breathing and soothing cough reflexes. Its compact size makes it convenient for on-the-go relief, fitting seamlessly into daily routines. Whether tackling seasonal colds or persistent coughs, Ventryl Expectorant stands as a reliable ally in restoring respiratory comfort, promoting wellness with every dose.'
    },
    {
      id:3,
      image: 'https://images.apollo247.in/pub/media/catalog/product/t/a/tak0011_2.jpg?tr=w-167.5,q-100,f-webp,c-at_max',
      name: 'Takfresh Eye Drop (0.5%w/v) (10ml)',
      seller: "Apollo Farmacy",
      realPrice:'110',
      price: '105',
      off:'5',
      desc:`Takfresh Eye Drops, boasting a concentration of 0.5% w/v in a 10ml bottle, offer rejuvenating relief for tired or irritated eyes. Formulated meticulously, this solution provides a cooling and soothing sensation upon application. Its active ingredient, often Tetrahydrozoline, swiftly alleviates redness and itchiness, combating symptoms of allergies or eye strain. Takfresh stands as a reliable companion in combating environmental irritants or long hours of screen exposure. The convenient dropper bottle ensures precise dosage, promising quick and targeted relief with every use. Embrace clearer, revitalized vision and bid adieu to discomfort with Takfresh Eye Drops, your go-to solution for ocular refreshment.`
    },
    {
      id:4,
      image: 'https://m.media-amazon.com/images/I/81368u7ZbcL.jpg',
      name: 'Manforce Super Thin',
      seller: "Apollo Farmacy",
      price: '29',
      realPrice:'30',
      off:'3.3',
      desc:`Manforce Super Thin condoms redefine intimacy with their ultra-thin design, enhancing pleasure while ensuring protection. Crafted with precision, these condoms offer a barely-there sensation, allowing couples to indulge in uninhibited intimacy. The thin yet durable latex material provides reliable protection against unwanted pregnancies and sexually transmitted infections, ensuring peace of mind during intimate moments. Manforce Super Thin condoms prioritize both pleasure and safety, encouraging couples to explore new dimensions of closeness without compromising on security. Elevate your intimate experiences with Manforce Super Thin condoms, where sensuality meets safety for unforgettable moments of passion.`
    },
    {
      id:5,
      image: 'https://www.pharmavends.com/userspics/2d6860a07cc0d2a10ab0883e35371317.jpg',
      name: 'BELOVIT-A Tablets',
      seller: "Apollo Farmacy",
      realPrice:'70',
      price: '36',
      off:'48',
      desc:`Belovit-A tablets are a comprehensive multivitamin supplement tailored to support overall health and well-being. With a blend of essential vitamins and minerals, including Vitamin A, Vitamin D, Vitamin E, Vitamin C, and B-complex vitamins, these tablets offer a holistic approach to nutritional support. They are meticulously formulated to address potential deficiencies, boost immune function, promote healthy skin, support bone health, and enhance energy levels. Whether for everyday health maintenance or to address specific nutritional needs, Belovit-A tablets serve as a convenient and effective way to ensure your body receives the vital nutrients it requires for optimal functioning.`
    },
    {
      id:6,
      image: 'https://www.jiomart.com/images/product/original/491961048/vicks-inhaler-with-keychain-0-5-ml-pack-of-2-product-images-o491961048-p590514111-0-202203170358.jpg?im=Resize=(420,420)',
      name: 'Vicks Inhaler (2 Pcs)',
      seller: "Apollo Farmacy",
      price: '79',
      realPrice:'90',
      off:'11',
      desc:`
      Vicks Inhaler, a trusted companion for nasal congestion relief, comes in a convenient pack of 2 pieces, offering on-the-go respiratory support. This compact inhaler delivers refreshing menthol vapors directly to the nasal passages, providing instant relief from stuffiness and congestion caused by colds, allergies, or sinusitis. Its portable design fits seamlessly into pockets or purses, making it ideal for travel or daily use. Simply inhale deeply to experience the soothing sensation that clears your airways, allowing you to breathe easier and feel revitalized. With Vicks Inhaler, congestion doesn't stand a chance, ensuring comfort and relief whenever and wherever you need it.`
    },    {
      id:6,
      image: 'https://www.jiomart.com/images/product/original/491961048/vicks-inhaler-with-keychain-0-5-ml-pack-of-2-product-images-o491961048-p590514111-0-202203170358.jpg?im=Resize=(420,420)',
      name: 'Vicks Inhaler (2 Pcs)',
      seller: "Apollo Farmacy",
      price: '79',
      realPrice:'90',
      off:'11',
      desc:`
      Vicks Inhaler, a trusted companion for nasal congestion relief, comes in a convenient pack of 2 pieces, offering on-the-go respiratory support. This compact inhaler delivers refreshing menthol vapors directly to the nasal passages, providing instant relief from stuffiness and congestion caused by colds, allergies, or sinusitis. Its portable design fits seamlessly into pockets or purses, making it ideal for travel or daily use. Simply inhale deeply to experience the soothing sensation that clears your airways, allowing you to breathe easier and feel revitalized. With Vicks Inhaler, congestion doesn't stand a chance, ensuring comfort and relief whenever and wherever you need it.`
    },    {
      id:5,
      image: 'https://www.pharmavends.com/userspics/2d6860a07cc0d2a10ab0883e35371317.jpg',
      name: 'BELOVIT-A Tablets',
      seller: "Apollo Farmacy",
      realPrice:'70',
      price: '36',
      off:'48',
      desc:`Belovit-A tablets are a comprehensive multivitamin supplement tailored to support overall health and well-being. With a blend of essential vitamins and minerals, including Vitamin A, Vitamin D, Vitamin E, Vitamin C, and B-complex vitamins, these tablets offer a holistic approach to nutritional support. They are meticulously formulated to address potential deficiencies, boost immune function, promote healthy skin, support bone health, and enhance energy levels. Whether for everyday health maintenance or to address specific nutritional needs, Belovit-A tablets serve as a convenient and effective way to ensure your body receives the vital nutrients it requires for optimal functioning.`
    },
    {
      id:6,
      image: 'https://www.jiomart.com/images/product/original/491961048/vicks-inhaler-with-keychain-0-5-ml-pack-of-2-product-images-o491961048-p590514111-0-202203170358.jpg?im=Resize=(420,420)',
      name: 'Vicks Inhaler (2 Pcs)',
      seller: "Apollo Farmacy",
      price: '79',
      realPrice:'90',
      off:'11',
      desc:`
      Vicks Inhaler, a trusted companion for nasal congestion relief, comes in a convenient pack of 2 pieces, offering on-the-go respiratory support. This compact inhaler delivers refreshing menthol vapors directly to the nasal passages, providing instant relief from stuffiness and congestion caused by colds, allergies, or sinusitis. Its portable design fits seamlessly into pockets or purses, making it ideal for travel or daily use. Simply inhale deeply to experience the soothing sensation that clears your airways, allowing you to breathe easier and feel revitalized. With Vicks Inhaler, congestion doesn't stand a chance, ensuring comfort and relief whenever and wherever you need it.`
    },    {
      id:6,
      image: 'https://www.jiomart.com/images/product/original/491961048/vicks-inhaler-with-keychain-0-5-ml-pack-of-2-product-images-o491961048-p590514111-0-202203170358.jpg?im=Resize=(420,420)',
      name: 'Vicks Inhaler (2 Pcs)',
      seller: "Apollo Farmacy",
      price: '79',
      realPrice:'90',
      off:'11',
      desc:`
      Vicks Inhaler, a trusted companion for nasal congestion relief, comes in a convenient pack of 2 pieces, offering on-the-go respiratory support. This compact inhaler delivers refreshing menthol vapors directly to the nasal passages, providing instant relief from stuffiness and congestion caused by colds, allergies, or sinusitis. Its portable design fits seamlessly into pockets or purses, making it ideal for travel or daily use. Simply inhale deeply to experience the soothing sensation that clears your airways, allowing you to breathe easier and feel revitalized. With Vicks Inhaler, congestion doesn't stand a chance, ensuring comfort and relief whenever and wherever you need it.`
    },
  ];

  const dummyGroceryData = [
    { id:7,
      image: 'https://www.jiomart.com/images/product/original/rvduzcik7k/goodness-grocery-premium-flax-seeds-for-hair-growth-seeds-for-eating-alsi-seeds-250gm-product-images-orvduzcik7k-p595135258-0-202211080844.jpg?im=Resize=(420,420)',
      name: 'Flex Seeds',
      price: '228',
      realPrice:'250',
      seller:'Tata Groups',
      off:'8.8',
      desc:`
      Flax seeds, also known as linseeds, are tiny nutritional powerhouses packed with omega-3 fatty acids, fiber, and essential nutrients. These small seeds offer a plethora of health benefits, including supporting heart health by lowering cholesterol and blood pressure levels. Rich in lignans, flax seeds possess antioxidant properties that may reduce the risk of cancer and promote hormonal balance. Additionally, their high fiber content aids in digestion and promotes regular bowel movements. Flax seeds can be easily incorporated into various dishes, such as smoothies, salads, yogurt, or baked goods, adding a nutty flavor and a nutritional boost to your diet.`
    },
    { id:8,
      image: 'https://m.media-amazon.com/images/I/61XnH090DJS._AC_UF1000,1000_QL80_.jpg',
      name: 'Soya Chunk',
      price: '65',
      realPrice:'75',
      seller:'Tata Groups',
      off:'18',
      desc:`Soya chunks, also known as textured vegetable protein (TVP), are a versatile and nutritious meat substitute made from defatted soy flour. These chunks are packed with protein, making them an excellent option for vegetarians and vegans looking to meet their protein needs. Additionally, they contain essential amino acids, iron, calcium, and other nutrients vital for overall health.

      Soya chunks are incredibly versatile and can be used in a variety of dishes such as curries, stir-fries, soups, stews, and salads. They readily absorb flavors, making them a great addition to dishes with rich sauces or spices. Soya chunks are also easy to prepare, requiring just a brief soak in hot water or broth before use. Whether you're looking to add protein to your diet or exploring plant-based alternatives, soya chunks offer a convenient and nutritious option.`
    },
    { id:9,
      image: 'https://cdn.zeptonow.com/production///tr:w-600,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/0106346e-a7ef-497b-a9ff-18da5cb8d602.jpeg',
      name: 'Ladies Finger',
      price: '75',
      realPrice:'87',
      seller:'Tata Groups',
      off:'13.4',
      desc:`Ladies' finger, also known as okra or bhindi, is a nutritious and versatile vegetable popular in many cuisines worldwide. These slender green pods are low in calories and rich in dietary fiber, vitamins C and K, folate, and antioxidants.

      Okra can be prepared in various ways, including stir-frying, stewing, sautéing, and even pickling. Its mild flavor and unique texture lend themselves well to a wide range of dishes, from curries and soups to salads and side dishes.
      
      Beyond its culinary uses, okra is valued for its potential health benefits. Its high fiber content aids digestion and promotes gut health, while its antioxidants help fight inflammation and oxidative stress in the body.
      
      Whether you enjoy it as a crunchy snack, a flavorful addition to a curry, or a pickled condiment, ladies' finger is a nutritious and delicious vegetable that adds both flavor and health benefits to your meals.`
    },
    { id:10,
      image: 'https://5.imimg.com/data5/QX/FQ/MY-68428614/lemon.jpeg',
      name: 'Green Lemon',
      price: '8',
      realPrice:'9',
      seller:'Tata Groups',
      off:'11',
      desc:`Green lemon, commonly known as lime, is a citrus fruit prized for its tart flavor and versatility in culinary and non-culinary applications. This small, round fruit with bright green skin is rich in vitamin C, antioxidants, and other beneficial nutrients.

      Limes are widely used in cooking to add a tangy zest to dishes such as salads, marinades, dressings, and beverages like lemonade or cocktails. The juice and zest of green lemons can brighten up flavors and balance the richness of savory or sweet dishes.
      
      In addition to its culinary uses, lime juice is a popular ingredient in natural cleaning products and beauty treatments due to its antibacterial properties and refreshing scent.
      
      Green lemons are also valued for their health benefits, including immune system support, digestion aid, and skin health promotion.
      
      Whether you're squeezing lime juice over your favorite dish, mixing up a refreshing beverage, or using it in your skincare routine, green lemon adds a burst of flavor and freshness to a wide array of experiences.`
    },
    { id:11,
      image: 'https://5.imimg.com/data5/AN/TT/YF/SELLER-107321628/gram-flour.jpg',
      name: 'Gram Flour',
      price: '239',
      realPrice:'250',
      seller:'Tata Groups',
      off:'4.4',
      desc:`Ram flour is a term I'm not familiar with. It's possible that you might be referring to "gram flour," which is also known as "besan" in some regions. Gram flour is a gluten-free flour made from ground chickpeas (also known as garbanzo beans). It's commonly used in various cuisines, particularly in Indian, Pakistani, and Bangladeshi cooking.

      Gram flour has a slightly nutty flavor and is versatile in cooking. It's used to make a variety of dishes such as pakoras (deep-fried fritters), bhajis, flatbreads, and sweets like ladoos. It's also used as a thickener in soups, stews, and sauces. Additionally, gram flour is valued for its high protein content and is often used as a protein source in vegetarian and vegan diets.
      
      If "ram flour" refers to something else, please provide more context, and I'd be happy to assist further.`
    },
    { id:12,
      image: 'https://cdn.britannica.com/08/194708-050-56FF816A/potatoes.jpg',
      name: 'Fresh Potato',
      price: '48',
      realPrice:'52',
      seller:'Tata Groups',
      off:'6',
      desc:`Fresh potatoes are a staple vegetable cherished for their versatility and nutritional value. These underground tubers come in various shapes, sizes, and colors, including white, yellow, and red varieties. Potatoes are rich in vitamins (such as vitamin C and vitamin B6), minerals (like potassium), and dietary fiber.

      Potatoes can be prepared in countless ways, including boiling, baking, frying, roasting, and mashing. They serve as a base for many dishes worldwide, from comforting mashed potatoes and crispy fries to hearty stews and casseroles.
      
      Beyond their culinary uses, potatoes have been associated with several health benefits. They provide essential nutrients, support digestive health due to their fiber content, and offer a good source of energy for the body.
      
      Whether enjoyed as a side dish, incorporated into main courses, or used as the star ingredient in a variety of recipes, fresh potatoes are a versatile and nutritious addition to any diet.`
    },
  ];



  const viewItem = (item) => {

    // console.log(item.name);

    if(item.name !== undefined){
      navigate('/view-item',{state:{id:item.id,name: item.name, price: item.price,
        realPrice:item.realPrice,
        off:item.off,desc:item.desc, seller:item.seller,
        image: item.image}})
    }
  }

  const addToCartItem = (item) => {
    if(item.name !== undefined){
      console.log(`Item in home ${item.name}`);
      dispatch(addToCart({
        id:item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        seller: item.seller,
      }));
    }
  }

  const removeItem = (id) => {
    console.log(id);
    dispatch(removeCartItem(id))
  }

  return (
    <div className='home-container'>
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
          dummyMedicineData.map((item,index) => {
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
              {
  carts.some(cartItem => cartItem.id === item.id) ? (
    <button key={item.id} onClick={() => removeItem(item.id)} className='remove-cart'>Remove</button>
  ) : (
    <button key={item.id} onClick={() => addToCartItem(item)} className='add-to-cart'>Add to cart</button>
  )
}<button onClick={() => viewItem(item)} className='view-item'>View item</button>
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
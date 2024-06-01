import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancelledOrder, getMyOrdersAction } from '../../Redux/order/order_action';

import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loading';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px', // Adjust width as needed
    padding: '20px',
  },
};


const MyOrders = () => {


  const {myOrders,loading} = useSelector(state => state.order);
  
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  const [orderId,setOrderId] = useState('');

  useEffect(() => {
    dispatch(getMyOrdersAction());
  },[dispatch]);

  useEffect(() => {
    // Set data only when myOrders are available
    if (myOrders && myOrders.length > 0) {
      setData(myOrders);
    }
  }, [myOrders]);


  console.log(`myOrders`,data);

  const handleSearch = () => {
    // Convert searchTerm to lowercase for case-insensitive search
    const searchTermLowerCase = searchTerm.toLowerCase();
  
    // Filter the myOrders array based on the searchTerm
    const filteredOrders = myOrders.filter(order => {
      // Convert relevant fields to lowercase for case-insensitive search
      const itemNameLowerCase = order.itemName.toLowerCase();
      const cityLowerCase = order.city.toLowerCase();
      const stateLowerCase = order.state.toLowerCase();
  
      // Check if any field contains the searchTerm
      return (
        itemNameLowerCase.includes(searchTermLowerCase) ||
        cityLowerCase.includes(searchTermLowerCase) ||
        stateLowerCase.includes(searchTermLowerCase)
      );
    });
  
    // Update the data state with the filtered orders
    setData(filteredOrders);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  const cancelOrder = (id, orderedDate) => {
    const orderDate = new Date(orderedDate); // Parse the orderedDate string into a Date object
  
    console.log(orderDate);
    console.log(Date.now());
  
    if (Date.now() - orderDate < 24 * 60 * 60 * 1000) {
      console.log(orderDate);
      setOrderId(id);
      console.log(orderId);
      openModal();
    } else {
      toast("You can't cancel your order as it's more than 24 hours.");
    }
  }
  

  const handleCancelConfirm =(id) =>{
    console.log(id);
    if(orderId !== ""){
      dispatch(cancelledOrder(orderId));
      closeModal()
    }
    window.location.reload()
  }
  

  const dummyMyOrders = [
    {
      name: "Mivi Play 5 W Portable Bluetooth Speaker",
      image: "https://m.media-amazon.com/images/I/61UJnlIHF9S.jpg",
      color: "Color: Black",
      price: "649",
      deliveredDate: "Delivered on 20th May, 2024",
      status: "Your item has been delivered."
    },
    {
      name: "Mivi Play 5 W Portable Bluetooth Speaker",
      image: "https://m.media-amazon.com/images/I/61UJnlIHF9S.jpg",
      color: "Color: Black",
      price: "649",
      deliveredDate: "Delivered on 20th May, 2024",
      status: "Your item has been delivered."
    },
    {
      name: "Mivi Play 5 W Portable Bluetooth Speaker",
      image: "https://m.media-amazon.com/images/I/61UJnlIHF9S.jpg",
      color: "Color: Black",
      price: "649",
      deliveredDate: "Delivered on 20th May, 2024",
      status: "Your item has been delivered."
    },
  ];

  
  
  return (
    <div className='my-orders-container'>
      <Loader loading={loading}/>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Cancel Confirmation Modal"
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src="https://atlas-content-cdn.pixelsquid.com/stock-images/red-exclamation-mark-symbols-mr72XN2-600.jpg" alt="Exclamation" style={{ width: '30px', marginRight: '10px' }} />
        <h2>Are you sure you want to cancel this order?</h2>
      </div>
      <p>You'll receive a refund of only 50% of your money within 7 days.</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={closeModal} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>No</button>
        <button onClick={() => handleCancelConfirm()}style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: 'red', color: 'white' }}>Yes, Cancel</button>
      </div>
    </Modal>
    {data.length === 0 ? (
      <div className='empty-orders-container'>
        <p>No orders found.</p>
      </div>
    ) : (
      <>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        {data.map((item, index) => {
          return <div key={index} className='order-card'>
          <div className='left-order-card'>
            <img className='left-order-card-img' src={item.itemImage} alt="" />
            <div className='left-order-card-desc'>
              <p className='left-order-card-header'>{item.itemName}</p>
              <p className='left-order-card-color'>Will be at: {item.city}, {item.state}</p>
            </div>
          </div>
          <div className='middle-order-card'>
            <p className='middle-order-card-price'>₹{item.itemPrice}</p>
          </div>
          <div className='right-order-card'>
            <p className='right-order-card-delivary-date'>{
              item.isDelivered ? "Hurrah 🥳" : item.deliveredDate
            }</p>
            <p className='right-order-card-delivary-done'>{item.status}</p>
     {
      item.deliveredDate === "You'll get 50% money within 5-7 days." || item.deliveredDate === "Thanks for choosing us."  ? null :        <div className='right-order-card-cancel-review'>
      <button className='right-order-card-review-btn'>⭐ Review</button>
      {
        item.isDelivered ? null :  <button onClick={() => {cancelOrder(item._id, item.orderedDate, item.orderedType)}} className='right-order-card-cancel-btn'>❌ Cancel</button>
      }
    </div>
     }
          </div>
        </div>
        })}
      </>
    )}
  </div>
  
  )
}

export default MyOrders
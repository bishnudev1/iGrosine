import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { changeOrderStatus, getAdminData, getAllOrders } from '../Redux/admin/admin_action';

const AdminHome = () => {

    const {allOrders} = useSelector(state => state.admin);

    const dispatch = useDispatch()


    const [selectedStatus, setSelectedStatus] = useState('');

    const handleStatusChange = (e, buyerId, item) => {
      const newStatus = e.target.value;
      // Here you would typically update the status of the order with orderId to newStatus
      console.log(`Order ${buyerId} status changed to ${newStatus}`);
      setSelectedStatus(newStatus);
    
      // Dispatch the action directly without checking if selectedStatus is empty
      dispatch(changeOrderStatus(buyerId, newStatus, item));
    };
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        dispatch(getAdminData())
        dispatch(getAllOrders())
    },[dispatch]);

    useEffect(() => {
        setOrders(allOrders)
    },[allOrders]);

    console.log(orders);

    if(orders.length === 0){
        return      <div className="no-orders-message">
        No orders yet
      </div>
    
    }

    return (
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Item Image</th>
              <th>Item Price</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Ordered Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{item.itemId}</td>
                <td>{item.itemName}</td>
                <td><img src={item.itemImage} alt={item.itemName} className="item-image" /></td>
                <td>{item.itemPrice}</td>
                <td>{item.buyerName}</td>
                <td>{item.buyerEmail}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>
                  <select value={selectedStatus} onChange={(e) => handleStatusChange(e, item.buyerId,item)}>
                    <option value="">Select Status</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out of Delivery">Out of Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>{item.orderedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    
    


export default AdminHome
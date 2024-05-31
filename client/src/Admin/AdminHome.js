import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOrderStatus, getAdminData, getAllOrders } from '../Redux/admin/admin_action';

const AdminHome = () => {
  const { allOrders } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const [orderStatus, setOrderStatus] = useState({});

  const handleStatusChange = (e, buyerId, item) => {
    const newStatus = e.target.value;
    console.log(`Order ${buyerId} status changed to ${newStatus}`);
    setOrderStatus(prevStatus => ({
      ...prevStatus,
      [buyerId]: newStatus,
    }));
    dispatch(changeOrderStatus(buyerId, newStatus, item));
  };

  useEffect(() => {
    dispatch(getAdminData());
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    // Initialize order statuses when allOrders change
    const initialStatus = {};
    allOrders.forEach(order => {
      initialStatus[order.buyerId] = ''; // You can set initial status here if needed
    });
    setOrderStatus(initialStatus);
  }, [allOrders]);

  if (allOrders.length === 0) {
    return (
      <div className="no-orders-message">
        No orders yet
      </div>
    );
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
        {allOrders.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{item.itemId}</td>
            <td>{item.itemName}</td>
            <td><img src={item.itemImage} alt={item.itemName} className="item-image" /></td>
            <td>{item.itemPrice}</td>
            <td>{item.buyerName}</td>
            <td>{item.buyerEmail}</td>
            <td>{item.city}</td>
            <td>{item.state}</td>
            {
              item.isDelivered ? <td>Delivered</td> :             <td>
              <select value={orderStatus[item.buyerId] || ''} onChange={(e) => handleStatusChange(e, item.buyerId, item)}>
                <option value="">Select Status</option>
                <option value="Shipped">Shipped</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </td>
            }
            <td>{item.orderedDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminHome;

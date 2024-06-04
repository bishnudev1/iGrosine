import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { addToCart, getMyCartsAction, removeCartItem } from '../Redux/user/user_action';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux';
// import Loader from '../Components/Loading';
import { deleteItem, getItems } from '../Redux/order/order_action';

const AdminItems = () => {

    const { items,loading } = useSelector(state => state.order);
    const dispatch = useDispatch();
  
    const [allItems,setAllItems] = useState([])
  
    const navigate = useNavigate();


    const handleDelete = async(id) => {
        console.log("handleDelete",id);
        dispatch(deleteItem(id));
    }

  
    useEffect(() => {
      dispatch(getItems());
    },[dispatch])
  
    useEffect(()=>{
      setAllItems(items);
    },[items])
  
    console.log("allItems",allItems);

  return (
    <div className='admin-item-container'>
    <table>
<thead>
  <tr>
    <th>Item ID</th>
    <th>Item Name</th>
    <th>Item Category</th>
    <th>Item Image</th>
    <th>Item Price</th>
    <th>Delete Product</th>
  </tr>
</thead>
<tbody>
  {allItems.map((item, index) => (
    <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td><img src={item.image} alt={item.name} className="item-image" /></td>
      <td>{item.price}</td>
      <td>
        <button style={{
            paddingBlock:"6px",
            paddingInline:"15px",
            backgroundColor:"lightGreen",
            color:"white",
            borderRadius:"10px",
            border:"none"
        }} onClick={() => handleDelete(item._id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>
  )
}

export default AdminItems
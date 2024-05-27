import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrdersAction } from '../../Redux/order/order_action';


const MyOrders = () => {


  const {myOrders} = useSelector(state => state.order);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getMyOrdersAction());
  },[dispatch]);

  // const [data, setData] = useState({});

  console.log(`myOrders`,myOrders);
  
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders
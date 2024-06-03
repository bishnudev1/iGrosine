import React from 'react'
import { useSearchParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const orderReferenceNumber = searchQuery.get('reference');

    const navigate = useNavigate();
  return (
    <div className='order-success'>
<div className='order-success-sub'>
<img className='order-success-image' src='https://cdn.dribbble.com/users/2572904/screenshots/17169793/media/ed801ffe0fbeb4b95ca246ba1f5ea398.gif' alt='order-success-image'/>
        <h2 className='your-order-has-been-placed'>Your order has been placed</h2>
        <h3 className='reference-no'>Reference No: ${orderReferenceNumber}</h3>
        <button onClick={() => navigate('/')} className='shop-more'>Shop more</button>
</div>
    </div>
  )
}

export default OrderSuccess
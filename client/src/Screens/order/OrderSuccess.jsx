import React from 'react'
import { useSearchParams, Link } from 'react-router-dom';

const OrderSuccess = () => {
    const searchQuery = useSearchParams()[0];
    const orderReferenceNumber = searchQuery.get('reference');
  return (
    <div>
        <h2>Your order has been placed</h2>
        <h3>Reference No: ${orderReferenceNumber}</h3>
    </div>
  )
}

export default OrderSuccess
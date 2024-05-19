import React from 'react';

const Cart = () => {

  const items = [
    {
      image: 'https://pixlr.com/images/index/ai-image-generator-one.webp',
      name: 'Hare Krishna Poster',
      price: '299/-'
    },
    {
      image: 'https://pixlr.com/images/index/ai-image-generator-one.webp',
      name: 'Hare Krishna Poster',
      price: '299/-'
    }
  ]; // Assuming this is your array of items with each item having properties like name, image, price

  // Function to render individual items
  const renderItems = () => {
    return items.map((item, index) => (
      <div key={index} className="item">
        <img src={item.image} alt={item.name} />
        <div>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
        </div>
      </div>
    ));
  };

  // Calculate total amount
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container">
      <div className="items-container">
        {items.length === 0 ? (
          <div>
            <h2>Your cart is empty!</h2>
            <h3>Add items to it now.</h3>
            <button>Shop now</button>
          </div>
        ) : (
          renderItems()
        )}
      </div>
      {items.length > 0 && (
        <div className="price-details">
          <h2>Price Details</h2>
          <div>
            <p>Total Items: {items.length}</p>
            <p>Total Amount: ${calculateTotal()}</p>
          </div>
          <button>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

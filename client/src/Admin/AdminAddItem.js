import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItemAdmin } from '../Redux/order/order_action';
import { getAdminData } from '../Redux/admin/admin_action';

const AdminAddItem = () => {

    const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  const [realPrice, setRealPrice] = useState('');
  const [off, setOff] = useState('');
  const [desc, setDesc] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(getAdminData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the server
    const formData = {
        id,
      category,
      image,
      name,
      seller,
      price,
      realPrice,
      off,
      desc
    };
    console.log(formData);
    dispatch(addItemAdmin(
        id,
        category,
        image,
        name,
        seller,
        price,
        realPrice,
        off,
        desc
    ))
    // Reset form fields
    setCategory('');
    setId('');
    setImage('');
    setName('');
    setSeller('');
    setPrice('');
    setRealPrice('');
    setOff('');
    setDesc('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Item</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.category}>
          <label style={styles.label}>
            Category:
            <input type="radio" name="category" value="medicine" checked={category === 'medicine'} onChange={handleCategoryChange} style={styles.radio} /> Medicine
            <input type="radio" name="category" value="grocery" checked={category === 'grocery'} onChange={handleCategoryChange} style={styles.radio} /> Grocery
          </label>
        </div>
        <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Seller" value={seller} onChange={(e) => setSeller(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Real Price" value={realPrice} onChange={(e) => setRealPrice(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Off" value={off} onChange={(e) => setOff(e.target.value)} style={styles.input} />
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} style={styles.textarea} />
        <button type="submit" style={styles.button}>Add Item</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  category: {
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
  },
  radio: {
    marginLeft: '5px',
    marginRight: '10px',
  },
  input: {
    width: '300px',
    height: '30px',
    marginBottom: '20px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '300px',
    height: '100px',
    marginBottom: '20px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    width: '150px',
    height: '40px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AdminAddItem;

import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { registerAdmin } from '../Redux/admin/admin_action';

const AdminRegister = () => {
  // State variables for email and password inputs

  const dispatch = useDispatch();


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if(fullName !== "" || email !== "" || password !== ""){
    dispatch(registerAdmin(fullName,email,password));
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminRegister
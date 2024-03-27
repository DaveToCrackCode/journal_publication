import React, { useState } from 'react';
import './Login.css';
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
    
        const { data } = await toast.promise(
          axios.post('http://localhost:5000/api/v1/author/login', formData),
          {
            pending: "Login in progress...",
            success: "User Login successfully",
            error: "Unable to Login user",
            loading: "Login in progress...",
          }
        );
        //console.log(data.data.accessToken);
        localStorage.setItem("token", data.data.accessToken);
        navigate('/');
        // Handle success, redirect, or show a success message
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle errors, show an error message, etc.
      }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

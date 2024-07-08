import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setMessage('Login successful!');
      setMessageType('success');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username); // Save username to display in the welcome page
      setTimeout(() => {
        navigate('/welcome');
      }, 2000); // Delay the navigation to show the success message
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Login failed');
      setMessageType('error');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className={messageType === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
      <div className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;

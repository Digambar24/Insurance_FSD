import React, { useState } from 'react';
import axios from 'axios';
import '../styles/main.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        newPassword,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="form-container">
      <div className="logo-container">
        <a href="/">
          <img
            src="https://static.insurancedekho.com/pwa/img/id-main-logo.svg"
            alt="InsuranceDekho Logo"
            className="logo"
          />
        </a>
      </div>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;

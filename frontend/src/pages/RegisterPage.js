import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: 'user',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={formData.phone}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <select
          name="userType"
          onChange={handleChange}
          value={formData.userType}
        >
          <option value="user">User</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegisterPage;

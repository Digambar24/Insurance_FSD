import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, registerSuccess, loginFailure } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/main.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    role: 'user',  // fixed as 'user'
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { name, email, phone, dob, password } = formData;

    if (!name || !email || !phone || !dob || !password) {
      return 'Please fill in all fields.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email address.';

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) return 'Phone number must be 10 digits.';

    if (password.length < 6) return 'Password must be at least 6 characters.';

    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate >= today) return 'Date of Birth must be in the past.';

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();

    if (errorMsg) {
      setValidationError(errorMsg);
      return;
    }

    setValidationError('');
    dispatch(loginStart());

    try {
      const trimmedData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        // role is always 'user'
      };

      const { data } = await axios.post('http://localhost:5000/api/auth/register', trimmedData);
      dispatch(registerSuccess(data));
      navigate('/profile');
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || err.message || 'Registration failed'));
    }
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
          maxLength={10}
          onChange={handleChange}
          value={formData.phone}
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          onChange={handleChange}
          value={formData.dob}
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
        {/* No role select - role fixed to 'user' */}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {validationError && <p className="error">{validationError}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegisterPage;

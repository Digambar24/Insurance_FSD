import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../redux/slices/authSlice';
import '../styles/main.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      redirectAfterLogin(user.role);
    }
  }, [user]);

  const redirectAfterLogin = (role) => {
    const redirectData = localStorage.getItem('redirectAfterLogin');

    if (redirectData) {
      const parsedRedirect = JSON.parse(redirectData);
      localStorage.removeItem('redirectAfterLogin');
      navigate('/buy', { state: parsedRedirect });
    } else {
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/profile');
      }
    }
  };

  const handleLogin = async () => {
    dispatch(loginStart());

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      dispatch(loginSuccess({ user: data, token: data.token }));
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
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
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
      <p style={{ color: error ? 'red' : 'green' }}>
        {error ? error : user ? 'Login successful!' : ''}
      </p>
      <a href="/forgot-password">Forgot Password?</a><br />
      <a href="/register">Don't have an account? Register</a>
    </div>
  );
};

export default LoginPage;

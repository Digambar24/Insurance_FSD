import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.role) {
      redirectAfterLogin(user.role);
    }
  }, [user]);

  const redirectAfterLogin = (role) => {
    const redirectData = localStorage.getItem('redirectAfterLogin');

    if (redirectData) {
      const parsedRedirect = JSON.parse(redirectData);
      localStorage.removeItem('redirectAfterLogin');

      if (parsedRedirect.pathname === '/buy') {
        navigate('/buy', { state: parsedRedirect.state || {} });
      } else {
        navigate(parsedRedirect.pathname);
      }
    } else {
      if (role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (role === 'user') {
        navigate('/profile', { replace: true });
      } else {
        console.warn('Unknown role:', role);
        navigate('/', { replace: true });
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

      if (!data.token || !data.role) {
        throw new Error('Invalid response from server');
      }

      // ✅ Save user info to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));

      dispatch(loginSuccess({ user: data, token: data.token }));
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Login failed';
      dispatch(loginFailure(message));
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ color: error ? 'red' : user ? 'green' : 'black' }}>
        {error ? error : user ? 'Login successful!' : ''}
      </p>

      <a href="/forgot-password">Forgot Password?</a>
      <br />
      <a href="/register">Don't have an account? Register</a>
    </div>
  );
};

export default LoginPage;

import axios from 'axios';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
} from '../slices/authSlice';

// Login action (synchronous)
export const loginUser = (credentials) => {
  return (dispatch) => {
    dispatch(loginStart());

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    axios
      .post('http://localhost:5000/api/auth/login', credentials, config)
      .then((response) => {
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          loginFailure(error.response?.data?.message || error.message)
        );
      });
  };
};

// Register action (synchronous)
export const registerUser = (userData) => {
  return (dispatch) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    axios
      .post('http://localhost:5000/api/auth/register', userData, config)
      .then((response) => {
        dispatch(registerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          loginFailure(error.response?.data?.message || error.message)
        );
      });
  };
};

// Logout action (synchronous)
export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  };
};

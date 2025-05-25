import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const justLoggedOut = useRef(false);

  useEffect(() => {
    if (!user && !justLoggedOut.current) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    justLoggedOut.current = true;
    toast.success('Logged out successfully!');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=random&color=fff&rounded=true&size=100`}
          alt="Profile"
          style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '1rem' }}
        />
        <h2>{user.name}</h2>
        <p style={{ color: 'gray' }}>{user.email}</p>
        <button
          onClick={() => navigate('/my-insurances')}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#1a73e8',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          My Insurances
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1.5rem',
            backgroundColor: '#d93025',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

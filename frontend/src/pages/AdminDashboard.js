import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data', error);
        setLoading(false);
      }
    };

    fetchSummary();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading dashboard...</p>;

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="admin-dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{summary.totalUsers}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Policies</h3>
          <p>{summary.totalPolicies}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Companies</h3>
          <p>{summary.totalCompanies}</p>
        </div>
        {/* Total Revenue card removed from display */}
      </div>

      <div className="admin-section">
        <h2>Manage Insurance Companies</h2>
        <a href="/admin/companies">Go to Companies</a>
      </div>

      <div className="admin-section">
        <h2>Manage Users</h2>
        <a href="/admin/users">Go to Users</a>
      </div>

      <div className="admin-section">
        <h2>Manage Purchases</h2>
        <a href="/admin/purchases">Go to Purchases</a>
      </div>
    </div>
  );
};

export default AdminDashboard;

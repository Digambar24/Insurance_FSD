import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const AdminPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Center alignment style
  const centerStyle = { textAlign: 'center', verticalAlign: 'middle' };

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || user?.role !== 'admin') {
        setError('Access denied. Admins only.');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/purchases', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPurchases(data);
        setError('');
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch purchases');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [navigate]);

  if (loading) return <p className="center-text">Loading purchases...</p>;
  if (error) return <p className="center-text error">{error}</p>;

  return (
    <div className="admin-purchases-container">
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>All Policy Purchases</h1>
      {purchases.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No purchases found.</p>
      ) : (
        <table className="purchases-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={centerStyle}>#</th>
              <th style={centerStyle}>User</th>
              <th style={centerStyle}>Insurance</th>
              <th style={centerStyle}>Company</th>
              <th style={centerStyle}>Amount</th>
              <th style={centerStyle}>Payment Status</th>
              <th style={centerStyle}>Purchase Date</th>
              <th style={centerStyle}>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => {
              const paymentStatus = purchase.paymentStatus?.toLowerCase();
              const isPaid = paymentStatus === 'paid' || paymentStatus === 'success';

              const purchaseDate = new Date(purchase.createdAt);
              let expiryDate = null;
              if (isPaid) {
                expiryDate = new Date(purchaseDate);
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
              }

              return (
                <tr key={purchase._id}>
                  <td style={centerStyle}>{index + 1}</td>
                  <td style={centerStyle}>{purchase.user?.name || 'N/A'}</td>
                  <td style={centerStyle}>
                    {purchase.insurance?.insuranceType || purchase.insurance?.name || 'N/A'}
                  </td>
                  <td style={centerStyle}>{purchase.insurance?.companyName || 'N/A'}</td>
                  <td style={centerStyle}>{isPaid ? `₹${purchase.amount}` : 'Payment Pending'}</td>
                  <td style={centerStyle}>{isPaid ? 'Paid' : 'Pending'}</td>
                  <td style={centerStyle}>{purchaseDate.toLocaleDateString()}</td>
                  <td style={centerStyle}>{expiryDate ? expiryDate.toLocaleDateString() : 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPurchases;

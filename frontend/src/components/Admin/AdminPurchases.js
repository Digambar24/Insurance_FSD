import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const AdminPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      if (!token) {
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
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch purchases');
        console.error(err);
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
      <h1>All Policy Purchases</h1>
      {purchases.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <table className="purchases-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Insurance</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={purchase._id}>
                <td>{index + 1}</td>
                <td>{purchase.user?.name || 'N/A'}</td>
                <td>{purchase.insurance?.insuranceType || purchase.insurance?.name || 'N/A'}</td>
                <td>{purchase.insurance?.companyName || 'N/A'}</td>
                <td>
                  {purchase.paymentStatus === 'paid' ? (
                    `₹${purchase.amount}`
                  ) : (
                    'Payment Pending'
                  )}
                </td>
                <td>{purchase.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</td>
                <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPurchases;

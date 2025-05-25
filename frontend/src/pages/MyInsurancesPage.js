import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const MyInsurances = () => {
  const [purchases, setPurchases] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Style object for center alignment
  const centerStyle = { textAlign: 'center', verticalAlign: 'middle' };

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user || !user.token) {
        setError('User is not logged in');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get('http://localhost:5000/api/purchases/my', config);
        setPurchases(data);

        // Check for expiry within next 7 days
        const today = new Date();
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(today.getDate() + 7);

        const expiring = data.filter((purchase) => {
          if (purchase.paymentStatus.toLowerCase() !== 'success') return false;
          const purchaseDate = new Date(purchase.createdAt);
          const expiryDate = new Date(purchaseDate);
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
          return expiryDate >= today && expiryDate <= sevenDaysFromNow;
        });

        setExpiringSoon(expiring);
      } catch (error) {
        setError('Failed to load purchases');
        console.error('Failed to load purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>My Insurance Purchases</h2>

      {/* Optional notification about expiring insurances */}
      {expiringSoon.length > 0 && (
        <div className="alert alert-warning text-center">
          You have {expiringSoon.length} insurance{expiringSoon.length > 1 ? 's' : ''} expiring soon!
        </div>
      )}

      {purchases.length === 0 ? (
        <p style={{ textAlign: 'center' }}>You haven't purchased any insurances yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={centerStyle}>Sr No</th>
              <th style={centerStyle}>Insurance Name</th>
              <th style={centerStyle}>Amount</th>
              <th style={centerStyle}>Payment Status</th>
              <th style={centerStyle}>Purchase Date</th>
              <th style={centerStyle}>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => {
              const purchaseDate = new Date(purchase.createdAt);
              let expiryDate = null;
              if (purchase.paymentStatus.toLowerCase() === 'success') {
                expiryDate = new Date(purchaseDate);
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
              }

              return (
                <tr key={purchase._id}>
                  <td style={centerStyle}>{index + 1}</td>
                  <td style={centerStyle}>{purchase.insurance?.name || 'N/A'}</td>
                  <td style={centerStyle}>₹{purchase.amount}</td>
                  <td style={centerStyle}>{purchase.paymentStatus}</td>
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

export default MyInsurances;

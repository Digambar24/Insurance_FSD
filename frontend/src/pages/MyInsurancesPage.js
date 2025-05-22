import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const MyInsurances = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth); // <-- get user from Redux
  const navigate = useNavigate();

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
      <h2>My Insurance Purchases</h2>
      {purchases.length === 0 ? (
        <p>You haven't purchased any insurances yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Insurance Name</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={purchase._id}>
                <td>{index + 1}</td>
                <td>{purchase.insurance?.name || 'N/A'}</td>
                <td>₹{purchase.amount}</td>
                <td>{purchase.paymentStatus}</td>
                <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyInsurances;

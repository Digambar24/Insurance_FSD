import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/main.css';

const BuyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [insuranceData, setInsuranceData] = useState(null);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  };

  useEffect(() => {
    const storedUser = getUserInfo();
    if (!storedUser || !storedUser.token) {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    if (location.state) {
      setInsuranceData(location.state);
      setLoading(false);
    } else {
      setErrorMessage('No insurance data provided.');
      setLoading(false);
    }
  }, [location, navigate]);

  const handlePayment = async () => {
    if (!insuranceData?.insuranceId || !insuranceData.price) {
      setErrorMessage('Insurance data is incomplete.');
      return;
    }

    try {
      setIsPaying(true);
      const token = getUserInfo()?.token;

      if (!token) {
        setErrorMessage('You must be logged in to buy insurance.');
        setIsPaying(false);
        return;
      }

      // Step 1: Create Purchase
      const purchaseRes = await axios.post(
        'http://localhost:5000/api/purchases',
        {
          insuranceId: insuranceData.insuranceId,
          insuranceType: insuranceData.insuranceType,
          formData: insuranceData.formData,
          amount: Number(insuranceData.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const purchaseId = purchaseRes.data._id;

      // Step 2: Create Razorpay Order
      const orderRes = await axios.get(
        `http://localhost:5000/api/purchases/${purchaseId}/initiate-payment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { razorpayOrderId, amount } = orderRes.data;

      // Step 2.5: Get Razorpay Key from backend
      const keyRes = await axios.get('http://localhost:5000/api/config/razorpay-key', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const razorpayKey = keyRes.data.key;

      if (!razorpayKey) {
        setErrorMessage('Razorpay key not received from server.');
        setIsPaying(false);
        return;
      }

      // Step 3: Razorpay Modal
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: 'INR',
        name: insuranceData.insuranceName,
        description: 'Insurance Purchase',
        image: insuranceData.logoUrl || '/default-logo.png',
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              'http://localhost:5000/api/purchases/verify-payment',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                purchaseId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyRes.data.message === 'Payment verified successfully') {
              alert('Payment successful!');
              navigate('/my-insurances');
            } else {
              setErrorMessage('Payment verification failed.');
            }
          } catch (err) {
            console.error('Verification error:', err.response?.data || err);
            setErrorMessage('Payment verification failed.');
          } finally {
            setIsPaying(false);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.contact,
        },
        theme: {
          color: '#F37254',
        },
        modal: {
          ondismiss: () => {
            setIsPaying(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment initiation error:', err.response?.data || err);
      setErrorMessage(err.response?.data?.message || 'Something went wrong during payment.');
      setIsPaying(false);
    }
  };

  if (loading) return <p>Loading insurance details...</p>;

  return (
    <div className="buy-page-container">
      <h1>Insurance Summary</h1>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {insuranceData ? (
        <div className="insurance-summary">
          <img
            src={insuranceData.logoUrl || '/default-logo.png'}
            alt={insuranceData.insuranceName}
            style={{ width: '150px', marginBottom: '20px' }}
          />
          <p><strong>Name:</strong> {insuranceData.insuranceName}</p>
          <p><strong>Type:</strong> {insuranceData.insuranceType}</p>
          <p><strong>Selected Plan:</strong> {insuranceData.selectedPlanId}</p>
          <p><strong>Price:</strong> ₹{insuranceData.price}</p>

          <h3>Form Details:</h3>
          <ul>
            {insuranceData.formData &&
              Object.entries(insuranceData.formData).map(([key, value]) => (
                <li key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </li>
              ))}
          </ul>

          <button className="pay-btn" onClick={handlePayment} disabled={isPaying}>
            {isPaying ? 'Processing...' : 'Pay & Buy Now'}
          </button>
        </div>
      ) : (
        <p>No insurance data available.</p>
      )}

      <footer className="footer">
        <p>© 2025 InsuranceDekho. All rights reserved @ITD.</p>
      </footer>
    </div>
  );
};

export default BuyPage;

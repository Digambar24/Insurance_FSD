import React from 'react';
import { useNavigate } from 'react-router-dom';

const InsurancePlans = ({ insuranceType, plans }) => {
  const navigate = useNavigate();

  const handleBuyClick = (plan) => {
    // Check if user is logged in by checking localStorage "user"
    const user = JSON.parse(localStorage.getItem('user'));

    // Prepare redirect data with necessary info for Buy page
    const redirectData = {
      insuranceId: plan._id,
      companyName: plan.name,
      price: plan.price,
      logo: plan.logo,
      insuranceType: insuranceType,   // pass insuranceType from props or plan
      selectedPlanId: plan.planId,    // add if you have planId in plan
    };

    console.log('handleBuyClick redirectData:', redirectData);

    if (!user) {
      // Save redirect info so LoginPage can redirect here after login
      localStorage.setItem('redirectAfterLogin', JSON.stringify(redirectData));
      console.log('User not logged in. Redirecting to login page.');
      navigate('/login');
    } else {
      // User logged in, navigate directly to Buy page
      navigate('/buy', { state: redirectData });
    }
  };

  return (
    <>
      {plans.map((plan, index) => (
        <div key={index} className="plan-card">
          <div className="plan-header">
            <img src={plan.logo} alt={plan.name} className="plan-logo" />
            <h3>{plan.name}</h3>
          </div>
          <div className="plan-features">
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="plan-footer">
            <div className="plan-price">
              Starting From <span>{plan.price}</span>
            </div>
            <button 
              className="check-price-btn" 
              onClick={() => handleBuyClick(plan)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default InsurancePlans;

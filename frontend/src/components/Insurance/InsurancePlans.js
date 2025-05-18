// components/Insurance/InsurancePlans.js
import React from 'react';
import '../../styles/main.css'; // Make sure this includes the updated styles

const InsurancePlans = ({ insuranceType, plans }) => {
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
            <button className="check-price-btn">Check Prices</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default InsurancePlans;

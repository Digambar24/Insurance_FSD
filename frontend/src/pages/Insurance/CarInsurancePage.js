// pages/Insurance/CarInsurancePage.js
import React from 'react';
import InsurancePlansSection from '../../components/Insurance/InsurancePlansSection';

const CarInsurancePage = () => {
  return (
    <div>
      <h1>Car Insurance</h1>
      <InsurancePlansSection insuranceType="car" />
    </div>
  );
};

export default CarInsurancePage;

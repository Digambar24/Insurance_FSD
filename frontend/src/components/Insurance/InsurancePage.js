// components/Insurance/InsurancePage.js
import React from 'react';
import InsuranceForm from './InsuranceForm';
import InsurancePlansSection from './InsurancePlansSection';

const InsurancePage = () => {
  return (
    <div className="insurance-page">
      <InsuranceForm />
      <InsurancePlansSection />
    </div>
  );
};

export default InsurancePage;

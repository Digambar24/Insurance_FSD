// src/components/Insurance/InsuranceForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const InsuranceForm = ({ onSubmit }) => {
  const { insuranceType = '' } = useParams();
  const navigate = useNavigate();

  const insuranceTypes = {
    car: ['registrationNumber', 'brand', 'modelType', 'fuelType', 'registrationYear', 'city'],
    bike: ['registrationNumber', 'brand', 'modelType', 'fuelType', 'registrationYear', 'city'],
    health: ['city', 'year', 'age'],
    term: ['age', 'sumAssured', 'policyTerm'],
    investment: ['investmentAmount', 'investmentHorizon'],
    business: ['businessType', 'annualTurnover', 'city'],
    familyhealth: ['familyMembers', 'city', 'ageOfEldest'],
    guaranteedreturn: ['investmentAmount', 'policyDuration'],
  };

  const normalizedType = insuranceType?.trim().toLowerCase();
  const fields = insuranceTypes[normalizedType];
  const [formData, setFormData] = useState({});
  const [relatedInsurances, setRelatedInsurances] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const isLoggedIn = !!localStorage.getItem('userInfo');

  useEffect(() => {
    if (fields) {
      const initial = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
      setFormData(initial);
    }
  }, [insuranceType]);

  useEffect(() => {
    if (normalizedType) {
      const capitalizedType = normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1);
      fetch(`http://localhost:5000/api/insurance-companies?type=${capitalizedType}`)
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((data) => {
          setRelatedInsurances(data);
          setError(null);
        })
        .catch((err) => {
          console.error('Error fetching related insurances:', err);
          setError('Failed to fetch related insurances.');
        });
    }
  }, [normalizedType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let errors = {};
    if ((normalizedType === 'car' || normalizedType === 'bike') && formData.registrationNumber) {
      const reg = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
      if (!reg.test(formData.registrationNumber)) {
        errors.registrationNumber = 'Invalid Registration Number format. Example: MH12AB1234';
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (onSubmit) onSubmit(formData);
  };

  const calculatePremium = (companyName) => {
    const type = formData.type || insuranceType || '';
    const normalizedType = type.toLowerCase();
    const companyFactor = companyName ? companyName.charCodeAt(0) % 10 : 1;

    if (normalizedType === 'car' || normalizedType === 'bike') {
      const basePrice = 3000;
      const year = parseInt(formData.registrationYear) || 0;
      const modelTypeFactor = formData.modelType === 'Luxury' ? 1.5 : 1;
      const fuelTypeFactor = formData.fuelType === 'Diesel' ? 1.2 : 1;
      const ageFactor = year > new Date().getFullYear() - 5 ? 1 : 1.3;
      const premium = basePrice * modelTypeFactor * fuelTypeFactor * ageFactor * (1 + companyFactor * 0.01);
      return premium.toFixed(0);
    } else if (normalizedType === 'health') {
      const basePrice = 5000;
      const age = parseInt(formData.age) || 30;
      const cityFactor = formData.city === 'Mumbai' ? 1.2 : 1;
      const premium = basePrice * (age / 30) * cityFactor * (1 + companyFactor * 0.01);
      return premium.toFixed(0);
    } else if (normalizedType === 'term') {
      const age = parseInt(formData.age) || 30;
      const sumAssured = parseInt(formData.sumAssured) || 100000;
      const policyTerm = parseInt(formData.policyTerm) || 10;
      const premium = (sumAssured / 1000) * (age / 50) * (policyTerm / 10) * (1 + companyFactor * 0.01);
      return premium.toFixed(0);
    } else if (normalizedType === 'investment') {
      const investmentAmount = parseInt(formData.investmentAmount) || 10000;
      const investmentHorizon = parseInt(formData.investmentHorizon) || 5;
      const premium = investmentAmount * 0.05 * investmentHorizon * (1 + companyFactor * 0.01);
      return premium.toFixed(0);
    } else if (normalizedType === 'familyhealth') {
      const members = parseInt(formData.familyMembers) || 2;
      const age = parseInt(formData.ageOfEldest) || 30;
      const cityFactor = formData.city === 'Mumbai' ? 1.2 : 1;
      const premium = 3000 + members * 1000 + (age - 30) * 100 * cityFactor * (1 + companyFactor * 0.01);
      return premium.toFixed(0);
    } else if (normalizedType === 'guaranteedreturn') {
      const investmentAmount = parseInt(formData.investmentAmount) || 50000;
      const policyDuration = parseInt(formData.policyDuration) || 5;
      const premium = investmentAmount * 0.04 * policyDuration * (1 + companyFactor * 0.01);
      return premium.toFixed(0);
    } else {
      return 'N/A';
    }
  };

  const handleBuy = (company) => {
    const token = localStorage.getItem('userInfo');
    const price = calculatePremium(company.name);
    const selectedData = {
      insuranceId: company._id,
      insuranceName: company.name,
      logoUrl: company.logoUrl,
      insuranceType: normalizedType,
      price,
      selectedPlanId: 'basic-plan',
      formData,
    };
    if (!token) {
      localStorage.setItem('redirectAfterLogin', JSON.stringify(selectedData));
      navigate('/login');
    } else {
      navigate('/buy', { state: selectedData });
    }
  };

  const renderField = (field) => {
    const options = {
      brand: ['Maruti', 'Hyundai', 'Tata', 'Honda', 'Mahindra'],
      city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune'],
      year: Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i),
      registrationYear: Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i),
      modelType: ['Standard', 'Premium', 'Sports', 'Luxury'],
      fuelType: ['Petrol', 'Diesel', 'Electric'],
      businessType: ['Retail', 'Manufacturing', 'IT', 'Services', 'Others'],
      policyTerm: ['5', '10', '15', '20', '25'],
      investmentHorizon: ['1', '3', '5', '10'],
      policyDuration: ['1', '3', '5', '7', '10'],
      familyMembers: ['1', '2', '3', '4', '5'],
      age: Array.from({ length: 60 }, (_, i) => i + 18),
      ageOfEldest: Array.from({ length: 60 }, (_, i) => i + 18),
    };

    if (options[field]) {
      return (
        <select id={field} name={field} value={formData[field]} onChange={handleChange} required>
          <option value="">Select {field.replace(/([A-Z])/g, ' $1')}</option>
          {options[field].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={field}
        type="text"
        name={field}
        value={formData[field]}
        onChange={handleChange}
        placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
        required
      />
    );
  };

  const displayedInsurances = showAll ? relatedInsurances : relatedInsurances.slice(0, 5);

  const imageSrc =
    normalizedType === 'car'
      ? '/assets/car.jpeg'
      : normalizedType === 'bike'
      ? '/assets/bike.jpg'
      : normalizedType === 'health'
      ? '/assets/health.jpeg'
      : normalizedType === 'term'
      ? '/assets/Term.jpeg'
      : normalizedType === 'business'
      ? '/assets/business.jpeg'
      : normalizedType === 'investment'
      ? '/assets/investment1.jpeg'
      : normalizedType === 'familyhealth'
      ? '/assets/family-health.jpeg'
      : normalizedType === 'guaranteedreturn'
      ? '/assets/guaranteed-return.jpeg'
      : '/assets/insurance-default.jpg';

  return (
    <div className="insurance-form-wrapper">

      <div className="form-image-layout">
        <form onSubmit={handleSubmit} className="insurance-form">
          <h2>
            Get {normalizedType ? normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1) : 'Insurance'} Quote
          </h2>
          {fields?.length > 0 ? (
            fields.map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</label>
                {renderField(field)}
                {formErrors[field] && <span className="error">{formErrors[field]}</span>}
              </div>
            ))
          ) : (
            <p>Please select a valid insurance type.</p>
          )}
          <button type="submit" className="btn-primary">
            Get Quote
          </button>
        </form>

        <div className="insurance-image-container">
          <img src={imageSrc} alt={`${normalizedType} insurance`} />
        </div>
      </div>

      <div className="related-insurances-section">
        <h3>Related Insurance Companies</h3>
        {error && <p className="error">{error}</p>}
        {relatedInsurances.length === 0 && !error && <p>No related insurance companies found.</p>}
        {relatedInsurances.length > 0 && (
          <>
            <table className="insurance-table">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Buy</th>
                </tr>
              </thead>
              <tbody>
                {displayedInsurances.map((company, idx) => (
                  <tr key={company._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <img src={company.logoUrl} alt={company.name} className="company-logo" />
                    </td>
                    <td>{company.name}</td>
                    <td>₹{calculatePremium(company.name)}</td>
                    <td>
                      <button onClick={() => handleBuy(company)} className="btn-buy">
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {relatedInsurances.length > 5 && (
              <button className="see-more-btn" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'See Less' : 'See More'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InsuranceForm;

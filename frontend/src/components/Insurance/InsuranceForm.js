import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/main.css';

const InsuranceForm = ({ onSubmit }) => {
  const { insuranceType = '' } = useParams();
  const navigate = useNavigate();

  const insuranceTypes = {
    car: ['registrationNumber', 'brand', 'city', 'year'],
    bike: ['registrationNumber', 'brand', 'city'],
    health: ['city', 'year'],
  };

  const normalizedType = insuranceType?.toLowerCase();
  const fields = insuranceTypes[normalizedType];
  const [formData, setFormData] = useState({});
  const [relatedInsurances, setRelatedInsurances] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const handleBuy = (company) => {
    const token = localStorage.getItem('userInfo');
    const selectedPrice = (Math.random() * 4000 + 3000).toFixed(0);
    const selectedPlanId = 'basic-plan';

    // ✅ Flatten the data for /buy page
    const selectedData = {
      insuranceId: company._id,
      insuranceName: company.name,
      logoUrl: company.logoUrl,
      insuranceType: normalizedType,
      price: selectedPrice,
      selectedPlanId,
      formData,
    };

    if (!token) {
      localStorage.setItem('redirectAfterLogin', JSON.stringify(selectedData));
      navigate('/login');
    } else {
      navigate('/buy', { state: selectedData });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const renderField = (field) => {
    switch (field) {
      case 'brand':
      case 'city':
      case 'year':
        const options = {
          brand: ['Maruti', 'Hyundai', 'Tata', 'Honda', 'Mahindra'],
          city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
          year: Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i),
        };
        return (
          <select id={field} name={field} value={formData[field]} onChange={handleChange} required>
            <option value="">Select {field}</option>
            {options[field].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            id={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            required
          />
        );
    }
  };

  const displayedInsurances = showAll ? relatedInsurances : relatedInsurances.slice(0, 5);

  return (
    <div className="insurance-form-wrapper">
      <div className="top-bar">
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="insurance-form">
        <h2>Get {normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)} Insurance</h2>
        {fields.map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            {renderField(field)}
          </div>
        ))}
        <button type="submit" className="submit-btn">Check Prices</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {relatedInsurances.length > 0 && (
        <div className="insurance-table-section">
          <h3>Other {normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)} Insurance Options</h3>
          <div className="insurance-table-wrapper">
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
                {displayedInsurances.map((company, index) => {
                  const randomPrice = (Math.random() * 4000 + 3000).toFixed(0);
                  return (
                    <tr key={company._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={company.logoUrl} alt={company.name} width="100" height="50" />
                      </td>
                      <td>{company.name}</td>
                      <td>₹{randomPrice}</td>
                      <td>
                        <button className="buy-btn" onClick={() => handleBuy(company)}>
                          Buy
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!showAll && relatedInsurances.length > 5 && (
            <div className="see-more-container">
              <button className="see-more-btn" onClick={() => setShowAll(true)}>
                See More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InsuranceForm;

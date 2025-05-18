import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInsuranceCompanies, setSelectedType } from '../../redux/slices/insuranceSlice';
import './InsurancePartners.css';

const ITEMS_PER_PAGE = 4;

const InsurancePartners = () => {
  const dispatch = useDispatch();
  const { insuranceCompanies, selectedType } = useSelector((state) => state.insurance);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchInsuranceCompanies = async () => {
      const response = await fetch('http://localhost:5000/api/insurance-companies');
      const data = await response.json();
      dispatch(setInsuranceCompanies(data));
    };
    fetchInsuranceCompanies();
  }, [dispatch]);

  const handleTypeChange = (type) => {
    dispatch(setSelectedType(type === 'All' ? '' : type));
    setStartIndex(0); // Reset to first page on type change
  };

  const filteredCompanies = selectedType
    ? insuranceCompanies.filter((company) => company.insuranceType === selectedType)
    : insuranceCompanies;

  const visibleCompanies = filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (startIndex + ITEMS_PER_PAGE < filteredCompanies.length) {
      setStartIndex(startIndex + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (startIndex - ITEMS_PER_PAGE >= 0) {
      setStartIndex(startIndex - ITEMS_PER_PAGE);
    }
  };

  return (
    <section className="insurance-partners">
      <div className="container">
        <div className="title-wrapper">
          <h2>Our Insurance Partners</h2>
          <p className="subtext">We're associated with india's popular insurance companies.</p>
        </div>

        <div className="tabs-container">
          <ul className="tabs-list">
            {['All', 'General', 'Car', 'Bike', 'Health', 'Term', 'Life', 'Investment', 'Business', 'Travel'].map((type) => (
              <li
                key={type}
                className={selectedType === type ? 'active' : ''}
                onClick={() => handleTypeChange(type)}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>

        <div className="carousel-wrapper">
          <button onClick={handlePrev} className="nav-btn" disabled={startIndex === 0}>
            &#10094;
          </button>

          <div className="partners-grid">
            {visibleCompanies.map((company) => (
              <div key={company._id} className="partner-card">
                <div className="image-area">
                  <a href={`#${company.name}`} className="partner-link">
                    <div className="image-container">
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="partner-logo"
                      />
                    </div>
                    <div className="partner-name">{company.name}</div>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="nav-btn"
            disabled={startIndex + ITEMS_PER_PAGE >= filteredCompanies.length}
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default InsurancePartners;

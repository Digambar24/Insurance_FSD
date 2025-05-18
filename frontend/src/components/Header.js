import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/main.css';

const supportMenu = ['Customer Care', 'Claim Assistance', 'FAQs'];
const newsMenu = ['Insurance News', 'Press Releases', 'Blog'];

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [groupedCompanies, setGroupedCompanies] = useState({});
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/insurance-categories');
        const companies = res.data;

        const grouped = {};
        companies.forEach((company) => {
          const type = company.insuranceType;
          if (!grouped[type]) grouped[type] = [];
          grouped[type].push(company);
        });

        setGroupedCompanies(grouped);
        setInsuranceTypes(Object.keys(grouped)); // ['Health', 'Car', 'Bike', ...]
      } catch (err) {
        console.error('Failed to fetch companies', err);
      }
    };

    fetchCompanies();
  }, []);

  const toggleInsuranceDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setSelectedType(null); // Close submenus when toggling
  };

  const handleTypeClick = (e, type) => {
    e.stopPropagation(); // Prevent closing the dropdown
    setSelectedType((prevType) => (prevType === type ? null : type));
  };

  return (
    <header className="header">
      <div className="logo">InsuranceDekho</div>

      <nav className="nav-links">
        <div className="nav-item" onClick={toggleInsuranceDropdown}>
          Insurance ▾
          {dropdownOpen && (
            <ul className="dropdown">
              {insuranceTypes.map((type) => (
                <li key={type} onClick={(e) => handleTypeClick(e, type)}>
                  {type} Insurance {selectedType === type ? '▾' : '▸'}
                  {/* Show companies under this type */}
                  {selectedType === type && (
                    <ul className="dropdown sub-dropdown">
                      {groupedCompanies[type]?.map((comp) => (
                        <li key={comp._id}>{comp.name}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="nav-item">Insurance Advisors</span>
        <span className="nav-item">Renew</span>

        <div className="nav-item">
          Support ▾
          <ul className="dropdown">
            {supportMenu.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="nav-item">
          News ▾
          <ul className="dropdown">
            {newsMenu.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <span className="nav-item">Become POSP Agent</span>
      </nav>

      <div className="actions">
        <a href="#" className="track-policy">Track & Policy Download</a>
        <button className="login-btn">Login</button>
      </div>
    </header>
  );
};

export default Header;

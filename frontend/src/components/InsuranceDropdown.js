// components/InsuranceDropdown.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/main.css';

const InsuranceDropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
   // axios.get('http://localhost:5000/api/insurance-categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="insurance-dropdown">
      {categories.map(cat => (
        <div className="dropdown-item" key={cat._id}>
          <img src={cat.iconUrl} alt={cat.name} className="dropdown-icon" />
          <span>{cat.name}</span>
          <span className="arrow">›</span>
        </div>
      ))}
    </div>
  );
};

export default InsuranceDropdown;

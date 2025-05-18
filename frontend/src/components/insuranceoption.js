// components/insuranceoption.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InsuranceOption = ({ categoryId }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/insurance-companies')
      .then((res) => {
        const filtered = res.data.filter(comp => comp.category === categoryId);
        setCompanies(filtered);
      })
      .catch((err) => console.error(err));
  }, [categoryId]);

  return (
    <div>
      <h3>Insurance Companies</h3>
      {companies.length === 0 ? (
        <p>No companies available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {companies.map((comp) => (
            <li key={comp._id} style={{ marginBottom: '15px' }}>
              <img src={comp.logoUrl} alt={comp.name} width="100" />
              <p>{comp.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InsuranceOption;

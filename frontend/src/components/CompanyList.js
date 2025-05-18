import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyList = ({ type }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/insurance-companies?type=${type}`)
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));
  }, [type]);

  return (
    <ul className="min-w-[240px] bg-white border-l shadow z-50">
      {companies.map((company) => (
        <li
          key={company._id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
        >
          {company.name}
        </li>
      ))}
    </ul>
  );
};

export default CompanyList;

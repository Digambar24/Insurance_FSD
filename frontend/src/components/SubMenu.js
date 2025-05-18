import React, { useState } from 'react';
import CompanyList from './CompanyList';

const SubMenu = ({ type }) => {
  const [hoveredSub, setHoveredSub] = useState(null);

  const subItems = [
    'Insurance Companies',
    'Mediclaim Policy',
    'Best Plans',
    'Plans for Family',
    'Senior Citizens',
    'For Parents',
    'Women Insurance',
    'Children Insurance'
  ];

  return (
    <ul className="min-w-[240px] border-r relative bg-white">
      {subItems.map((sub, index) => {
        const isCompanies = sub === 'Insurance Companies';

        return (
          <li
            key={index}
            onMouseEnter={() => isCompanies && setHoveredSub(type)}
            onMouseLeave={() => isCompanies && setHoveredSub(null)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap relative"
          >
            {`${type} ${sub}`} {isCompanies && '➝'}

            {hoveredSub && isCompanies && (
              <div className="absolute top-0 left-full z-50">
                <CompanyList type={type} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SubMenu;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubMenu from './SubMenu';

const MegaMenu = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/insurance-categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative group">
      <button className="px-4 py-2 font-semibold hover:bg-gray-200">
        Insurance
      </button>

      <div className="absolute top-full left-0 flex bg-white shadow-lg border mt-1 z-50">
        <ul className="min-w-[220px] border-r">
          {categories.map((cat) => (
            <li
              key={cat._id}
              onMouseEnter={() => setHoveredCategory(cat.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              {cat.name} ➝
            </li>
          ))}
        </ul>

        {hoveredCategory && <SubMenu type={hoveredCategory} />}
      </div>
    </div>
  );
};

export default MegaMenu;

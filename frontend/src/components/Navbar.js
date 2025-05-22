import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import '../styles/Navbar.css';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoverCompany, setHoverCompany] = useState(false);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [newsSubHover, setNewsSubHover] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const justLoggedOut = useRef(false);

  // Logout handler with toast and redirect
  const handleLogout = () => {
    dispatch(logout());
    justLoggedOut.current = true;
    toast.success('Logged out successfully!');
    navigate('/');
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/insurance-categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    if (activeCategory) {
      const typeMap = {
        'Health Insurance': 'Health',
        'Car Insurance': 'Car',
        'Bike Insurance': 'Bike',
        'Life Insurance': 'Life',
        'Term Insurance': 'Term',
        Investment: 'Investment',
      };
      const apiType = typeMap[activeCategory] || activeCategory;
      fetch(`http://localhost:5000/api/insurance-companies?type=${apiType}`)
        .then((res) => res.json())
        .then((data) => setCompanies(data))
        .catch((err) => console.error('Error fetching companies:', err));
    } else {
      setCompanies([]);
    }
  }, [activeCategory]);

  const advisorLocations = [
    'New Delhi',
    'Gurgaon',
    'Faridabad',
    'Ghaziabad',
    'Noida',
    'Kolkata',
    'Hyderabad',
    'Lucknow',
    'Mumbai',
    'Pune',
    'Bangalore',
  ];

  const supportItems = [
    'Renew Policy',
    'Track Policy',
    'Download Policy',
    'Call Us 7551196989',
  ];

  const newsItems = [
    'Car Insurance',
    'Bike Insurance News',
    'Health Insurance News',
    'Life Insurance News',
    'Term Insurance News',
    'Investment News',
    'Business Insurance News',
    'Travel Insurance Articles',
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <img
            src="https://static.insurancedekho.com/pwa/img/id-main-logo.svg"
            alt="InsuranceDekho"
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setHoverCompany(true)}
          onMouseLeave={() => {
            setHoverCompany(false);
            setActiveCategory(null);
          }}
        >
          <button className="dropdown-button">
            Insurance <span className="arrow">▼</span>
          </button>
          {hoverCompany && (
            <div className="dropdown-content">
              <ul className="category-list">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    className={`category-item ${
                      activeCategory === category.name ? 'active' : ''
                    }`}
                    onMouseEnter={() => setActiveCategory(category.name)}
                  >
                    {category.name} ▶
                  </li>
                ))}
              </ul>

              {activeCategory && (
                <ul className="submenu-list">
                  <li className="submenu-title">{activeCategory} Insurance</li>
                  <li className="submenu-item">Mediclaim Policy</li>
                  <li className="submenu-item">Best Plans</li>
                  <li className="submenu-item">Plans for Family</li>
                  <li className="submenu-item">Senior Citizens</li>
                  <li className="submenu-item">Parents</li>
                  <li className="submenu-item">Women</li>
                  <li className="submenu-item">Children</li>
                </ul>
              )}

              {activeCategory && companies.length > 0 && (
                <div className="company-column">
                  <ul className="company-list">
                    <li className="company-item all-companies">
                      All {activeCategory} Companies
                    </li>
                    {companies.map((company) => (
                      <li key={company._id} className="company-item">
                        {company.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setShowAdvisor(true)}
          onMouseLeave={() => setShowAdvisor(false)}
        >
          <button className="dropdown-button">
            Insurance Advisors <span className="arrow">▼</span>
          </button>
          {showAdvisor && (
            <div className="dropdown-content">
              <ul className="submenu-list">
                {advisorLocations.map((city, index) => (
                  <li key={index} className="submenu-item">
                    Insurance Advisors in {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="nav-item">Renew</div>

        <div
          className="dropdown"
          onMouseEnter={() => setShowSupport(true)}
          onMouseLeave={() => setShowSupport(false)}
        >
          <button className="dropdown-button">
            Support <span className="arrow">▼</span>
          </button>
          {showSupport && (
            <div className="dropdown-content">
              <ul className="submenu-list">
                {supportItems.map((item, index) => (
                  <li key={index} className="submenu-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setShowNews(true)}
          onMouseLeave={() => {
            setShowNews(false);
            setNewsSubHover('');
          }}
        >
          <button className="dropdown-button">
            News <span className="arrow">▼</span>
          </button>
          {showNews && (
            <div className="dropdown-content">
              <div className="dropdown-columns">
                <ul className="news-list">
                  {newsItems.map((item, index) => (
                    <li
                      key={index}
                      className="submenu-item"
                      onMouseEnter={() =>
                        setNewsSubHover(item === 'Health Insurance News' ? item : '')
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {newsSubHover === 'Health Insurance News' && (
                  <ul className="news-sub-column">
                    <li className="submenu-item">Articles</li>
                    <li className="submenu-item">News</li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="nav-item">Become POSP Agent</div>
      </div>

      <div className="navbar-right">
        <span className="track-download">Track & Policy Download</span>
        {user ? (
          <button className="login-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

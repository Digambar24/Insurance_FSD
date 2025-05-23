import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import '../styles/Navbar.css';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoverCompany, setHoverCompany] = useState(false);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showNews, setShowNews] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const justLoggedOut = useRef(false);

  // Logout handler with toast and redirect
  const handleLogout = () => {
    dispatch(logout());
    justLoggedOut.current = true;
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
    'Call Us 7551196989',
  ];

  const newsItems = [
    'Car Insurance News',
    'Bike Insurance News',
    'Health Insurance News',
    'Term Insurance News',
    'Investment News',
  ];

  // Helper to convert category name to route path
  const categoryToPath = (category) => {
    if (!category) return '';
    if (category.toLowerCase().includes('health')) return 'health';
    if (category.toLowerCase().includes('car')) return 'car';
    if (category.toLowerCase().includes('bike')) return 'bike';
    if (category.toLowerCase().includes('term')) return 'term';
    if (category.toLowerCase().includes('investment')) return 'investment';
    return category.toLowerCase().replace(/\s+/g, '');
  };

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
            <div className="dropdown-content" style={{ display: 'flex' }}>
              <ul className="category-list" style={{ marginRight: '20px' }}>
                {categories
                  .filter(category => category.name.toLowerCase() !== 'life insurance')
                  .map((category) => (
                    <li
                      key={category._id}
                      className={`category-item ${
                        activeCategory === category.name ? 'active' : ''
                      }`}
                      onMouseEnter={() => setActiveCategory(category.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {category.name} ▶
                    </li>
                  ))}
              </ul>

              {activeCategory && (
                <div className="company-column">
                  <ul className="submenu-list">
                    <li
                      className="submenu-title"
                      style={{ cursor: 'pointer', color: '#007bff' }}
                      onClick={() =>
                        navigate(`/insurance/${categoryToPath(activeCategory)}`)
                      }
                    >
                      Go to {activeCategory} Page →
                    </li>
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
          <button
            className="dropdown-button"
            onClick={() => navigate('/insurance-advisors')}
          >
            Insurance Advisors <span className="arrow">▼</span>
          </button>

          {showAdvisor && (
            <div className="dropdown-content">
              <ul className="submenu-list">
                {advisorLocations.map((city, index) => (
                  <li
                    key={index}
                    className="submenu-item"
                    onClick={() => {
                      const slug = city.toLowerCase().replace(/\s+/g, '-');
                      navigate(`/insurance-advisors/${slug}`);
                    }}
                  >
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
          onMouseLeave={() => setShowNews(false)}
        >
          <button className="dropdown-button" style={{ cursor: 'default' }}>
            News <span className="arrow">▼</span>
          </button>
          {showNews && (
            <div className="dropdown-content">
              <ul className="news-list" style={{ padding: 0, margin: 0 }}>
                {newsItems.map((item, index) => {
                  const slug = item.toLowerCase().split(' ')[0];
                  return (
                    <li
                      key={index}
                      className="submenu-item"
                      onClick={() => {
                        navigate(`/news/${slug}`);
                        setShowNews(false);
                      }}
                      style={{ cursor: 'pointer', padding: '8px 12px' }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
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

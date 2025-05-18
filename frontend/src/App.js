import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './styles/main.css';

// Components
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import Home from './pages/Home';
import InsurancePartners from './components/InsurancePartners/InsurancePartners';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/forgotPassword';
import ProfilePage from './pages/ProfilePage';
import InsurancePage from './components/Insurance/InsurancePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './components/Admin/AdminUsers';
import AdminCompanies from './components/Admin/AdminCompanies';
import AdminPurchases from './components/Admin/AdminPurchases';
import BuyPage from './pages/BuyPage';
import MyInsurances from './pages/MyInsurancesPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin'); // Check if it's an admin route
  const showCarousel = location.pathname === '/';

  return (
    <>
      {!isAuthRoute && !isAdminRoute && <Navbar />} {/* Only show Navbar if not an admin or auth route */}
      {showCarousel && <Carousel />}
      {children}
      {!isAuthRoute && !isAdminRoute && <Footer />} {/* Only show Footer if not an admin or auth route */}
    </>
  );
};

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />

          {/* Main routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/partners" element={<Layout><InsurancePartners /></Layout>} />
          <Route path="/insurance/:insuranceType" element={<Layout><InsurancePage /></Layout>} />
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          <Route path="/buy" element={<Layout><BuyPage /></Layout>} />
          <Route path="/my-insurances" element={<Layout><MyInsurances /></Layout>} />

          {/* Admin routes */}
          <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/admin/users" element={<Layout><AdminUsers /></Layout>} />
          <Route path="/admin/companies" element={<Layout><AdminCompanies /></Layout>} />
          <Route path="/admin/purchases" element={<Layout><AdminPurchases /></Layout>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

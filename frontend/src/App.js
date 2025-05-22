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
import PrivateRoute from './components/PrivateRoute'; // ✅ Add this import

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showCarousel = location.pathname === '/';

  return (
    <>
      {!isAuthRoute && !isAdminRoute && <Navbar />}
      {showCarousel && <Carousel />}
      {children}
      {!isAuthRoute && !isAdminRoute && <Footer />}
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

          {/* ✅ Protected routes */}
          <Route
            path="/buy"
            element={
              <Layout>
                <PrivateRoute>
                  <BuyPage />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/my-insurances"
            element={
              <Layout>
                <PrivateRoute>
                  <MyInsurances />
                </PrivateRoute>
              </Layout>
            }
          />

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

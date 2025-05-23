import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './styles/main.css';

// Auth guards
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Components
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

// Pages and Sections
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
import InsuranceAdvisorsPage from './pages/InsuranceAdvisorsPage';
import InsuranceNewsPage from './pages/InsuranceNewsPage';

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

          {/* Public routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/partners" element={<Layout><InsurancePartners /></Layout>} />
          <Route path="/insurance/:insuranceType" element={<Layout><InsurancePage /></Layout>} />
          <Route path="/insurance-advisors/:citySlug" element={<Layout><InsuranceAdvisorsPage /></Layout>} />
          <Route path="/insurance-news" element={<Layout><InsuranceNewsPage /></Layout>} />
          <Route path="/insurance-news/:category" element={<Layout><InsuranceNewsPage /></Layout>} />
          <Route path="/news" element={<Layout><InsuranceNewsPage /></Layout>} />
          <Route path="/news/:category" element={<Layout><InsuranceNewsPage /></Layout>} />

          {/* Protected user routes */}
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

          {/* Protected admin routes */}
          <Route
            path="/admin-dashboard"
            element={
              <Layout>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </Layout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Layout>
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              </Layout>
            }
          />
          <Route
            path="/admin/companies"
            element={
              <Layout>
                <AdminRoute>
                  <AdminCompanies />
                </AdminRoute>
              </Layout>
            }
          />
          <Route
            path="/admin/purchases"
            element={
              <Layout>
                <AdminRoute>
                  <AdminPurchases />
                </AdminRoute>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

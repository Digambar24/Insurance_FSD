const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();

// Enable CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static uploads folder correctly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === ROUTES ===
const authRoutes = require('./routes/auth.routes');
const insuranceRoutes = require('./routes/insurance.routes');
const insuranceCompanyRoutes = require('./routes/insuranceCompany.routes');
const insuranceCategoryRoutes = require('./routes/insuranceCategory.routes');
const purchaseRoutes = require('./routes/purchase.routes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/admin.routes');

// Razorpay key endpoint
app.get('/api/config/razorpay-key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/insurances', insuranceRoutes);
app.use('/api/insurance-companies', insuranceCompanyRoutes);
app.use('/api/insurance-categories', insuranceCategoryRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Debug logs (remove in production)
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);

// Error handler middleware
app.use(errorHandler);

module.exports = app;

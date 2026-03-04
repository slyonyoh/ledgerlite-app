const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./modules/auth/routes/auth.routes');
const businessRoutes = require('./modules/businesses/routes/business.routes');
const incomeRoutes = require('./modules/income/routes/income.routes');
const expenseRoutes = require('./modules/expenses/routes/expense.routes');
const customerRoutes = require('./modules/customers/routes/customer.routes');
const supplierRoutes = require('./modules/suppliers/routes/supplier.routes');
const dashboardRoutes = require('./modules/dashboard/routes/dashboard.routes');
const reportRoutes = require('./modules/reports/routes/report.routes');
const adminRoutes = require('./modules/admin/routes/admin.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.use('/auth', authRoutes);
app.use('/business', businessRoutes);
app.use('/income', incomeRoutes);
app.use('/expenses', expenseRoutes);
app.use('/customers', customerRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/reports', reportRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

module.exports = app;

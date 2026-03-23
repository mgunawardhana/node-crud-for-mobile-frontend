require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Swagger UI ────────────────────────────────────────────────────────────────
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Node Auth API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
    },
    customCss: `
      .swagger-ui .topbar { background: #1a1a2e; }
      .swagger-ui .topbar-wrapper img { content: url(''); }
      .swagger-ui .topbar-wrapper::before { content: '🔐 Node Auth API'; color: #e94560; font-size: 1.4rem; font-weight: 700; }
    `,
  })
);

// JSON spec endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🔐 Node Auth API',
    version: '1.0.0',
    docs: '/api-docs',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      users: '/api/users (Admin)',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║       🔐 Node Auth API Started        ║
  ╠═══════════════════════════════════════╣
  ║  Server  : http://localhost:${PORT}       ║
  ║  API Docs: http://localhost:${PORT}/api-docs ║
  ║  Env     : ${process.env.NODE_ENV || 'development'}             ║
  ╚═══════════════════════════════════════╝
  `);
});

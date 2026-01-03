import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import connectDB from './config/database';
import githubRoutes from './routes/github';
import portfolioRoutes from './routes/portfolio';
import adminRoutes from './routes/admin';
import { errorHandler, notFound } from './middleware/errorHandler';
import { apiLimiter, syncLimiter, readOnlyLimiter } from './middleware/rateLimiter';
import { SyncScheduler } from './jobs/syncScheduler';
import { PortfolioDataService } from './services/PortfolioDataService';

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  // origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes with rate limiting
app.use('/api/github/sync', syncLimiter); // Strict rate limiting for sync
app.use('/api/github', readOnlyLimiter); // Lenient rate limiting for read operations
app.use('/api/portfolio', readOnlyLimiter); // Lenient rate limiting for portfolio data
app.use('/api', apiLimiter); // General rate limiting

// Routes
app.use('/api/github', githubRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      github: '/api/github',
      portfolio: '/api/portfolio',
      admin: '/api/admin',
      docs: 'https://github.com/yourusername/portfolio-backend#api-documentation'
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  
  // Seed initial portfolio data
  try {
    const portfolioDataService = new PortfolioDataService();
    await portfolioDataService.seedInitialData();
  } catch (error) {
    console.error('❌ Failed to seed portfolio data:', error);
  }
  
  // Start the sync scheduler
  const syncScheduler = new SyncScheduler();
  syncScheduler.start();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('🔄 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

export default app;
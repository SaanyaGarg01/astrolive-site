import express from 'express';
import cors from 'cors';
import { PORT, CLIENT_ORIGIN } from './config.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import Domain Routers
import subscriptionsRouter from './routes/subscriptions.js';
import gamificationRouter from './routes/gamification.js';
import predictionsRouter from './routes/predictions.js';
import patternsRouter from './routes/patterns.js';
import notificationsRouter from './routes/notifications.js';
import guardRouter from './routes/guard.js';
import b2bRouter from './routes/b2b.js';
import marketplaceRouter from './routes/marketplace.js';
import astrologersRouter from './routes/astrologers.js';
import adminRouter from './routes/admin.js';

const app = express();

// ── Middlewares ────────────────────────────────────────────────
app.use(cors({
  origin: '*', // Allow all origins for dev flexibility
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[AstroLive API] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'AstroLive Backend API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime())
  });
});

// ── Mount Domain API Routes ────────────────────────────────────
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/gamification', gamificationRouter);
app.use('/api/predictions', predictionsRouter);
app.use('/api/patterns', patternsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/guard', guardRouter);
app.use('/api', b2bRouter); // Includes /api/v1/muhurat/calculate and /api/b2b/clients
app.use('/api/marketplace', marketplaceRouter);
app.use('/api/astrologers', astrologersRouter);
app.use('/api/admin', adminRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'NotFound', message: `Route ${req.method} ${req.url} not found` });
});

// Global Error Handler
app.use(errorHandler);

// ── Start Express Server ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
=====================================================
  🪐 ASTROLIVE BACKEND SERVER RUNNING
  📡 API URL: http://localhost:${PORT}/api
  💚 Health Check: http://localhost:${PORT}/api/health
=====================================================
  `);
});

export default app;

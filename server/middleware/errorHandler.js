export function errorHandler(err, req, res, next) {
  console.error('[AstroLive Server Error]', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred on the server.',
    timestamp: new Date().toISOString()
  });
}

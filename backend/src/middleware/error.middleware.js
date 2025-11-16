/**
 * Middleware global para manejo de errores
 */
export const errorHandler = (err, req, res, next) => {
  // Log del error
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Error de validación (Joi)
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // Error de Supabase
  if (err.code && err.code.startsWith('PGRST')) {
    return res.status(400).json({
      success: false,
      message: 'Database error',
      error: err.message
    });
  }

  // Error de autenticación
  if (err.name === 'JsonWebTokenError' || err.message.includes('token')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication error',
      error: 'Invalid or expired token'
    });
  }

  // Error personalizado con status code
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || 'An error occurred',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Error genérico
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err 
    })
  });
};

/**
 * Wrapper para manejar errores en controladores async
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


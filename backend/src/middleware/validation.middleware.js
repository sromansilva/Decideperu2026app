import Joi from 'joi';

/**
 * Middleware para validar request body usando Joi
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    // Reemplazar req.body con los valores validados
    req.body = value;
    next();
  };
};

/**
 * Middleware para validar parámetros de URL
 */
export const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameters',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    req.params = value;
    next();
  };
};

/**
 * Schemas de validación comunes
 */
export const schemas = {
  // DNI validation
  dni: Joi.string().pattern(/^\d{8}$/).required().messages({
    'string.pattern.base': 'El DNI debe tener exactamente 8 dígitos'
  }),

  // Email validation
  email: Joi.string().email().required(),

  // Password validation
  password: Joi.string().min(6).required(),

  // UUID validation
  uuid: Joi.string().uuid().required(),

  // Pagination
  pagination: {
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  }
};


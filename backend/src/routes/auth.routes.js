import express from 'express';
import { register, login, getMe, logout } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate, schemas } from '../middleware/validation.middleware.js';
import Joi from 'joi';

const router = express.Router();

// Schema de validación para registro
const registerSchema = Joi.object({
  email: schemas.email,
  password: schemas.password,
  full_name: Joi.string().min(2).max(100).required(),
  dni: schemas.dni.optional()
});

// Schema de validación para login
const loginSchema = Joi.object({
  email: schemas.email,
  password: schemas.password
});

/**
 * @route   POST /api/auth/register
 * @desc    Registrar nuevo usuario
 * @access  Public
 */
router.post('/register', validate(registerSchema), register);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión
 * @access  Public
 */
router.post('/login', validate(loginSchema), login);

/**
 * @route   GET /api/auth/me
 * @desc    Obtener información del usuario actual
 * @access  Private
 */
router.get('/me', authenticate, getMe);

/**
 * @route   POST /api/auth/logout
 * @desc    Cerrar sesión
 * @access  Private
 */
router.post('/logout', authenticate, logout);

export default router;


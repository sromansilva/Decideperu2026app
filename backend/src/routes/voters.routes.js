import express from 'express';
import { getVoterByDNI, getAllVoters } from '../controllers/voters.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateParams, schemas } from '../middleware/validation.middleware.js';
import Joi from 'joi';

const router = express.Router();

// Schema de validación para DNI
const dniParamSchema = Joi.object({
  dni: schemas.dni
});

/**
 * @route   GET /api/voters/reniec/:dni
 * @desc    Obtener información de votante por DNI
 * @access  Public (puedes agregar authenticate si lo necesitas)
 */
router.get('/reniec/:dni', validateParams(dniParamSchema), getVoterByDNI);

/**
 * @route   GET /api/voters
 * @desc    Obtener todos los votantes (con paginación)
 * @access  Private (requiere autenticación)
 */
router.get('/', authenticate, getAllVoters);

export default router;


import express from 'express';
import { consultarDNI, consultarDNIConToken } from '../controllers/reniec.controller.js';
import { validateParams, schemas } from '../middleware/validation.middleware.js';
import Joi from 'joi';

const router = express.Router();

// Schema de validación para DNI
const dniParamSchema = Joi.object({
  dni: schemas.dni
});

/**
 * @route   GET /api/reniec/:dni
 * @desc    Consultar DNI en RENIEC
 * @access  Public (puedes agregar authenticate si lo necesitas)
 */
router.get('/:dni', validateParams(dniParamSchema), consultarDNI);

/**
 * @route   GET /api/consulta-dni/:dni
 * @desc    Consultar DNI en RENIEC con token (ruta alternativa)
 * @access  Public
 */
router.get('/consulta-dni/:dni', validateParams(dniParamSchema), consultarDNIConToken);

export default router;


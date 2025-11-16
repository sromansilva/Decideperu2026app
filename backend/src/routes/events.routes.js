import express from 'express';
import { getAllEvents, getEventById } from '../controllers/events.controller.js';
import { validateParams, schemas } from '../middleware/validation.middleware.js';
import Joi from 'joi';

const router = express.Router();

// Schema de validación para ID
const idParamSchema = Joi.object({
  id: schemas.uuid
});

/**
 * @route   GET /api/events
 * @desc    Obtener todos los eventos (calendario electoral)
 * @access  Public
 */
router.get('/', getAllEvents);

/**
 * @route   GET /api/events/:id
 * @desc    Obtener evento por ID
 * @access  Public
 */
router.get('/:id', validateParams(idParamSchema), getEventById);

export default router;


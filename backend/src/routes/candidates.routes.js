import express from 'express';
import {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate
} from '../controllers/candidates.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.middleware.js';
import { validate, validateParams, schemas } from '../middleware/validation.middleware.js';
import Joi from 'joi';

const router = express.Router();

// Schema de validación para crear/actualizar candidato
const candidateSchema = Joi.object({
  nombre: Joi.string().min(2).max(200).required(),
  apellidos: Joi.string().min(2).max(200).required(),
  cargo: Joi.string().required(),
  partido: Joi.string().optional(),
  numero: Joi.string().optional(),
  foto: Joi.string().uri().optional(),
  biografia: Joi.string().optional(),
  propuestas: Joi.array().items(Joi.string()).optional(),
  distrito: Joi.string().optional(),
  provincia: Joi.string().optional(),
  departamento: Joi.string().optional(),
  website: Joi.string().uri().optional(),
  redes_sociales: Joi.object().optional()
});

// Schema de validación para ID
const idParamSchema = Joi.object({
  id: schemas.uuid
});

/**
 * @route   GET /api/candidates
 * @desc    Obtener todos los candidatos
 * @access  Public
 */
router.get('/', getAllCandidates);

/**
 * @route   GET /api/candidates/:id
 * @desc    Obtener candidato por ID
 * @access  Public
 */
router.get('/:id', validateParams(idParamSchema), getCandidateById);

/**
 * @route   POST /api/candidates
 * @desc    Crear nuevo candidato
 * @access  Private (requiere autenticación y admin)
 */
router.post('/', authenticate, requireAdmin, validate(candidateSchema), createCandidate);

/**
 * @route   PUT /api/candidates/:id
 * @desc    Actualizar candidato
 * @access  Private (requiere autenticación y admin)
 */
router.put('/:id', authenticate, requireAdmin, validateParams(idParamSchema), validate(candidateSchema), updateCandidate);

/**
 * @route   DELETE /api/candidates/:id
 * @desc    Eliminar candidato
 * @access  Private (requiere autenticación y admin)
 */
router.delete('/:id', authenticate, requireAdmin, validateParams(idParamSchema), deleteCandidate);

export default router;


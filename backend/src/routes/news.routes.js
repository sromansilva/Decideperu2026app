import express from 'express';
import { getAllNews, getNewsById } from '../controllers/news.controller.js';
import { validateParams, schemas } from '../middleware/validation.middleware.js';
import Joi from 'joi';

const router = express.Router();

// Schema de validación para ID
const idParamSchema = Joi.object({
  id: schemas.uuid
});

/**
 * @route   GET /api/news
 * @desc    Obtener todas las noticias
 * @access  Public
 */
router.get('/', getAllNews);

/**
 * @route   GET /api/news/:id
 * @desc    Obtener noticia por ID
 * @access  Public
 */
router.get('/:id', validateParams(idParamSchema), getNewsById);

export default router;


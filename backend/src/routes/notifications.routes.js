import express from 'express';
import { getUserNotifications, markNotificationAsRead } from '../controllers/notifications.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateParams, schemas } from '../middleware/validation.middleware.js';
import Joi from 'joi';

const router = express.Router();

// Schema de validación para parámetros
const userIdParamSchema = Joi.object({
  userId: schemas.uuid
});

const notificationParamSchema = Joi.object({
  userId: schemas.uuid,
  notificationId: schemas.uuid
});

/**
 * @route   GET /api/notifications/:userId
 * @desc    Obtener notificaciones de un usuario
 * @access  Private (requiere autenticación)
 */
router.get('/:userId', authenticate, validateParams(userIdParamSchema), getUserNotifications);

/**
 * @route   PATCH /api/notifications/:userId/:notificationId/read
 * @desc    Marcar notificación como leída
 * @access  Private (requiere autenticación)
 */
router.patch('/:userId/:notificationId/read', authenticate, validateParams(notificationParamSchema), markNotificationAsRead);

export default router;


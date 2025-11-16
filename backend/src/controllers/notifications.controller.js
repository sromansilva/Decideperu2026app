import { asyncHandler } from '../middleware/error.middleware.js';
import { supabaseAdmin } from '../config/supabase.js';

/**
 * Obtener notificaciones de un usuario
 */
export const getUserNotifications = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  const { read } = req.query;

  let query = supabaseAdmin
    .from('notifications')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  // Filtrar por estado de lectura
  if (read === 'true') {
    query = query.eq('read', true);
  } else if (read === 'false') {
    query = query.eq('read', false);
  }

  // Paginación
  query = query.range(offset, offset + limit - 1);

  const { data: notifications, error, count } = await query;

  if (error) {
    throw new Error(`Error fetching notifications: ${error.message}`);
  }

  res.json({
    success: true,
    data: {
      notifications: notifications || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  });
});

/**
 * Marcar notificación como leída
 */
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { userId, notificationId } = req.params;

  const { data: notification, error } = await supabaseAdmin
    .from('notifications')
    .update({ read: true, read_at: new Date().toISOString() })
    .eq('id', notificationId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating notification: ${error.message}`);
  }

  res.json({
    success: true,
    message: 'Notification marked as read',
    data: { notification }
  });
});


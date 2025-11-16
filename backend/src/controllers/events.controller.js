import { asyncHandler } from '../middleware/error.middleware.js';
import { SupabaseService } from '../services/supabase.service.js';
import { supabaseAdmin } from '../config/supabase.js';

/**
 * Obtener todos los eventos (calendario electoral)
 */
export const getAllEvents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  const { type, start_date, end_date } = req.query;

  let query = supabaseAdmin
    .from('events')
    .select('*', { count: 'exact' })
    .order('event_date', { ascending: true });

  // Aplicar filtros
  if (type) {
    query = query.eq('type', type);
  }
  if (start_date) {
    query = query.gte('event_date', start_date);
  }
  if (end_date) {
    query = query.lte('event_date', end_date);
  }

  // Paginación
  query = query.range(offset, offset + limit - 1);

  const { data: events, error, count } = await query;

  if (error) {
    throw new Error(`Error fetching events: ${error.message}`);
  }

  res.json({
    success: true,
    data: {
      events: events || [],
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
 * Obtener evento por ID
 */
export const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await SupabaseService.findById('events', id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }

  res.json({
    success: true,
    data: { event }
  });
});


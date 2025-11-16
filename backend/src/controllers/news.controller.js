import { asyncHandler } from '../middleware/error.middleware.js';
import { SupabaseService } from '../services/supabase.service.js';
import { supabaseAdmin } from '../config/supabase.js';

/**
 * Obtener todas las noticias
 */
export const getAllNews = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const { category, featured } = req.query;

  let query = supabaseAdmin
    .from('news')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Aplicar filtros
  if (category) {
    query = query.eq('category', category);
  }
  if (featured === 'true') {
    query = query.eq('featured', true);
  }

  // Paginación
  query = query.range(offset, offset + limit - 1);

  const { data: news, error, count } = await query;

  if (error) {
    throw new Error(`Error fetching news: ${error.message}`);
  }

  res.json({
    success: true,
    data: {
      news: news || [],
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
 * Obtener noticia por ID
 */
export const getNewsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const newsItem = await SupabaseService.findById('news', id);

  if (!newsItem) {
    return res.status(404).json({
      success: false,
      message: 'News not found'
    });
  }

  res.json({
    success: true,
    data: { news: newsItem }
  });
});


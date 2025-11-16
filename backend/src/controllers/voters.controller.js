import { asyncHandler } from '../middleware/error.middleware.js';
import { SupabaseService } from '../services/supabase.service.js';
import { supabaseAdmin } from '../config/supabase.js';

/**
 * Obtener información de un votante por DNI
 * Este endpoint puede combinar datos de RENIEC con datos guardados en la BD
 */
export const getVoterByDNI = asyncHandler(async (req, res) => {
  const { dni } = req.params;

  // Validar formato de DNI
  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).json({
      success: false,
      message: 'El DNI debe tener 8 dígitos'
    });
  }

  // Buscar votante en la BD (si existe)
  const { data: voter, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('dni', dni)
    .single();

  // Si no existe en BD, retornar null (el frontend puede usar RENIEC)
  if (error && error.code === 'PGRST116') {
    return res.json({
      success: true,
      data: {
        dni,
        exists_in_db: false,
        voter: null
      }
    });
  }

  if (error) {
    throw new Error(`Error fetching voter: ${error.message}`);
  }

  res.json({
    success: true,
    data: {
      dni,
      exists_in_db: true,
      voter: {
        id: voter.id,
        email: voter.email,
        full_name: voter.full_name,
        dni: voter.dni,
        created_at: voter.created_at
      }
    }
  });
});

/**
 * Obtener todos los votantes (con paginación)
 */
export const getAllVoters = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { data: voters, error, count } = await supabaseAdmin
    .from('users')
    .select('id, email, full_name, dni, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(`Error fetching voters: ${error.message}`);
  }

  res.json({
    success: true,
    data: {
      voters: voters || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  });
});


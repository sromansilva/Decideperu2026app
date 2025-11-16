import { asyncHandler } from '../middleware/error.middleware.js';
import { SupabaseService } from '../services/supabase.service.js';
import { supabaseAdmin } from '../config/supabase.js';

/**
 * Obtener todos los candidatos
 */
export const getAllCandidates = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  const { cargo, partido, distrito } = req.query;

  let query = supabaseAdmin
    .from('candidates')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Aplicar filtros
  if (cargo) {
    query = query.eq('cargo', cargo);
  }
  if (partido) {
    query = query.eq('partido', partido);
  }
  if (distrito) {
    query = query.eq('distrito', distrito);
  }

  // Paginación
  query = query.range(offset, offset + limit - 1);

  const { data: candidates, error, count } = await query;

  if (error) {
    throw new Error(`Error fetching candidates: ${error.message}`);
  }

  res.json({
    success: true,
    data: {
      candidates: candidates || [],
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
 * Obtener candidato por ID
 */
export const getCandidateById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const candidate = await SupabaseService.findById('candidates', id);

  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: 'Candidate not found'
    });
  }

  res.json({
    success: true,
    data: { candidate }
  });
});

/**
 * Crear nuevo candidato (requiere autenticación)
 */
export const createCandidate = asyncHandler(async (req, res) => {
  const candidateData = {
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const candidate = await SupabaseService.create('candidates', candidateData);

  res.status(201).json({
    success: true,
    message: 'Candidate created successfully',
    data: { candidate }
  });
});

/**
 * Actualizar candidato (requiere autenticación)
 */
export const updateCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updateData = {
    ...req.body,
    updated_at: new Date().toISOString()
  };

  const candidate = await SupabaseService.update('candidates', id, updateData);

  res.json({
    success: true,
    message: 'Candidate updated successfully',
    data: { candidate }
  });
});

/**
 * Eliminar candidato (requiere autenticación y admin)
 */
export const deleteCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await SupabaseService.delete('candidates', id);

  res.json({
    success: true,
    message: 'Candidate deleted successfully'
  });
});


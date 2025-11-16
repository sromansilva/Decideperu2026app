import { supabaseAdmin, supabase } from '../config/supabase.js';
import { SupabaseService } from '../services/supabase.service.js';
import { asyncHandler } from '../middleware/error.middleware.js';

/**
 * Registrar nuevo usuario
 */
export const register = asyncHandler(async (req, res) => {
  const { email, password, full_name, dni } = req.body;

  // Crear usuario en Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirmar email (ajusta según tu configuración)
    user_metadata: {
      full_name,
      dni
    }
  });

  if (authError) {
    return res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: authError.message
    });
  }

  // Crear registro en tabla users
  const userRecord = {
    id: authData.user.id,
    email: authData.user.email,
    full_name: full_name || authData.user.user_metadata?.full_name,
    dni: dni || null,
    created_at: new Date().toISOString()
  };

  const { data: user, error: dbError } = await supabaseAdmin
    .from('users')
    .insert(userRecord)
    .select()
    .single();

  if (dbError) {
    // Si falla la inserción en BD, eliminar el usuario de auth
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    return res.status(400).json({
      success: false,
      message: 'Error saving user data',
      error: dbError.message
    });
  }

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        dni: user.dni
      }
    }
  });
});

/**
 * Iniciar sesión
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Autenticar con Supabase
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError || !authData.user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
      error: authError?.message || 'Authentication failed'
    });
  }

  // Obtener datos completos del usuario
  const user = await SupabaseService.getUserById(authData.user.id);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name: user?.full_name || authData.user.user_metadata?.full_name,
        dni: user?.dni || null
      },
      session: {
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
        expires_at: authData.session.expires_at
      }
    }
  });
});

/**
 * Obtener información del usuario actual
 */
export const getMe = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await SupabaseService.getUserById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        dni: user.dni,
        role: user.role || 'user',
        is_admin: user.is_admin || false,
        created_at: user.created_at
      }
    }
  });
});

/**
 * Cerrar sesión (opcional, ya que Supabase maneja esto en el cliente)
 */
export const logout = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    // Invalidar sesión en Supabase
    await supabaseAdmin.auth.admin.signOut(token);
  }

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});


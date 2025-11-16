import { supabaseAdmin } from '../config/supabase.js';

/**
 * Middleware para verificar autenticación usando Supabase
 * Verifica el token JWT de Supabase en el header Authorization
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please include a Bearer token in the Authorization header.'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token con Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Agregar usuario al request
    req.user = user;
    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};

/**
 * Middleware opcional para verificar si el usuario es admin
 * Requiere que la tabla users tenga un campo 'role' o 'is_admin'
 */
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Obtener datos completos del usuario desde la BD
    const { data: userData, error } = await supabaseAdmin
      .from('users')
      .select('role, is_admin')
      .eq('id', req.user.id)
      .single();

    if (error || !userData) {
      return res.status(403).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verificar si es admin (ajusta según tu esquema)
    const isAdmin = userData.is_admin === true || userData.role === 'admin';

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    req.userRole = userData.role;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking admin status',
      error: error.message
    });
  }
};


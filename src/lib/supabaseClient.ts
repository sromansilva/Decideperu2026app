/**
 * Supabase Client - Frontend
 * Cliente seguro para usar en el navegador
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Función helper para obtener variables de entorno de forma segura
function getEnvVar(key: string): string {
  try {
    // Intenta acceder a import.meta.env
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || '';
    }
    // Fallback a process.env para entornos que no usan Vite
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key] || '';
    }
    return '';
  } catch (e) {
    // Silenciosamente retornar vacío si no hay acceso a env vars
    return '';
  }
}

// Validar que las variables de entorno existan
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Flag para saber si Supabase está configurado
export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'placeholder-anon-key' &&
  supabaseAnonKey !== 'your-anon-key-here'
);

// Mostrar advertencia si no está configurado (solo en desarrollo)
if (!isSupabaseConfigured && typeof window !== 'undefined') {
  // Solo mostrar en desarrollo, no en producción, y solo una vez
  if (import.meta?.env?.DEV && !sessionStorage.getItem('supabase-info-shown')) {
    sessionStorage.setItem('supabase-info-shown', 'true');
    console.info(
      '%c💡 DecidePerú 2026 - Modo Demo',
      'color: #0ea5e9; font-weight: bold; font-size: 12px;',
      '\nLa app funciona con datos de ejemplo. Para conectar base de datos real, configura Supabase en .env'
    );
  }
}

// Crear cliente de Supabase (singleton) - solo si está configurado
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      global: {
        headers: {
          'X-Client-Info': 'decideperu-2026',
        },
      },
    })
  : null;

// Helper para verificar si hay sesión activa
export const hasActiveSession = async () => {
  if (!supabase) return false;
  try {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  } catch (e) {
    console.error('Error al verificar sesión:', e);
    return false;
  }
};

// Helper para obtener el usuario actual
export const getCurrentUser = async () => {
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (e) {
    console.error('Error al obtener usuario:', e);
    return null;
  }
};

// Helper para obtener el rol del usuario
export const getUserRole = async (): Promise<'admin' | 'user' | null> => {
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single();

    return userData?.role || 'user';
  } catch (e) {
    console.error('Error al obtener rol:', e);
    return null;
  }
};

// Helper para logout
export const signOut = async () => {
  if (!supabase) return;
  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.error('Error al cerrar sesión:', e);
  }
};
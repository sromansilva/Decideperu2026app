/**
 * Supabase Client - Frontend
 * Cliente seguro para usar en el navegador
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Validar que las variables de entorno existan
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Crear cliente de Supabase (singleton)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
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
});

// Helper para verificar si hay sesión activa
export const hasActiveSession = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

// Helper para obtener el usuario actual
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

// Helper para obtener el rol del usuario
export const getUserRole = async (): Promise<'admin' | 'user' | null> => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single();

  return userData?.role || 'user';
};

// Helper para logout
export const signOut = async () => {
  await supabase.auth.signOut();
};

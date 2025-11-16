/**
 * Authentication Service
 * Maneja todo lo relacionado con autenticación y autorización
 */

import { supabase } from '../lib/supabaseClient';

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'user';
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

class AuthService {
  /**
   * Registrar nuevo usuario
   */
  async register({ email, password, fullName }: RegisterData) {
    try {
      // 1. Crear usuario en Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) throw authError;

      // 2. El trigger automáticamente crea el perfil en public.users
      
      return {
        success: true,
        user: authData.user,
        message: 'Usuario registrado exitosamente. Por favor verifica tu email.',
      };
    } catch (error: any) {
      console.error('Error en registro:', error);
      return {
        success: false,
        error: error.message || 'Error al registrar usuario',
      };
    }
  }

  /**
   * Iniciar sesión
   */
  async login({ email, password }: LoginData) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Obtener rol del usuario
      const role = await this.getUserRole(data.user.id);

      return {
        success: true,
        user: data.user,
        session: data.session,
        role,
      };
    } catch (error: any) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.message || 'Credenciales inválidas',
      };
    }
  }

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error en logout:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profile) return null;

      return {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        fullName: profile.full_name,
        avatarUrl: profile.avatar_url,
        createdAt: profile.created_at,
      };
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  }

  /**
   * Obtener rol del usuario
   */
  async getUserRole(userId: string): Promise<'admin' | 'user' | null> {
    try {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      return data?.role || 'user';
    } catch (error) {
      console.error('Error obteniendo rol:', error);
      return null;
    }
  }

  /**
   * Verificar si el usuario es admin
   */
  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.role === 'admin';
  }

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile(updates: {
    fullName?: string;
    avatarUrl?: string;
  }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No hay sesión activa');

      const { error } = await supabase
        .from('users')
        .update({
          full_name: updates.fullName,
          avatar_url: updates.avatarUrl,
        })
        .eq('id', user.id);

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Error actualizando perfil:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      return {
        success: true,
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error: any) {
      console.error('Error cambiando contraseña:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Recuperar contraseña
   */
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      return {
        success: true,
        message: 'Email de recuperación enviado. Por favor revisa tu bandeja de entrada.',
      };
    } catch (error: any) {
      console.error('Error recuperando contraseña:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Verificar sesión activa
   */
  async hasActiveSession(): Promise<boolean> {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  }

  /**
   * Suscribirse a cambios de autenticación
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();

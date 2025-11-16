import { useState, useEffect, useCallback } from 'react';
import type { User, AuthState } from '../types';
import { STORAGE_KEYS } from '../constants/app';

/**
 * Hook personalizado para manejar autenticación
 * TODO: Integrar con Supabase Auth cuando esté listo
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  // Inicializar estado de autenticación
  useEffect(() => {
    const initAuth = async () => {
      try {
        // TODO: Verificar sesión con Supabase
        const isAuthenticated = localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
        
        if (isAuthenticated) {
          // TODO: Obtener usuario de Supabase
          const mockUser: User = {
            id: '1',
            email: 'usuario@ejemplo.com',
            name: 'Usuario Demo',
            dni: '12345678',
            votingStatus: 'habilitado',
            isAdmin: false,
            createdAt: new Date().toISOString(),
          };
          
          setAuthState({
            isAuthenticated: true,
            user: mockUser,
            loading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    initAuth();
  }, []);

  // Login
  const login = useCallback(async (email: string, password: string, isAdmin: boolean = false) => {
    try {
      // TODO: Implementar login con Supabase
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      // Mock login exitoso
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        votingStatus: 'habilitado',
        isAdmin,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
      
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      });
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  }, []);

  // Register
  const register = useCallback(async (email: string, password: string, name: string, dni?: string) => {
    try {
      // TODO: Implementar registro con Supabase
      // const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name, dni } } });
      
      // Mock registro exitoso
      const mockUser: User = {
        id: '1',
        email,
        name,
        dni,
        votingStatus: 'pendiente',
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
      
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      });
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error al registrarse' };
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      // TODO: Implementar logout con Supabase
      // await supabase.auth.signOut();
      
      localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Error al cerrar sesión' };
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    try {
      // TODO: Implementar reset password con Supabase
      // const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: 'Error al enviar link de recuperación' };
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    try {
      if (!authState.user) {
        throw new Error('No user logged in');
      }
      
      // TODO: Implementar actualización de perfil con Supabase
      // const { error } = await supabase.auth.updateUser({ data: updates });
      
      const updatedUser = { ...authState.user, ...updates };
      
      setAuthState({
        ...authState,
        user: updatedUser,
      });
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Error al actualizar perfil' };
    }
  }, [authState]);

  // Toggle admin mode
  const toggleAdminMode = useCallback(() => {
    if (!authState.user) return;
    
    const updatedUser = {
      ...authState.user,
      isAdmin: !authState.user.isAdmin,
    };
    
    setAuthState({
      ...authState,
      user: updatedUser,
    });
  }, [authState]);

  return {
    ...authState,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    toggleAdminMode,
  };
}

/**
 * useAuth Hook
 * Maneja autenticación, sesión y rol del usuario
 */

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService, UserProfile } from '../services/auth.service';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, fullName: string) => Promise<any>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al montar
  useEffect(() => {
    loadUser();

    // Suscribirse a cambios de autenticación
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        setSession(session);
        
        if (session) {
          await loadUser();
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userProfile = await authService.getCurrentUser();
      setUser(userProfile);
    } catch (error) {
      console.error('Error cargando usuario:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const result = await authService.login({ email, password });
    
    if (result.success) {
      await loadUser();
    }
    
    return result;
  };

  const register = async (email: string, password: string, fullName: string) => {
    return await authService.register({ email, password, fullName });
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setSession(null);
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const value = {
    user,
    session,
    loading,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

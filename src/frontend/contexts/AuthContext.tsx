import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  dni?: string;
  avatar?: string;
  role: UserRole;
  votingStatus: 'habilitado' | 'pendiente';
  phone?: string;
  address?: string;
  votingLocation?: string;
  votingTable?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  hasCompletedTutorial: boolean;
  completeTutorial: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasCompletedTutorial, setHasCompletedTutorial] = useState(false);

  // Cargar estado de autenticación desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('decideperu_user');
    const tutorialCompleted = localStorage.getItem('decideperu_tutorial_completed');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (tutorialCompleted === 'true') {
      setHasCompletedTutorial(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Integrar con Supabase Auth
    // Por ahora, simulamos login con datos mock
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));

    // Determinar rol basado en email (simulado)
    const isAdminUser = email.includes('admin') || email.includes('onpe');
    
    const mockUser: User = {
      id: Math.random().toString(36),
      name: isAdminUser ? 'Administrador ONPE' : 'María González',
      email: email,
      dni: isAdminUser ? '12345678' : '72345678',
      avatar: '',
      role: isAdminUser ? 'admin' : 'user',
      votingStatus: 'habilitado',
      phone: isAdminUser ? '+51 999 888 777' : '+51 987 654 321',
      address: 'Lima, Perú',
      votingLocation: isAdminUser ? undefined : 'Colegio San Martín',
      votingTable: isAdminUser ? undefined : 'Mesa 10245',
    };

    setUser(mockUser);
    localStorage.setItem('decideperu_user', JSON.stringify(mockUser));
  };

  const loginAsGuest = async () => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser: User = {
      id: Math.random().toString(36),
      name: 'Invitado',
      email: 'invitado@decideperu.com',
      dni: '00000000',
      avatar: '',
      role: 'user',
      votingStatus: 'pendiente',
      phone: '+51 999 888 777',
      address: 'Lima, Perú',
      votingLocation: undefined,
      votingTable: undefined,
    };

    setUser(mockUser);
    localStorage.setItem('decideperu_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('decideperu_user');
    // No limpiar el tutorial para que no vuelva a aparecer
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('decideperu_user', JSON.stringify(updatedUser));
    }
  };

  const completeTutorial = () => {
    setHasCompletedTutorial(true);
    localStorage.setItem('decideperu_tutorial_completed', 'true');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        loginAsGuest,
        logout,
        updateUser,
        hasCompletedTutorial,
        completeTutorial,
      }}
    >
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
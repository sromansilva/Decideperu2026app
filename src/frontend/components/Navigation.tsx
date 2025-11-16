import { Home, Calendar, Users, UserCircle, Shield, BarChart3 } from 'lucide-react';
import type { Screen } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const { isAdmin } = useAuth();

  // Navegación dinámica según el rol
  const navItems = isAdmin 
    ? [
        { id: 'home' as Screen, label: 'Inicio', icon: Shield },
        { id: 'admin-stats' as Screen, label: 'Stats', icon: BarChart3 },
        { id: 'candidates' as Screen, label: 'Gestión', icon: Users },
        { id: 'profile' as Screen, label: 'Perfil', icon: UserCircle },
      ]
    : [
        { id: 'home' as Screen, label: 'Inicio', icon: Home },
        { id: 'calendar' as Screen, label: 'Calendario', icon: Calendar },
        { id: 'candidates' as Screen, label: 'Candidatos', icon: Users },
        { id: 'profile' as Screen, label: 'Perfil', icon: UserCircle },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg max-w-md mx-auto z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || 
            (item.id === 'candidates' && (currentScreen === 'candidate-profile' || currentScreen === 'government-plan')) ||
            (item.id === 'home' && (currentScreen === 'news' || currentScreen === 'news-detail' || currentScreen === 'voter-info' || currentScreen === 'poll-workers' || currentScreen.startsWith('admin-')));
          
          return (
            <button
              key={item.id}
              id={`${item.id}-tab`}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 relative ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
              )}
              <Icon className={`w-5 h-5 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
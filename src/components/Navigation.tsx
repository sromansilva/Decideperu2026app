import { Home, Calendar, Users, Newspaper, MoreHorizontal } from 'lucide-react';
import type { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as Screen, label: 'Inicio', icon: Home },
    { id: 'calendar' as Screen, label: 'Calendario', icon: Calendar },
    { id: 'candidates' as Screen, label: 'Candidatos', icon: Users },
    { id: 'news' as Screen, label: 'Noticias', icon: Newspaper },
    { id: 'more' as Screen, label: 'Más', icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || 
            (item.id === 'candidates' && (currentScreen === 'candidate-profile' || currentScreen === 'government-plan')) ||
            (item.id === 'news' && currentScreen === 'news-detail');
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { HomeScreen } from './components/HomeScreen';
import { CalendarScreen } from '../components/CalendarScreen';
import { CandidatesScreenImproved as CandidatesScreen } from '../components/CandidatesScreenImproved';
import { CandidateProfile } from '../components/CandidateProfile';
import { GovernmentPlan } from '../components/GovernmentPlan';
import { VoterInfoScreen } from '../components/VoterInfoScreen';
import { PollWorkersScreen } from '../components/PollWorkersScreen';
import { NewsScreen } from '../components/NewsScreen';
import { NewsDetail } from '../components/NewsDetail';
import { Navigation } from './components/Navigation';
import { Tutorial } from './components/Tutorial';
import { AdminIndicator } from './components/AdminIndicator';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { EventDetailModal } from '../components/EventDetailModal';
import type { Screen, Event } from './types';
import {
  getFullDate,
  getEventDescription,
  getEventLocation,
  getEventTime,
  getEventParticipants,
} from './utils/eventHelpers';

// Importar dev tools solo en desarrollo
if (process.env.NODE_ENV === 'development') {
  import('./dev-utils');
}

// Tutorial steps para la app
const tutorialSteps = [
  {
    id: 'step-1',
    title: 'Bienvenido a DecidePerú 2026',
    description: 'Esta es tu plataforma para información electoral confiable. Te guiaremos por las funciones principales.',
    position: 'center' as const,
  },
  {
    id: 'step-2',
    title: 'Pantalla de Inicio',
    description: 'Aquí encontrarás accesos rápidos a todas las funciones principales: buscar tu local de votación, ver candidatos, y más.',
    targetId: 'home-tab',
    position: 'top' as const,
  },
  {
    id: 'step-3',
    title: 'Calendario Electoral',
    description: 'Mantente al día con todos los eventos importantes del proceso electoral.',
    targetId: 'calendar-tab',
    position: 'top' as const,
  },
  {
    id: 'step-4',
    title: 'Conoce a los Candidatos',
    description: 'Explora los perfiles y planes de gobierno de todos los candidatos.',
    targetId: 'candidates-tab',
    position: 'top' as const,
  },
  {
    id: 'step-5',
    title: 'Tu Perfil',
    description: 'Gestiona tu información personal y preferencias de la aplicación.',
    targetId: 'profile-tab',
    position: 'top' as const,
  },
];

function AppContent() {
  const { isAuthenticated, hasCompletedTutorial, completeTutorial } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [showTutorial, setShowTutorial] = useState(!hasCompletedTutorial && isAuthenticated);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);

  const handleCompleteTutorial = () => {
    completeTutorial();
    setShowTutorial(false);
  };

  const handleSkipTutorial = () => {
    completeTutorial();
    setShowTutorial(false);
  };

  const handleShowTutorial = () => {
    setShowTutorial(true);
  };

  const handleOpenNotifications = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleOpenEvent = (event: Event) => {
    // Enriquecer la información del evento
    const enrichedEvent: Event = {
      ...event,
      fullDate: getFullDate(event.title),
      description: getEventDescription(event.title),
      location: getEventLocation(event.title),
      time: getEventTime(event.title),
      participants: getEventParticipants(event.title),
    };
    setSelectedEvent(enrichedEvent);
    setShowEventDetail(true);
  };

  const handleCloseEventDetail = () => {
    setShowEventDetail(false);
    setSelectedEvent(null);
  };

  // Pantalla de autenticación
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onNavigate={setCurrentScreen} 
            onShowTutorial={handleShowTutorial}
            onOpenNotifications={handleOpenNotifications}
            onOpenEvent={handleOpenEvent}
          />
        );
      case 'calendar':
        return <CalendarScreen />;
      case 'candidates':
        return (
          <CandidatesScreen
            onSelectCandidate={(candidate) => {
              setSelectedCandidate(candidate);
              setCurrentScreen('candidate-profile');
            }}
          />
        );
      case 'candidate-profile':
        return (
          <CandidateProfile
            candidate={selectedCandidate}
            onBack={() => setCurrentScreen('candidates')}
            onViewPlan={() => setCurrentScreen('government-plan')}
          />
        );
      case 'government-plan':
        return (
          <GovernmentPlan
            candidate={selectedCandidate}
            onBack={() => setCurrentScreen('candidate-profile')}
          />
        );
      case 'voter-info':
        return <VoterInfoScreen />;
      case 'poll-workers':
        return <PollWorkersScreen />;
      case 'news':
        return (
          <NewsScreen
            onSelectNews={(news) => {
              setSelectedNews(news);
              setCurrentScreen('news-detail');
            }}
          />
        );
      case 'news-detail':
        return (
          <NewsDetail
            news={selectedNews}
            onBack={() => setCurrentScreen('news')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            onNavigate={setCurrentScreen}
          />
        );
      default:
        return (
          <HomeScreen 
            onNavigate={setCurrentScreen} 
            onShowTutorial={handleShowTutorial}
            onOpenNotifications={handleOpenNotifications}
            onOpenEvent={handleOpenEvent}
          />
        );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative pb-20">
      {/* Indicador sutil de modo administrador */}
      <AdminIndicator />
      
      {renderScreen()}
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <NotificationsPanel isOpen={showNotifications} onClose={handleCloseNotifications} />
      <EventDetailModal event={selectedEvent} isOpen={showEventDetail} onClose={handleCloseEventDetail} />
      
      {/* Tutorial interactivo */}
      {showTutorial && (
        <Tutorial
          steps={tutorialSteps}
          onComplete={handleCompleteTutorial}
          onSkip={handleSkipTutorial}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
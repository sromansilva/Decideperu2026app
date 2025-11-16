import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { CandidatesScreen } from './components/CandidatesScreen';
import { CandidateProfile } from './components/CandidateProfile';
import { GovernmentPlan } from './components/GovernmentPlan';
import { VoterInfoScreen } from './components/VoterInfoScreen';
import { PollWorkersScreen } from './components/PollWorkersScreen';
import { NewsScreen } from './components/NewsScreen';
import { NewsDetail } from './components/NewsDetail';
import { Navigation } from './components/Navigation';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { NotificationsPanel } from './components/NotificationsPanel';
import { EventDetailModal } from './components/EventDetailModal';
import { Clock, Calendar, TrendingUp } from 'lucide-react';

export type Screen = 'home' | 'calendar' | 'candidates' | 'candidate-profile' | 'government-plan' | 'voter-info' | 'poll-workers' | 'news' | 'news-detail' | 'more';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    return !hasSeenOnboarding;
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  const handleShowTutorial = () => {
    setShowOnboarding(true);
  };

  const handleOpenNotifications = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleOpenEvent = (event: any) => {
    // Enriquecer la información del evento
    const enrichedEvent = {
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

  // Funciones auxiliares para enriquecer información de eventos
  const getFullDate = (title: string) => {
    if (title.includes('Inscripción')) return 'Domingo 15 de Diciembre, 2025';
    if (title.includes('Primera vuelta')) return 'Domingo 11 de Abril, 2026';
    if (title.includes('Debates')) return 'Durante todo Marzo, 2026';
    return '';
  };

  const getEventDescription = (title: string) => {
    if (title.includes('Inscripción')) {
      return 'Último día para que los partidos políticos y movimientos presenten sus candidatos ante el Jurado Nacional de Elecciones. Después de esta fecha no se aceptarán más inscripciones.';
    }
    if (title.includes('Primera vuelta')) {
      return 'Elección general donde todos los ciudadanos peruanos mayores de 18 años ejercerán su derecho al voto para elegir Presidente, Vicepresidentes y Congresistas de la República.';
    }
    if (title.includes('Debates')) {
      return 'Serie de debates presidenciales organizados por el JNE donde los candidatos presentarán sus propuestas en temas como economía, salud, educación, seguridad y más.';
    }
    return '';
  };

  const getEventLocation = (title: string) => {
    if (title.includes('Inscripción')) return 'Jurado Nacional de Elecciones - Lima, Perú';
    if (title.includes('Primera vuelta')) return 'Locales de votación a nivel nacional';
    if (title.includes('Debates')) return 'Gran Teatro Nacional - Lima, Perú';
    return undefined;
  };

  const getEventTime = (title: string) => {
    if (title.includes('Inscripción')) return 'Hasta las 23:59';
    if (title.includes('Primera vuelta')) return '08:00 AM - 04:00 PM';
    if (title.includes('Debates')) return 'Por confirmar';
    return undefined;
  };

  const getEventParticipants = (title: string) => {
    if (title.includes('Inscripción')) return 'Partidos políticos y movimientos';
    if (title.includes('Primera vuelta')) return 'Todos los ciudadanos peruanos';
    if (title.includes('Debates')) return 'Candidatos presidenciales registrados';
    return undefined;
  };

  if (showOnboarding) {
    return <OnboardingTutorial onComplete={handleCompleteOnboarding} />;
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
      case 'more':
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="mb-4">Más opciones</h1>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentScreen('voter-info')}
                className="w-full bg-white p-4 rounded-lg shadow-sm text-left"
              >
                Información del Elector
              </button>
              <button
                onClick={() => setCurrentScreen('poll-workers')}
                className="w-full bg-white p-4 rounded-lg shadow-sm text-left"
              >
                Miembros de Mesa
              </button>
            </div>
          </div>
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
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative pb-20">
      {renderScreen()}
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <NotificationsPanel isOpen={showNotifications} onClose={handleCloseNotifications} />
      <EventDetailModal event={selectedEvent} isOpen={showEventDetail} onClose={handleCloseEventDetail} />
    </div>
  );
}
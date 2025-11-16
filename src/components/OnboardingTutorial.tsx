import { useState } from 'react';
import { Calendar, Users, Newspaper, MapPin, FileText, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingTutorialProps {
  onComplete: () => void;
}

export function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: MapPin,
      title: 'Bienvenido a DecidePerú 2026',
      description: 'Tu compañero digital para estar informado en el proceso electoral',
      color: 'bg-red-600',
      features: [
        'Información confiable y actualizada',
        'Acceso rápido a datos electorales',
        'Diseñado pensando en ti',
      ],
    },
    {
      icon: Calendar,
      title: 'Calendario Electoral',
      description: 'Mantente al día con todas las fechas importantes del proceso electoral',
      color: 'bg-orange-600',
      features: [
        'Fechas de inscripción de candidatos',
        'Cronograma de eventos electorales',
        'Recordatorios importantes',
      ],
    },
    {
      icon: Users,
      title: 'Conoce a los Candidatos',
      description: 'Accede a información completa sobre todos los candidatos registrados',
      color: 'bg-purple-600',
      features: [
        'Biografías y trayectorias',
        'Planes de gobierno detallados',
        'Propuestas por sector',
      ],
    },
    {
      icon: MapPin,
      title: 'Tu Local de Votación',
      description: 'Encuentra fácilmente dónde te toca votar y toda la información necesaria',
      color: 'bg-blue-600',
      features: [
        'Ubicación exacta en el mapa',
        'Número de mesa asignada',
        'Instrucciones para votar',
      ],
    },
    {
      icon: Newspaper,
      title: 'Mantente Informado',
      description: 'Noticias verificadas y actualizaciones del proceso electoral',
      color: 'bg-green-600',
      features: [
        'Fuentes oficiales confiables',
        'Actualizaciones en tiempo real',
        'Sin desinformación',
      ],
    },
    {
      icon: FileText,
      title: '¡Todo Listo!',
      description: 'Ahora estás preparado para usar DecidePerú 2026 y ejercer tu voto informado',
      color: 'bg-red-700',
      features: [
        'Explora todas las funciones',
        'Comparte con tu familia',
        'Vota informado en 2026',
      ],
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-700 via-red-800 to-red-900 z-50 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col h-full">
        {/* Skip Button */}
        {!isLastSlide && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSkip}
              className="text-white/80 hover:text-white text-sm flex items-center gap-1"
            >
              Saltar tutorial
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Icon */}
          <div className={`${slide.color} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform transition-all duration-500`}>
            <Icon className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-white text-center mb-4">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-white/90 text-center mb-8 px-4">
            {slide.description}
          </p>

          {/* Features */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <ul className="space-y-3">
              {slide.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-white">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">
                    ✓
                  </span>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/30 w-2'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentSlide > 0 && (
            <Button
              onClick={handlePrev}
              variant="outline"
              className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 py-6"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Anterior
            </Button>
          )}
          <Button
            onClick={handleNext}
            className={`flex-1 bg-white text-red-700 hover:bg-white/90 py-6 ${
              currentSlide === 0 ? 'w-full' : ''
            }`}
          >
            {isLastSlide ? '¡Comenzar!' : 'Siguiente'}
            {!isLastSlide && <ChevronRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

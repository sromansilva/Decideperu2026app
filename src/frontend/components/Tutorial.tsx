import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetId?: string; // ID del elemento a resaltar
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface TutorialProps {
  steps: TutorialStep[];
  onComplete: () => void;
  onSkip: () => void;
}

export function Tutorial({ steps, onComplete, onSkip }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const currentStepData = steps[currentStep];

  // Calcular posición del elemento objetivo
  useEffect(() => {
    if (currentStepData?.targetId) {
      const element = document.getElementById(currentStepData.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      }
    } else {
      setTargetRect(null);
    }
  }, [currentStep, currentStepData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  // Calcular posición de la tarjeta tutorial con límites seguros
  const getCardPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cardWidth = 320; // Ancho máximo de la tarjeta
    const cardHeight = 180; // Altura estimada de la tarjeta
    const padding = 16;
    const safeMargin = 8; // Margen de seguridad adicional

    if (!targetRect || currentStepData.position === 'center') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: `${Math.min(cardWidth, viewportWidth - padding * 2)}px`,
      };
    }

    let position: any = {
      maxWidth: `${Math.min(cardWidth, viewportWidth - padding * 2)}px`,
    };

    switch (currentStepData.position) {
      case 'top':
        // Posicionar arriba del elemento, pero verificar que no salga de la pantalla
        const topPos = targetRect.top - cardHeight - padding;
        if (topPos < safeMargin) {
          // Si no cabe arriba, poner abajo
          position = {
            top: `${targetRect.bottom + padding}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: position.maxWidth,
          };
        } else {
          position = {
            bottom: `${viewportHeight - targetRect.top + padding}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: position.maxWidth,
          };
        }
        break;
      case 'bottom':
        // Posicionar abajo del elemento
        const bottomPos = targetRect.bottom + cardHeight + padding;
        if (bottomPos > viewportHeight - safeMargin) {
          // Si no cabe abajo, poner arriba
          position = {
            bottom: `${viewportHeight - targetRect.top + padding}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: position.maxWidth,
          };
        } else {
          position = {
            top: `${targetRect.bottom + padding}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: position.maxWidth,
          };
        }
        break;
      case 'left':
        position = {
          top: `${Math.max(safeMargin, Math.min(targetRect.top + targetRect.height / 2, viewportHeight - cardHeight - safeMargin))}px`,
          right: `${viewportWidth - targetRect.left + padding}px`,
          transform: 'translateY(-50%)',
          maxWidth: position.maxWidth,
        };
        break;
      case 'right':
        position = {
          top: `${Math.max(safeMargin, Math.min(targetRect.top + targetRect.height / 2, viewportHeight - cardHeight - safeMargin))}px`,
          left: `${Math.min(targetRect.right + padding, viewportWidth - cardWidth - safeMargin)}px`,
          transform: 'translateY(-50%)',
          maxWidth: position.maxWidth,
        };
        break;
    }

    return position;
  };

  return (
    <AnimatePresence>
      {currentStepData && (
        <>
          {/* Overlay oscuro con spotlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {/* Fondo oscuro */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Spotlight en el elemento objetivo */}
            {targetRect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute rounded-xl"
                style={{
                  top: `${targetRect.top - 8}px`,
                  left: `${targetRect.left - 8}px`,
                  width: `${targetRect.width + 16}px`,
                  height: `${targetRect.height + 16}px`,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
                  border: '2px solid rgb(239 68 68)',
                }}
              />
            )}
          </motion.div>

          {/* Tarjeta de tutorial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[60] pointer-events-auto"
            style={getCardPosition()}
          >
            <div className="bg-card border-2 border-primary rounded-2xl shadow-2xl p-4 mx-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs font-medium">
                        {currentStep + 1}
                      </span>
                    </div>
                    <h3 className="text-foreground text-sm leading-tight">{currentStepData.title}</h3>
                  </div>
                </div>
                <button
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contenido */}
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                {currentStepData.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3">
                {/* Indicadores de progreso */}
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? 'w-5 bg-primary'
                          : index < currentStep
                          ? 'w-1 bg-primary/50'
                          : 'w-1 bg-muted'
                      }`}
                    />
                  ))}
                </div>

                {/* Botones */}
                <div className="flex gap-2 flex-shrink-0">
                  {currentStep < steps.length - 1 ? (
                    <>
                      <button
                        onClick={handleSkip}
                        className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Saltar
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-1 text-xs"
                      >
                        Siguiente
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors text-xs"
                    >
                      Finalizar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
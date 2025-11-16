import { X, Calendar, MapPin, Clock, Users, Bell, Share2, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface EventDetail {
  title: string;
  date: string;
  fullDate: string;
  description: string;
  location?: string;
  time?: string;
  participants?: string;
  icon: any;
  color: string;
}

interface EventDetailModalProps {
  event: EventDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  if (!isOpen || !event) return null;

  const Icon = event.icon;

  const handleAddToCalendar = () => {
    // Simular agregar al calendario
    alert('Evento agregado a tu calendario');
  };

  const handleSetReminder = () => {
    // Simular configurar recordatorio
    alert('Se configuró un recordatorio para este evento');
  };

  const handleShare = () => {
    // Simular compartir
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.title} - ${event.fullDate}`,
      });
    } else {
      alert('Evento copiado al portapapeles');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className={`${event.color.replace('bg-', 'bg-gradient-to-br from-').replace('-50', '-600')} ${event.color.replace('bg-', 'to-').replace('-50', '-700')} text-white p-6 pb-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Icon className="w-8 h-8" />
            </div>
            <div className="flex-1 pt-1">
              <h2 className="text-xl mb-2">{event.title}</h2>
              <p className="text-sm text-white/90">{event.fullDate}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-2">Descripción</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-6">
            {event.time && (
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Hora</p>
                  <p className="text-sm text-gray-600">{event.time}</p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-start gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Ubicación</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                </div>
              </div>
            )}

            {event.participants && (
              <div className="flex items-start gap-3">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Participantes</p>
                  <p className="text-sm text-gray-600">{event.participants}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCalendar}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar a mi calendario
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSetReminder}
                variant="outline"
                className="flex-1"
              >
                <Bell className="w-4 h-4 mr-2" />
                Recordatorio
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

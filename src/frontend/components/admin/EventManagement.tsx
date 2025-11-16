import { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Calendar as CalendarIcon, MapPin, Clock, Users, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchBar } from '../../../components/SearchBar';
import { Badge } from '../../../components/ui/badge';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'electoral' | 'capacity' | 'deadline' | 'general';
  participants?: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface EventManagementProps {
  onBack: () => void;
}

export function EventManagement({ onBack }: EventManagementProps) {
  const [view, setView] = useState<'list' | 'calendar' | 'create' | 'edit'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Inicio de inscripción de candidatos',
      date: '2026-03-15',
      time: '08:00',
      location: 'Jurado Nacional de Elecciones',
      description: 'Apertura del periodo de inscripción para candidatos presidenciales y congresales.',
      category: 'deadline',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Publicación del padrón electoral',
      date: '2026-04-01',
      time: '09:00',
      location: 'ONPE - Portal Web',
      description: 'Padrón electoral definitivo disponible para consulta ciudadana.',
      category: 'electoral',
      participants: 45231,
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Capacitación a miembros de mesa',
      date: '2026-03-25',
      time: '14:00',
      location: 'Lima - Diversos locales',
      description: 'Capacitación presencial para miembros de mesa designados.',
      category: 'capacity',
      participants: 1500,
      status: 'upcoming',
    },
    {
      id: 4,
      title: 'Elecciones Generales - Primera Vuelta',
      date: '2026-04-08',
      time: '08:00',
      location: 'A nivel nacional',
      description: 'Jornada electoral para elección de presidente, vicepresidentes y congresistas.',
      category: 'electoral',
      participants: 25000000,
      status: 'upcoming',
    },
  ]);

  const categories = [
    { id: 'electoral', label: 'Electoral', color: 'bg-blue-500' },
    { id: 'capacity', label: 'Capacitación', color: 'bg-green-500' },
    { id: 'deadline', label: 'Fecha límite', color: 'bg-orange-500' },
    { id: 'general', label: 'General', color: 'bg-purple-500' },
  ];

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming').sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getCategoryColor = (category: string) => {
    return categories.find(c => c.id === category)?.color || 'bg-muted';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próximo';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setShowDeleteDialog(false);
  };

  // LIST VIEW
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white px-6 py-8">
          <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">Gestión de Eventos</h1>
          <p className="text-white/80 text-xs">Calendario y eventos electorales</p>
        </div>

        {/* Search */}
        <div className="px-6 -mt-4 mb-4">
          <SearchBar
            placeholder="Buscar eventos..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Action Buttons */}
        <div className="px-6 mb-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setView('create')}
            className="py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Crear Evento
          </button>
          <button
            onClick={() => setView('calendar')}
            className="py-3 bg-muted hover:bg-muted/80 text-foreground rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <CalendarIcon className="w-5 h-5" />
            Ver Calendario
          </button>
        </div>

        {/* Stats */}
        <div className="px-6 mb-4 grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-foreground font-medium">{events.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-primary font-medium">{upcomingEvents.length}</p>
            <p className="text-xs text-muted-foreground">Próximos</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-success font-medium">
              {events.filter(e => e.status === 'completed').length}
            </p>
            <p className="text-xs text-muted-foreground">Completados</p>
          </div>
        </div>

        {/* Events List */}
        <div className="px-6">
          <h2 className="text-sm text-foreground font-medium mb-4">
            Próximos Eventos
          </h2>

          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 ${getCategoryColor(event.category)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-foreground font-medium text-sm line-clamp-2">{event.title}</h3>
                      <Badge variant="outline" className={`text-xs flex-shrink-0 ${getStatusColor(event.status)}`}>
                        {getStatusLabel(event.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{event.description}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{new Date(event.date).toLocaleDateString('es-PE', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{event.time}h</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      {event.participants && (
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          <span>{event.participants.toLocaleString()} participantes estimados</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setView('edit');
                    }}
                    className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowDeleteDialog(true);
                    }}
                    className="flex-1 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delete Dialog */}
        <AnimatePresence>
          {showDeleteDialog && selectedEvent && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDeleteDialog(false)}
                className="fixed inset-0 bg-black/50 z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-card border border-border rounded-2xl p-6 z-[60]"
              >
                <h3 className="text-foreground font-medium mb-2">Eliminar Evento</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  ¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteDialog(false)}
                    className="flex-1 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDelete(selectedEvent.id)}
                    className="flex-1 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // CALENDAR VIEW
  if (view === 'calendar') {
    const eventsByMonth = events.reduce((acc, event) => {
      const month = new Date(event.date).toLocaleDateString('es-PE', { year: 'numeric', month: 'long' });
      if (!acc[month]) acc[month] = [];
      acc[month].push(event);
      return acc;
    }, {} as Record<string, Event[]>);

    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white px-6 py-8">
          <button onClick={() => setView('list')} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">Calendario de Eventos</h1>
          <p className="text-white/80 text-xs">Vista cronológica</p>
        </div>

        {/* Calendar */}
        <div className="px-6 py-6">
          {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
            <div key={month} className="mb-6">
              <h3 className="text-foreground font-medium text-sm mb-3 sticky top-0 bg-background py-2">
                {month}
              </h3>
              <div className="space-y-2">
                {monthEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
                  <div key={event.id} className="bg-card border border-border rounded-lg p-3 flex gap-3">
                    <div className="text-center flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-xs text-primary">
                          {new Date(event.date).toLocaleDateString('es-PE', { month: 'short' })}
                        </span>
                        <span className="text-lg text-primary font-medium">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-foreground text-sm font-medium mb-1 line-clamp-1">{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}h</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // CREATE/EDIT FORM
  if (view === 'create' || view === 'edit') {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white px-6 py-8">
          <button onClick={() => setView('list')} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">
            {view === 'create' ? 'Nuevo Evento' : 'Editar Evento'}
          </h1>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Título del Evento *</label>
            <input
              type="text"
              placeholder="Ej: Capacitación a miembros de mesa"
              defaultValue={view === 'edit' ? selectedEvent?.title : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-2 font-medium">Fecha *</label>
              <input
                type="date"
                defaultValue={view === 'edit' ? selectedEvent?.date : ''}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-2 font-medium">Hora *</label>
              <input
                type="time"
                defaultValue={view === 'edit' ? selectedEvent?.time : ''}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Lugar *</label>
            <input
              type="text"
              placeholder="Ubicación del evento"
              defaultValue={view === 'edit' ? selectedEvent?.location : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Categoría *</label>
            <select
              defaultValue={view === 'edit' ? selectedEvent?.category : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Descripción *</label>
            <textarea
              rows={4}
              placeholder="Descripción detallada del evento..."
              defaultValue={view === 'edit' ? selectedEvent?.description : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Participantes Estimados</label>
            <input
              type="number"
              placeholder="Ej: 1500"
              defaultValue={view === 'edit' ? selectedEvent?.participants : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Estado *</label>
            <select
              defaultValue={view === 'edit' ? selectedEvent?.status : 'upcoming'}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="upcoming">Próximo</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setView('list')}
              className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => setView('list')}
              className="flex-1 py-3 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {view === 'create' ? 'Crear' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

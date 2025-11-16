import { useState } from 'react';
import { ArrowLeft, Send, Bell, Users, User, Calendar, Newspaper, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '../../../components/ui/badge';

interface NotificationSenderProps {
  onBack: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'news' | 'event' | 'reminder' | 'update';
  target: 'all' | 'specific' | 'candidate-followers';
  targetDetails?: string;
  sentAt: string;
  recipients: number;
  status: 'sent' | 'scheduled' | 'draft';
}

export function NotificationSender({ onBack }: NotificationSenderProps) {
  const [view, setView] = useState<'form' | 'history'>('form');
  const [selectedType, setSelectedType] = useState<'news' | 'event' | 'reminder' | 'update'>('news');
  const [selectedTarget, setSelectedTarget] = useState<'all' | 'specific' | 'candidate-followers'>('all');

  const notificationHistory: Notification[] = [
    {
      id: 1,
      title: 'Nuevo evento electoral programado',
      message: 'Se ha agregado un nuevo evento al calendario electoral.',
      type: 'event',
      target: 'all',
      sentAt: '2026-01-15T10:30:00',
      recipients: 45231,
      status: 'sent',
    },
    {
      id: 2,
      title: 'Actualización de propuestas',
      message: 'Revisa las nuevas propuestas de los candidatos.',
      type: 'news',
      target: 'candidate-followers',
      targetDetails: 'Seguidores de Ana Torres',
      sentAt: '2026-01-14T15:45:00',
      recipients: 12450,
      status: 'sent',
    },
    {
      id: 3,
      title: 'Recordatorio: Verificar local de votación',
      message: 'No olvides verificar tu local de votación.',
      type: 'reminder',
      target: 'all',
      sentAt: '2026-01-16T09:00:00',
      recipients: 45231,
      status: 'scheduled',
    },
  ];

  const notificationTypes = [
    { id: 'news', label: 'Noticia', icon: Newspaper, color: 'from-purple-500 to-purple-600' },
    { id: 'event', label: 'Evento', icon: Calendar, color: 'from-green-500 to-green-600' },
    { id: 'reminder', label: 'Recordatorio', icon: Bell, color: 'from-orange-500 to-orange-600' },
    { id: 'update', label: 'Actualización', icon: AlertTriangle, color: 'from-blue-500 to-blue-600' },
  ];

  const targetOptions = [
    { id: 'all', label: 'Todos los usuarios', description: '45,231 usuarios' },
    { id: 'candidate-followers', label: 'Seguidores de candidato', description: 'Seleccionar candidato' },
    { id: 'specific', label: 'Usuarios específicos', description: 'Buscar usuarios' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-success/10 text-success border-success/20';
      case 'scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'draft': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'sent': return 'Enviada';
      case 'scheduled': return 'Programada';
      case 'draft': return 'Borrador';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    const typeObj = notificationTypes.find(t => t.id === type);
    return typeObj?.icon || Bell;
  };

  if (view === 'form') {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white px-6 py-8">
          <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">Envío de Notificaciones</h1>
          <p className="text-white/80 text-xs">Crear y programar notificaciones push</p>
        </div>

        {/* Quick Access */}
        <div className="px-6 -mt-6 mb-6">
          <button
            onClick={() => setView('history')}
            className="w-full bg-card border border-border rounded-xl p-4 shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-foreground text-sm font-medium">Ver Historial</p>
                <p className="text-xs text-muted-foreground">{notificationHistory.length} notificaciones enviadas</p>
              </div>
            </div>
            <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</div>
          </button>
        </div>

        {/* Form */}
        <div className="px-6 space-y-6">
          {/* Notification Type */}
          <div>
            <h3 className="text-foreground text-sm font-medium mb-3">Tipo de Notificación</h3>
            <div className="grid grid-cols-2 gap-3">
              {notificationTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-2 mx-auto`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs text-foreground font-medium text-center">{type.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-foreground text-sm font-medium mb-3">Contenido</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Título *</label>
                <input
                  type="text"
                  placeholder="Título de la notificación"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Mensaje *</label>
                <textarea
                  rows={4}
                  placeholder="Mensaje completo de la notificación..."
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          </div>

          {/* Target */}
          <div>
            <h3 className="text-foreground text-sm font-medium mb-3">Destinatarios</h3>
            <div className="space-y-2">
              {targetOptions.map((option) => {
                const isSelected = selectedTarget === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedTarget(option.id as any)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        isSelected ? 'border-primary bg-primary' : 'border-border'
                      } flex items-center justify-center`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium">{option.label}</p>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Conditional Fields */}
            {selectedTarget === 'candidate-followers' && (
              <div className="mt-3">
                <select className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Seleccionar candidato</option>
                  <option value="1">Ana María Torres (12,450 seguidores)</option>
                  <option value="2">Carlos Mendoza (8,320 seguidores)</option>
                  <option value="3">María Vega (10,120 seguidores)</option>
                </select>
              </div>
            )}

            {selectedTarget === 'specific' && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Buscar usuarios por nombre o DNI..."
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-foreground text-sm font-medium mb-3">Programación</h3>
            <div className="space-y-2">
              <button className="w-full p-4 rounded-xl border-2 border-primary bg-primary/5 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium">Enviar ahora</p>
                    <p className="text-xs text-muted-foreground">Notificación inmediata</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 rounded-xl border-2 border-border bg-card hover:border-primary/30 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-border" />
                  <div>
                    <p className="text-sm text-foreground font-medium">Programar envío</p>
                    <p className="text-xs text-muted-foreground">Seleccionar fecha y hora</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-foreground text-sm font-medium mb-3">Vista Previa</h3>
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium mb-1">
                    Título de la notificación
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mensaje de la notificación aparecerá aquí
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Ahora</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-4">
            <button className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors text-sm">
              Guardar Borrador
            </button>
            <button className="flex-1 py-3 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // HISTORY VIEW
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white px-6 py-8">
        <button onClick={() => setView('form')} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white text-xl mb-1">Historial de Notificaciones</h1>
        <p className="text-white/80 text-xs">Notificaciones enviadas y programadas</p>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
            <p className="text-2xl text-foreground font-medium">{notificationHistory.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
            <p className="text-2xl text-success font-medium">
              {notificationHistory.filter(n => n.status === 'sent').length}
            </p>
            <p className="text-xs text-muted-foreground">Enviadas</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
            <p className="text-2xl text-primary font-medium">
              {notificationHistory.filter(n => n.status === 'scheduled').length}
            </p>
            <p className="text-xs text-muted-foreground">Programadas</p>
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="px-6">
        <h2 className="text-sm text-foreground font-medium mb-4">Últimas Notificaciones</h2>
        <div className="space-y-3">
          {notificationHistory.map((notification) => {
            const Icon = getTypeIcon(notification.type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-foreground font-medium text-sm line-clamp-1">{notification.title}</h3>
                      <Badge variant="outline" className={`text-xs flex-shrink-0 ${getStatusColor(notification.status)}`}>
                        {getStatusLabel(notification.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{notification.recipients.toLocaleString()} destinatarios</span>
                      <span>•</span>
                      <span>{new Date(notification.sentAt).toLocaleString('es-PE', { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>
                    {notification.targetDetails && (
                      <p className="text-xs text-primary mt-1">{notification.targetDetails}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

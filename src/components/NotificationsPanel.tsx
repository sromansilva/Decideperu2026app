import { useState } from 'react';
import { X, Bell, Calendar, Users, Newspaper, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'event';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'event',
      title: 'Inscripción de candidatos cierra pronto',
      message: 'Quedan solo 30 días para el cierre de inscripciones',
      time: 'Hace 2 horas',
      read: false,
      icon: Calendar,
    },
    {
      id: '2',
      type: 'info',
      title: 'Nuevo candidato registrado',
      message: 'María González ha presentado su candidatura presidencial',
      time: 'Hace 5 horas',
      read: false,
      icon: Users,
    },
    {
      id: '3',
      type: 'success',
      title: 'Tu mesa de votación está confirmada',
      message: 'Mesa N° 042156 - I.E. San Martín de Porres',
      time: 'Ayer',
      read: true,
      icon: CheckCircle,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Debates presidenciales anunciados',
      message: 'Se han confirmado las fechas para los debates de marzo 2026',
      time: 'Hace 2 días',
      read: true,
      icon: AlertCircle,
    },
    {
      id: '5',
      type: 'info',
      title: 'Actualización de planes de gobierno',
      message: '5 candidatos han actualizado sus propuestas',
      time: 'Hace 3 días',
      read: true,
      icon: Newspaper,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-purple-50 text-purple-600';
      case 'info':
        return 'bg-blue-50 text-blue-600';
      case 'success':
        return 'bg-green-50 text-green-600';
      case 'warning':
        return 'bg-orange-50 text-orange-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white p-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl">Notificaciones</h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-red-100">{unreadCount} sin leer</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full"
            >
              Marcar todas como leídas
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100%-180px)] p-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-900 mb-2">No tienes notificaciones</p>
              <p className="text-sm text-gray-600">
                Te avisaremos cuando haya novedades
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`bg-white rounded-xl shadow-sm p-4 border cursor-pointer transition-all hover:shadow-md ${
                      notification.read ? 'border-gray-100' : 'border-red-200 bg-red-50/30'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`${getTypeColor(notification.type)} p-2 rounded-xl h-fit`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-red-600 rounded-full shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

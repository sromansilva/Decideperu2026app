import { Search, Calendar, Users, FileText, User, MapPin, Bell, ChevronRight, Info, Newspaper, Clock, TrendingUp } from 'lucide-react';
import type { Screen } from '../App';
import { Button } from './ui/button';
import { useState } from 'react';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onShowTutorial?: () => void;
  onOpenNotifications: () => void;
  onOpenEvent: (event: any) => void;
}

export function HomeScreen({ onNavigate, onShowTutorial, onOpenNotifications, onOpenEvent }: HomeScreenProps) {
  const quickAccess = [
    {
      id: 'voter-info',
      title: 'Mi Local de Votación',
      description: 'Encuentra dónde votar',
      icon: MapPin,
      color: 'from-red-600 to-red-700',
      iconBg: 'bg-red-500',
    },
    {
      id: 'candidates',
      title: 'Candidatos 2026',
      description: 'Conoce sus propuestas',
      icon: Users,
      color: 'from-orange-600 to-orange-700',
      iconBg: 'bg-orange-500',
    },
    {
      id: 'calendar',
      title: 'Calendario Electoral',
      description: 'Fechas importantes',
      icon: Calendar,
      color: 'from-purple-600 to-purple-700',
      iconBg: 'bg-purple-500',
    },
    {
      id: 'news',
      title: 'Noticias',
      description: 'Información verificada',
      icon: Newspaper,
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-500',
    },
  ];

  const highlights = [
    {
      title: 'Inscripción de candidatos',
      date: 'Hasta: 15 Dic 2025',
      icon: Clock,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      title: 'Primera vuelta',
      date: '11 Abril 2026',
      icon: Calendar,
      color: 'text-red-600 bg-red-50',
    },
    {
      title: 'Debates presidenciales',
      date: 'Marzo 2026',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white px-6 pt-8 pb-12 rounded-b-3xl shadow-xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-1 text-2xl">DecidePerú 2026</h1>
            <p className="text-red-100 text-sm">Tu voto informado importa</p>
          </div>
          <button className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors" onClick={onOpenNotifications}>
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Busca candidatos, noticias, tu local..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
          />
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-5 mb-6 border border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-red-50 rounded-xl p-3 mb-2">
                <Users className="w-6 h-6 text-red-600 mx-auto" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">24</p>
              <p className="text-xs text-gray-600">Candidatos</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-xl p-3 mb-2">
                <Calendar className="w-6 h-6 text-purple-600 mx-auto" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">147</p>
              <p className="text-xs text-gray-600">Días restantes</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 rounded-xl p-3 mb-2">
                <FileText className="w-6 h-6 text-blue-600 mx-auto" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">12</p>
              <p className="text-xs text-gray-600">Noticias hoy</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            Próximos Eventos
          </h2>
          <div className="space-y-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onOpenEvent(item)}
                >
                  <div className={`${item.color} rounded-xl p-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.date}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Access */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3">Acceso Rápido</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickAccess.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as Screen)}
                  className="bg-white rounded-2xl shadow-lg p-5 text-left hover:shadow-xl transition-all hover:scale-105 border border-gray-100 group"
                >
                  <div className={`bg-gradient-to-br ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Info className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">¿Primera vez votando?</h3>
              <p className="text-sm text-blue-100 mb-4">
                Aprende todo lo que necesitas saber para ejercer tu derecho al voto de manera informada.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 w-full" onClick={onShowTutorial}>
                Ver Tutorial Completo
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3">Más Información</h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('poll-workers')}
              className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-3 rounded-xl">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-900 text-sm mb-1">Miembros de Mesa</h3>
                  <p className="text-xs text-gray-600">Guía completa para miembros</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
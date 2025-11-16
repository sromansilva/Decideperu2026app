import { useState } from 'react';
import { Calendar, Users, Vote, FileCheck, Bell } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

export function CalendarScreen() {
  const [activeTab, setActiveTab] = useState('general');

  const generalEvents = [
    {
      date: '15 Marzo 2026',
      title: 'Inicio de inscripción de candidatos',
      description: 'Apertura del periodo de inscripción para candidatos presidenciales y congresales',
      icon: FileCheck,
    },
    {
      date: '20 Marzo 2026',
      title: 'Cierre de inscripción de candidatos',
      description: 'Fecha límite para presentar candidaturas ante el JNE',
      icon: FileCheck,
    },
    {
      date: '1 Abril 2026',
      title: 'Publicación del padrón electoral',
      description: 'Padrón electoral definitivo disponible para consulta ciudadana',
      icon: Users,
    },
    {
      date: '5 Abril 2026',
      title: 'Inicio de campaña electoral',
      description: 'Comienza el periodo oficial de propaganda electoral',
      icon: Bell,
    },
    {
      date: '8 Abril 2026',
      title: 'Elecciones Generales - Primera Vuelta',
      description: 'Jornada electoral para elección de presidente, vicepresidentes y congresistas',
      icon: Vote,
    },
    {
      date: '7 Junio 2026',
      title: 'Segunda Vuelta Electoral',
      description: 'Votación entre los dos candidatos presidenciales más votados',
      icon: Vote,
    },
  ];

  const citizenEvents = [
    {
      date: '1 Marzo 2026',
      title: 'Verificación de datos en el padrón',
      description: 'Revisa tus datos personales y lugar de votación',
      icon: FileCheck,
    },
    {
      date: '1 Abril 2026',
      title: 'Consulta tu local de votación',
      description: 'Conoce dónde te corresponde votar',
      icon: Users,
    },
    {
      date: '5 Abril 2026',
      title: 'Infórmate sobre los candidatos',
      description: 'Periodo para conocer las propuestas de los candidatos',
      icon: Bell,
    },
    {
      date: '8 Abril 2026',
      title: 'Día de votación',
      description: 'Acude a tu local de votación con tu DNI',
      icon: Vote,
    },
  ];

  const pollWorkerEvents = [
    {
      date: '25 Marzo 2026',
      title: 'Sorteo de miembros de mesa',
      description: 'Sorteo público para designación de miembros de mesa',
      icon: Users,
    },
    {
      date: '28 Marzo 2026',
      title: 'Notificación a miembros de mesa',
      description: 'Los ciudadanos sorteados reciben su notificación oficial',
      icon: Bell,
    },
    {
      date: '1-7 Abril 2026',
      title: 'Capacitación obligatoria',
      description: 'Talleres presenciales y virtuales para miembros de mesa',
      icon: FileCheck,
    },
    {
      date: '8 Abril 2026',
      title: 'Instalación de mesas de votación',
      description: 'Presentarse a las 7:00 AM para instalación',
      icon: Vote,
    },
  ];

  const getEvents = () => {
    switch (activeTab) {
      case 'citizens':
        return citizenEvents;
      case 'poll-workers':
        return pollWorkerEvents;
      default:
        return generalEvents;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-8">
        <h1>Calendario Electoral 2026</h1>
        <p className="text-red-100 text-sm mt-2">Fechas importantes del proceso electoral</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-white rounded-none h-auto p-0">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none py-3"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="citizens"
              className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none py-3"
            >
              Ciudadanos
            </TabsTrigger>
            <TabsTrigger
              value="poll-workers"
              className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none py-3"
            >
              Miembros de Mesa
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Timeline */}
      <div className="px-6 py-6">
        <div className="space-y-6">
          {getEvents().map((event, index) => {
            const Icon = event.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-red-600 rounded-full p-2">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {index < getEvents().length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 mt-2 flex-1 min-h-[40px]" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="text-sm text-red-600 mb-1">{event.date}</div>
                    <h3 className="text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
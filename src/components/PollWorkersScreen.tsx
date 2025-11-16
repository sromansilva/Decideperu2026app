import { Clock, CheckCircle, FileText, Download } from 'lucide-react';
import { Button } from './ui/button';

export function PollWorkersScreen() {
  const schedule = [
    {
      time: '7:00 AM',
      title: 'Instalación de Mesa',
      description: 'Presentación de miembros de mesa y verificación de materiales',
      icon: Clock,
    },
    {
      time: '8:00 AM - 4:00 PM',
      title: 'Proceso de Sufragio',
      description: 'Recepción de electores y entrega de cédulas de votación',
      icon: CheckCircle,
    },
    {
      time: '4:00 PM - 8:00 PM',
      title: 'Conteo y Cierre',
      description: 'Conteo de votos y elaboración de actas',
      icon: FileText,
    },
  ];

  const instructions = [
    {
      step: 1,
      title: 'Antes del día de votación',
      items: [
        'Confirma tu designación como miembro de mesa',
        'Completa la capacitación obligatoria (presencial o virtual)',
        'Revisa los materiales de capacitación',
        'Prepara tu DNI original',
      ],
    },
    {
      step: 2,
      title: 'Día de votación - Instalación',
      items: [
        'Llega a las 7:00 AM a tu local asignado',
        'Identifícate con tu DNI ante el coordinador',
        'Verifica los materiales de la mesa',
        'Firma el acta de instalación',
      ],
    },
    {
      step: 3,
      title: 'Durante la votación',
      items: [
        'Verifica la identidad de cada elector',
        'Entrega la cédula de votación',
        'Orienta sobre el proceso de marcado',
        'Registra la participación en el padrón',
      ],
    },
    {
      step: 4,
      title: 'Conteo y cierre',
      items: [
        'Cierra la mesa a las 4:00 PM',
        'Realiza el conteo de votos',
        'Completa las actas correspondientes',
        'Entrega los materiales al coordinador',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-8">
        <h1>Miembros de Mesa</h1>
        <p className="text-red-100 text-sm mt-2">Guía completa para miembros de mesa electoral</p>
      </div>

      {/* Schedule Cards */}
      <div className="px-6 py-6">
        <h2 className="text-gray-900 mb-4">Horario del Día Electoral</h2>
        <div className="space-y-4 mb-8">
          {schedule.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-red-600 mb-1">{item.time}</div>
                    <h3 className="text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <h2 className="text-gray-900 mb-4">Instrucciones Paso a Paso</h2>
        <div className="space-y-4 mb-6">
          {instructions.map((section) => (
            <div key={section.step} className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  {section.step}
                </div>
                <h3 className="text-gray-900">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Download Guide */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-sm p-6 text-white text-center mb-6">
          <FileText className="w-12 h-12 mx-auto mb-4" />
          <h3 className="mb-2">Guía Oficial del Miembro de Mesa</h3>
          <p className="text-red-100 text-sm mb-4">
            Descarga el manual completo con todas las instrucciones y procedimientos
          </p>
          <Button className="bg-white text-red-600 hover:bg-red-50">
            <Download className="w-4 h-4 mr-2" />
            Descargar Guía PDF
          </Button>
        </div>

        {/* Important Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <h3 className="text-amber-900 mb-3">Información Importante</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li className="flex gap-2">
              <span>•</span>
              <span>La asistencia como miembro de mesa es obligatoria bajo sanción</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Recibirás una compensación económica por tu participación</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Tienes derecho a refrigerio durante la jornada electoral</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Puedes presentar excusas justificadas hasta 5 días antes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
import { MapPin, Navigation, Building2, Shield, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

export function VoterInfoScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-8">
        <h1>Información del Elector</h1>
        <p className="text-red-100 text-sm mt-2">Consulta tu local de votación y mesa asignada</p>
      </div>

      {/* Location Button */}
      <div className="px-6 py-6">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 mb-6">
          <Navigation className="w-5 h-5 mr-2" />
          Usar mi ubicación actual
        </Button>

        {/* Map Mock */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="relative h-64 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-red-600 mx-auto mb-2" />
                <p className="text-gray-600">Mapa del local de votación</p>
              </div>
            </div>
            {/* Mock Map Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <MapPin className="w-8 h-8 text-red-500 fill-red-500" />
            </div>
          </div>
        </div>

        {/* Voting Location Info */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Building2 className="w-6 h-6 text-red-600 shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">Tu Local de Votación</h3>
              <p className="text-gray-700 mb-1">I.E. Simón Bolívar</p>
              <p className="text-sm text-gray-600">Av. Los Héroes 458, San Isidro, Lima</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pabellón</p>
              <p className="text-gray-900">A</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Aula</p>
              <p className="text-gray-900">205</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Mesa</p>
              <p className="text-gray-900">042567</p>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            <MapPin className="w-4 h-4 mr-2" />
            Cómo llegar
          </Button>
        </div>

        {/* Ballot Guide */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <h3 className="text-gray-900 mb-2">Guía de la Cédula de Sufragio</h3>
              <p className="text-sm text-gray-600 mb-4">
                Conoce cómo marcar correctamente tu voto
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">1</span>
              <p className="text-sm text-gray-700">Marca dentro del recuadro del candidato de tu preferencia</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">2</span>
              <p className="text-sm text-gray-700">Usa el lápiz proporcionado en la mesa de votación</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">3</span>
              <p className="text-sm text-gray-700">No escribas ni marques fuera del recuadro designado</p>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <h3 className="text-gray-900 mb-2">Recomendaciones de Seguridad</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">Lleva únicamente tu DNI original, no se aceptan copias</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">Llega temprano a tu local de votación</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">No está permitido el uso de celulares en la cámara secreta</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">Respeta el orden y las indicaciones de los miembros de mesa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { ArrowLeft, FileText, Target, Calendar } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';

interface CandidateProfileProps {
  candidate: any;
  onBack: () => void;
  onViewPlan: () => void;
}

export function CandidateProfile({ candidate, onBack, onViewPlan }: CandidateProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1>Perfil del Candidato</h1>
      </div>

      {/* Candidate Header */}
      <div className="bg-white px-6 py-8 text-center border-b border-gray-200">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
        />
        <h2 className="text-gray-900 mb-2">{candidate.name}</h2>
        <p className="text-gray-600 mb-1">{candidate.party}</p>
        <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm">
          {candidate.shortParty}
        </span>
      </div>

      {/* Bio */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h3 className="text-gray-900 mb-3">Biografía</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Profesional con más de 20 años de experiencia en el sector público y privado. 
            Graduado de la Universidad Nacional con maestría en Administración Pública. 
            Ha ocupado diversos cargos de gestión y liderazgo, enfocándose en políticas 
            de desarrollo sostenible e inclusión social.
          </p>
        </div>

        {/* Accordion Sections */}
        <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
          <AccordionItem value="resume" className="border-b-0">
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-red-600" />
                <span>Hoja de Vida</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-900 mb-1">2018 - 2024</p>
                  <p className="text-gray-600">Director Regional de Desarrollo Social</p>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">2015 - 2018</p>
                  <p className="text-gray-600">Asesor en Políticas Públicas</p>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">2010 - 2015</p>
                  <p className="text-gray-600">Coordinador de Programas Sociales</p>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Educación</p>
                  <p className="text-gray-600">Maestría en Administración Pública - Universidad Nacional</p>
                  <p className="text-gray-600">Licenciatura en Economía - Universidad Nacional</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="proposals" className="border-b-0">
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-red-600" />
                <span>Propuestas Principales</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-red-600 shrink-0">•</span>
                  <span className="text-gray-600">Reforma integral del sistema de salud pública con énfasis en zonas rurales</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 shrink-0">•</span>
                  <span className="text-gray-600">Modernización de la infraestructura educativa y capacitación docente</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 shrink-0">•</span>
                  <span className="text-gray-600">Programa de reactivación económica para pequeñas y medianas empresas</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 shrink-0">•</span>
                  <span className="text-gray-600">Fortalecimiento de la seguridad ciudadana mediante tecnología y prevención</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 shrink-0">•</span>
                  <span className="text-gray-600">Políticas de protección ambiental y desarrollo sostenible</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="activities" className="border-b-0">
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-red-600" />
                <span>Actividades Recientes</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-900 mb-1">10 Noviembre 2025</p>
                  <p className="text-gray-600">Reunión con gremios empresariales en Lima</p>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">5 Noviembre 2025</p>
                  <p className="text-gray-600">Presentación de propuestas en universidades del sur</p>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">1 Noviembre 2025</p>
                  <p className="text-gray-600">Visita a comunidades rurales en la sierra central</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Government Plan Button */}
        <div className="mt-6">
          <Button onClick={onViewPlan} className="w-full bg-red-600 hover:bg-red-700 text-white py-6">
            <FileText className="w-5 h-5 mr-2" />
            Ver Plan de Gobierno Completo
          </Button>
        </div>
      </div>
    </div>
  );
}
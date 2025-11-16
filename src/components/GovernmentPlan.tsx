import { ArrowLeft, Download, Share2, Heart, Building2, GraduationCap, Briefcase, Shield, Leaf, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface GovernmentPlanProps {
  candidate: any;
  onBack: () => void;
}

export function GovernmentPlan({ candidate, onBack }: GovernmentPlanProps) {
  const planSections = [
    {
      id: 'health',
      title: 'Salud',
      icon: Heart,
      color: 'bg-red-50 text-red-600',
      proposals: [
        {
          title: 'Fortalecimiento del sistema de salud público',
          description: 'Incrementar el presupuesto del sector salud al 6% del PBI, priorizando atención primaria y medicina preventiva.',
          goals: [
            'Construcción de 100 nuevos centros de salud en zonas rurales',
            'Contratación de 5,000 médicos y enfermeras adicionales',
            'Implementación de telemedicina en comunidades alejadas',
          ],
        },
        {
          title: 'Acceso universal a medicamentos',
          description: 'Garantizar el acceso gratuito a medicamentos esenciales para toda la población.',
          goals: [
            'Creación de red nacional de farmacias populares',
            'Negociación de precios de medicamentos con laboratorios',
            'Producción nacional de medicamentos genéricos',
          ],
        },
      ],
    },
    {
      id: 'education',
      title: 'Educación',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-600',
      proposals: [
        {
          title: 'Modernización de la infraestructura educativa',
          description: 'Renovar y equipar las instituciones educativas con tecnología moderna y ambientes seguros.',
          goals: [
            'Reparación de 3,000 escuelas en mal estado',
            'Dotación de computadoras e internet a todas las escuelas',
            'Implementación de laboratorios de ciencias',
          ],
        },
        {
          title: 'Mejora de la calidad docente',
          description: 'Capacitación continua y mejores condiciones laborales para los maestros del país.',
          goals: [
            'Programa de capacitación docente anual',
            'Incremento salarial del 30% para docentes',
            'Becas de especialización en el extranjero',
          ],
        },
      ],
    },
    {
      id: 'economy',
      title: 'Economía',
      icon: Briefcase,
      color: 'bg-green-50 text-green-600',
      proposals: [
        {
          title: 'Reactivación de MYPES',
          description: 'Apoyo integral a micro y pequeñas empresas para su crecimiento y formalización.',
          goals: [
            'Fondo de S/ 5,000 millones para créditos MYPE',
            'Simplificación de trámites de formalización',
            'Capacitación empresarial gratuita',
          ],
        },
        {
          title: 'Generación de empleo digno',
          description: 'Creación de 500,000 empleos formales en los primeros dos años de gobierno.',
          goals: [
            'Inversión en infraestructura pública',
            'Incentivos tributarios para empresas que generen empleo',
            'Programa de empleo juvenil',
          ],
        },
      ],
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: Shield,
      color: 'bg-purple-50 text-purple-600',
      proposals: [
        {
          title: 'Modernización de la Policía Nacional',
          description: 'Equipamiento y capacitación de las fuerzas del orden para combatir la delincuencia.',
          goals: [
            'Incorporación de 10,000 nuevos policías',
            'Sistema de videovigilancia en ciudades principales',
            'Mejora salarial y de condiciones laborales',
          ],
        },
        {
          title: 'Prevención de la violencia',
          description: 'Programas sociales de prevención del delito en zonas vulnerables.',
          goals: [
            'Centros de prevención juvenil en 100 distritos',
            'Iluminación de zonas peligrosas',
            'Programas deportivos y culturales',
          ],
        },
      ],
    },
    {
      id: 'environment',
      title: 'Medio Ambiente',
      icon: Leaf,
      color: 'bg-emerald-50 text-emerald-600',
      proposals: [
        {
          title: 'Protección de recursos naturales',
          description: 'Conservación de bosques, agua y biodiversidad del país.',
          goals: [
            'Reforestación de 50,000 hectáreas anuales',
            'Protección de cabeceras de cuenca',
            'Fiscalización contra la minería ilegal',
          ],
        },
        {
          title: 'Energías renovables',
          description: 'Transición hacia energías limpias y sostenibles.',
          goals: [
            'Meta: 50% de energía renovable para 2030',
            'Incentivos para paneles solares residenciales',
            'Parques eólicos en costa norte',
          ],
        },
      ],
    },
    {
      id: 'social',
      title: 'Inclusión Social',
      icon: Users,
      color: 'bg-orange-50 text-orange-600',
      proposals: [
        {
          title: 'Lucha contra la pobreza',
          description: 'Programas integrales para reducir la pobreza y extrema pobreza.',
          goals: [
            'Ampliación de programas sociales',
            'Vivienda social para familias vulnerables',
            'Pensión para adultos mayores en situación de pobreza',
          ],
        },
        {
          title: 'Igualdad de género',
          description: 'Políticas para reducir la brecha de género y proteger a las mujeres.',
          goals: [
            'Centros de atención contra la violencia familiar',
            'Cuotas de género en espacios de decisión',
            'Programas de empoderamiento económico femenino',
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1>Plan de Gobierno</h1>
          </div>
          <button className="p-2">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-red-100">Plan de Gobierno</p>
            <p>{candidate.name}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white px-6 py-6 border-b border-gray-200">
        <h2 className="text-gray-900 mb-3">Visión de Gobierno 2026-2031</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Nuestro plan de gobierno busca construir un Perú más justo, próspero e inclusivo. 
          Nos comprometemos a trabajar por una educación de calidad, un sistema de salud 
          eficiente, una economía dinámica que genere empleos dignos, y una sociedad segura 
          donde todos los peruanos puedan desarrollar su potencial.
        </p>
        <div className="flex gap-3">
          <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
        </div>
      </div>

      {/* Plan Sections */}
      <div className="px-6 py-6">
        <h2 className="text-gray-900 mb-4">Propuestas por Sector</h2>
        
        <div className="space-y-4">
          {planSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className={`${section.color} px-5 py-4 flex items-center gap-3`}>
                  <Icon className="w-6 h-6" />
                  <h3 className="text-gray-900">{section.title}</h3>
                </div>
                <div className="p-5 space-y-4">
                  {section.proposals.map((proposal, index) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-4">
                      <h4 className="text-gray-900 mb-2">{proposal.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">Metas principales:</p>
                        <ul className="space-y-1">
                          {proposal.goals.map((goal, goalIndex) => (
                            <li key={goalIndex} className="text-sm text-gray-600 flex gap-2">
                              <span className="text-red-600">•</span>
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Budget Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-5">
          <h3 className="text-gray-900 mb-4">Presupuesto Estimado</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Salud</span>
              <span className="text-gray-900">S/ 15,000 millones</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Educación</span>
              <span className="text-gray-900">S/ 20,000 millones</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Economía y Empleo</span>
              <span className="text-gray-900">S/ 12,000 millones</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Seguridad</span>
              <span className="text-gray-900">S/ 8,000 millones</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Medio Ambiente</span>
              <span className="text-gray-900">S/ 5,000 millones</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Inclusión Social</span>
              <span className="text-gray-900">S/ 10,000 millones</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-900">Total estimado</span>
              <span className="text-gray-900">S/ 70,000 millones</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 bg-blue-50 rounded-lg p-5 text-center">
          <p className="text-sm text-gray-700 mb-3">
            Este plan de gobierno fue presentado ante el Jurado Nacional de Elecciones 
            y está disponible para consulta pública.
          </p>
          <p className="text-xs text-gray-600">
            Documento oficial registrado • JNE 2026
          </p>
        </div>
      </div>
    </div>
  );
}

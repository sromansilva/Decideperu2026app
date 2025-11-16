import { Clock } from 'lucide-react';

interface NewsScreenProps {
  onSelectNews: (news: any) => void;
}

export function NewsScreen({ onSelectNews }: NewsScreenProps) {
  const newsItems = [
    {
      id: 1,
      title: 'Proceso de inscripción de candidatos inicia en marzo 2026',
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=300&fit=crop',
      source: 'ONPE',
      date: '15 Nov 2025',
      category: 'Proceso Electoral',
      excerpt: 'El Jurado Nacional de Elecciones anunció que el periodo de inscripción de candidaturas para las elecciones generales 2026 comenzará el 15 de marzo.',
    },
    {
      id: 2,
      title: 'Actualización del padrón electoral para elecciones generales',
      image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&h=300&fit=crop',
      source: 'RENIEC',
      date: '14 Nov 2025',
      category: 'Padrón Electoral',
      excerpt: 'RENIEC informa que el padrón electoral definitivo estará disponible para consulta pública a partir del 1 de abril de 2026.',
    },
    {
      id: 3,
      title: 'Capacitación virtual para miembros de mesa disponible',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=300&fit=crop',
      source: 'ONPE',
      date: '13 Nov 2025',
      category: 'Capacitación',
      excerpt: 'La ONPE habilitó una plataforma virtual para la capacitación de miembros de mesa designados para las elecciones generales.',
    },
    {
      id: 4,
      title: 'JNE establece reglas para debates presidenciales',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=300&fit=crop',
      source: 'JNE',
      date: '12 Nov 2025',
      category: 'Debates',
      excerpt: 'Se establecieron las normas y fechas para la realización de debates presidenciales durante la campaña electoral 2026.',
    },
    {
      id: 5,
      title: 'Medidas de seguridad reforzadas para jornada electoral',
      image: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=600&h=300&fit=crop',
      source: 'ONPE',
      date: '11 Nov 2025',
      category: 'Seguridad',
      excerpt: 'Las autoridades electorales coordinan con la PNP para garantizar la seguridad en los más de 90 mil locales de votación.',
    },
    {
      id: 6,
      title: 'Nuevo sistema de verificación biométrica en prueba',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=300&fit=crop',
      source: 'RENIEC',
      date: '10 Nov 2025',
      category: 'Tecnología',
      excerpt: 'RENIEC implementará sistemas de verificación biométrica en locales de votación piloto para prevenir suplantación.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-8">
        <h1>Noticias Electorales</h1>
        <p className="text-red-100 text-sm mt-2">Mantente informado sobre el proceso electoral</p>
      </div>

      {/* News List */}
      <div className="px-6 py-6">
        <div className="space-y-4">
          {newsItems.map((news) => (
            <button
              key={news.id}
              onClick={() => onSelectNews(news)}
              className="bg-white rounded-lg shadow-sm overflow-hidden w-full text-left hover:shadow-md transition-shadow"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                    {news.category}
                  </span>
                </div>
                <h3 className="text-gray-900 mb-2">{news.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{news.source}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
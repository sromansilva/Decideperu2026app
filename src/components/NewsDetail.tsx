import { ArrowLeft, Share2, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface NewsDetailProps {
  news: any;
  onBack: () => void;
}

export function NewsDetail({ news, onBack }: NewsDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Noticia</h1>
        </div>
        <button className="p-2">
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* News Content */}
      <div className="bg-white">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="px-6 py-6">
          {/* Category and Date */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded">
              {news.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{news.date}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-gray-900 mb-4">{news.title}</h1>

          {/* Source */}
          <div className="pb-4 mb-4 border-b border-gray-200">
            <p className="text-sm text-gray-600">Fuente: {news.source}</p>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              {news.excerpt}
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Las autoridades electorales han coordinado todos los aspectos necesarios para 
              garantizar un proceso transparente y democrático. Se espera que la participación 
              ciudadana sea fundamental para fortalecer las instituciones democráticas del país.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Los ciudadanos pueden acceder a más información a través de los canales oficiales 
              de las instituciones electorales, donde se publicarán actualizaciones constantes 
              sobre los diferentes aspectos del proceso electoral.
            </p>

            <h2 className="text-gray-900 mt-6 mb-3">Detalles Adicionales</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Este anuncio forma parte de una serie de medidas implementadas para asegurar 
              que el proceso electoral se desarrolle con total normalidad y transparencia. 
              Se recomienda a todos los ciudadanos mantenerse informados a través de fuentes 
              oficiales y verificadas.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Para mayor información, los interesados pueden visitar las páginas web oficiales 
              o comunicarse con las líneas de atención al ciudadano habilitadas especialmente 
              para resolver consultas relacionadas con el proceso electoral.
            </p>
          </div>

          {/* Share Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6">
              <Share2 className="w-5 h-5 mr-2" />
              Compartir Noticia
            </Button>
          </div>
        </div>
      </div>

      {/* Related News */}
      <div className="px-6 py-6">
        <h2 className="text-gray-900 mb-4">Noticias Relacionadas</h2>
        <div className="space-y-3">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-gray-900 mb-1 text-sm">
              Cronograma electoral 2026 ya está disponible
            </h3>
            <p className="text-xs text-gray-500">ONPE • 9 Nov 2025</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-gray-900 mb-1 text-sm">
              Requisitos para ser candidato en elecciones 2026
            </h3>
            <p className="text-xs text-gray-500">JNE • 8 Nov 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
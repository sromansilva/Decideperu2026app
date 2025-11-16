import { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Image, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchBar } from '../../../components/SearchBar';
import { Badge } from '../../../components/ui/badge';

interface News {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  views: number;
  status: 'published' | 'draft' | 'scheduled';
}

interface NewsManagementProps {
  onBack: () => void;
}

export function NewsManagement({ onBack }: NewsManagementProps) {
  const [view, setView] = useState<'list' | 'create' | 'edit' | 'preview'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [newsList, setNewsList] = useState<News[]>([
    {
      id: 1,
      title: 'JNE anuncia cronograma oficial de elecciones 2026',
      category: 'Oficial',
      image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=250&fit=crop',
      excerpt: 'El Jurado Nacional de Elecciones presenta el calendario electoral completo.',
      content: 'Contenido completo de la noticia...',
      date: '2026-01-15',
      author: 'Admin ONPE',
      views: 1523,
      status: 'published',
    },
    {
      id: 2,
      title: 'Nuevas medidas de seguridad para las elecciones',
      category: 'Seguridad',
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=250&fit=crop',
      excerpt: 'Se implementarán protocolos adicionales para garantizar transparencia.',
      content: 'Contenido completo de la noticia...',
      date: '2026-01-14',
      author: 'Admin ONPE',
      views: 892,
      status: 'published',
    },
    {
      id: 3,
      title: 'Capacitación a miembros de mesa programada',
      category: 'Capacitación',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop',
      excerpt: 'Conoce las fechas y modalidades de capacitación.',
      content: 'Contenido completo de la noticia...',
      date: '2026-01-16',
      author: 'Admin ONPE',
      views: 0,
      status: 'draft',
    },
  ]);

  const filteredNews = newsList.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['Oficial', 'Seguridad', 'Capacitación', 'Candidatos', 'Resultados'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success/10 text-success border-success/20';
      case 'draft': return 'bg-muted text-muted-foreground border-border';
      case 'scheduled': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publicada';
      case 'draft': return 'Borrador';
      case 'scheduled': return 'Programada';
      default: return status;
    }
  };

  const handleDelete = (id: number) => {
    setNewsList(prev => prev.filter(n => n.id !== id));
    setShowDeleteDialog(false);
  };

  // LIST VIEW
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-8">
          <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">Gestión de Noticias</h1>
          <p className="text-white/80 text-xs">Publicar y administrar noticias</p>
        </div>

        {/* Search */}
        <div className="px-6 -mt-4 mb-4">
          <SearchBar
            placeholder="Buscar noticias..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Add Button */}
        <div className="px-6 mb-4">
          <button
            onClick={() => setView('create')}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Crear Nueva Noticia
          </button>
        </div>

        {/* Stats */}
        <div className="px-6 mb-4 grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-foreground font-medium">{newsList.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-success font-medium">
              {newsList.filter(n => n.status === 'published').length}
            </p>
            <p className="text-xs text-muted-foreground">Publicadas</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-muted-foreground font-medium">
              {newsList.filter(n => n.status === 'draft').length}
            </p>
            <p className="text-xs text-muted-foreground">Borradores</p>
          </div>
        </div>

        {/* News List */}
        <div className="px-6">
          <h2 className="text-sm text-foreground font-medium mb-4">
            {filteredNews.length} noticia{filteredNews.length !== 1 ? 's' : ''}
          </h2>

          <div className="space-y-3">
            {filteredNews.map((news) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-32 bg-muted">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    variant="outline"
                    className={`absolute top-2 right-2 text-xs ${getStatusColor(news.status)}`}
                  >
                    {getStatusLabel(news.status)}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {news.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(news.date).toLocaleDateString('es-PE')}
                    </span>
                  </div>

                  <h3 className="text-foreground font-medium mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {news.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{news.author}</span>
                    <span>{news.views} vistas</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedNews(news);
                        setView('preview');
                      }}
                      className="flex-1 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Ver
                    </button>
                    <button
                      onClick={() => {
                        setSelectedNews(news);
                        setView('edit');
                      }}
                      className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedNews(news);
                        setShowDeleteDialog(true);
                      }}
                      className="flex-1 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delete Dialog */}
        <AnimatePresence>
          {showDeleteDialog && selectedNews && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDeleteDialog(false)}
                className="fixed inset-0 bg-black/50 z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-card border border-border rounded-2xl p-6 z-[60]"
              >
                <h3 className="text-foreground font-medium mb-2">Eliminar Noticia</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  ¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteDialog(false)}
                    className="flex-1 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDelete(selectedNews.id)}
                    className="flex-1 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // CREATE/EDIT FORM
  if (view === 'create' || view === 'edit') {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-8">
          <button onClick={() => setView('list')} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">
            {view === 'create' ? 'Nueva Noticia' : 'Editar Noticia'}
          </h1>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Título *</label>
            <input
              type="text"
              placeholder="Título de la noticia"
              defaultValue={view === 'edit' ? selectedNews?.title : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Categoría *</label>
            <select
              defaultValue={view === 'edit' ? selectedNews?.category : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Imagen Principal</label>
            <div className="space-y-3">
              {view === 'edit' && selectedNews?.image && (
                <div className="relative h-40 rounded-xl overflow-hidden bg-muted">
                  <img src={selectedNews.image} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <button className="w-full py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                <Image className="w-4 h-4" />
                {view === 'edit' ? 'Cambiar Imagen' : 'Subir Imagen'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Resumen/Extracto *</label>
            <textarea
              rows={3}
              placeholder="Breve descripción que aparecerá en el listado..."
              defaultValue={view === 'edit' ? selectedNews?.excerpt : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Contenido Completo *</label>
            <textarea
              rows={8}
              placeholder="Contenido completo de la noticia..."
              defaultValue={view === 'edit' ? selectedNews?.content : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Fecha de Publicación</label>
            <input
              type="date"
              defaultValue={view === 'edit' ? selectedNews?.date : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Estado *</label>
            <select
              defaultValue={view === 'edit' ? selectedNews?.status : 'draft'}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicar Ahora</option>
              <option value="scheduled">Programar</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setView('list')}
              className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => setView('list')}
              className="flex-1 py-3 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl transition-colors text-sm font-medium"
            >
              {view === 'create' ? 'Publicar' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PREVIEW
  if (view === 'preview' && selectedNews) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white px-6 py-8">
          <button onClick={() => setView('list')} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">Vista Previa</h1>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="bg-card border border-border rounded-xl overflow-hidden mb-4">
            <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{selectedNews.category}</Badge>
                <Badge variant="outline" className={getStatusColor(selectedNews.status)}>
                  {getStatusLabel(selectedNews.status)}
                </Badge>
              </div>
              <h2 className="text-foreground text-lg font-medium mb-3">{selectedNews.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{selectedNews.excerpt}</p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>Por {selectedNews.author}</p>
                <p>{new Date(selectedNews.date).toLocaleDateString('es-PE', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap">
                {selectedNews.content}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setView('edit')}
              className="flex-1 py-3 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

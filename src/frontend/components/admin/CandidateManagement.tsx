import { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit, Trash2, Eye, Filter, X, Save, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchBar } from '../../../components/SearchBar';
import { FilterPanel, type FilterGroup } from '../../../components/FilterPanel';
import { Dialog } from '../../../components/ui/dialog';
import { Badge } from '../../../components/ui/badge';
import { useAdminCandidates } from '../../../hooks/useCandidates';
import { toast } from 'sonner@2.0.3';

interface Candidate {
  id: string;
  name: string;
  party: string;
  short_party: string;
  position: 'Presidencial' | 'Congreso' | 'Parlamento Andino';
  region: string;
  photo_url: string | null;
  proposals: string | null;
  bio: string | null;
  status: 'active' | 'pending' | 'rejected';
}

interface CandidateManagementProps {
  onBack: () => void;
}

interface FormData {
  name: string;
  party: string;
  shortParty: string;
  position: 'Presidencial' | 'Congreso' | 'Parlamento Andino' | '';
  region: string;
  proposals: string;
  bio: string;
  facebook: string;
  twitter: string;
  instagram: string;
  status: 'active' | 'pending' | 'rejected';
}

export function CandidateManagement({ onBack }: CandidateManagementProps) {
  const [view, setView] = useState<'list' | 'create' | 'edit' | 'detail'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    party: '',
    shortParty: '',
    position: '',
    region: '',
    proposals: '',
    bio: '',
    facebook: '',
    twitter: '',
    instagram: '',
    status: 'pending',
  });

  // Supabase hooks
  const {
    candidates,
    loading,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    refreshCandidates,
  } = useAdminCandidates();

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Estado',
      options: [
        { id: 'active', label: 'Activo', count: 2 },
        { id: 'pending', label: 'Pendiente', count: 1 },
        { id: 'rejected', label: 'Rechazado', count: 0 },
      ],
    },
    {
      id: 'position',
      label: 'Cargo',
      options: [
        { id: 'presidencial', label: 'Presidencial', count: 2 },
        { id: 'congreso', label: 'Congreso', count: 1 },
      ],
    },
    {
      id: 'region',
      label: 'Región',
      options: [
        { id: 'Lima', label: 'Lima', count: 1 },
        { id: 'La Libertad', label: 'La Libertad', count: 1 },
        { id: 'Arequipa', label: 'Arequipa', count: 1 },
      ],
    },
  ];

  const filteredCandidates = candidates.filter(c => {
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedFilters.status?.length && !selectedFilters.status.includes(c.status)) {
      return false;
    }
    if (selectedFilters.position?.length && !selectedFilters.position.includes(c.position.toLowerCase())) {
      return false;
    }
    if (selectedFilters.region?.length && !selectedFilters.region.includes(c.region)) {
      return false;
    }
    return true;
  });

  const handleFilterChange = (groupId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const current = prev[groupId] || [];
      const newFilters = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      return { ...prev, [groupId]: newFilters };
    });
  };

  const handleDeleteCandidate = async (id: string) => {
    const result = await deleteCandidate(id);
    if (result.success) {
      toast.success('Candidato eliminado exitosamente');
    } else {
      toast.error(result.error || 'Error al eliminar candidato');
    }
    setShowDeleteDialog(false);
  };

  const handleSaveCandidate = async () => {
    // Validación
    if (!formData.name || !formData.party || !formData.shortParty || !formData.position || !formData.region) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSaving(true);

    try {
      if (view === 'create') {
        const result = await createCandidate({
          name: formData.name,
          party: formData.party,
          shortParty: formData.shortParty,
          position: formData.position as 'Presidencial' | 'Congreso' | 'Parlamento Andino',
          region: formData.region,
          photoFile: photoFile || undefined,
          bio: formData.bio || undefined,
          planResumen: formData.proposals || undefined,
          proposals: formData.proposals || undefined,
          socialMedia: {
            facebook: formData.facebook || undefined,
            twitter: formData.twitter || undefined,
            instagram: formData.instagram || undefined,
          },
          status: formData.status,
        });

        if (result.success) {
          toast.success('¡Candidato creado exitosamente! 🎉');
          // Reset form
          setFormData({
            name: '',
            party: '',
            shortParty: '',
            position: '',
            region: '',
            proposals: '',
            bio: '',
            facebook: '',
            twitter: '',
            instagram: '',
            status: 'pending',
          });
          setPhotoFile(null);
          setPhotoPreview(null);
          setView('list');
        } else {
          toast.error(result.error || 'Error al crear candidato');
        }
      } else {
        const result = await updateCandidate(selectedCandidate.id, {
          name: formData.name,
          party: formData.party,
          shortParty: formData.shortParty,
          position: formData.position as 'Presidencial' | 'Congreso' | 'Parlamento Andino',
          region: formData.region,
          photoFile: photoFile || undefined,
          bio: formData.bio || undefined,
          planResumen: formData.proposals || undefined,
          proposals: formData.proposals || undefined,
          socialMedia: {
            facebook: formData.facebook || undefined,
            twitter: formData.twitter || undefined,
            instagram: formData.instagram || undefined,
          },
          status: formData.status,
        });

        if (result.success) {
          toast.success('¡Candidato actualizado exitosamente! ✅');
          setView('list');
        } else {
          toast.error(result.error || 'Error al actualizar candidato');
        }
      }
    } catch (error) {
      toast.error('Error inesperado al guardar candidato');
      console.error('Error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCreate = () => {
    // Reset form data
    setFormData({
      name: '',
      party: '',
      shortParty: '',
      position: '',
      region: '',
      proposals: '',
      bio: '',
      facebook: '',
      twitter: '',
      instagram: '',
      status: 'pending',
    });
    setPhotoFile(null);
    setPhotoPreview(null);
    setView('create');
  };

  const handleOpenEdit = (candidate: any) => {
    setSelectedCandidate(candidate);
    setFormData({
      name: candidate.name || '',
      party: candidate.party || '',
      shortParty: candidate.short_party || '',
      position: candidate.position || '',
      region: candidate.region || '',
      proposals: candidate.proposals || '',
      bio: candidate.bio || '',
      facebook: candidate.social_media?.facebook || '',
      twitter: candidate.social_media?.twitter || '',
      instagram: candidate.social_media?.instagram || '',
      status: candidate.status || 'pending',
    });
    setPhotoPreview(candidate.photo_url);
    setView('edit');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'pending': return 'Pendiente';
      case 'rejected': return 'Rechazado';
      default: return status;
    }
  };

  // LIST VIEW
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-8">
          <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">Gestión de Candidatos</h1>
          <p className="text-white/80 text-xs">Administrar candidatos del sistema</p>
        </div>

        {/* Search */}
        <div className="px-6 -mt-4 mb-4">
          <SearchBar
            placeholder="Buscar candidatos..."
            onSearch={setSearchQuery}
            showFilters={true}
            onFilterClick={() => setShowFilters(true)}
          />
        </div>

        {/* Add Button */}
        <div className="px-6 mb-4">
          <button
            onClick={handleOpenCreate}
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Agregar Nuevo Candidato
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="px-6 mb-4 grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-foreground font-medium">{candidates.length}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-success font-medium">
              {candidates.filter(c => c.status === 'active').length}
            </p>
            <p className="text-xs text-muted-foreground">Activos</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="text-2xl text-warning font-medium">
              {candidates.filter(c => c.status === 'pending').length}
            </p>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </div>
        </div>

        {/* Candidates List */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-foreground font-medium">
              {filteredCandidates.length} candidato{filteredCandidates.length !== 1 ? 's' : ''}
            </h2>
          </div>

          <div className="space-y-3">
            {filteredCandidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={candidate.photo_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'}
                    alt={candidate.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-foreground font-medium truncate">{candidate.name}</h3>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(candidate.status)}`}>
                        {getStatusLabel(candidate.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{candidate.party}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{candidate.position}</span>
                      <span>•</span>
                      <span>{candidate.region}</span>
                      <span>•</span>
                      <span>{candidate.proposals ? 'Con propuestas' : 'Sin propuestas'}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setView('detail');
                    }}
                    className="flex-1 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Ver
                  </button>
                  <button
                    onClick={() => handleOpenEdit(candidate)}
                    className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setShowDeleteDialog(true);
                    }}
                    className="flex-1 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filterGroups}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearAll={() => setSelectedFilters({})}
          onApply={() => setShowFilters(false)}
        />

        {/* Delete Dialog */}
        <AnimatePresence>
          {showDeleteDialog && selectedCandidate && (
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
                <h3 className="text-foreground font-medium mb-2">Eliminar Candidato</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  ¿Estás seguro de que deseas eliminar a <strong>{selectedCandidate.name}</strong>? Esta acción no se puede deshacer.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteDialog(false)}
                    className="flex-1 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDeleteCandidate(selectedCandidate.id)}
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
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-8">
          <button onClick={() => setView('list')} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">
            {view === 'create' ? 'Nuevo Candidato' : 'Editar Candidato'}
          </h1>
          <p className="text-white/80 text-xs">
            {view === 'create' ? 'Registrar un nuevo candidato' : 'Modificar información del candidato'}
          </p>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Nombre Completo *</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez García"
              defaultValue={view === 'edit' ? selectedCandidate?.name : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Foto del Candidato</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                {view === 'edit' && selectedCandidate?.image ? (
                  <img src={selectedCandidate.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-muted-foreground text-2xl">📷</span>
                )}
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs hover:bg-primary-dark transition-colors">
                Subir Foto
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Partido Político *</label>
            <input
              type="text"
              placeholder="Ej: Partido Democrático Nacional"
              defaultValue={view === 'edit' ? selectedCandidate?.party : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({ ...formData, party: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Siglas del Partido *</label>
            <input
              type="text"
              placeholder="Ej: PDN"
              defaultValue={view === 'edit' ? selectedCandidate?.short_party : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({ ...formData, shortParty: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Cargo *</label>
            <select
              defaultValue={view === 'edit' ? selectedCandidate?.position : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({ ...formData, position: e.target.value as 'Presidencial' | 'Congreso' | 'Parlamento Andino' | '' })}
            >
              <option value="">Seleccionar cargo</option>
              <option value="Presidencial">Presidencial</option>
              <option value="Congreso">Congreso</option>
              <option value="Parlamento Andino">Parlamento Andino</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Región *</label>
            <select
              defaultValue={view === 'edit' ? selectedCandidate?.region : ''}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            >
              <option value="">Seleccionar región</option>
              <option value="Lima">Lima</option>
              <option value="Arequipa">Arequipa</option>
              <option value="La Libertad">La Libertad</option>
              <option value="Cusco">Cusco</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Propuestas Principales</label>
            <textarea
              rows={4}
              placeholder="Describe las principales propuestas del candidato..."
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              onChange={(e) => setFormData({ ...formData, proposals: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Hoja de Vida (Resumen)</label>
            <textarea
              rows={4}
              placeholder="Experiencia profesional, estudios, cargos previos..."
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Redes Sociales</label>
            <div className="space-y-2">
              <input
                type="url"
                placeholder="Facebook (URL completa)"
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              />
              <input
                type="url"
                placeholder="Twitter/X (URL completa)"
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              />
              <input
                type="url"
                placeholder="Instagram (URL completa)"
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-foreground mb-2 font-medium">Estado *</label>
            <select
              defaultValue={view === 'edit' ? selectedCandidate?.status : 'pending'}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'pending' | 'rejected' })}
            >
              <option value="active">Activo</option>
              <option value="pending">Pendiente de Aprobación</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setView('list')}
              disabled={isSaving}
              className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveCandidate}
              disabled={isSaving}
              className="flex-1 py-3 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl transition-colors text-sm flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {view === 'create' ? 'Crear Candidato' : 'Guardar Cambios'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DETAIL VIEW
  if (view === 'detail' && selectedCandidate) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-8">
          <button onClick={() => setView('list')} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl mb-1">Detalle del Candidato</h1>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="bg-card border border-border rounded-xl p-6 mb-4">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={selectedCandidate.image}
                alt={selectedCandidate.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-foreground text-lg font-medium mb-1">{selectedCandidate.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{selectedCandidate.party}</p>
                <Badge variant="outline" className={`text-xs ${getStatusColor(selectedCandidate.status)}`}>
                  {getStatusLabel(selectedCandidate.status)}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Cargo:</span>
                <span className="text-foreground ml-2">{selectedCandidate.position}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Región:</span>
                <span className="text-foreground ml-2">{selectedCandidate.region}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Propuestas registradas:</span>
                <span className="text-foreground ml-2">{selectedCandidate.proposals}</span>
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
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex-1 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
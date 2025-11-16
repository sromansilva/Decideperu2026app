import { useState, useMemo } from 'react';
import { ChevronRight, Star, MapPin } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { SearchBar } from './SearchBar';
import { FilterPanel, type FilterGroup } from './FilterPanel';
import { Badge } from './ui/badge';

interface CandidatesScreenProps {
  onSelectCandidate: (candidate: any) => void;
}

export function CandidatesScreenImproved({ onSelectCandidate }: CandidatesScreenProps) {
  const [activeTab, setActiveTab] = useState('presidency');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [favorites, setFavorites] = useState<number[]>([]);

  const allCandidates = [
    {
      id: 1,
      name: 'Ana María Torres',
      party: 'Partido Democrático Nacional',
      shortParty: 'PDN',
      region: 'Lima',
      cargo: 'presidency',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
      proposals: 45,
    },
    {
      id: 2,
      name: 'Carlos Mendoza Silva',
      party: 'Alianza por el Progreso',
      shortParty: 'APP',
      region: 'La Libertad',
      cargo: 'presidency',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      proposals: 38,
    },
    {
      id: 3,
      name: 'María Elena Vega',
      party: 'Frente Renovador',
      shortParty: 'FR',
      region: 'Arequipa',
      cargo: 'presidency',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
      proposals: 42,
    },
    {
      id: 4,
      name: 'Roberto Campos',
      party: 'Unidad Nacional',
      shortParty: 'UN',
      region: 'Cusco',
      cargo: 'presidency',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop',
      proposals: 51,
    },
    {
      id: 5,
      name: 'Patricia Ramírez',
      party: 'Partido Democrático Nacional',
      shortParty: 'PDN',
      region: 'Lima',
      cargo: 'congress',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop',
      proposals: 28,
    },
    {
      id: 6,
      name: 'Jorge Luis Santos',
      party: 'Alianza por el Progreso',
      shortParty: 'APP',
      region: 'Piura',
      cargo: 'congress',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
      proposals: 32,
    },
    {
      id: 7,
      name: 'Carmen Flores',
      party: 'Frente Renovador',
      shortParty: 'FR',
      region: 'Lambayeque',
      cargo: 'congress',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      proposals: 25,
    },
    {
      id: 8,
      name: 'Miguel Ángel Vargas',
      party: 'Unidad Nacional',
      shortParty: 'UN',
      region: 'Cajamarca',
      cargo: 'congress',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
      proposals: 30,
    },
  ];

  // Definir filtros
  const filterGroups: FilterGroup[] = [
    {
      id: 'party',
      label: 'Partido Político',
      options: [
        { id: 'PDN', label: 'Partido Democrático Nacional', count: 2 },
        { id: 'APP', label: 'Alianza por el Progreso', count: 2 },
        { id: 'FR', label: 'Frente Renovador', count: 2 },
        { id: 'UN', label: 'Unidad Nacional', count: 2 },
      ],
      multiple: true,
    },
    {
      id: 'region',
      label: 'Región',
      options: [
        { id: 'Lima', label: 'Lima', count: 2 },
        { id: 'La Libertad', label: 'La Libertad', count: 1 },
        { id: 'Arequipa', label: 'Arequipa', count: 1 },
        { id: 'Cusco', label: 'Cusco', count: 1 },
        { id: 'Piura', label: 'Piura', count: 1 },
      ],
      multiple: true,
    },
  ];

  // Filtrar candidatos
  const filteredCandidates = useMemo(() => {
    let results = allCandidates.filter(c => c.cargo === activeTab);

    // Aplicar búsqueda
    if (searchQuery) {
      results = results.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortParty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Aplicar filtros
    if (selectedFilters.party?.length > 0) {
      results = results.filter(c => selectedFilters.party.includes(c.shortParty));
    }
    if (selectedFilters.region?.length > 0) {
      results = results.filter(c => selectedFilters.region.includes(c.region));
    }

    return results;
  }, [activeTab, searchQuery, selectedFilters, allCandidates]);

  const handleFilterChange = (groupId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const current = prev[groupId] || [];
      const newFilters = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      
      return {
        ...prev,
        [groupId]: newFilters,
      };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-primary-dark text-primary-foreground px-6 py-8">
        <h1 className="text-white">Candidatos 2026</h1>
        <p className="text-white/80 text-sm mt-2">Conoce a los candidatos registrados</p>
      </div>

      {/* Buscador */}
      <div className="px-6 -mt-4 mb-4">
        <SearchBar
          placeholder="Buscar por nombre o partido..."
          onSearch={setSearchQuery}
          showFilters={true}
          onFilterClick={() => setShowFilters(true)}
        />
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border overflow-x-auto sticky top-0 z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full inline-flex min-w-full bg-transparent rounded-none h-auto p-0">
            <TabsTrigger
              value="presidency"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3"
            >
              Presidencial
            </TabsTrigger>
            <TabsTrigger
              value="congress"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary py-3"
            >
              Congreso
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chips de filtros activos */}
      {Object.values(selectedFilters).flat().length > 0 && (
        <div className="px-6 py-3 flex items-center gap-2 flex-wrap bg-muted/30">
          <span className="text-xs text-muted-foreground">Filtros:</span>
          {Object.entries(selectedFilters).map(([groupId, options]) =>
            options.map(optionId => {
              const group = filterGroups.find(g => g.id === groupId);
              const option = group?.options.find(o => o.id === optionId);
              return (
                <Badge
                  key={`${groupId}-${optionId}`}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleFilterChange(groupId, optionId)}
                >
                  {option?.label}
                  <span className="ml-1">×</span>
                </Badge>
              );
            })
          )}
          <button
            onClick={handleClearFilters}
            className="text-xs text-primary hover:underline"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* Resultados */}
      <div className="px-6 py-4">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredCandidates.length} candidato{filteredCandidates.length !== 1 ? 's' : ''} encontrado{filteredCandidates.length !== 1 ? 's' : ''}
        </p>

        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron candidatos con los criterios seleccionados
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleClearFilters();
              }}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Limpiar búsqueda y filtros
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCandidates.map((candidate) => {
              const isFavorite = favorites.includes(candidate.id);
              
              return (
                <div
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate)}
                  className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-foreground font-medium truncate">{candidate.name}</h3>
                        <button
                          onClick={(e) => toggleFavorite(candidate.id, e)}
                          className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              isFavorite ? 'fill-primary text-primary' : ''
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {candidate.party}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{candidate.region}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {candidate.proposals} propuestas
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Panel de filtros */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filterGroups}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearFilters}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

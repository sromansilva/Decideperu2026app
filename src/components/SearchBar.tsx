import { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SearchSuggestion {
  id: string;
  text: string;
  category: string;
  icon?: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  suggestions?: SearchSuggestion[];
  showFilters?: boolean;
  onFilterClick?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ 
  placeholder = "Buscar candidatos, partidos...",
  onSearch,
  suggestions = [],
  showFilters = false,
  onFilterClick,
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sugerencias populares por defecto
  const defaultSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'Candidatos presidenciales', category: 'Popular', icon: '👥' },
    { id: '2', text: 'Plan de gobierno', category: 'Popular', icon: '📋' },
    { id: '3', text: 'Partido Perú Libre', category: 'Partido', icon: '🏛️' },
    { id: '4', text: 'Keiko Fujimori', category: 'Candidato', icon: '👤' },
  ];

  const currentSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  // Filtrar sugerencias basadas en el query
  const filteredSuggestions = query.length > 0
    ? currentSuggestions.filter(s => 
        s.text.toLowerCase().includes(query.toLowerCase())
      )
    : currentSuggestions.slice(0, 4);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    onSearch(suggestion.text);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Barra de búsqueda */}
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center transition-all duration-200 ${
          isFocused ? 'ring-2 ring-primary' : ''
        } rounded-xl overflow-hidden`}>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full pl-10 pr-20 py-3 bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            
            {showFilters && (
              <button
                type="button"
                onClick={onFilterClick}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Panel de sugerencias */}
      <AnimatePresence>
        {showSuggestions && isFocused && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            {query.length === 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border">
                <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">Búsquedas populares</span>
              </div>
            )}

            {/* Lista de sugerencias */}
            <div className="max-h-64 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                >
                  {suggestion.icon && (
                    <span className="text-lg flex-shrink-0">{suggestion.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{suggestion.text}</p>
                    <p className="text-xs text-muted-foreground">{suggestion.category}</p>
                  </div>
                  <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Footer con consejo */}
            {query.length > 0 && filteredSuggestions.length > 0 && (
              <div className="px-4 py-2 bg-muted/20 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Presiona Enter para buscar "{query}"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

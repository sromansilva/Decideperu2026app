import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  multiple?: boolean;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}

export function FilterPanel({
  isOpen,
  onClose,
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  onApply,
}: FilterPanelProps) {
  const totalSelected = Object.values(selectedFilters).flat().length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h2 className="text-foreground font-medium">Filtros</h2>
                {totalSelected > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {totalSelected} filtro{totalSelected !== 1 ? 's' : ''} aplicado{totalSelected !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {filters.map((group) => (
                <div key={group.id}>
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    {group.label}
                  </h3>
                  <div className="space-y-2">
                    {group.options.map((option) => {
                      const isSelected = selectedFilters[group.id]?.includes(option.id) || false;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => onFilterChange(group.id, option.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-muted/30 border-border text-foreground hover:bg-muted/50'
                          }`}
                        >
                          <span className="text-sm">{option.label}</span>
                          <div className="flex items-center gap-2">
                            {option.count !== undefined && (
                              <span className={`text-xs ${
                                isSelected ? 'text-primary/70' : 'text-muted-foreground'
                              }`}>
                                {option.count}
                              </span>
                            )}
                            <div className={`w-4 h-4 rounded flex items-center justify-center ${
                              isSelected ? 'bg-primary' : 'border-2 border-border'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border space-y-2">
              <button
                onClick={onApply}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary-dark transition-colors font-medium"
              >
                Aplicar filtros
              </button>
              {totalSelected > 0 && (
                <button
                  onClick={onClearAll}
                  className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Limpiar todos
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

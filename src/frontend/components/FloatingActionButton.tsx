import { Plus, Edit, Trash2, Send, Download, Upload } from 'lucide-react';
import { useState } from 'react';

interface FABAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions?: FABAction[];
  mainAction?: () => void;
  mainIcon?: React.ReactNode;
  mainLabel?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

/**
 * Floating Action Button (FAB) - Material Design inspired
 * Botón flotante para acciones rápidas, especialmente útil en modo administrador
 */
export function FloatingActionButton({
  actions = [],
  mainAction,
  mainIcon = <Plus className="w-6 h-6" />,
  mainLabel = 'Acciones',
  position = 'bottom-right',
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-24 right-6',
    'bottom-left': 'bottom-24 left-6',
    'bottom-center': 'bottom-24 left-1/2 -translate-x-1/2',
  };

  const handleMainClick = () => {
    if (actions.length > 0) {
      setIsOpen(!isOpen);
    } else if (mainAction) {
      mainAction();
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40`}>
      {/* Secondary Actions */}
      {isOpen && actions.length > 0 && (
        <div className="mb-4 space-y-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-card text-foreground text-sm px-3 py-1.5 rounded-lg shadow-lg border border-border whitespace-nowrap">
                {action.label}
              </span>
              <button
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 ${
                  action.color || 'bg-primary text-primary-foreground'
                }`}
              >
                {action.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={handleMainClick}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        aria-label={mainLabel}
      >
        {mainIcon}
      </button>

      {/* Overlay to close when open */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Preset FAB configurations for common scenarios

export function AdminFAB() {
  const actions: FABAction[] = [
    {
      icon: <Edit className="w-5 h-5" />,
      label: 'Editar contenido',
      onClick: () => console.log('Edit'),
      color: 'bg-blue-600 text-white',
    },
    {
      icon: <Send className="w-5 h-5" />,
      label: 'Enviar notificación',
      onClick: () => console.log('Send notification'),
      color: 'bg-purple-600 text-white',
    },
    {
      icon: <Upload className="w-5 h-5" />,
      label: 'Subir archivo',
      onClick: () => console.log('Upload'),
      color: 'bg-green-600 text-white',
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      label: 'Eliminar',
      onClick: () => console.log('Delete'),
      color: 'bg-destructive text-destructive-foreground',
    },
  ];

  return <FloatingActionButton actions={actions} mainLabel="Acciones de administrador" />;
}

export function SimpleFAB({ onClick, icon, label }: { onClick: () => void; icon?: React.ReactNode; label?: string }) {
  return (
    <FloatingActionButton
      mainAction={onClick}
      mainIcon={icon}
      mainLabel={label}
    />
  );
}

import { Sun, Moon, Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../../components/ui/button';

/**
 * Componente de demostración para mostrar el sistema de temas
 * Este componente es solo para propósitos de desarrollo/demostración
 */
export function ThemeDemo() {
  const { theme, toggleTheme } = useTheme();

  const colors = [
    { name: 'Primary', class: 'bg-primary text-primary-foreground', desc: 'Rojo peruano' },
    { name: 'Secondary', class: 'bg-secondary text-secondary-foreground', desc: 'Gris neutro' },
    { name: 'Success', class: 'bg-success text-success-foreground', desc: 'Verde aprobado' },
    { name: 'Warning', class: 'bg-warning text-warning-foreground', desc: 'Amarillo alerta' },
    { name: 'Info', class: 'bg-info text-info-foreground', desc: 'Azul información' },
    { name: 'Destructive', class: 'bg-destructive text-destructive-foreground', desc: 'Rojo error' },
  ];

  const surfaces = [
    { name: 'Background', class: 'bg-background text-foreground border border-border' },
    { name: 'Card', class: 'bg-card text-card-foreground border border-border' },
    { name: 'Muted', class: 'bg-muted text-muted-foreground' },
    { name: 'Accent', class: 'bg-accent text-accent-foreground' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-foreground mb-1">Sistema de Temas</h1>
            <p className="text-muted-foreground">DecidePerú 2026 - Colores temáticos peruanos</p>
          </div>
          <Button onClick={toggleTheme} size="lg" className="gap-2">
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span>Modo Oscuro</span>
              </>
            )}
          </Button>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground text-sm">
              Actualmente estás en <strong>modo {theme === 'dark' ? 'oscuro' : 'claro'}</strong>.
              Todos los colores se adaptan automáticamente.
            </p>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-foreground">Paleta de Colores</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {colors.map((color) => (
            <div
              key={color.name}
              className={`${color.class} rounded-xl p-6 shadow-lg`}
            >
              <h3 className="mb-1">{color.name}</h3>
              <p className="text-sm opacity-80">{color.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-card border border-border rounded"></div>
          <h2 className="text-foreground">Superficies y Fondos</h2>
        </div>

        <div className="space-y-3">
          {surfaces.map((surface) => (
            <div
              key={surface.name}
              className={`${surface.class} rounded-xl p-6 shadow-sm`}
            >
              <h3 className="mb-1">{surface.name}</h3>
              <p className="text-sm opacity-70">
                Superficie para contenido de tipo {surface.name.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Components Preview */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-foreground mb-4">Componentes de Ejemplo</h2>

        <div className="space-y-4">
          {/* Card Example */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <h3 className="text-foreground mb-2">Tarjeta de Ejemplo</h3>
            <p className="text-muted-foreground mb-4">
              Este es un ejemplo de cómo se ve una tarjeta con el tema actual.
              Los colores se adaptan perfectamente entre modo claro y oscuro.
            </p>
            <div className="flex gap-2">
              <Button>Acción Principal</Button>
              <Button variant="outline">Acción Secundaria</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <h3 className="text-foreground mb-4">Estadísticas</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-primary/10 rounded-lg p-3 mb-2">
                  <p className="text-2xl text-primary">24</p>
                </div>
                <p className="text-xs text-muted-foreground">Candidatos</p>
              </div>
              <div className="text-center">
                <div className="bg-success/10 rounded-lg p-3 mb-2">
                  <p className="text-2xl text-success">147</p>
                </div>
                <p className="text-xs text-muted-foreground">Días</p>
              </div>
              <div className="text-center">
                <div className="bg-info/10 rounded-lg p-3 mb-2">
                  <p className="text-2xl text-info">12</p>
                </div>
                <p className="text-xs text-muted-foreground">Noticias</p>
              </div>
            </div>
          </div>

          {/* List Items */}
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-lg">
            <div className="p-4 border-b border-border">
              <h3 className="text-foreground">Lista de Opciones</h3>
            </div>
            <div className="divide-y divide-border">
              <button className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors">
                <p className="text-foreground">Opción 1</p>
                <p className="text-xs text-muted-foreground">Descripción de la opción</p>
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors">
                <p className="text-foreground">Opción 2</p>
                <p className="text-xs text-muted-foreground">Descripción de la opción</p>
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors">
                <p className="text-foreground">Opción 3</p>
                <p className="text-xs text-muted-foreground">Descripción de la opción</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <p className="text-muted-foreground text-sm">
          Este es un componente de demostración. No aparecerá en la versión final de la app.
        </p>
      </div>
    </div>
  );
}

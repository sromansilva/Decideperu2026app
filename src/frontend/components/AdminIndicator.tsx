import { Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Indicador visual sutil que muestra cuando el usuario está en modo administrador
 * Aparece como una pequeña insignia flotante en la esquina superior derecha
 */
export function AdminIndicator() {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-4 right-4 z-40 pointer-events-none">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-full backdrop-blur-md shadow-lg">
        <Shield className="w-4 h-4 text-yellow-500 animate-pulse" />
        <span className="text-xs text-yellow-500 font-medium">Admin</span>
      </div>
    </div>
  );
}
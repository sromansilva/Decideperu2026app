/**
 * ProtectedRoute - Protección de rutas según autenticación y rol
 */

import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Mostrar loading mientras verifica
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl text-foreground font-medium mb-2">
            Acceso Restringido
          </h2>
          <p className="text-muted-foreground mb-6">
            Debes iniciar sesión para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  // Si requiere admin pero no lo es
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl text-foreground font-medium mb-2">
            Sin Permisos
          </h2>
          <p className="text-muted-foreground mb-6">
            No tienes permisos de administrador para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  // Todo OK, mostrar contenido
  return <>{children}</>;
}

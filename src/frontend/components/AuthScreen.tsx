import React, { useState, useCallback } from 'react';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Shield, Loader2 } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';

type AuthView = 'login' | 'register' | 'forgot-password';

interface AuthScreenProps {
  onAuthSuccess: (isAdmin?: boolean) => void;
  onBack?: () => void;
}

export function AuthScreen({ onAuthSuccess, onBack }: AuthScreenProps) {
  const [view, setView] = useState<AuthView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
  });
  const [dniLoading, setDniLoading] = useState(false);
  const [dniError, setDniError] = useState<string | null>(null);

  // Función para consultar DNI y autocompletar campos
  const consultarDNI = useCallback(async (dni: string) => {
    // Validar formato de DNI (8 dígitos)
    if (!/^\d{8}$/.test(dni)) {
      setDniError(null);
      return;
    }

    setDniLoading(true);
    setDniError(null);

    try {
      // Obtener URL de la API desde variables de entorno
      // @ts-expect-error - Vite env types are defined in vite-env.d.ts
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
      const response = await fetch(`${API_BASE_URL}/consulta-dni/${dni}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al consultar DNI');
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Autocompletar campos
        setFormData(prev => ({
          ...prev,
          name: result.data.nombres || '',
          apellidoPaterno: result.data.apellidoPaterno || '',
          apellidoMaterno: result.data.apellidoMaterno || '',
        }));
        setDniError(null);
      } else {
        throw new Error('No se encontraron datos para este DNI');
      }
    } catch (error) {
      console.error('Error al consultar DNI:', error);
      setDniError(error instanceof Error ? error.message : 'Error al consultar DNI');
      // No limpiar los campos si hay error, solo mostrar el mensaje
    } finally {
      setDniLoading(false);
    }
  }, []);

  // Manejar cambio en el campo DNI
  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dni = e.target.value.replace(/\D/g, ''); // Solo números
    setFormData(prev => ({ ...prev, dni }));
    setDniError(null);
  };

  // Manejar cuando el usuario termina de escribir el DNI (onBlur)
  const handleDniBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const dni = e.target.value.trim();
    if (dni.length === 8) {
      consultarDNI(dni);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir nombre completo si hay apellidos separados
    const fullName = formData.name && (formData.apellidoPaterno || formData.apellidoMaterno)
      ? `${formData.name} ${formData.apellidoPaterno} ${formData.apellidoMaterno}`.trim()
      : formData.name;
    
    // TODO: Integración con Supabase Auth
    // Simulación de autenticación exitosa
    onAuthSuccess(isAdmin);
  };

  const resetForm = () => {
    setFormData({ 
      email: '', 
      password: '', 
      name: '', 
      apellidoPaterno: '',
      apellidoMaterno: '',
      dni: '' 
    });
    setShowPassword(false);
    setIsAdmin(false);
    setDniError(null);
    setDniLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <div>
            <h1 className="text-foreground">DecidePerú 2026</h1>
            <p className="text-sm text-muted-foreground">Información electoral confiable</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="mb-2 text-foreground">
              {view === 'login' && 'Iniciar Sesión'}
              {view === 'register' && 'Crear Cuenta'}
              {view === 'forgot-password' && 'Recuperar Contraseña'}
            </h2>
            <p className="text-muted-foreground">
              {view === 'login' && 'Ingresa tus credenciales para continuar'}
              {view === 'register' && 'Completa tus datos para registrarte'}
              {view === 'forgot-password' && 'Te enviaremos un link para resetear tu contraseña'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {view === 'register' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="dni"
                      type="text"
                      placeholder="12345678"
                      value={formData.dni}
                      onChange={handleDniChange}
                      onBlur={handleDniBlur}
                      className="pl-10 pr-10"
                      maxLength={8}
                      disabled={dniLoading}
                    />
                    {dniLoading && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
                    )}
                  </div>
                  {dniError && (
                    <p className="text-sm text-destructive mt-1">{dniError}</p>
                  )}
                  {!dniError && formData.dni.length === 8 && !dniLoading && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Presiona Tab o haz clic fuera para consultar
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nombres</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Juan Carlos"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
                    <Input
                      id="apellidoPaterno"
                      type="text"
                      placeholder="Pérez"
                      value={formData.apellidoPaterno}
                      onChange={(e) => setFormData({ ...formData, apellidoPaterno: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
                    <Input
                      id="apellidoMaterno"
                      type="text"
                      placeholder="García"
                      value={formData.apellidoMaterno}
                      onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {view !== 'forgot-password' && (
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Admin toggle - solo en login */}
            {view === 'login' && (
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-foreground">Modo Administrador</p>
                    <p className="text-xs text-muted-foreground">Acceso a panel de gestión</p>
                  </div>
                </div>
                <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
              </div>
            )}

            {/* Submit button */}
            <Button type="submit" className="w-full">
              {view === 'login' && 'Iniciar Sesión'}
              {view === 'register' && 'Crear Cuenta'}
              {view === 'forgot-password' && 'Enviar Link de Recuperación'}
            </Button>

            {/* Footer links */}
            <div className="space-y-3 text-center">
              {view === 'login' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setView('forgot-password');
                    }}
                    className="text-sm text-primary hover:underline block w-full"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  <div className="text-sm text-muted-foreground">
                    ¿No tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setView('register');
                      }}
                      className="text-primary hover:underline"
                    >
                      Regístrate
                    </button>
                  </div>
                </>
              )}

              {view === 'register' && (
                <div className="text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setView('login');
                    }}
                    className="text-primary hover:underline"
                  >
                    Inicia sesión
                  </button>
                </div>
              )}

              {view === 'forgot-password' && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setView('login');
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Volver al inicio de sesión
                </button>
              )}
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                Autenticación con Supabase
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="text-center text-xs text-muted-foreground">
            <p>Al continuar, aceptas nuestros</p>
            <p>
              <button className="text-primary hover:underline">Términos de Servicio</button>
              {' y '}
              <button className="text-primary hover:underline">Política de Privacidad</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

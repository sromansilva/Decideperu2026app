import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, User, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type LoginMode = 'select' | 'admin';

export function LoginScreen() {
  const { login, loginAsGuest } = useAuth();
  const [mode, setMode] = useState<LoginMode>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value.length > 0) {
      setEmailValid(validateEmail(value));
    } else {
      setEmailValid(null);
    }
  };

  // Login directo como usuario (sin credenciales)
  const handleUserAccess = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await loginAsGuest();
    } catch (err) {
      setError('Error al acceder como usuario');
    } finally {
      setIsLoading(false);
    }
  };

  // Login admin con credenciales
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciales incorrectas. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Pantalla de selección (Usuario o Admin)
  if (mode === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/20">
              <span className="text-4xl">🇵🇪</span>
            </div>
            <h1 className="text-white mb-2">DecidePerú 2026</h1>
            <p className="text-white/80 text-sm">Información electoral confiable</p>
          </div>

          {/* Tarjeta de selección */}
          <div className="bg-card rounded-2xl shadow-2xl p-6 border border-border">
            <h2 className="text-center text-foreground mb-2">Selecciona tu tipo de acceso</h2>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Elige cómo quieres usar la aplicación
            </p>

            <div className="space-y-4">
              {/* Botón Usuario - Acceso directo */}
              <button
                onClick={handleUserAccess}
                disabled={isLoading}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-xl p-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Acceso Ciudadano </div>
                      <div className="text-xs text-white/80">Ingreso directo sin credenciales</div>
                    </div>
                  </div>
                  <div className="text-2xl">→</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              {/* Botón Admin - Con credenciales */}
              <button
                onClick={() => setMode('admin')}
                disabled={isLoading}
                className="w-full group relative overflow-hidden bg-card hover:bg-muted border-2 border-border hover:border-primary text-foreground rounded-xl p-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Acceso Administrador</div>
                      <div className="text-xs text-muted-foreground">Requiere credenciales</div>
                    </div>
                  </div>
                  <div className="text-2xl text-primary">→</div>
                </div>
              </button>
            </div>

            {/* Info adicional */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground text-center">
                <strong className="text-foreground">Usuario:</strong> Acceso inmediato para consultar candidatos, noticias y calendario electoral
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-white/60 text-xs space-y-0.5">
            <p>Aplicación de demostración electoral</p>
            <p>Datos ficticios para fines ilustrativos</p>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de login Admin
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-background flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md my-8">
        {/* Logo y título */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white text-2xl mb-1.5">Acceso Administrador</h1>
          <p className="text-white/80 text-sm">Ingresa tus credenciales</p>
        </div>

        {/* Formulario de login Admin */}
        <div className="bg-card rounded-2xl shadow-2xl p-5 border border-border">
          {/* Botón volver */}
          <button
            onClick={() => {
              setMode('select');
              setError('');
              setEmail('');
              setPassword('');
            }}
            className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a selección
          </button>

          <form onSubmit={handleAdminLogin} className="space-y-3.5">
            {/* Email */}
            <div>
              <label className="block text-xs text-foreground mb-1.5 font-medium">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="admin@ejemplo.com"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm bg-input-background border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                    emailValid === null 
                      ? 'border-border focus:ring-primary' 
                      : emailValid 
                      ? 'border-success focus:ring-success' 
                      : 'border-destructive focus:ring-destructive'
                  }`}
                  required
                />
                {emailValid !== null && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {emailValid ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-xs text-foreground mb-1.5 font-medium">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-2.5 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Botón de login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión como Admin'}
            </button>
          </form>

          {/* Info de credenciales demo */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground text-center mb-2">
              <strong className="text-foreground">Credenciales de prueba:</strong>
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>📧 Email: <code className="text-foreground">admin@onpe.gob.pe</code></p>
              <p>🔒 Contraseña: <code className="text-foreground">demo123</code></p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Al continuar, aceptas nuestros{' '}
              <button className="text-primary hover:underline">
                Términos y Condiciones
              </button>
            </p>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-4 text-center text-white/60 text-xs space-y-0.5">
          <p>Panel administrativo de demostración</p>
          <p>Gestiona candidatos, noticias y usuarios</p>
        </div>
      </div>
    </div>
  );
}

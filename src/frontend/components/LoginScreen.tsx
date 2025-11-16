import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LoginScreen() {
  const { login } = useAuth();
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

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleDemoLogin = async (role: 'admin' | 'user') => {
    setError('');
    setIsLoading(true);

    const demoEmail = role === 'admin' ? 'admin@onpe.gob.pe' : 'usuario@demo.com';
    const demoPassword = 'demo123';

    try {
      await login(demoEmail, demoPassword);
    } catch (err) {
      setError('Error al iniciar sesión demo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-background flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md my-8">
        {/* Logo y título */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
            <span className="text-3xl">🇵🇪</span>
          </div>
          <h1 className="text-white text-2xl mb-1.5">DecidePerú 2026</h1>
          <p className="text-white/80 text-sm">Información electoral confiable</p>
        </div>

        {/* Formulario de login */}
        <div className="bg-card rounded-2xl shadow-2xl p-5 border border-border">
          <form onSubmit={handleSubmit} className="space-y-3.5">
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
                  placeholder="tucorreo@ejemplo.com"
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
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Divisor */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-card text-muted-foreground">
                O prueba la app con
              </span>
            </div>
          </div>

          {/* Botones demo */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              disabled={isLoading}
              className="w-full py-2 text-xs bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              👤 Usuario Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              disabled={isLoading}
              className="w-full py-2 text-xs bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              👨‍💼 Administrador Demo
            </button>
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
          <p>Esta es una aplicación de demostración</p>
          <p>Todos los datos son ficticios</p>
        </div>
      </div>
    </div>
  );
}
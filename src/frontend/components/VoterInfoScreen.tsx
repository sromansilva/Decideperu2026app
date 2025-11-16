import { useState } from 'react';
import { MapPin, Navigation, Building2, Shield, CreditCard, AlertCircle, Search, CheckCircle2, IdCard, Hash } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function VoterInfoScreen() {
  const [showInfo, setShowInfo] = useState(false);
  const [dni, setDni] = useState('');
  const [cuiDigit, setCuiDigit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dniValid, setDniValid] = useState<boolean | null>(null);
  const [cuiValid, setCuiValid] = useState<boolean | null>(null);

  const validateDni = (value: string) => {
    return /^\d{8}$/.test(value);
  };

  const validateCui = (value: string) => {
    return /^\d{1}$/.test(value);
  };

  const handleDniChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 8);
    setDni(numericValue);
    if (numericValue.length > 0) {
      setDniValid(validateDni(numericValue));
    } else {
      setDniValid(null);
    }
  };

  const handleCuiChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 1);
    setCuiDigit(numericValue);
    if (numericValue.length > 0) {
      setCuiValid(validateCui(numericValue));
    } else {
      setCuiValid(null);
    }
  };

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateDni(dni)) {
      setError('Ingresa un DNI válido de 8 dígitos');
      return;
    }

    if (!validateCui(cuiDigit)) {
      setError('Ingresa el dígito CUI válido');
      return;
    }

    setIsLoading(true);

    // Simular consulta a API
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setShowInfo(true);
  };

  const handleReset = () => {
    setShowInfo(false);
    setDni('');
    setCuiDigit('');
    setError('');
    setDniValid(null);
    setCuiValid(null);
  };

  // Vista de formulario inicial
  if (!showInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-8">
          <h1 className="text-white">Mi Local de Votación</h1>
          <p className="text-white/90 text-sm mt-2">Consulta dónde te corresponde votar</p>
        </div>

        {/* Formulario */}
        <div className="px-6 py-8">
          <div className="max-w-md mx-auto">
            {/* Card de información */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-foreground mb-1">Consulta tu información electoral</h2>
                  <p className="text-sm text-muted-foreground">
                    Ingresa tus datos para conocer tu local de votación, mesa asignada y más
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleConsult} className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="space-y-5">
                {/* DNI */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Número de DNI
                  </label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={dni}
                      onChange={(e) => handleDniChange(e.target.value)}
                      placeholder="12345678"
                      className={`w-full pl-11 pr-11 py-3 text-sm bg-input-background border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                        dniValid === null 
                          ? 'border-border focus:ring-primary' 
                          : dniValid 
                          ? 'border-success focus:ring-success' 
                          : 'border-destructive focus:ring-destructive'
                      }`}
                      required
                    />
                    {dniValid !== null && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {dniValid ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    8 dígitos de tu Documento Nacional de Identidad
                  </p>
                </div>

                {/* Dígito CUI */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Dígito CUI
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cuiDigit}
                      onChange={(e) => handleCuiChange(e.target.value)}
                      placeholder="5"
                      className={`w-full pl-11 pr-11 py-3 text-sm bg-input-background border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                        cuiValid === null 
                          ? 'border-border focus:ring-primary' 
                          : cuiValid 
                          ? 'border-success focus:ring-success' 
                          : 'border-destructive focus:ring-destructive'
                      }`}
                      required
                    />
                    {cuiValid !== null && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {cuiValid ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Último dígito del CUI en el reverso de tu DNI
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Botón consultar */}
                <Button 
                  type="submit" 
                  className="w-full py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Consultando...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Consultar Local de Votación
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Info adicional */}
            <div className="mt-6 bg-muted/50 border border-border rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    <strong className="text-foreground">¿Dónde encuentro el dígito CUI?</strong>
                  </p>
                  <p>
                    Es el último codigo de tu DNI, encontrarás el código CUI. 
                    Ingresa el último dígito de ese código.
                  </p>
                </div>
              </div>
            </div>

            {/* Datos demo */}
            <div className="mt-4 bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground text-center mb-2">
                <strong className="text-foreground">Datos de prueba:</strong>
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>📝 DNI: <code className="text-foreground bg-muted px-2 py-0.5 rounded">72345678</code></p>
                <p>🔢 Dígito CUI: <code className="text-foreground bg-muted px-2 py-0.5 rounded">5</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista con información completa (después de la consulta)
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white">Información del Elector</h1>
          <button
            onClick={handleReset}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            Nueva consulta
          </button>
        </div>
        <p className="text-white/90 text-sm">DNI: {dni}</p>
      </div>

      {/* Location Button */}
      <div className="px-6 py-6">
        <Button className="w-full bg-primary hover:bg-primary-dark text-white py-6 mb-6">
          <Navigation className="w-5 h-5 mr-2" />
          Usar mi ubicación actual
        </Button>

        {/* Map Mock */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden mb-6 border border-border">
          <div className="relative h-64 bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Mapa del local de votación</p>
              </div>
            </div>
            {/* Mock Map Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <MapPin className="w-8 h-8 text-primary fill-primary" />
            </div>
          </div>
        </div>

        {/* Voting Location Info */}
        <div className="bg-card rounded-2xl shadow-lg p-5 mb-6 border border-border">
          <div className="flex items-start gap-3 mb-4">
            <Building2 className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-foreground mb-2">Tu Local de Votación</h3>
              <p className="text-foreground mb-1">I.E. Simón Bolívar</p>
              <p className="text-sm text-muted-foreground">Av. Los Héroes 458, San Isidro, Lima</p>
            </div>
          </div>

          <div className="border-t border-border pt-4 mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pabellón</p>
              <p className="text-foreground font-medium">A</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Aula</p>
              <p className="text-foreground font-medium">205</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Mesa</p>
              <p className="text-foreground font-medium">042567</p>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            <MapPin className="w-4 h-4 mr-2" />
            Cómo llegar
          </Button>
        </div>

        {/* Ballot Guide */}
        <div className="bg-card rounded-2xl shadow-lg p-5 mb-6 border border-border">
          <div className="flex items-start gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h3 className="text-foreground mb-2">Guía de la Cédula de Sufragio</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Conoce cómo marcar correctamente tu voto
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">1</span>
              <p className="text-sm text-foreground">Marca dentro del recuadro del candidato de tu preferencia</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">2</span>
              <p className="text-sm text-foreground">Usa el lápiz proporcionado en la mesa de votación</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">3</span>
              <p className="text-sm text-foreground">No escribas ni marques fuera del recuadro designado</p>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-card rounded-2xl shadow-lg p-5 border border-border">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h3 className="text-foreground mb-2">Recomendaciones de Seguridad</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">Lleva únicamente tu DNI original, no se aceptan copias</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">Llega temprano a tu local de votación</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">No está permitido el uso de celulares en la cámara secreta</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">Respeta el orden y las indicaciones de los miembros de mesa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
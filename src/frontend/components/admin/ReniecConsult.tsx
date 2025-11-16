import { useState } from 'react';
import { ArrowLeft, Search, User, MapPin, Calendar, Hash, Save, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReniecConsultProps {
  onBack: () => void;
}

interface PersonData {
  dni: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  direccion: string;
  ubigeo: string;
  estadoCivil: string;
}

export function ReniecConsult({ onBack }: ReniecConsultProps) {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const [searchHistory, setSearchHistory] = useState<PersonData[]>([
    {
      dni: '12345678',
      nombres: 'JUAN CARLOS',
      apellidoPaterno: 'PEREZ',
      apellidoMaterno: 'GARCIA',
      fechaNacimiento: '15/05/1985',
      direccion: 'AV. AREQUIPA 1234, LIMA',
      ubigeo: '150101',
      estadoCivil: 'SOLTERO',
    },
    {
      dni: '87654321',
      nombres: 'MARIA ELENA',
      apellidoPaterno: 'RODRIGUEZ',
      apellidoMaterno: 'TORRES',
      fechaNacimiento: '22/08/1990',
      direccion: 'JR. CUSCO 567, LIMA',
      ubigeo: '150102',
      estadoCivil: 'CASADA',
    },
  ]);

  const handleSearch = async () => {
    if (dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos');
      return;
    }

    setLoading(true);
    setError('');
    setPersonData(null);

    // Simulación de llamada API
    setTimeout(() => {
      // Datos de ejemplo
      const mockData: PersonData = {
        dni: dni,
        nombres: 'CARLOS ALBERTO',
        apellidoPaterno: 'MENDOZA',
        apellidoMaterno: 'SILVA',
        fechaNacimiento: '10/03/1988',
        direccion: 'AV. UNIVERSITARIA 890, LIMA',
        ubigeo: '150103',
        estadoCivil: 'SOLTERO',
      };

      setPersonData(mockData);
      setLoading(false);
    }, 2000);
  };

  const handleSavePerson = () => {
    if (personData) {
      setSearchHistory(prev => {
        const exists = prev.some(p => p.dni === personData.dni);
        if (exists) return prev;
        return [personData, ...prev];
      });
      alert('Persona guardada en el sistema');
    }
  };

  const formatDni = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.slice(0, 8);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700 text-white px-6 py-8">
        <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white text-xl mb-1">Consulta RENIEC</h1>
        <p className="text-white/80 text-xs">Verificación de ciudadanos por DNI</p>
      </div>

      {/* API Status */}
      <div className="px-6 -mt-6 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">API Conectada</p>
                <p className="text-xs text-muted-foreground">api.decolecta.com</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="px-6 mb-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-foreground font-medium mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Ciudadano
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Número de DNI *</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => {
                  setDni(formatDni(e.target.value));
                  setError('');
                }}
                placeholder="00000000"
                maxLength={8}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground text-lg tracking-wider text-center focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
              {error && (
                <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={handleSearch}
              disabled={dni.length !== 8 || loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Consultando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Consultar RENIEC
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {personData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="px-6 mb-6"
          >
            <div className="bg-card border border-success/20 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="bg-success/10 px-6 py-4 border-b border-success/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Datos Encontrados</p>
                    <p className="text-xs text-muted-foreground">Información verificada por RENIEC</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">DNI</label>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-foreground font-mono">{personData.dni}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Fecha de Nacimiento</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-foreground">{personData.fechaNacimiento}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Nombres</label>
                  <p className="text-sm text-foreground font-medium">{personData.nombres}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Apellido Paterno</label>
                    <p className="text-sm text-foreground">{personData.apellidoPaterno}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Apellido Materno</label>
                    <p className="text-sm text-foreground">{personData.apellidoMaterno}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Dirección</label>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground">{personData.direccion}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Ubigeo</label>
                    <p className="text-sm text-foreground">{personData.ubigeo}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Estado Civil</label>
                    <p className="text-sm text-foreground">{personData.estadoCivil}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleSavePerson}
                  className="w-full py-3 bg-success hover:bg-success/90 text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar en Sistema
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="px-6">
          <h3 className="text-foreground text-sm font-medium mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Consultas Recientes ({searchHistory.length})
          </h3>
          <div className="space-y-3">
            {searchHistory.map((person, index) => (
              <motion.div
                key={person.dni}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">
                      {person.nombres} {person.apellidoPaterno} {person.apellidoMaterno}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="font-mono">{person.dni}</span>
                      <span>•</span>
                      <span>{person.fechaNacimiento}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setDni(person.dni);
                      setPersonData(person);
                    }}
                    className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="px-6 mt-6 mb-4">
        <div className="bg-muted/30 rounded-xl p-4 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            📋 <strong>Nota:</strong> Esta consulta utiliza la API oficial de RENIEC
            <br />
            Los datos son proporcionados directamente por el registro nacional
            <br />
            <span className="text-primary">Endpoint:</span> https://api.decolecta.com/v1/reniec/dni
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import {
  User,
  ChevronRight,
  Bell,
  Moon,
  Sun,
  Globe,
  Info,
  LogOut,
  Edit,
  CheckCircle,
  Crown,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Camera,
  Shield,
  Heart,
  Users,
  BookOpen,
  HelpCircle,
  FileText,
  Target,
  Vote,
  Flag,
  Award,
  ExternalLink,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, logout, updateUser } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [selectedLanguage, setSelectedLanguage] = useState('Español');
  
  // Estados para los modales
  const [openModal, setOpenModal] = useState<string | null>(null);

  if (!user) return null;

  const handleSaveProfile = () => {
    if (editedUser) {
      updateUser(editedUser);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  // Vista para Ciudadanos Normales (Acerca de + Configuración)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header con logo e info de la app */}
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white px-6 pt-12 pb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border-4 border-white/30">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-white text-2xl mb-2">
              {selectedLanguage === 'Quechua' ? 'DecidePerú 2026' : 'DecidePerú 2026'}
            </h1>
            <p className="text-white/80 text-sm">
              {selectedLanguage === 'Quechua' 
                ? 'Akllanakuy willakuykuna cheqaq' 
                : 'Información electoral confiable'}
            </p>
            <Badge className="mt-3 bg-white/20 text-white border-0">
              {selectedLanguage === 'Quechua' ? 'Riqsichiy 1.0.0' : 'Versión 1.0.0'}
            </Badge>
          </div>
        </div>

        {/* Acerca de la Aplicación */}
        <div className="px-6 mt-6">
          <h3 className="text-sm text-muted-foreground mb-3 px-1">
            {selectedLanguage === 'Quechua' ? 'Kaypi' : 'Acerca de'}
          </h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <MenuItem
              icon={<Info className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Imaraykutaq' : 'Misión'}
              description={selectedLanguage === 'Quechua' 
                ? 'Akllanakuy willakuykunata quy cheqaq hinaspa qhaway atiy'
                : 'Brindar información electoral transparente y confiable'}
              onClick={() => setOpenModal('mission')}
            />
            <MenuItem
              icon={<Heart className="w-5 h-5 text-red-500" />}
              label={selectedLanguage === 'Quechua' ? 'Perú Llaqtapaq' : 'Para el Pueblo Peruano'}
              description={selectedLanguage === 'Quechua'
                ? 'Democraciata hinaspa llaqtapa yanapakuyninta kallpachay'
                : 'Promoviendo la democracia y participación ciudadana'}
              onClick={() => setOpenModal('people')}
            />
            <MenuItem
              icon={<Users className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Ruway Huñu' : 'Equipo de Desarrollo'}
              description={selectedLanguage === 'Quechua'
                ? 'Riqsiy pikunachus kay programata ruwanchik'
                : 'Conoce quiénes creamos esta app'}
              onClick={() => setOpenModal('team')}
            />
            <MenuItem
              icon={<BookOpen className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Willakuy Paqarinakuna' : 'Fuentes de Información'}
              description={selectedLanguage === 'Quechua'
                ? 'JNE, ONPE, RENIEC hinaspa takyasqa willariykuna'
                : 'JNE, ONPE, RENIEC y medios verificados'}
              onClick={() => setOpenModal('sources')}
              showDivider={false}
            />
          </div>
        </div>

        {/* Configuración */}
        <div className="px-6 mt-6">
          <h3 className="text-sm text-muted-foreground mb-3 px-1">
            {selectedLanguage === 'Quechua' ? 'Allichay' : 'Configuración'}
          </h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <MenuItem
              icon={theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Laqha Rikuy' : 'Modo Oscuro'}
              description={theme === 'dark' 
                ? (selectedLanguage === 'Quechua' ? 'Kachkan' : 'Activado')
                : (selectedLanguage === 'Quechua' ? 'Mana kachkan' : 'Desactivado')}
              rightElement={
                <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              }
              onClick={toggleTheme}
            />
            <MenuItem
              icon={<Bell className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Willariykuna' : 'Notificaciones'}
              description={notifications 
                ? (selectedLanguage === 'Quechua' ? 'Kachkan' : 'Activadas')
                : (selectedLanguage === 'Quechua' ? 'Mana kachkan' : 'Desactivadas')}
              rightElement={
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              }
              onClick={() => setNotifications(!notifications)}
            />
            <MenuItem
              icon={<Globe className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Simi' : 'Idioma'}
              description={selectedLanguage}
              onClick={() => {
                // Ciclar entre idiomas
                const languages = ['Español', 'Quechua'];
                const currentIndex = languages.indexOf(selectedLanguage);
                const nextIndex = (currentIndex + 1) % languages.length;
                setSelectedLanguage(languages[nextIndex]);
              }}
              showDivider={false}
            />
          </div>
        </div>

        {/* Legal e Información */}
        <div className="px-6 mt-6">
          <h3 className="text-sm text-muted-foreground mb-3 px-1">
            {selectedLanguage === 'Quechua' ? 'Kamachikuy hinaspa Willakuy' : 'Legal e Información'}
          </h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <MenuItem
              icon={<FileText className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Kamachikuykuna' : 'Términos y Condiciones'}
              onClick={() => setOpenModal('terms')}
            />
            <MenuItem
              icon={<Shield className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Sapan Kayninkuna Amachay' : 'Política de Privacidad'}
              onClick={() => setOpenModal('privacy')}
            />
            <MenuItem
              icon={<HelpCircle className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Yanapay Wasi' : 'Centro de Ayuda'}
              onClick={() => setOpenModal('help')}
            />
            <MenuItem
              icon={<Info className="w-5 h-5" />}
              label={selectedLanguage === 'Quechua' ? 'Kichasqa Qillqa Licencias' : 'Licencias de Código Abierto'}
              onClick={() => setOpenModal('licenses')}
              showDivider={false}
            />
          </div>
        </div>

        {/* Cerrar Sesión */}
        <div className="px-6 mt-6">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>{selectedLanguage === 'Quechua' ? 'Lluqsiy' : 'Cerrar Sesión'}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-8 pb-4 px-6">
          <p className="mb-2">
            {selectedLanguage === 'Quechua' 
              ? '🇵🇪 Perú suyu munaywan rurasqa' 
              : '🇵🇪 Hecho con ❤️ para Perú'}
          </p>
          <p className="text-muted-foreground/70">
            {selectedLanguage === 'Quechua'
              ? 'Kay programaqa sapalla, mana ima partido político utaq gobierno nisqawan tupasqachu'
              : 'Esta aplicación es independiente y no está afiliada a ninguna organización política o gubernamental'}
          </p>
        </div>

        {/* Modales Informativos */}
        <InfoModals openModal={openModal} setOpenModal={setOpenModal} language={selectedLanguage} />
      </div>
    );
  }

  // Vista para Administradores (Perfil completo con edición)
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header con info de usuario */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground px-6 pt-12 pb-8">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-white/20 text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white">{user.name}</h2>
              {isAdmin && (
                <Crown className="w-5 h-5 text-yellow-300" />
              )}
            </div>
            <p className="text-white/80 text-sm mb-2">{user.email}</p>
            <div className="flex items-center gap-2">
              <Badge variant={user.votingStatus === 'habilitado' ? 'default' : 'secondary'} className="bg-white/20 text-white border-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                {user.votingStatus === 'habilitado' ? 'Habilitado para votar' : 'Pendiente'}
              </Badge>
              {isAdmin && (
                <Badge className="bg-yellow-500/20 text-yellow-200 border-0">
                  Administrador
                </Badge>
              )}
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-white/80 hover:text-white p-2"
            >
              <Edit className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancelEdit}
                className="text-white/80 hover:text-white p-2"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={handleSaveProfile}
                className="text-white p-2 bg-white/20 rounded-lg hover:bg-white/30"
              >
                <Save className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {user.dni && (
          <div className="mt-4 text-white/60 text-sm">
            DNI: {user.dni}
          </div>
        )}
      </div>

      {/* Formulario de edición */}
      {isEditing && (
        <div className="px-6 -mt-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-5 shadow-lg space-y-4">
            <h3 className="text-foreground flex items-center gap-2 mb-3">
              <Edit className="w-5 h-5 text-primary" />
              Editar Perfil
            </h3>

            {/* Campo Nombre */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={editedUser?.name || ''}
                  onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={editedUser?.email || ''}
                  onChange={(e) => setEditedUser(prev => prev ? {...prev, email: e.target.value} : null)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Campo Teléfono */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={editedUser?.phone || ''}
                  onChange={(e) => setEditedUser(prev => prev ? {...prev, phone: e.target.value} : null)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Campo Dirección */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                Dirección
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={editedUser?.address || ''}
                  onChange={(e) => setEditedUser(prev => prev ? {...prev, address: e.target.value} : null)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuración */}
      <div className="px-6 mt-6">
        <h3 className="text-sm text-muted-foreground mb-3 px-1">Configuración</h3>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <MenuItem
            icon={theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            label="Modo Oscuro"
            description={theme === 'dark' ? 'Activado' : 'Desactivado'}
            rightElement={
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            }
            onClick={toggleTheme}
          />
          <MenuItem
            icon={<Bell className="w-5 h-5" />}
            label="Notificaciones"
            description={notifications ? 'Activadas' : 'Desactivadas'}
            rightElement={
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            }
            onClick={() => setNotifications(!notifications)}
          />
          <MenuItem
            icon={<Globe className="w-5 h-5" />}
            label="Idioma"
            description={selectedLanguage}
            onClick={() => {
              // Ciclar entre idiomas
              const languages = ['Español', 'Quechua'];
              const currentIndex = languages.indexOf(selectedLanguage);
              const nextIndex = (currentIndex + 1) % languages.length;
              setSelectedLanguage(languages[nextIndex]);
            }}
            showDivider={false}
          />
        </div>
      </div>

      {/* Legal e Información */}
      <div className="px-6 mt-6">
        <h3 className="text-sm text-muted-foreground mb-3 px-1">Legal e Información</h3>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <MenuItem
            icon={<FileText className="w-5 h-5" />}
            label="Términos y Condiciones"
            onClick={() => setOpenModal('terms')}
          />
          <MenuItem
            icon={<Shield className="w-5 h-5" />}
            label="Política de Privacidad"
            onClick={() => setOpenModal('privacy')}
          />
          <MenuItem
            icon={<HelpCircle className="w-5 h-5" />}
            label="Centro de Ayuda"
            onClick={() => setOpenModal('help')}
          />
          <MenuItem
            icon={<Info className="w-5 h-5" />}
            label="Licencias de Código Abierto"
            onClick={() => setOpenModal('licenses')}
            showDivider={false}
          />
        </div>
      </div>

      {/* Cerrar sesión */}
      <div className="px-6 mt-6 mb-6">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground pb-4">
        <p>DecidePerú 2026 • v1.0.0</p>
        <p className="mt-1">Información electoral confiable</p>
      </div>

      {/* Modales Informativos */}
      <InfoModals openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

// Componente auxiliar para items del menú
interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  showDivider?: boolean;
}

function MenuItem({
  icon,
  label,
  description,
  rightElement,
  onClick,
  showDivider = true,
}: MenuItemProps) {
  // Si hay un rightElement (como Switch), usar div para evitar anidamiento de botones
  const Wrapper = rightElement ? 'div' : 'button';
  
  return (
    <>
      <Wrapper
        onClick={rightElement ? undefined : onClick}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors text-left"
      >
        <div className="text-muted-foreground">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-foreground">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        {rightElement || (
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </Wrapper>
      {showDivider && <div className="border-b border-border mx-4" />}
    </>
  );
}

// Componente para modales informativos
interface InfoModalsProps {
  openModal: string | null;
  setOpenModal: (modal: string | null) => void;
  language?: string;
}

function InfoModals({ openModal, setOpenModal, language = 'Español' }: InfoModalsProps) {
  return (
    <>
      {/* Modal Misión */}
      <Dialog open={openModal === 'mission'} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <DialogTitle className="text-xl">Nuestra Misión</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <p className="text-foreground leading-relaxed">
              DecidePerú 2026 nace con el compromiso de democratizar el acceso a la información electoral en el Perú.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">🎯 Nuestro propósito</h4>
              <p className="text-muted-foreground">
                Empoderar a cada ciudadano peruano con información clara, verificada y oportuna sobre el proceso electoral, 
                promoviendo una participación informada y consciente en la democracia.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Valores que nos guían
              </h4>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Transparencia:</strong> Información clara y sin sesgos políticos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Accesibilidad:</strong> Disponible para todos los peruanos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Veracidad:</strong> Datos verificados de fuentes oficiales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span><strong>Independencia:</strong> Sin afiliaciones políticas ni gubernamentales</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Para el Pueblo Peruano */}
      <Dialog open={openModal === 'people'} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <DialogTitle className="text-xl">Para el Pueblo Peruano</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg p-4 border border-red-500/20">
              <p className="text-foreground text-center italic">
                "Una democracia fuerte necesita ciudadanos informados"
              </p>
            </div>

            <p className="text-foreground leading-relaxed">
              Esta aplicación es un regalo para todos los peruanos que creen en la democracia y desean ejercer 
              su derecho al voto de manera informada y responsable.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Vote className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">Participación Ciudadana</h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    Promovemos el voto informado como pilar fundamental de nuestra democracia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Flag className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">Unidad Nacional</h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    Más allá de diferencias políticas, nos une el amor por el Perú
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">Futuro Mejor</h4>
                  <p className="text-muted-foreground text-xs mt-1">
                    Cada voto informado construye el Perú que queremos para nuestros hijos
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">
                🇵🇪 Hecho con amor para Perú • Por peruanos, para peruanos
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Equipo de Desarrollo */}
      <Dialog open={openModal === 'team'} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <DialogTitle className="text-xl">Equipo de Desarrollo</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <p className="text-foreground leading-relaxed">
              Somos un equipo multidisciplinario de profesionales peruanos comprometidos con la tecnología cívica y la democracia.
            </p>

            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                    DE
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Desarrolladores</h4>
                    <p className="text-xs text-muted-foreground">Ingenieros de software</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Especialistas en desarrollo web, móvil y seguridad informática
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    DI
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Diseñadores UX/UI</h4>
                    <p className="text-xs text-muted-foreground">Experiencia de usuario</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Creando interfaces intuitivas y accesibles para todos
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white">
                    PE
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Periodistas</h4>
                    <p className="text-xs text-muted-foreground">Verificación de información</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Validando y curando contenido electoral confiable
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white">
                    CI
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Científicos Políticos</h4>
                    <p className="text-xs text-muted-foreground">Análisis y contexto</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Aportando rigor académico al análisis electoral
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">
                💡 Proyecto independiente sin fines de lucro
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Fuentes de Información */}
      <Dialog open={openModal === 'sources'} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="text-xl">Fuentes de Información</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <p className="text-foreground leading-relaxed">
              Toda la información presentada en DecidePerú 2026 proviene exclusivamente de fuentes oficiales y verificadas.
            </p>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">🏛️ Instituciones Oficiales</h4>
              
              <div className="bg-card border border-green-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-foreground">JNE - Jurado Nacional de Elecciones</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Información oficial de candidatos, partidos políticos y resultados electorales
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-green-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-foreground">ONPE - Oficina Nacional de Procesos Electorales</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Datos sobre el proceso electoral, logística y ubicación de mesas de votación
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-green-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-foreground">RENIEC - Registro Nacional de Identificación</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Verificación de datos de votantes y padrón electoral
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="font-medium text-foreground mt-4">📰 Medios Verificados</h4>
              <p className="text-xs text-muted-foreground">
                Las noticias provienen de medios de comunicación reconocidos y son verificadas por nuestro equipo editorial antes de ser publicadas.
              </p>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Compromiso de veracidad:</strong> Cualquier información que no pueda ser verificada no se publica en la plataforma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Términos y Condiciones */}
      <Dialog open={openModal === 'terms'} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <DialogTitle className="text-xl">Términos y Condiciones</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <p className="text-xs text-muted-foreground">Última actualización: Noviembre 2025</p>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground mb-2">1. Aceptación de términos</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Al usar DecidePerú 2026, aceptas estos términos y condiciones. Si no estás de acuerdo, 
                  por favor no uses la aplicación.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">2. Uso de la aplicación</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Esta aplicación es de uso gratuito y está destinada exclusivamente para fines informativos sobre 
                  el proceso electoral peruano 2026. No debes usar la aplicación para fines ilegales o no autorizados.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">3. Información proporcionada</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  La información proviene de fuentes oficiales (JNE, ONPE, RENIEC). Nos esforzamos por mantener 
                  la información actualizada, pero no garantizamos que sea 100% precisa en todo momento.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">4. Neutralidad política</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  DecidePerú 2026 es independiente y no está afiliado a ningún partido político, candidato u 
                  organización gubernamental. Presentamos información de manera imparcial.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">5. Modificaciones</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
                  serán notificados en la aplicación.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Política de Privacidad */}
      <Dialog open={openModal === 'privacy'} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <DialogTitle className="text-xl">Política de Privacidad</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <p className="text-xs text-muted-foreground">Última actualización: Noviembre 2025</p>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <p className="text-xs text-foreground">
                <strong>Tu privacidad es importante.</strong> No recopilamos, almacenamos ni compartimos 
                datos personales sin tu consentimiento explícito.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground mb-2">📊 Información que recopilamos</h4>
                <ul className="space-y-2 text-muted-foreground text-xs ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Datos de uso anónimos para mejorar la aplicación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Preferencias de configuración (tema, idioma)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Datos técnicos (versión del dispositivo, sistema operativo)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">🔒 Cómo protegemos tus datos</h4>
                <ul className="space-y-2 text-muted-foreground text-xs ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Cifrado de datos en tránsito y almacenamiento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>No vendemos ni compartimos datos con terceros</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>Cumplimiento con la Ley de Protección de Datos Personales del Perú</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">✅ Tus derechos</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Tienes derecho a acceder, corregir o eliminar tus datos en cualquier momento. 
                  Contáctanos a través del Centro de Ayuda para ejercer tus derechos.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">🍪 Cookies</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Usamos cookies esenciales para el funcionamiento de la aplicación. No usamos cookies 
                  de terceros para publicidad o seguimiento.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Centro de Ayuda */}
      <Dialog open={openModal === 'help'} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-orange-500/10 rounded-xl">
                <HelpCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <DialogTitle className="text-xl">Centro de Ayuda</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <p className="text-foreground leading-relaxed">
              ¿Tienes preguntas? Estamos aquí para ayudarte.
            </p>

            <div className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-3">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-orange-600" />
                  Preguntas Frecuentes
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="font-medium text-foreground">¿Cómo verifico si estoy habilitado para votar?</p>
                    <p className="text-muted-foreground mt-1">
                      Usa la sección "Consultar DNI" en el menú principal para verificar tu estado electoral.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">¿Puedo confiar en la información?</p>
                    <p className="text-muted-foreground mt-1">
                      Sí, toda la información proviene de fuentes oficiales (JNE, ONPE, RENIEC).
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">¿La app tiene costo?</p>
                    <p className="text-muted-foreground mt-1">
                      No, DecidePerú 2026 es completamente gratuita y sin publicidad.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-3">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-600" />
                  Contacto
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  ¿No encontraste lo que buscabas? Contáctanos:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-foreground">ayuda@decideperu.pe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-muted-foreground" />
                    <span className="text-foreground">www.decideperu.pe</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <p className="text-xs text-foreground">
                  <strong>💬 Horario de atención:</strong> Lunes a Domingo, 8:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Licencias de Código Abierto */}
      <Dialog open={openModal === 'licenses'} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <Info className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <DialogTitle className="text-xl">Licencias de Código Abierto</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <p className="text-foreground leading-relaxed">
              DecidePerú 2026 utiliza las siguientes bibliotecas y tecnologías de código abierto:
            </p>

            <div className="space-y-2">
              <div className="bg-card border border-border rounded-lg p-3">
                <h4 className="font-medium text-foreground text-sm">React</h4>
                <p className="text-xs text-muted-foreground mt-1">MIT License</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-3">
                <h4 className="font-medium text-foreground text-sm">Tailwind CSS</h4>
                <p className="text-xs text-muted-foreground mt-1">MIT License</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-3">
                <h4 className="font-medium text-foreground text-sm">Lucide Icons</h4>
                <p className="text-xs text-muted-foreground mt-1">ISC License</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-3">
                <h4 className="font-medium text-foreground text-sm">shadcn/ui</h4>
                <p className="text-xs text-muted-foreground mt-1">MIT License</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-3">
                <h4 className="font-medium text-foreground text-sm">Motion (Framer Motion)</h4>
                <p className="text-xs text-muted-foreground mt-1">MIT License</p>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
              <p className="text-xs text-foreground">
                <strong>🙏 Agradecimiento:</strong> Gracias a la comunidad de código abierto por hacer posible esta aplicación.
              </p>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Para ver las licencias completas, visita nuestro repositorio en GitHub
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
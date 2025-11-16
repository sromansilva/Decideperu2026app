import { useState } from 'react';
import {
  User,
  ChevronRight,
  Settings,
  Shield,
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Info,
  LogOut,
  Edit,
  CheckCircle,
  BarChart3,
  Users,
  Newspaper,
  Calendar,
  Send,
  Crown,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Camera,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
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

      {/* Panel de Administración (solo para admin) */}
      {isAdmin && (
        <div className="px-6 mt-6">
          <h3 className="text-sm text-muted-foreground mb-3 px-1 flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-500" />
            Panel de Administración
          </h3>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20 p-1">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <MenuItem
                icon={<Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />}
                label="Panel Administrativo"
                description="Acceso completo al sistema"
                onClick={() => onNavigate?.('admin-dashboard')}
              />
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
            icon={<Lock className="w-5 h-5" />}
            label="Cambiar Contraseña"
            onClick={() => console.log('Cambiar contraseña')}
          />
          <MenuItem
            icon={<Lock className="w-5 h-5" />}
            label="Privacidad"
            onClick={() => console.log('Privacidad')}
          />
          <MenuItem
            icon={<Globe className="w-5 h-5" />}
            label="Idioma"
            description="Español"
            onClick={() => console.log('Idioma')}
            showDivider={false}
          />
        </div>
      </div>

      {/* Acerca de */}
      <div className="px-6 mt-6">
        <h3 className="text-sm text-muted-foreground mb-3 px-1">Acerca de</h3>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <MenuItem
            icon={<Info className="w-5 h-5" />}
            label="Información de la App"
            description="Versión 1.0.0"
            onClick={() => console.log('Info')}
          />
          <MenuItem
            icon={<Info className="w-5 h-5" />}
            label="Términos y Condiciones"
            onClick={() => console.log('Términos')}
          />
          <MenuItem
            icon={<Shield className="w-5 h-5" />}
            label="Política de Privacidad"
            onClick={() => console.log('Privacidad')}
          />
          <MenuItem
            icon={<Info className="w-5 h-5" />}
            label="Centro de Ayuda"
            onClick={() => console.log('Ayuda')}
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
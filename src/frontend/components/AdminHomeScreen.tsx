import { 
  Users, 
  Newspaper, 
  Calendar, 
  BarChart3, 
  Send, 
  CheckCircle,
  Shield,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  Crown
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';

interface AdminHomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function AdminHomeScreen({ onNavigate }: AdminHomeScreenProps) {
  // Datos de estadísticas simuladas
  const stats = {
    totalUsers: 45231,
    totalCandidates: 28,
    totalNews: 124,
    totalEvents: 18,
    systemStatus: 'operational',
    lastUpdate: 'Hace 2 minutos'
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Administrativo */}
      <div className="bg-gradient-to-br from-yellow-600 to-orange-600 text-white px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-white">Panel Administrativo</h1>
              <p className="text-white/80 text-sm mt-0.5">DecidePerú 2026</p>
            </div>
          </div>
          <Crown className="w-8 h-8 text-yellow-200" />
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Badge className="bg-green-500/20 text-green-100 border-0">
            <Activity className="w-3 h-3 mr-1" />
            Sistema Operativo
          </Badge>
          <Badge className="bg-white/20 text-white border-0">
            <Clock className="w-3 h-3 mr-1" />
            {stats.lastUpdate}
          </Badge>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Usuarios"
            value={stats.totalUsers.toLocaleString()}
            trend="+12%"
            trendUp={true}
            color="blue"
          />
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Candidatos"
            value={stats.totalCandidates.toString()}
            trend="+3"
            trendUp={true}
            color="purple"
          />
          <StatCard
            icon={<Newspaper className="w-5 h-5" />}
            label="Noticias"
            value={stats.totalNews.toString()}
            trend="+8"
            trendUp={true}
            color="green"
          />
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="Eventos"
            value={stats.totalEvents.toString()}
            trend="+2"
            trendUp={true}
            color="orange"
          />
        </div>
      </div>

      {/* Gestiones Principales */}
      <div className="px-6 mb-6">
        <h2 className="text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Gestiones del Sistema
        </h2>
        
        <div className="space-y-3">
          {/* Gestión de Candidatos */}
          <GestionCard
            icon={<Users className="w-6 h-6" />}
            title="Gestión de Candidatos"
            description="Crear, editar y administrar candidatos"
            color="blue"
            onClick={() => onNavigate('admin-candidates')}
            badge="28 activos"
          />

          {/* Gestión de Noticias */}
          <GestionCard
            icon={<Newspaper className="w-6 h-6" />}
            title="Gestión de Noticias"
            description="Publicar y gestionar noticias electorales"
            color="green"
            onClick={() => onNavigate('admin-news')}
            badge="124 publicadas"
          />

          {/* Gestión de Eventos */}
          <GestionCard
            icon={<Calendar className="w-6 h-6" />}
            title="Gestión de Eventos"
            description="Crear y administrar eventos del calendario"
            color="purple"
            onClick={() => onNavigate('admin-events')}
            badge="18 próximos"
          />

          {/* Estadísticas */}
          <GestionCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Panel de Estadísticas"
            description="Visualizar métricas y analytics"
            color="orange"
            onClick={() => onNavigate('admin-stats')}
            badge="En vivo"
          />

          {/* Notificaciones Push */}
          <GestionCard
            icon={<Send className="w-6 h-6" />}
            title="Notificaciones Push"
            description="Enviar notificaciones a usuarios"
            color="pink"
            onClick={() => onNavigate('admin-notifications')}
            badge="Sistema activo"
          />

          {/* Consulta RENIEC */}
          <GestionCard
            icon={<CheckCircle className="w-6 h-6" />}
            title="Consulta RENIEC"
            description="Verificar datos de votantes"
            color="cyan"
            onClick={() => onNavigate('admin-reniec')}
            badge="API conectada"
          />
        </div>
      </div>

      {/* Alertas y Avisos */}
      <div className="px-6 mb-6">
        <h2 className="text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          Alertas del Sistema
        </h2>
        
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground">Sistema de respaldo programado</p>
              <p className="text-sm text-muted-foreground mt-1">
                Se realizará un respaldo automático de la base de datos hoy a las 23:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acceso Rápido */}
      <div className="px-6 mb-6">
        <h2 className="text-foreground mb-4">Accesos Rápidos</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <QuickAccessCard
            icon={<Shield className="w-5 h-5" />}
            label="Panel Completo"
            onClick={() => onNavigate('admin-dashboard')}
            color="primary"
          />
          <QuickAccessCard
            icon={<BarChart3 className="w-5 h-5" />}
            label="Reportes"
            onClick={() => onNavigate('admin-stats')}
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}

// Componente para tarjetas de estadísticas
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

function StatCard({ icon, label, value, trend, trendUp, color }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-4 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-white/20 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-green-200' : 'text-red-200'}`}>
          <TrendingUp className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
          {trend}
        </div>
      </div>
      <p className="text-2xl mb-0.5">{value}</p>
      <p className="text-xs text-white/80">{label}</p>
    </div>
  );
}

// Componente para tarjetas de gestión
interface GestionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan';
  onClick: () => void;
  badge?: string;
}

function GestionCard({ icon, title, description, color, onClick, badge }: GestionCardProps) {
  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    green: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-600 dark:text-green-400',
    purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
    orange: 'from-orange-500/10 to-orange-600/10 border-orange-500/20 text-orange-600 dark:text-orange-400',
    pink: 'from-pink-500/10 to-pink-600/10 border-pink-500/20 text-pink-600 dark:text-pink-400',
    cyan: 'from-cyan-500/10 to-cyan-600/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400'
  };

  const [gradientClass, borderClass, iconClass] = colorClasses[color].split(' border-');
  const finalBorderClass = 'border-' + borderClass.split(' ')[0];
  const finalIconClass = borderClass.split(' ')[1];

  return (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-br ${gradientClass} ${finalBorderClass} border rounded-xl p-4 hover:scale-[1.02] transition-transform text-left`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-3 bg-card rounded-lg ${finalIconClass}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-foreground">{title}</h3>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </button>
  );
}

// Componente para accesos rápidos
interface QuickAccessCardProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: 'primary' | 'secondary';
}

function QuickAccessCard({ icon, label, onClick, color }: QuickAccessCardProps) {
  const bgClass = color === 'primary' 
    ? 'bg-primary hover:bg-primary/90' 
    : 'bg-secondary hover:bg-secondary/90';

  return (
    <button
      onClick={onClick}
      className={`${bgClass} text-primary-foreground rounded-xl p-4 transition-colors flex flex-col items-center justify-center gap-2 h-24`}
    >
      {icon}
      <span className="text-sm text-center">{label}</span>
    </button>
  );
}
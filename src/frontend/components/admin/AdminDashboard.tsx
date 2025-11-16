import { 
  Users, 
  Newspaper, 
  Calendar, 
  BarChart3, 
  Bell, 
  UserCheck,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const adminModules = [
    {
      id: 'candidates',
      title: 'Gestión de Candidatos',
      description: 'Crear, editar y eliminar candidatos',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      stats: '24 candidatos',
      screen: 'admin-candidates',
    },
    {
      id: 'news',
      title: 'Gestión de Noticias',
      description: 'Publicar y administrar noticias',
      icon: Newspaper,
      color: 'from-purple-500 to-purple-600',
      stats: '156 noticias',
      screen: 'admin-news',
    },
    {
      id: 'events',
      title: 'Gestión de Eventos',
      description: 'Calendario y eventos electorales',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      stats: '12 próximos',
      screen: 'admin-events',
    },
    {
      id: 'stats',
      title: 'Panel de Estadísticas',
      description: 'Métricas y análisis de datos',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      stats: 'En vivo',
      screen: 'admin-stats',
    },
    {
      id: 'notifications',
      title: 'Envío de Notificaciones',
      description: 'Notificaciones push y alertas',
      icon: Bell,
      color: 'from-red-500 to-red-600',
      stats: '1.2K enviadas',
      screen: 'admin-notifications',
    },
    {
      id: 'reniec',
      title: 'Consulta RENIEC',
      description: 'Verificación de ciudadanos',
      icon: UserCheck,
      color: 'from-cyan-500 to-cyan-600',
      stats: 'API activa',
      screen: 'admin-reniec',
    },
  ];

  const quickStats = [
    { label: 'Usuarios Activos', value: '45,231', change: '+12%', trend: 'up' },
    { label: 'Sesiones Hoy', value: '2,847', change: '+8%', trend: 'up' },
    { label: 'Tiempo Promedio', value: '5m 34s', change: '-3%', trend: 'down' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 text-white px-6 py-8 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Panel Administrativo</h1>
              <p className="text-white/90 text-sm">Control y gestión del sistema</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/30">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-medium">Sistema Activo</span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-500/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-green-400/30">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-xs font-medium">En Línea</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-center gap-1 mb-1">
                <Activity className="w-3 h-3 text-muted-foreground" />
                <span className={`text-xs ${
                  stat.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-lg text-foreground font-medium leading-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Admin Modules */}
      <div className="px-6">
        <h2 className="text-foreground text-sm font-medium mb-4">Módulos de Gestión</h2>
        <div className="space-y-3">
          {adminModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onNavigate(module.screen)}
                className="w-full bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color} flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-foreground font-medium mb-0.5 truncate">
                      {module.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1 truncate">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {module.stats}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* System Status */}
      <div className="px-6 mt-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-foreground text-sm font-medium mb-3">Estado del Sistema</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Base de Datos</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-success">Operativa</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">API RENIEC</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-success">Conectada</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Notificaciones</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-success">Activas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 mt-6 mb-4">
        <div className="bg-muted/30 rounded-xl p-4 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Panel de administración - DecidePerú 2026
            <br />
            <span className="text-primary">Versión 2.1.0</span> • Última actualización hace 2 min
          </p>
        </div>
      </div>
    </div>
  );
}
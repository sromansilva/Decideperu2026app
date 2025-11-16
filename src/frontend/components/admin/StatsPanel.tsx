import { ArrowLeft, TrendingUp, TrendingDown, Users, Eye, Heart, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

interface StatsPanelProps {
  onBack: () => void;
}

export function StatsPanel({ onBack }: StatsPanelProps) {
  // Datos de ejemplo para gráficos
  const userActivityData = [
    { name: 'Lun', users: 3400 },
    { name: 'Mar', users: 4200 },
    { name: 'Mié', users: 3800 },
    { name: 'Jue', users: 5200 },
    { name: 'Vie', users: 4800 },
    { name: 'Sáb', users: 2900 },
    { name: 'Dom', users: 2100 },
  ];

  const candidatePopularityData = [
    { name: 'Ana Torres', popularity: 32, color: '#3b82f6' },
    { name: 'Carlos Mendoza', popularity: 28, color: '#8b5cf6' },
    { name: 'María Vega', popularity: 24, color: '#10b981' },
    { name: 'Roberto Campos', popularity: 16, color: '#f59e0b' },
  ];

  const newsInteractionData = [
    { category: 'Oficial', reads: 15240 },
    { category: 'Seguridad', reads: 8920 },
    { category: 'Candidatos', reads: 12450 },
    { category: 'Capacitación', reads: 6780 },
    { category: 'Resultados', reads: 9320 },
  ];

  const participationData = [
    { name: 'Participarán', value: 68, color: '#10b981' },
    { name: 'Indecisos', value: 22, color: '#f59e0b' },
    { name: 'No participarán', value: 10, color: '#ef4444' },
  ];

  const quickMetrics = [
    {
      label: 'Usuarios Totales',
      value: '45,231',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Sesiones Activas',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Vistas de Noticias',
      value: '52,890',
      change: '+15.3%',
      trend: 'up',
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Favoritos Totales',
      value: '8,432',
      change: '+5.7%',
      trend: 'up',
      icon: Heart,
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white px-6 py-8">
        <button onClick={onBack} className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white text-xl mb-1">Panel de Estadísticas</h1>
        <p className="text-white/80 text-xs">Métricas y análisis en tiempo real</p>
      </div>

      {/* Quick Metrics */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {quickMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-4 shadow-lg"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl text-foreground font-medium mb-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {metric.change}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="px-6 space-y-6">
        {/* Actividad de Usuarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-foreground font-medium text-sm mb-1">Actividad de Usuarios</h3>
              <p className="text-xs text-muted-foreground">Últimos 7 días</p>
            </div>
            <div className="px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs text-primary">+12.5%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <YAxis
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Popularidad de Candidatos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="mb-4">
            <h3 className="text-foreground font-medium text-sm mb-1">Popularidad de Candidatos</h3>
            <p className="text-xs text-muted-foreground">Comparativa de interacciones</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={candidatePopularityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                stroke="hsl(var(--border))"
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="popularity" radius={[8, 8, 0, 0]}>
                {candidatePopularityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Participación Estimada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="mb-4">
            <h3 className="text-foreground font-medium text-sm mb-1">Participación Estimada</h3>
            <p className="text-xs text-muted-foreground">Intención de voto declarada</p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={participationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {participationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {participationData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
                <p className="text-xs text-muted-foreground">{item.name}</p>
                <p className="text-sm text-foreground font-medium">{item.value}%</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interacción con Noticias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="mb-4">
            <h3 className="text-foreground font-medium text-sm mb-1">Noticias Más Leídas</h3>
            <p className="text-xs text-muted-foreground">Por categoría</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={newsInteractionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                stroke="hsl(var(--border))"
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="reads" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <h3 className="text-foreground font-medium text-sm mb-4">Estadísticas Adicionales</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Tiempo promedio en app</span>
              <span className="text-sm text-foreground font-medium">5m 34s</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Páginas vistas por sesión</span>
              <span className="text-sm text-foreground font-medium">8.2</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Tasa de rebote</span>
              <span className="text-sm text-foreground font-medium">32.4%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Usuarios nuevos (hoy)</span>
              <span className="text-sm text-foreground font-medium">1,245</span>
            </div>
          </div>
        </motion.div>

        {/* Last Update Info */}
        <div className="bg-muted/30 rounded-xl p-4 border border-border text-center">
          <p className="text-xs text-muted-foreground">
            Datos actualizados hace 2 minutos
            <br />
            Próxima actualización en 3 minutos
          </p>
        </div>
      </div>
    </div>
  );
}

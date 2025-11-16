# 📚 Ejemplos de Integración - Supabase Hooks

## Guía rápida para conectar los componentes admin con Supabase

---

## 🎯 Componente: CandidateManagement

### ❌ Antes (con datos mock):

```typescript
const [candidates, setCandidates] = useState<Candidate[]>([
  {
    id: 1,
    name: 'Ana María Torres',
    // ... datos mock
  },
]);
```

### ✅ Después (con Supabase):

```typescript
import { useAdminCandidates } from '../../hooks/useAdminCandidates';

export function CandidateManagement({ onBack }: CandidateManagementProps) {
  // Reemplazar useState con el hook
  const {
    candidates,
    loading,
    error,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    fetchCandidates,
  } = useAdminCandidates();

  // Ya no necesitas el estado local
  // const [candidates, setCandidates] = useState([]);
  
  // Crear candidato - modificar la función existente
  const handleCreateCandidate = async (formData) => {
    const result = await createCandidate({
      name: formData.name,
      party: formData.party,
      shortParty: formData.shortParty,
      position: formData.position,
      region: formData.region,
      image: formData.image,
      proposals: formData.proposals,
      history: formData.history,
      socialMedia: formData.socialMedia,
      status: formData.status,
    });

    if (result.success) {
      setView('list'); // Volver a la lista
      // Opcional: Mostrar toast de éxito
    } else {
      // Mostrar error
      alert(result.error);
    }
  };

  // Actualizar candidato - modificar la función existente
  const handleUpdateCandidate = async (id: string, formData) => {
    const result = await updateCandidate(id, formData);

    if (result.success) {
      setView('list');
    } else {
      alert(result.error);
    }
  };

  // Eliminar candidato - modificar la función existente
  const handleDeleteCandidate = async (id: string) => {
    const result = await deleteCandidate(id);

    if (result.success) {
      setShowDeleteDialog(false);
      setSelectedCandidate(null);
    } else {
      alert(result.error);
    }
  };

  // Mostrar loading
  if (loading && !candidates.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando candidatos...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={fetchCandidates}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // El resto del componente permanece igual
  return (
    // ... tu JSX actual
  );
}
```

---

## 📰 Componente: NewsManagement

### Cambios necesarios:

```typescript
import { useAdminNews } from '../../hooks/useAdminNews';

export function NewsManagement({ onBack }: NewsManagementProps) {
  const {
    newsList,
    loading,
    error,
    createNews,
    updateNews,
    deleteNews,
  } = useAdminNews();

  // Crear noticia
  const handleCreateNews = async (formData) => {
    const result = await createNews({
      title: formData.title,
      category: formData.category,
      image: formData.image,
      excerpt: formData.excerpt,
      content: formData.content,
      date: formData.date || new Date().toISOString(),
      author: 'Admin ONPE', // O obtener del contexto de usuario
      status: formData.status,
    });

    if (result.success) {
      setView('list');
    }
  };

  // Actualizar noticia
  const handleUpdateNews = async (id: string, formData) => {
    await updateNews(id, formData);
    setView('list');
  };

  // Eliminar noticia
  const handleDeleteNews = async (id: string) => {
    await deleteNews(id);
    setShowDeleteDialog(false);
  };

  // Loading y error states como en CandidateManagement

  return (
    // ... tu JSX
  );
}
```

---

## 📅 Componente: EventManagement

### Cambios necesarios:

```typescript
import { useAdminEvents } from '../../hooks/useAdminEvents';

export function EventManagement({ onBack }: EventManagementProps) {
  const {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useAdminEvents();

  const handleCreateEvent = async (formData) => {
    await createEvent({
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
      category: formData.category,
      participants: formData.participants,
      status: formData.status || 'upcoming',
    });
    setView('list');
  };

  const handleUpdateEvent = async (id: string, formData) => {
    await updateEvent(id, formData);
    setView('list');
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteEvent(id);
    setShowDeleteDialog(false);
  };

  return (
    // ... tu JSX
  );
}
```

---

## 📊 Componente: AdminDashboard

### Integración con estadísticas en tiempo real:

```typescript
import { useAdminStats } from '../../hooks/useAdminStats';

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { stats, loading, refreshStats } = useAdminStats();

  // Actualizar las métricas con datos reales
  const quickStats = [
    {
      label: 'Usuarios Activos',
      value: stats?.totalCandidates || '0',
      change: '+12%',
      trend: 'up',
    },
    // ... otras stats
  ];

  // Botón para refrescar manualmente
  const handleRefresh = () => {
    refreshStats();
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header con botón de refresh */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-primary-dark text-white px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-xl mb-1">Panel de Administración</h1>
            <p className="text-white/70 text-xs">Control total del sistema</p>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Stats cards con datos reales */}
      {stats && (
        <div className="px-6 -mt-6 mb-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
              <p className="text-2xl text-foreground font-medium">
                {stats.totalCandidates}
              </p>
              <p className="text-xs text-muted-foreground">Candidatos</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
              <p className="text-2xl text-foreground font-medium">
                {stats.totalNews}
              </p>
              <p className="text-xs text-muted-foreground">Noticias</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
              <p className="text-2xl text-foreground font-medium">
                {stats.totalEvents}
              </p>
              <p className="text-xs text-muted-foreground">Eventos</p>
            </div>
          </div>
        </div>
      )}

      {/* Resto del dashboard */}
    </div>
  );
}
```

---

## 🔔 Componente: NotificationSender

### Integración completa:

```typescript
import { useNotifications } from '../../hooks/useNotifications';

export function NotificationSender({ onBack }: NotificationSenderProps) {
  const {
    notifications,
    loading,
    sendNotification,
  } = useNotifications();

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'news' as const,
    target: 'all' as const,
    targetDetails: '',
    recipients: 45231,
  });

  const handleSend = async () => {
    const result = await sendNotification({
      title: formData.title,
      message: formData.message,
      type: formData.type,
      target: formData.target,
      targetDetails: formData.targetDetails,
      recipients: formData.recipients,
    });

    if (result.success) {
      // Limpiar formulario
      setFormData({
        title: '',
        message: '',
        type: 'news',
        target: 'all',
        targetDetails: '',
        recipients: 45231,
      });
      
      // Opcional: Mostrar confirmación
      alert('Notificación enviada exitosamente');
    } else {
      alert('Error: ' + result.error);
    }
  };

  // Vista de historial usa el array notifications del hook
  if (view === 'history') {
    return (
      <div>
        {notifications.map(notif => (
          <div key={notif.id}>
            {notif.title}
          </div>
        ))}
      </div>
    );
  }

  return (
    // ... formulario de envío
  );
}
```

---

## 👤 Componente: ReniecConsult

### Integración con consultas:

```typescript
import { useReniec } from '../../hooks/useReniec';

export function ReniecConsult({ onBack }: ReniecConsultProps) {
  const {
    history,
    loading,
    error,
    consultDni,
  } = useReniec();

  const [dni, setDni] = useState('');
  const [personData, setPersonData] = useState<PersonData | null>(null);

  const handleSearch = async () => {
    const result = await consultDni(dni);

    if (result.success) {
      setPersonData(result.data);
      
      // Mostrar si es desde caché
      if (result.cached) {
        console.log('Datos cargados desde caché');
      }
    } else {
      setError(result.error || 'Error al consultar');
      setPersonData(null);
    }
  };

  return (
    <div>
      {/* Formulario de búsqueda */}
      <input
        type="text"
        value={dni}
        onChange={(e) => setDni(formatDni(e.target.value))}
        maxLength={8}
      />
      <button
        onClick={handleSearch}
        disabled={dni.length !== 8 || loading}
      >
        {loading ? 'Consultando...' : 'Consultar RENIEC'}
      </button>

      {/* Resultados */}
      {personData && (
        <div>
          <p>{personData.nombres}</p>
          <p>{personData.apellidoPaterno}</p>
          {/* ... más datos */}
        </div>
      )}

      {/* Historial (ya viene poblado del hook) */}
      <div>
        <h3>Consultas Recientes</h3>
        {history.map(person => (
          <div key={person.dni}>
            <p>{person.nombres} {person.apellidoPaterno}</p>
            <button onClick={() => {
              setDni(person.dni);
              setPersonData(person);
            }}>
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📈 Componente: StatsPanel

### Con datos reales del servidor:

```typescript
import { useAdminStats } from '../../hooks/useAdminStats';
import { useAdminCandidates } from '../../hooks/useAdminCandidates';
import { useAdminNews } from '../../hooks/useAdminNews';

export function StatsPanel({ onBack }: StatsPanelProps) {
  const { stats, loading: statsLoading } = useAdminStats();
  const { candidates } = useAdminCandidates();
  const { newsList } = useAdminNews();

  // Calcular datos para gráficos
  const candidatePopularityData = candidates
    .slice(0, 4)
    .map((c, i) => ({
      name: c.name,
      popularity: Math.random() * 100, // O usar datos reales
      color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][i],
    }));

  const newsInteractionData = Object.entries(
    newsList.reduce((acc, news) => {
      acc[news.category] = (acc[news.category] || 0) + news.views;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, reads]) => ({
    category,
    reads,
  }));

  return (
    <div>
      {/* Quick metrics con datos reales */}
      {stats && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-2xl">{stats.totalCandidates}</p>
            <p className="text-xs">Candidatos Totales</p>
          </div>
          <div>
            <p className="text-2xl">{stats.publishedNews}</p>
            <p className="text-xs">Noticias Publicadas</p>
          </div>
        </div>
      )}

      {/* Gráficos con datos reales */}
      <BarChart data={candidatePopularityData}>
        {/* ... */}
      </BarChart>

      <BarChart data={newsInteractionData}>
        {/* ... */}
      </BarChart>
    </div>
  );
}
```

---

## 🎨 Componente: LoadingState (Reutilizable)

Crea un componente de loading reutilizable:

```typescript
// /frontend/components/LoadingState.tsx
export function LoadingState({ message = 'Cargando...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

// Uso en cualquier componente:
if (loading && !data.length) {
  return <LoadingState message="Cargando candidatos..." />;
}
```

---

## 🚨 Componente: ErrorState (Reutilizable)

```typescript
// /frontend/components/ErrorState.tsx
export function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-foreground font-medium mb-2">Error al cargar datos</h3>
        <p className="text-sm text-muted-foreground mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

// Uso:
if (error) {
  return <ErrorState error={error} onRetry={fetchCandidates} />;
}
```

---

## 🔄 Pattern: Optimistic Updates

Para una mejor UX, actualiza el UI antes de esperar la respuesta:

```typescript
const handleDeleteCandidate = async (id: string) => {
  // 1. Optimistic update - actualizar UI inmediatamente
  const originalCandidates = [...candidates];
  setCandidates(candidates.filter(c => c.id !== id));
  setShowDeleteDialog(false);

  // 2. Llamar al servidor
  const result = await deleteCandidate(id);

  // 3. Si falla, revertir
  if (!result.success) {
    setCandidates(originalCandidates);
    alert('Error al eliminar: ' + result.error);
  }
};
```

---

## 🎯 Pattern: Form Handling

Manejo de formularios con validación:

```typescript
const [formData, setFormData] = useState({
  name: '',
  party: '',
  position: '',
  // ...
});

const [formErrors, setFormErrors] = useState<Record<string, string>>({});

const validateForm = () => {
  const errors: Record<string, string> = {};
  
  if (!formData.name) errors.name = 'El nombre es requerido';
  if (!formData.party) errors.party = 'El partido es requerido';
  
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  const result = await createCandidate(formData);
  
  if (result.success) {
    // Resetear formulario
    setFormData({ name: '', party: '', position: '' });
    setView('list');
  } else {
    setFormErrors({ submit: result.error || 'Error desconocido' });
  }
};
```

---

## 📊 Pattern: Polling (Auto-refresh)

Para datos que necesitan actualizarse periódicamente:

```typescript
useEffect(() => {
  // Fetch inicial
  fetchCandidates();
  
  // Refresh cada 30 segundos
  const interval = setInterval(() => {
    fetchCandidates();
  }, 30000);
  
  // Cleanup
  return () => clearInterval(interval);
}, []);
```

---

## 🎉 Resumen de Cambios por Componente

| Componente | Cambios Principales |
|------------|-------------------|
| **CandidateManagement** | Reemplazar useState con useAdminCandidates |
| **NewsManagement** | Reemplazar useState con useAdminNews |
| **EventManagement** | Reemplazar useState con useAdminEvents |
| **AdminDashboard** | Agregar useAdminStats para métricas reales |
| **NotificationSender** | Usar useNotifications |
| **ReniecConsult** | Usar useReniec |
| **StatsPanel** | Combinar múltiples hooks para gráficos |

---

## ✅ Checklist de Integración

Por cada componente:

- [ ] Importar el hook correspondiente
- [ ] Reemplazar useState con el hook
- [ ] Actualizar handlers (create, update, delete)
- [ ] Agregar loading state
- [ ] Agregar error handling
- [ ] Probar crear, editar y eliminar
- [ ] Verificar que los datos persisten al recargar

---

**¡Todo listo para integrar!** 🚀

Estos ejemplos te muestran exactamente cómo reemplazar los datos mock con los hooks de Supabase en cada componente del panel admin.

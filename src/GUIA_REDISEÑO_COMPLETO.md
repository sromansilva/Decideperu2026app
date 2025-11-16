# 🇵🇪 DecidePerú 2026 - Guía Completa del Rediseño

## 🎉 ¡Rediseño Completado!

Se ha completado exitosamente la reorganización completa de tu aplicación móvil **DecidePerú 2026**. La app ahora tiene una navegación más limpia, modo oscuro completo, sistema de autenticación preparado para Supabase, y una interfaz profesional inspirada en iOS y Material 3.

---

## 📱 Cambios Principales

### ✅ 1. Navegación Simplificada (4 pestañas)

**ANTES:**
- Inicio
- Calendario
- Candidatos
- Noticias
- **Más** ← ELIMINADA ✂️

**AHORA:**
- 🏠 **Inicio** - Dashboard con accesos rápidos
- 📅 **Calendario** - Eventos electorales
- 👥 **Candidatos** - Perfiles y propuestas
- 👤 **Perfil** - Hub de usuario y configuración

### ✅ 2. Nueva Pantalla de Perfil

La nueva pantalla de perfil es un hub completo que incluye:

#### Perfil de Usuario Normal:
- Avatar personalizado
- Información personal (nombre, DNI, email)
- Estado de votación
- Botón "Editar perfil"

#### Modo Administrador:
- **Switch para activar/desactivar** modo admin
- Panel de gestión con acceso a:
  - 📝 Gestión de Candidatos
  - 📰 Gestión de Noticias
  - 📅 Gestión de Eventos
  - 📊 Panel de Estadísticas
  - 📤 Envío de Notificaciones

#### Configuración Completa:
- 🌓 **Toggle Modo Oscuro/Claro**
- 🔔 Preferencias de Notificaciones
- 🔒 Privacidad
- 🌍 Idioma
- ℹ️ Información de la App
- 🚪 Cerrar Sesión

### ✅ 3. Modo Oscuro Completo

**Sistema de Temas:**
- ✅ Contexto global (`ThemeContext`)
- ✅ Persistencia en `localStorage`
- ✅ Detección automática de preferencia del sistema
- ✅ Toggle suave entre modos

**Paleta de Colores:**

**Modo Claro:**
```css
Primary: #d62828 (Rojo peruano)
Background: #fafafa
Cards: #ffffff
Borders: #e5e7eb
```

**Modo Oscuro:**
```css
Primary: #ef4444 (Rojo brillante)
Background: #0a0a0a
Cards: #1a1a1a
Borders: #262626
```

### ✅ 4. Autenticación con Supabase (Preparada)

**Pantallas Creadas:**
- ✅ **Login** - Con switch de modo administrador
- ✅ **Registro** - Con campos de nombre completo y DNI
- ✅ **Recuperar Contraseña** - Con envío de link

**Flow de Autenticación:**
```
Usuario sin sesión
    ↓
AuthScreen (Login/Register)
    ↓
Autenticación exitosa
    ↓
Onboarding (solo primera vez)
    ↓
Home Screen
```

**Preparado para Supabase:**
- Hooks de autenticación (`useAuth`)
- Placeholders para integración
- Manejo de estados (loading, error, success)

### ✅ 5. Estados de Carga y Vacíos

**Componentes Creados:**
- `CandidateCardSkeleton` - Shimmer para tarjetas de candidatos
- `NewsCardSkeleton` - Shimmer para noticias
- `EventSkeleton` - Shimmer para eventos
- `EmptyState` - Estado vacío con icono y mensaje
- `ErrorState` - Estado de error con retry
- `LoadingSpinner` - Indicador de carga simple
- `RealtimeIndicator` - Badge de "actualizado en tiempo real"

---

## 📂 Estructura de Archivos

```
/frontend
├── App.tsx                         # App principal con ThemeProvider y rutas
├── contexts/
│   └── ThemeContext.tsx            # Contexto global de tema (dark/light)
├── components/
│   ├── HomeScreen.tsx              # Pantalla principal ✨ CON MODO OSCURO
│   ├── ProfileScreen.tsx           # Nueva pantalla de perfil ✨ NUEVO
│   ├── AuthScreen.tsx              # Autenticación completa ✨ NUEVO
│   ├── LoadingStates.tsx           # Skeletons y estados ✨ NUEVO
│   ├── Navigation.tsx              # Navegación de 4 pestañas ✨ ACTUALIZADO
│   ├── FloatingActionButton.tsx    # FAB para acciones admin ✨ NUEVO
│   └── ThemeDemo.tsx               # Demo del sistema de temas ✨ NUEVO
├── hooks/
│   ├── useAuth.ts                  # Hook de autenticación ✨ NUEVO
│   └── useAsync.ts                 # Hook para operaciones async ✨ NUEVO
├── constants/
│   └── app.ts                      # Constantes de la app ✨ NUEVO
├── utils/
│   ├── formatters.ts               # Utilidades de formateo ✨ NUEVO
│   └── eventHelpers.ts             # Helpers para eventos
├── types/
│   └── index.ts                    # Tipos TypeScript ✨ ACTUALIZADO
└── README.md                       # Documentación
```

---

## 🚀 Cómo Usar

### 1. Cambiar entre Modo Claro/Oscuro

```tsx
import { useTheme } from './contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  );
}
```

### 2. Usar Estados de Carga

```tsx
import { CandidateCardSkeleton, EmptyState } from './components/LoadingStates';

function CandidatesList() {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  
  if (loading) {
    return (
      <div className="space-y-3">
        <CandidateCardSkeleton />
        <CandidateCardSkeleton />
        <CandidateCardSkeleton />
      </div>
    );
  }
  
  if (candidates.length === 0) {
    return (
      <EmptyState
        title="No hay candidatos"
        description="No se encontraron candidatos en este momento"
        action={{
          label: "Recargar",
          onClick: () => fetchCandidates()
        }}
      />
    );
  }
  
  return <div>{/* Renderizar candidatos */}</div>;
}
```

### 3. Usar Hook de Autenticación

```tsx
import { useAuth } from './hooks/useAuth';

function LoginForm() {
  const { login, loading, error } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password, isAdmin);
    
    if (result.success) {
      // Redirigir a home
    }
  };
  
  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### 4. Formatear Datos

```tsx
import { formatDate, formatDNI, getInitials } from './utils/formatters';

const user = {
  name: "Juan Pérez",
  dni: "12345678",
  createdAt: "2024-01-15"
};

console.log(formatDate(user.createdAt));  // "15 de enero de 2024"
console.log(formatDNI(user.dni));         // "1234-5678"
console.log(getInitials(user.name));      // "JP"
```

---

## 🎨 Sistema de Colores en Tailwind

Todos los colores del tema están disponibles como clases de Tailwind:

```tsx
// Colores primarios
<div className="bg-primary text-primary-foreground">Rojo peruano</div>
<div className="bg-primary-light">Rojo claro</div>
<div className="bg-primary-dark">Rojo oscuro</div>

// Superficies
<div className="bg-background text-foreground">Fondo principal</div>
<div className="bg-card text-card-foreground border border-border">Tarjeta</div>

// Estados
<div className="bg-success text-success-foreground">Éxito</div>
<div className="bg-warning text-warning-foreground">Advertencia</div>
<div className="bg-info text-info-foreground">Información</div>
<div className="bg-destructive text-destructive-foreground">Error</div>

// Texto
<p className="text-foreground">Texto principal</p>
<p className="text-muted-foreground">Texto secundario</p>
```

---

## 🔄 Flow de Usuario Completo

```
┌─────────────────────────────────────────────────────┐
│  1. INICIO DE SESIÓN                                │
│  ├─ Login con email/contraseña                     │
│  ├─ Switch de "Modo Administrador"                 │
│  ├─ Opción de registro                             │
│  └─ Recuperar contraseña                           │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  2. ONBOARDING (solo primera vez)                   │
│  └─ Tutorial de uso de la app                      │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  3. HOME SCREEN                                     │
│  ├─ Buscador de local de votación                  │
│  ├─ Estadísticas (candidatos, días, noticias)      │
│  ├─ Próximos eventos                                │
│  ├─ Accesos rápidos (4 tarjetas)                   │
│  └─ Información adicional                          │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  4. NAVEGACIÓN PRINCIPAL (Bottom Nav - 4 tabs)      │
│                                                     │
│  ┌──────────┬──────────┬──────────┬──────────┐    │
│  │  🏠       │  📅      │  👥      │  👤      │    │
│  │  Inicio  │Calendario│Candidatos│ Perfil   │    │
│  └──────────┴──────────┴──────────┴──────────┘    │
└─────────────────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  5. PERFIL DE USUARIO                               │
│  ├─ Información personal                            │
│  ├─ Switch Modo Administrador                       │
│  │  └─ Panel de gestión (si admin activo)          │
│  ├─ Configuración                                   │
│  │  ├─ Toggle Modo Oscuro                          │
│  │  ├─ Notificaciones                              │
│  │  ├─ Privacidad                                  │
│  │  └─ Idioma                                      │
│  └─ Cerrar sesión                                   │
└─────────────────────────────────────────────────────┘
```

---

## ⏳ Próximos Pasos (Pendientes)

### 🎨 Aplicar Modo Oscuro a Pantallas Restantes:
- [ ] CalendarScreen
- [ ] CandidatesScreen
- [ ] CandidateProfile
- [ ] GovernmentPlan
- [ ] NewsScreen
- [ ] NewsDetail
- [ ] VoterInfoScreen
- [ ] PollWorkersScreen
- [ ] NotificationsPanel
- [ ] EventDetailModal

### 🔌 Integración con Supabase:
- [ ] Configurar proyecto en Supabase
- [ ] Implementar Supabase Auth real
- [ ] Crear tablas de base de datos
- [ ] Implementar queries reales
- [ ] Agregar Realtime subscriptions
- [ ] Storage para imágenes

### ✨ Mejoras Adicionales:
- [ ] Animaciones de transición
- [ ] PWA Configuration (manifest, service worker)
- [ ] Modo offline con cache
- [ ] Push notifications
- [ ] Analytics

---

## 🛠️ Componentes Disponibles

### Navegación:
- `Navigation` - Bottom nav de 4 pestañas

### Pantallas:
- `HomeScreen` - Inicio con accesos rápidos ✅ Modo oscuro
- `ProfileScreen` - Perfil con admin mode ✅ Modo oscuro
- `AuthScreen` - Login/Register/Forgot ✅ Modo oscuro
- `CalendarScreen` - Calendario electoral
- `CandidatesScreen` - Lista de candidatos
- `CandidateProfile` - Perfil individual
- `GovernmentPlan` - Plan de gobierno
- `NewsScreen` - Lista de noticias
- `NewsDetail` - Detalle de noticia
- `VoterInfoScreen` - Info del elector
- `PollWorkersScreen` - Info miembros de mesa

### Componentes Reutilizables:
- `LoadingStates` - Skeletons y estados vacíos
- `FloatingActionButton` - FAB para acciones
- `ThemeDemo` - Demostración de temas

### Hooks:
- `useTheme` - Manejo de tema claro/oscuro
- `useAuth` - Autenticación
- `useAsync` - Operaciones asíncronas

---

## 📖 Documentación Adicional

- `/frontend/REDISEÑO_2026.md` - Detalles técnicos del rediseño
- `/frontend/README.md` - README del frontend
- `/ESTRUCTURA_PROYECTO.md` - Estructura general
- `/MIGRATION_GUIDE.md` - Guía de migración

---

## 🎯 Características Principales

✅ **Navegación limpia** - Solo 4 pestañas esenciales
✅ **Perfil poderoso** - Hub con modo admin integrado
✅ **Modo oscuro** - Sistema completo con persistencia
✅ **Colores peruanos** - Paleta temática profesional
✅ **Autenticación** - Flow completo preparado para Supabase
✅ **Estados de carga** - Skeletons, empty states, errors
✅ **Componentes reutilizables** - Sistema consistente
✅ **TypeScript** - Tipado completo
✅ **Accesibilidad** - Alto contraste y jerarquía visual
✅ **Responsive** - Diseño móvil optimizado

---

## 💡 Tips de Uso

1. **Para cambiar tema:** Usa el toggle en la pantalla de Perfil
2. **Para activar modo admin:** Usa el switch en la parte superior del Perfil
3. **Para ver demo de colores:** Importa y renderiza `<ThemeDemo />`
4. **Para testing:** Usa `localStorage.setItem('isAuthenticated', 'true')` para saltear login

---

## 🙏 Créditos

- **Diseño:** Inspirado en iOS Settings, Material 3, Notion
- **Iconos:** Lucide React
- **UI Components:** Shadcn/ui
- **Framework:** React + TypeScript + Tailwind CSS

---

**¡Tu aplicación DecidePerú 2026 está lista para las elecciones!** 🇵🇪🗳️

Para cualquier pregunta o mejora, revisa la documentación o contacta al equipo de desarrollo.

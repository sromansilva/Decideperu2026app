# DecidePerú 2026 - Frontend

Aplicación móvil moderna para información electoral de las elecciones peruanas 2026.

## 📁 Estructura del Proyecto

```
/frontend
├── App.tsx                    # Componente principal de la aplicación
├── types/
│   └── index.ts              # Definiciones de tipos TypeScript
├── utils/
│   └── eventHelpers.ts       # Funciones auxiliares para eventos
├── components/
│   ├── HomeScreen.tsx        # Pantalla de inicio
│   ├── CalendarScreen.tsx    # Calendario electoral
│   ├── CandidatesScreen.tsx  # Lista de candidatos
│   ├── CandidateProfile.tsx  # Perfil del candidato
│   ├── GovernmentPlan.tsx    # Plan de gobierno detallado
│   ├── VoterInfoScreen.tsx   # Información del elector
│   ├── PollWorkersScreen.tsx # Info para miembros de mesa
│   ├── NewsScreen.tsx        # Lista de noticias
│   ├── NewsDetail.tsx        # Detalle de noticia
│   ├── Navigation.tsx        # Barra de navegación inferior
│   ├── OnboardingTutorial.tsx # Tutorial inicial
│   ├── NotificationsPanel.tsx # Panel de notificaciones
│   └── EventDetailModal.tsx  # Modal de detalle de evento
├── ui/                       # Componentes UI (shadcn/ui)
│   ├── button.tsx
│   ├── accordion.tsx
│   ├── tabs.tsx
│   ├── badge.tsx
│   ├── progress.tsx
│   └── ... (otros componentes shadcn)
├── figma/
│   └── ImageWithFallback.tsx # Componente de imagen con fallback
└── styles/
    └── globals.css           # Estilos globales y variables CSS

```

## 🎨 Tecnologías

- **React 18** con TypeScript
- **Tailwind CSS v4.0** para estilos
- **Lucide React** para iconos
- **shadcn/ui** para componentes UI
- **LocalStorage** para persistencia básica

## 🚀 Componentes Principales

### HomeScreen
Pantalla principal con:
- Header con gradiente rojo (colores patrios)
- Buscador de información
- Estadísticas en tiempo real
- Próximos eventos clickeables
- Acceso rápido a funcionalidades
- Botón de notificaciones funcional

### CalendarScreen
Calendario electoral con:
- Tabs para diferentes categorías
- Timeline de eventos
- Fechas importantes resaltadas

### CandidatesScreen
Lista de candidatos con:
- Filtros por categoría (Presidencia, Congreso, Regional)
- Cards de candidatos con información básica
- Navegación a perfiles detallados

### CandidateProfile
Perfil detallado con:
- Foto y datos básicos
- Acordeones con propuestas
- Botón para ver plan de gobierno completo
- Experiencia y educación

### GovernmentPlan
Plan de gobierno completo con:
- Tabs por sector (Economía, Salud, Educación, etc.)
- Propuestas detalladas
- Presupuesto y timeline
- Opciones para compartir y descargar

### NotificationsPanel
Panel deslizante con:
- Lista de notificaciones
- Marcado de leídas/no leídas
- Contador de notificaciones nuevas
- Diferentes tipos de notificaciones (info, warning, success, event)

### EventDetailModal
Modal bottom sheet con:
- Información completa del evento
- Fecha, hora, ubicación
- Opciones para agregar al calendario
- Configurar recordatorio
- Compartir evento

## 📱 Navegación

La aplicación usa un sistema de navegación basado en estados con una barra inferior que incluye:
- 🏠 Inicio
- 📅 Calendario
- 👥 Candidatos
- 📰 Noticias
- ➕ Más

## 🎨 Sistema de Diseño

### Colores Principales
- **Rojo**: `red-600` a `red-900` (color patrio principal)
- **Gris**: Fondos y textos secundarios
- **Blanco**: Tarjetas y elementos elevados

### Componentes Reutilizables
Todos los componentes UI están en `/ui` y siguen el patrón de shadcn/ui.

## 🔄 Estado de la Aplicación

El estado global se maneja en `App.tsx` con React hooks:
- `currentScreen`: Pantalla actual
- `selectedCandidate`: Candidato seleccionado
- `selectedNews`: Noticia seleccionada
- `showOnboarding`: Control del tutorial
- `showNotifications`: Control del panel de notificaciones
- `selectedEvent`: Evento seleccionado para mostrar detalles

## 📦 Preparación para Backend

La estructura está lista para integrar backend:
- Tipos definidos en `/types`
- Helpers organizados en `/utils`
- Componentes desacoplados y reutilizables
- Props interfaces bien definidas

### Próximos Pasos para Backend

1. Crear carpeta `/backend`
2. Implementar API REST o GraphQL
3. Reemplazar datos mock con llamadas a API
4. Agregar autenticación si es necesario
5. Implementar cache y estado global (Context API o Zustand)

## 🛠️ Funcionalidades Implementadas

✅ 8 pantallas principales
✅ Navegación completa
✅ Tutorial de onboarding
✅ Sistema de notificaciones
✅ Detalles de eventos
✅ Planes de gobierno
✅ Diseño responsive
✅ Animaciones y transiciones
✅ LocalStorage para preferencias

## 📝 Notas de Desarrollo

- Los datos actualmente son mock/simulados
- Las imágenes usan placeholder o assets de Unsplash
- La búsqueda aún no está implementada (UI lista)
- Las notificaciones son simuladas
- El calendario es estático (datos mock)

## 🎯 Para Desarrolladores

Para agregar una nueva pantalla:
1. Crear componente en `/components`
2. Agregar tipo en `/types/index.ts`
3. Actualizar el switch en `App.tsx`
4. Agregar opción en Navigation si es necesario
5. Implementar lógica de navegación

Para agregar un nuevo tipo de notificación:
1. Actualizar tipo `Notification` en `/types`
2. Agregar lógica en `NotificationsPanel.tsx`
3. Usar función helper `getTypeColor()`

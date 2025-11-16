# Changelog - DecidePerú 2026

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.0.0] - 2024-11-16

### 🎉 Rediseño Completo de la Aplicación

### ✨ Agregado

#### Navegación y Estructura
- **Nueva navegación simplificada** de 4 pestañas (eliminada pestaña "Más")
  - Inicio
  - Calendario
  - Candidatos
  - Perfil (nuevo)
- **Indicador visual mejorado** en la navegación inferior con línea superior
- **Transiciones suaves** entre pantallas

#### Pantalla de Perfil (Nueva)
- **Perfil de usuario completo** con avatar, nombre, DNI y estado de votación
- **Modo Administrador** con switch on/off
- **Panel de administración** (visible solo en modo admin):
  - Gestión de Candidatos
  - Gestión de Noticias
  - Gestión de Eventos del Calendario
  - Panel de Estadísticas
  - Envío de Notificaciones
- **Sección de Configuración** completa:
  - Toggle Modo Oscuro/Claro
  - Preferencias de Notificaciones
  - Privacidad
  - Idioma
  - Información de la App
- **Botón de Cerrar Sesión**
- **Sección Acerca de** con términos, privacidad y ayuda

#### Sistema de Temas
- **ThemeContext** para manejo global del tema
- **Modo Oscuro completo** con:
  - Persistencia en localStorage
  - Detección automática de preferencia del sistema
  - Toggle suave entre modos
  - Colores optimizados para cada modo
- **Paleta de colores temática peruana**:
  - Modo claro: Rojo #d62828
  - Modo oscuro: Rojo brillante #ef4444
  - Colores complementarios consistentes

#### Autenticación
- **AuthScreen completa** con tres vistas:
  - Login (con switch de modo administrador)
  - Registro (con campos de nombre completo y DNI)
  - Recuperar Contraseña
- **Flow de autenticación** preparado para Supabase
- **Validación de formularios**
- **Toggle de visibilidad de contraseña**

#### Estados de Carga y Vacíos
- **CandidateCardSkeleton** - Shimmer para candidatos
- **NewsCardSkeleton** - Shimmer para noticias
- **EventSkeleton** - Shimmer para eventos
- **EmptyState** - Estado vacío genérico con acción
- **ErrorState** - Estado de error con retry
- **LoadingSpinner** - Indicador de carga simple
- **RealtimeIndicator** - Badge de actualización en tiempo real

#### Componentes Nuevos
- **FloatingActionButton** - FAB para acciones rápidas (admin)
- **ThemeDemo** - Componente de demostración del sistema de temas
- **MenuItem** - Componente reutilizable para listas de opciones

#### Hooks Personalizados
- **useTheme** - Manejo de tema claro/oscuro
- **useAuth** - Autenticación (preparado para Supabase)
- **useAsync** - Operaciones asíncronas con estados
- **useFetch** - Fetch de datos simplificado
- **useSupabaseQuery** - Queries de Supabase (placeholder)

#### Utilidades
- **formatters.ts** - Funciones de formateo:
  - Fechas (completo, corto, relativo)
  - Números y porcentajes
  - Texto (capitalize, truncate, slug)
  - DNI y email
  - Tamaño de archivos
  - Iniciales de nombres
  - Colores de categorías y estados
- **app.ts** - Constantes de la aplicación:
  - Fechas importantes
  - Configuración
  - Mensajes de error y éxito
  - Claves de storage
  - Enlaces externos
- **dev-utils.ts** - Herramientas de desarrollo:
  - Auto-login (usuario/admin)
  - Toggle de tema
  - Reset de onboarding
  - Generación de mock data
  - Atajos de teclado

#### Documentación
- **GUIA_REDISEÑO_COMPLETO.md** - Guía completa del rediseño
- **REDISEÑO_2026.md** - Detalles técnicos
- **CHANGELOG.md** - Este archivo
- Mejoras en comentarios y documentación de código

### 🎨 Mejorado

#### HomeScreen
- **Actualizado a modo oscuro** con clases semánticas
- **Colores dinámicos** que se adaptan al tema
- **Mejor contraste** en todos los elementos
- **Gradientes optimizados** para ambos modos

#### Navigation
- **Reducido de 5 a 4 pestañas**
- **Iconos actualizados** (UserCircle para Perfil)
- **Indicador visual mejorado** con línea superior en pestaña activa
- **Animaciones suaves** en transiciones
- **Mejor feedback visual** en hover y active

#### Sistema de Colores
- **Variables CSS actualizadas** con colores temáticos peruanos
- **Colores adicionales** para estados (success, warning, info)
- **Mejor accesibilidad** con contrastes adecuados
- **Variantes light/dark** para todos los colores

#### Tipos TypeScript
- **Nuevos tipos** para User y AuthState
- **Screen actualizado** (eliminado 'more', agregado 'profile', 'auth')
- **Mejor tipado** en toda la aplicación

### 🗑️ Eliminado

- **Pestaña "Más"** en la navegación inferior
- **Contenido duplicado** de la pantalla "Más"
- **Colores genéricos** reemplazados por temáticos peruanos

### 🔧 Técnico

#### Estructura de Archivos
```
/frontend
├── App.tsx                         # ✨ Actualizado con ThemeProvider
├── contexts/
│   └── ThemeContext.tsx            # ✨ Nuevo
├── components/
│   ├── HomeScreen.tsx              # ✨ Actualizado con modo oscuro
│   ├── ProfileScreen.tsx           # ✨ Nuevo
│   ├── AuthScreen.tsx              # ✨ Nuevo
│   ├── LoadingStates.tsx           # ✨ Nuevo
│   ├── Navigation.tsx              # ✨ Actualizado (4 pestañas)
│   ├── FloatingActionButton.tsx    # ✨ Nuevo
│   └── ThemeDemo.tsx               # ✨ Nuevo
├── hooks/
│   ├── useAuth.ts                  # ✨ Nuevo
│   └── useAsync.ts                 # ✨ Nuevo
├── constants/
│   └── app.ts                      # ✨ Nuevo
├── utils/
│   ├── formatters.ts               # ✨ Nuevo
│   └── eventHelpers.ts             # Existente
├── types/
│   └── index.ts                    # ✨ Actualizado
└── dev-utils.ts                    # ✨ Nuevo
```

#### CSS/Tailwind
- **Variables CSS** actualizadas en `/styles/globals.css`
- **Nuevas clases** para primary-light, primary-dark
- **Clases de estado** para success, warning, info
- **Radius actualizado** a 12px para diseño más moderno

#### Performance
- **Lazy loading** de dev-utils solo en desarrollo
- **Memoización** en hooks personalizados
- **Optimización** de re-renders con useCallback

### 📝 Notas de Migración

Para migrar de la versión anterior:

1. **Actualizar imports** de Navigation (ahora exporta solo 4 tabs)
2. **Reemplazar referencias** a pantalla 'more' con 'profile'
3. **Agregar ThemeProvider** en el componente App
4. **Actualizar clases de Tailwind** para usar colores semánticos (primary, card, etc.)

### 🔜 Próximos Pasos

#### Alta Prioridad
- [ ] Aplicar modo oscuro a pantallas restantes
- [ ] Integración real con Supabase Auth
- [ ] Configurar base de datos en Supabase
- [ ] Implementar estados de carga reales

#### Media Prioridad
- [ ] Animaciones de transición entre pantallas
- [ ] PWA configuration (manifest, service worker)
- [ ] Push notifications
- [ ] Modo offline con cache

#### Baja Prioridad
- [ ] Analytics
- [ ] Mejoras de accesibilidad (ARIA labels)
- [ ] Tests unitarios
- [ ] Tests e2e

### 🐛 Bugs Conocidos

Ninguno reportado en esta versión.

### 🙏 Agradecimientos

- Diseño inspirado en iOS Settings, Material 3, y Notion
- Iconos por Lucide React
- UI Components por Shadcn/ui

---

## Versiones Anteriores

### [0.9.0] - 2024-11-15
- Versión inicial con 5 pestañas
- Pantallas base implementadas
- Sistema de navegación básico

---

**Formato del Changelog basado en [Keep a Changelog](https://keepachangelog.com/)**

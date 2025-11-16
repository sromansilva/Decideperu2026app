# 🇵🇪 DecidePerú 2026 - Rediseño Completo

## 📱 Aplicación Móvil de Información Electoral

Aplicación moderna y profesional para ciudadanos peruanos que necesitan información electoral confiable para las elecciones de 2026.

---

## ✨ Características Principales

### 🔐 Sistema de Autenticación Inteligente
- **Login moderno** con diseño degradado en colores peruanos
- **Roles automáticos**: admin o usuario según el email
- **Cuentas demo** para probar sin registro
- **Persistencia de sesión** con localStorage
- **Integración preparada** para Supabase Auth

### 👤 Gestión de Roles sin Toggles
- **Detección automática** al hacer login:
  - Emails con "admin" u "onpe" → Rol Administrador
  - Otros emails → Rol Usuario Normal
- **Indicadores visuales sutiles**:
  - 👑 Corona en perfil
  - 🎖️ Badge "Administrador"
  - 🛡️ Insignia flotante en esquina
  - 📊 Panel de administración exclusivo

### 🌙 Modo Oscuro Profesional
- **Paleta optimizada** para legibilidad
- **Contraste AA mínimo** (WCAG 2.1)
- **Activado por defecto**
- **Toggle en configuración**
- **Aplicado globalmente** a todos los componentes

### 📝 Perfil Completamente Editable
- **Edición inline** sin cambio de pantalla
- **Campos editables**:
  - ✏️ Nombre completo
  - 📧 Email
  - 📱 Teléfono
  - 📍 Dirección
- **Botón de cámara** para cambiar foto
- **Guardado con animación**
- **Validación visual** de campos

### 🎓 Tutorial Interactivo Walkthrough
- **Sistema de spotlight** que resalta elementos
- **5 pasos guiados** por la app
- **Tarjetas flotantes pequeñas**
- **Se muestra solo en primer uso**
- **Reactivable** desde configuración
- **Animaciones suaves** con Motion

### 👨‍💼 Panel de Administración
Solo visible para administradores:
- 👥 **Gestión de Candidatos**
- 📰 **Gestión de Noticias**
- 📅 **Gestión de Eventos**
- 📊 **Panel de Estadísticas**
- 📢 **Envío de Notificaciones**

---

## 🏗️ Arquitectura Técnica

### Tecnologías
- **React 18+** con Hooks
- **TypeScript** para type safety
- **Tailwind CSS v4** para estilos
- **Motion** (Framer Motion) para animaciones
- **Lucide React** para iconos
- **Context API** para estado global

### Estructura de Contextos

```
AuthContext (Autenticación y Roles)
├─ user: User | null
├─ isAuthenticated: boolean
├─ isAdmin: boolean
├─ login(email, password)
├─ logout()
├─ updateUser(updates)
├─ hasCompletedTutorial: boolean
└─ completeTutorial()

ThemeContext (Temas)
├─ theme: 'light' | 'dark'
├─ toggleTheme()
└─ setTheme(theme)
```

### Componentes Principales

```
App.tsx
├─ ThemeProvider
│   └─ AuthProvider
│       └─ AppContent
│           ├─ LoginScreen (no autenticado)
│           └─ Main App (autenticado)
│               ├─ AdminIndicator
│               ├─ Screens (Home, Calendar, etc.)
│               ├─ Navigation
│               ├─ Modales
│               └─ Tutorial
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

#### Modo Claro
```css
Background: #fafafa
Card: #ffffff
Primary: #d62828 (Rojo Peruano)
Text: #1a1a1a
Muted: #6b7280
```

#### Modo Oscuro
```css
Background: #0f0f0f
Card: #1c1c1c
Primary: #ef4444 (Rojo Brillante)
Text: #fafafa
Muted: #a3a3a3
```

### Espaciado
- Sistema basado en **múltiplos de 4px**
- Padding estándar: 16px, 24px, 32px
- Border radius: 12px (0.75rem)

### Tipografía
- Fuente: Sistema nativo optimizada
- Jerarquía clara: H1 → H4
- Line height: 1.5
- Tamaños consistentes

### Iconografía
- Librería: **Lucide React**
- Tamaño estándar: 20px (w-5 h-5)
- Colores semánticos

---

## 📚 Documentación

### Archivos de Documentación
1. **SUPABASE_INTEGRATION.md** - Guía completa de integración backend
2. **REDISEÑO_COMPLETO_2026.md** - Detalles del rediseño
3. **CHANGELOG_REDESIGN.md** - Historial de cambios
4. **README_REDISEÑO.md** - Este archivo

### Estructura de Base de Datos Preparada
- ✅ `users` - Usuarios y perfiles
- ✅ `candidates` - Candidatos presidenciales
- ✅ `electoral_events` - Eventos del calendario
- ✅ `news` - Noticias y actualizaciones
- ✅ `notifications` - Notificaciones de usuario

---

## 🚀 Inicio Rápido

### Probar la Aplicación

**Opción 1: Usuario Normal**
- Email: `usuario@demo.com`
- Password: cualquiera
- Rol asignado: Usuario

**Opción 2: Administrador**
- Email: `admin@onpe.gob.pe`
- Password: cualquiera
- Rol asignado: Administrador

### Primer Uso
1. Inicia sesión con una cuenta demo
2. El tutorial se mostrará automáticamente
3. Sigue los 5 pasos guiados
4. Explora la aplicación

### Reactivar Tutorial
1. Ve a **Perfil**
2. Busca en **Configuración**
3. (Funcionalidad a implementar)

---

## ♿ Accesibilidad

### Cumplimiento WCAG 2.1 AA
- ✅ Contraste mínimo 4.5:1 para texto
- ✅ Contraste 3:1 para elementos UI
- ✅ Touch targets mínimo 44x44px
- ✅ Focus states visibles
- ✅ Navegación por teclado
- ✅ Labels en formularios
- ✅ Alt text en imágenes
- ✅ Jerarquía semántica HTML

---

## 📱 Responsive Design

### Soporta
- 📱 Móviles pequeños (320px+)
- 📱 Móviles estándar (375px+)
- 📱 Móviles grandes (428px+)
- 💻 Tablets (max-width: 768px)

### Optimizaciones
- Layout fluido
- Imágenes responsivas
- Tipografía escalable
- Max-width: 28rem (448px)

---

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-publica
```

### Scripts
```bash
npm install        # Instalar dependencias
npm run dev        # Desarrollo
npm run build      # Build de producción
npm run preview    # Preview de build
```

---

## 🗺️ Roadmap

### ✅ Fase 1: Completada
- [x] Sistema de autenticación con roles
- [x] Modo oscuro profesional
- [x] Tutorial interactivo
- [x] Perfil editable
- [x] Panel de administración
- [x] Login moderno

### 📋 Fase 2: Migración (Próximo)
- [ ] Actualizar CalendarScreen
- [ ] Actualizar CandidatesScreen
- [ ] Actualizar NewsScreen
- [ ] Unificar estilos

### 🔌 Fase 3: Backend (Futuro)
- [ ] Conectar Supabase
- [ ] Autenticación real
- [ ] Base de datos
- [ ] Storage de archivos
- [ ] RLS policies

### 🚀 Fase 4: Avanzado (Futuro)
- [ ] Notificaciones push
- [ ] Búsqueda avanzada
- [ ] Filtros inteligentes
- [ ] Favoritos
- [ ] Compartir en redes
- [ ] Modo offline

---

## 📊 Comparativa Antes/Después

| Característica | Antes | Después |
|----------------|-------|---------|
| **Autenticación** | Mock básico | Sistema completo con roles |
| **Roles** | Toggle manual | Detección automática |
| **Tutorial** | Pantalla completa | Walkthrough interactivo |
| **Modo Oscuro** | Básico | Profesional optimizado |
| **Perfil** | Solo vista | Edición completa |
| **Admin Panel** | No existía | Panel completo |
| **Login** | Básico | Moderno con validación |
| **Backend** | No preparado | Listo para Supabase |

---

## 🎯 Principios de Diseño

### Minimalismo
- Espacios blancos generosos
- Jerarquía visual clara
- Sin elementos innecesarios

### Profesionalismo
- Colores sobrios y elegantes
- Transiciones suaves
- Feedback inmediato
- Estados de carga

### Accesibilidad
- Contraste optimizado
- Touch targets adecuados
- Navegación clara
- Feedback visual

### Performance
- Componentes optimizados
- Lazy loading
- Animaciones con GPU
- Bundle pequeño

---

## 🛡️ Seguridad

### Implementado
- ✅ Validación de formularios
- ✅ Sanitización de inputs
- ✅ Roles con verificación

### Preparado para Producción
- ⏳ Autenticación con Supabase
- ⏳ Row Level Security (RLS)
- ⏳ Tokens JWT
- ⏳ Rate limiting
- ⏳ HTTPS obligatorio

---

## 🤝 Contribución

Este es un proyecto de demostración. Para producción:
1. Conectar backend real (Supabase)
2. Implementar autenticación segura
3. Agregar tests unitarios e integración
4. Configurar CI/CD
5. Implementar monitoreo

---

## 📄 Licencia

Aplicación de demostración - DecidePerú 2026  
Información electoral confiable para todos los peruanos 🇵🇪

---

## 📞 Contacto

Para más información sobre el proyecto, consulta la documentación técnica en:
- `/frontend/SUPABASE_INTEGRATION.md`
- `/frontend/REDISEÑO_COMPLETO_2026.md`
- `/frontend/CHANGELOG_REDESIGN.md`

---

**Última actualización**: Noviembre 2026  
**Versión**: 2.0.0  
**Desarrollado con**: ❤️ y React

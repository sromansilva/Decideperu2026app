# 📁 Estructura del Proyecto - DecidePerú 2026

## 🎯 Resumen

Se ha reorganizado completamente el proyecto React en una estructura profesional lista para integración con backend.

## 📊 Estado de Migración

### ✅ Archivos Base Creados

| Ubicación | Descripción | Estado |
|-----------|-------------|---------|
| `/frontend/App.tsx` | App principal con lógica centralizada | ✅ Creado |
| `/frontend/types/index.ts` | Tipos TypeScript (Screen, Candidate, NewsItem, Event, etc.) | ✅ Creado |
| `/frontend/utils/eventHelpers.ts` | Funciones auxiliares para eventos | ✅ Creado |
| `/frontend/components/HomeScreen.tsx` | Pantalla principal migrada | ✅ Creado |
| `/frontend/components/Navigation.tsx` | Navegación inferior migrada | ✅ Creado |
| `/App.tsx` (raíz) | Proxy que importa desde /frontend | ✅ Actualizado |

### 📦 Componentes Pendientes de Copiar

Los siguientes archivos existen en `/components/` y necesitan ser copiados a `/frontend/components/` con imports actualizados:

1. **CalendarScreen.tsx** - Calendario electoral con tabs y timeline
2. **CandidatesScreen.tsx** - Grid de candidatos con filtros
3. **CandidateProfile.tsx** - Perfil detallado con acordeones
4. **GovernmentPlan.tsx** - Plan de gobierno completo
5. **VoterInfoScreen.tsx** - Info del elector con mapa
6. **PollWorkersScreen.tsx** - Guía para miembros de mesa
7. **NewsScreen.tsx** - Lista de noticias
8. **NewsDetail.tsx** - Detalle de noticia
9. **OnboardingTutorial.tsx** - Tutorial inicial de 6 slides
10. **NotificationsPanel.tsx** - Panel lateral de notificaciones
11. **EventDetailModal.tsx** - Modal de detalle de eventos

### 📚 Componentes UI (shadcn/ui)

Copiar **sin modificar** desde `/components/ui/` a `/frontend/ui/`:
- 40+ componentes de shadcn/ui
- button.tsx, accordion.tsx, tabs.tsx, etc.
- Todos mantienen sus imports originales

### 🎨 Otros Archivos

| Origen | Destino | Modificaciones |
|--------|---------|----------------|
| `/components/figma/ImageWithFallback.tsx` | `/frontend/figma/` | Sin cambios |
| `/styles/globals.css` | `/frontend/styles/` | Sin cambios |

## 🚀 Métodos de Migración

### Método 1: Script Automático (Más Rápido) ⚡

```bash
chmod +x migrate-frontend.sh
./migrate-frontend.sh
```

**Este script hace:**
- ✅ Copia todos los componentes
- ✅ Actualiza automáticamente los imports
- ✅ Mantiene estructura de shadcn/ui
- ✅ Copia estilos y assets

### Método 2: Manual (Más Control) 🔧

Seguir instrucciones en `/frontend/SETUP_INSTRUCTIONS.md`

**Pasos clave:**
1. Copiar archivos de componentes UI (sin cambios)
2. Copiar componentes principales uno por uno
3. En cada archivo actualizar:
   - `from '../App'` → `from '../types'`
   - `from './ui/'` → `from '../ui/'`

## 📐 Arquitectura Final

```
DecidePerú 2026/
│
├── App.tsx                           # Punto de entrada (proxy)
├── migrate-frontend.sh               # Script de migración automática
├── ESTRUCTURA_PROYECTO.md            # Este archivo
├── MIGRATION_GUIDE.md                # Guía detallada
│
├── /frontend                         # ← TODO EL CÓDIGO REACT AQUÍ
│   ├── App.tsx                       # Componente raíz de la app
│   ├── README.md                     # Documentación del frontend
│   ├── SETUP_INSTRUCTIONS.md         # Instrucciones de setup
│   │
│   ├── /types                        # Tipos TypeScript
│   │   └── index.ts                  # Screen, Candidate, NewsItem, Event, etc.
│   │
│   ├── /utils                        # Utilidades
│   │   └── eventHelpers.ts           # Helpers para eventos
│   │
│   ├── /components                   # Componentes de pantallas
│   │   ├── HomeScreen.tsx           
│   │   ├── CalendarScreen.tsx       
│   │   ├── CandidatesScreen.tsx     
│   │   ├── CandidateProfile.tsx     
│   │   ├── GovernmentPlan.tsx       
│   │   ├── VoterInfoScreen.tsx      
│   │   ├── PollWorkersScreen.tsx    
│   │   ├── NewsScreen.tsx           
│   │   ├── NewsDetail.tsx           
│   │   ├── Navigation.tsx           
│   │   ├── OnboardingTutorial.tsx   
│   │   ├── NotificationsPanel.tsx   
│   │   └── EventDetailModal.tsx     
│   │
│   ├── /ui                           # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── accordion.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   └── ... (40+ componentes)
│   │
│   ├── /figma                        # Componentes de Figma
│   │   └── ImageWithFallback.tsx
│   │
│   └── /styles                       # Estilos globales
│       └── globals.css               # Variables CSS, animaciones
│
├── /backend                          # ← AQUÍ IRÁ EL BACKEND (futuro)
│   ├── /api
│   ├── /models
│   ├── /controllers
│   ├── /routes
│   └── server.ts
│
└── /components                       # Original (puede eliminarse después)
    └── ... (archivos antiguos)
```

## 🎨 Funcionalidades de la App

### Pantallas Implementadas (8)
1. **Home** - Dashboard con búsqueda, estadísticas, eventos, acceso rápido
2. **Calendar** - Calendario electoral con tabs y timeline
3. **Candidates** - Lista de candidatos con filtros por categoría
4. **Candidate Profile** - Perfil detallado con propuestas y experiencia
5. **Government Plan** - Plan completo por sectores (Economía, Salud, etc.)
6. **Voter Info** - Información del elector con mapa de local
7. **Poll Workers** - Guía paso a paso para miembros de mesa
8. **News** - Noticias verificadas con detalle

### Funcionalidades Especiales
- ✅ **Tutorial Onboarding** de 6 slides (primera vez)
- ✅ **Sistema de Notificaciones** funcional con panel lateral
- ✅ **Detalles de Eventos** con modal y opciones (calendario, recordatorio, compartir)
- ✅ **Navegación** con barra inferior de 5 opciones
- ✅ **Diseño Responsive** mobile-first
- ✅ **Colores Patrios** (rojo, blanco, gris)
- ✅ **Animaciones** smooth con CSS custom

## 📋 Checklist de Completitud

### Estructura Base
- [x] Crear `/frontend/types/index.ts`
- [x] Crear `/frontend/utils/eventHelpers.ts`
- [x] Crear `/frontend/App.tsx` con lógica completa
- [x] Actualizar `/App.tsx` raíz como proxy
- [x] Migrar `HomeScreen.tsx` con updates
- [x] Migrar `Navigation.tsx` con updates
- [x] Crear documentación completa

### Migración Pendiente (Usar Script)
- [ ] Copiar 9 componentes restantes a `/frontend/components/`
- [ ] Copiar 40+ componentes UI a `/frontend/ui/`
- [ ] Copiar `ImageWithFallback.tsx` a `/frontend/figma/`
- [ ] Copiar `globals.css` a `/frontend/styles/`

### Verificación
- [ ] Ejecutar script de migración O copiar manualmente
- [ ] Verificar que no hay errores de compilación
- [ ] Probar todas las pantallas
- [ ] Verificar notificaciones funcionan
- [ ] Verificar eventos clickeables
- [ ] Verificar navegación completa

## 🔄 Próximos Pasos

### 1. Completar Migración
```bash
./migrate-frontend.sh
```

### 2. Verificar Funcionamiento
```bash
npm run dev  # o yarn dev
# Abrir http://localhost:3000
# Probar todas las funcionalidades
```

### 3. Preparar Backend (Futuro)
- Crear estructura en `/backend`
- Elegir framework (Express, Fastify, Nest.js, etc.)
- Definir API endpoints
- Reemplazar datos mock con API calls

## 💡 Ventajas de esta Estructura

✅ **Separación clara** frontend/backend
✅ **Tipos centralizados** fáciles de compartir
✅ **Helpers organizados** en `/utils`
✅ **Componentes desacoplados** fáciles de testear
✅ **Listo para escalamiento** (agregar más pantallas)
✅ **Fácil integración de backend** (datos mock → API)
✅ **Mantenible** estructura lógica y documentada

## 📞 Soporte

**Documentación disponible:**
- `/ESTRUCTURA_PROYECTO.md` (este archivo) - Overview general
- `/MIGRATION_GUIDE.md` - Guía detallada de migración
- `/frontend/README.md` - Documentación del frontend
- `/frontend/SETUP_INSTRUCTIONS.md` - Instrucciones de setup paso a paso

**Para problemas:**
1. Revisar troubleshooting en `MIGRATION_GUIDE.md`
2. Verificar que todos los archivos estén copiados
3. Confirmar que imports estén actualizados
4. Limpiar cache si es necesario

## 🎯 Objetivo Final

Tener una estructura profesional donde:
- **Frontend** (`/frontend`) maneja toda la UI en React
- **Backend** (`/backend`) manejará API, DB, autenticación (futuro)
- **Tipos compartidos** facilitan comunicación entre ambos
- **Código modular** fácil de mantener y escalar

---

**Estado actual**: ✅ Estructura base creada, listo para migración automática
**Siguiente paso**: Ejecutar `./migrate-frontend.sh` o migración manual

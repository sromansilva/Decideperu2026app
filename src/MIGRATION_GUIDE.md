# Guía de Migración - DecidePerú 2026

Esta guía documenta cómo se organizó el proyecto en la estructura frontend/backend.

## 📋 Resumen

Se ha reorganizado todo el código React/TypeScript en una carpeta `/frontend` para facilitar la futura integración del backend.

## ✅ Archivos Ya Migrados

### Estructura Base
- ✅ `/frontend/App.tsx` - Componente principal (actualizado con imports)
- ✅ `/frontend/types/index.ts` - Tipos TypeScript centralizados
- ✅ `/frontend/utils/eventHelpers.ts` - Funciones auxiliares
- ✅ `/frontend/README.md` - Documentación del frontend
- ✅ `/App.tsx` - Ahora es solo un proxy que importa desde `/frontend`

### Componentes
- ✅ `/frontend/components/HomeScreen.tsx` - Actualizado con nuevas rutas

## 📦 Archivos Pendientes de Copiar

### Componentes Principales (desde `/components/` a `/frontend/components/`)

```bash
# Copiar cada archivo actualizando los imports:
# - Cambiar `from './ui/` → `from '../ui/`
# - Cambiar `from '../App'` → `from '../types'`
# - Agregar imports de tipos desde '../types'

1. CalendarScreen.tsx
2. CandidatesScreen.tsx
3. CandidateProfile.tsx
4. GovernmentPlan.tsx
5. VoterInfoScreen.tsx
6. PollWorkersScreen.tsx
7. NewsScreen.tsx
8. NewsDetail.tsx
9. Navigation.tsx
10. OnboardingTutorial.tsx
11. NotificationsPanel.tsx
12. EventDetailModal.tsx
```

### Componentes UI (desde `/components/ui/` a `/frontend/ui/`)

```bash
# Copiar todos los archivos sin modificar:
accordion.tsx
alert-dialog.tsx
alert.tsx
aspect-ratio.tsx
avatar.tsx
badge.tsx
breadcrumb.tsx
button.tsx
calendar.tsx
card.tsx
carousel.tsx
chart.tsx
checkbox.tsx
collapsible.tsx
command.tsx
context-menu.tsx
dialog.tsx
drawer.tsx
dropdown-menu.tsx
form.tsx
hover-card.tsx
input-otp.tsx
input.tsx
label.tsx
menubar.tsx
navigation-menu.tsx
pagination.tsx
popover.tsx
progress.tsx
radio-group.tsx
resizable.tsx
scroll-area.tsx
select.tsx
separator.tsx
sheet.tsx
sidebar.tsx
skeleton.tsx
slider.tsx
sonner.tsx
switch.tsx
table.tsx
tabs.tsx
textarea.tsx
toggle-group.tsx
toggle.tsx
tooltip.tsx
use-mobile.ts
utils.ts
```

### Componentes Figma (desde `/components/figma/` a `/frontend/figma/`)

```bash
ImageWithFallback.tsx  # Copiar sin modificar
```

### Estilos (desde `/styles/` a `/frontend/styles/`)

```bash
globals.css  # Copiar con todas las animaciones personalizadas
```

## 🔧 Cambios Necesarios en los Imports

### Patrón de Actualización

**ANTES** (en `/components/HomeScreen.tsx`):
```typescript
import type { Screen } from '../App';
import { Button } from './ui/button';
```

**DESPUÉS** (en `/frontend/components/HomeScreen.tsx`):
```typescript
import type { Screen } from '../types';
import { Button } from '../ui/button';
```

### Tabla de Reemplazo de Imports

| Import Antiguo | Import Nuevo |
|---------------|-------------|
| `from '../App'` | `from '../types'` |
| `from './ui/` | `from '../ui/` |
| `from './figma/` | `from '../figma/` |
| `from './components/` | `from './components/` (sin cambio) |

## 🎯 Estructura Final

```
/
├── App.tsx                           # Proxy → importa desde /frontend
├── /frontend                         # ← Todo el código React aquí
│   ├── App.tsx                      # App principal
│   ├── README.md                    # Documentación
│   ├── /types
│   │   └── index.ts                 # Tipos compartidos
│   ├── /utils
│   │   └── eventHelpers.ts          # Helpers
│   ├── /components                   # Componentes de vistas
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
│   ├── /ui                          # Componentes shadcn
│   │   ├── button.tsx
│   │   ├── accordion.tsx
│   │   ├── tabs.tsx
│   │   └── ... (40+ componentes)
│   ├── /figma
│   │   └── ImageWithFallback.tsx
│   └── /styles
│       └── globals.css
├── /backend                          # ← Aquí irá el backend (futuro)
│   ├── /api
│   ├── /models
│   ├── /controllers
│   └── server.ts
└── MIGRATION_GUIDE.md               # Este archivo
```

## 🚀 Siguientes Pasos

### Para completar la migración manualmente:

1. **Copiar componentes restantes**:
   ```bash
   # Desde /components/ a /frontend/components/
   # Actualizar imports en cada archivo
   ```

2. **Copiar UI components**:
   ```bash
   # Desde /components/ui/ a /frontend/ui/
   # No requiere cambios
   ```

3. **Copiar estilos**:
   ```bash
   # Desde /styles/ a /frontend/styles/
   # No requiere cambios
   ```

4. **Verificar imports**:
   - Buscar todos los `from './ui/` y cambiar a `from '../ui/`
   - Buscar todos los `from '../App'` y cambiar a `from '../types'`
   - Verificar que todos los tipos estén importados correctamente

5. **Actualizar /styles/globals.css imports**:
   - Si hay un import en el index o App original, actualizarlo a `/frontend/styles/globals.css`

### Para agregar el backend (futuro):

1. Crear carpeta `/backend`
2. Elegir framework (Express, Fastify, Nest.js, etc.)
3. Definir API endpoints
4. Configurar base de datos
5. Actualizar frontend para consumir API real en lugar de datos mock

## 🐛 Troubleshooting

### Error: "Cannot find module '../types'"
- **Solución**: Verificar que `/frontend/types/index.ts` existe
- Verificar que el import sea: `import type { Screen } from '../types'`

### Error: "Cannot find module '../ui/button'"
- **Solución**: Verificar que `/frontend/ui/button.tsx` existe
- Verificar la ruta relativa correcta

### Error: "Module not found: Can't resolve './components/...'"
- **Solución**: Actualizar import en `/App.tsx` a `from './frontend/App'`

## 📝 Checklist de Migración

- [x] Crear `/frontend/types/index.ts`
- [x] Crear `/frontend/utils/eventHelpers.ts`
- [x] Crear `/frontend/App.tsx`
- [x] Actualizar `/App.tsx` como proxy
- [x] Migrar `HomeScreen.tsx`
- [ ] Migrar resto de componentes principales (11 archivos)
- [ ] Copiar todos los componentes UI (40+ archivos)
- [ ] Copiar `ImageWithFallback.tsx`
- [ ] Copiar `globals.css`
- [ ] Verificar que no hay errores de compilación
- [ ] Probar todas las funcionalidades
- [ ] Documentar estructura para el equipo

## 💡 Tips

- Los componentes en `/ui` no necesitan cambios en sus imports
- Solo los componentes principales necesitan actualización de rutas
- Mantener la estructura de shadcn/ui sin modificar
- Todos los tipos deben centralizarse en `/frontend/types`
- Las funciones auxiliares deben ir en `/frontend/utils`

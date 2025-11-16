# Instrucciones de Setup - DecidePerú 2026 Frontend

## 🎯 Estado Actual

Se ha creado la estructura base del frontend en `/frontend` con:

### ✅ Completado
- `/frontend/App.tsx` - App principal con imports actualizados
- `/frontend/types/index.ts` - Tipos TypeScript centralizados
- `/frontend/utils/eventHelpers.ts` - Funciones auxiliares
- `/frontend/components/HomeScreen.tsx` - Pantalla principal migrada
- `/frontend/components/Navigation.tsx` - Navegación migrada
- `/frontend/README.md` - Documentación completa
- `/App.tsx` - Archivo proxy que importa desde frontend
- `/migrate-frontend.sh` - Script bash para automatizar migración
- `/MIGRATION_GUIDE.md` - Guía detallada de migración

## 🚀 Opción 1: Migración Automática (Recomendada)

Si estás en un entorno Unix/Linux/Mac:

```bash
chmod +x migrate-frontend.sh
./migrate-frontend.sh
```

Este script:
1. Copia todos los componentes de `/components` a `/frontend/components`
2. Actualiza automáticamente los imports (`'../App'` → `'../types'`, `'./ui/'` → `'../ui/'`)
3. Copia todos los componentes UI de shadcn sin modificar
4. Copia componentes Figma sin modificar
5. Copia estilos globales

## 🔧 Opción 2: Migración Manual

### Paso 1: Copiar Componentes UI (Sin cambios)

```bash
cp -r components/ui/* frontend/ui/
cp -r components/figma/* frontend/figma/
cp styles/globals.css frontend/styles/
```

### Paso 2: Copiar y Actualizar Componentes Principales

Para cada componente en `/components/*.tsx`, cópialo a `/frontend/components/` y actualiza:

**Buscar y reemplazar en cada archivo:**
- `from '../App'` → `from '../types'`
- `from './ui/` → `from '../ui/'`
- `from './figma/` → `from '../figma/'`

**Lista de archivos:**
1. CalendarScreen.tsx
2. CandidatesScreen.tsx
3. CandidateProfile.tsx
4. GovernmentPlan.tsx
5. VoterInfoScreen.tsx
6. PollWorkersScreen.tsx
7. NewsScreen.tsx
8. NewsDetail.tsx
9. OnboardingTutorial.tsx
10. NotificationsPanel.tsx
11. EventDetailModal.tsx

### Paso 3: Actualizar Import de Estilos

Si tienes un archivo `index.html`, `index.tsx` o similar que importa `globals.css`, actualízalo a:

```typescript
import './frontend/styles/globals.css';
```

## ✅ Verificación

Después de la migración, verifica que:

1. **No hay errores de compilación**
   ```bash
   npm run dev  # o yarn dev
   ```

2. **Todos los componentes se importan correctamente**
   - Abre la app en el navegador
   - Navega por todas las pantallas
   - Verifica que todo funcione

3. **Los estilos se aplican correctamente**
   - Colores patrios (rojos) visibles
   - Animaciones funcionando
   - Responsive design OK

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module '../types'"
```typescript
// Asegúrate de que el archivo existe:
// /frontend/types/index.ts

// Y que los imports sean:
import type { Screen } from '../types';
```

### Error: "Cannot find module '../ui/button'"
```typescript
// Verifica que hayas copiado:
// /frontend/ui/button.tsx

// Y que el import sea:
import { Button } from '../ui/button';
```

### Estilos no se aplican
```typescript
// Verifica el import en tu archivo principal (App.tsx raíz o index):
import './frontend/styles/globals.css';

// O si está dentro de frontend:
import './styles/globals.css';
```

## 📂 Estructura Final Esperada

```
/
├── App.tsx                          # import App from './frontend/App'
├── migrate-frontend.sh              # Script de migración
├── MIGRATION_GUIDE.md              # Guía detallada
├── /frontend
│   ├── App.tsx
│   ├── README.md
│   ├── SETUP_INSTRUCTIONS.md       # Este archivo
│   ├── /types
│   │   └── index.ts
│   ├── /utils
│   │   └── eventHelpers.ts
│   ├── /components (12 archivos)
│   │   ├── HomeScreen.tsx
│   │   ├── Navigation.tsx
│   │   ├── CalendarScreen.tsx
│   │   ├── CandidatesScreen.tsx
│   │   ├── CandidateProfile.tsx
│   │   ├── GovernmentPlan.tsx
│   │   ├── VoterInfoScreen.tsx
│   │   ├── PollWorkersScreen.tsx
│   │   ├── NewsScreen.tsx
│   │   ├── NewsDetail.tsx
│   │   ├── OnboardingTutorial.tsx
│   │   ├── NotificationsPanel.tsx
│   │   └── EventDetailModal.tsx
│   ├── /ui (40+ componentes shadcn)
│   ├── /figma
│   │   └── ImageWithFallback.tsx
│   └── /styles
│       └── globals.css
└── /components (original - puede eliminarse después)
```

## 🎯 Próximos Pasos

Una vez completada la migración:

1. ✅ Probar toda la aplicación
2. ✅ Verificar que no hay console errors
3. ✅ Hacer commit de los cambios
4. 🚀 Proceder a agregar el backend en `/backend`

## 💡 Consejos

- No elimines la carpeta `/components` original hasta estar 100% seguro
- Haz backup o commit antes de migrar
- Prueba cada pantalla después de migrar
- Si algo no funciona, compara con la versión original

## 📞 Ayuda

Si encuentras problemas:
1. Revisa `/MIGRATION_GUIDE.md` para troubleshooting detallado
2. Verifica que todos los archivos estén en las ubicaciones correctas
3. Confirma que todos los imports estén actualizados
4. Limpia cache del bundler si es necesario (`rm -rf .next` o similar)

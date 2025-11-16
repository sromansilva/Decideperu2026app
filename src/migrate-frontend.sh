#!/bin/bash

# Script para migrar todos los archivos del frontend a la nueva estructura
# Este script copia archivos y actualiza los imports automáticamente

echo "🚀 Iniciando migración del frontend..."

# Crear estructura de carpetas
mkdir -p frontend/components
mkdir -p frontend/ui
mkdir -p frontend/figma
mkdir -p frontend/styles

echo "📁 Estructura de carpetas creada"

# Función para actualizar imports en un archivo
update_imports() {
    local file=$1
    # Reemplazar imports de '../App' por '../types'
    sed -i "s/from '..\/App'/from '..\/types'/g" "$file"
    sed -i 's/from "..\/App"/from "..\/types"/g' "$file"
    
    # Reemplazar imports de './ui/' por '../ui/' en archivos de components
    sed -i "s/from '.\/ui\//from '..\/ui\//g" "$file"
    sed -i 's/from ".\/ui\//from "..\/ui\//g' "$file"
    
    # Reemplazar imports de './figma/' por '../figma/' en archivos de components
    sed -i "s/from '.\/figma\//from '..\/figma\//g" "$file"
    sed -i 's/from ".\/figma\//from "..\/figma\//g' "$file"
    
    echo "✅ Actualizado: $file"
}

# Copiar y actualizar componentes principales
echo ""
echo "📦 Copiando componentes principales..."

COMPONENTS=(
    "CalendarScreen.tsx"
    "CandidatesScreen.tsx"
    "CandidateProfile.tsx"
    "GovernmentPlan.tsx"
    "VoterInfoScreen.tsx"
    "PollWorkersScreen.tsx"
    "NewsScreen.tsx"
    "NewsDetail.tsx"
    "OnboardingTutorial.tsx"
    "NotificationsPanel.tsx"
    "EventDetailModal.tsx"
)

for component in "${COMPONENTS[@]}"; do
    if [ -f "components/$component" ]; then
        cp "components/$component" "frontend/components/$component"
        update_imports "frontend/components/$component"
    else
        echo "⚠️  No encontrado: components/$component"
    fi
done

# Copiar componentes UI (sin modificar)
echo ""
echo "📦 Copiando componentes UI (shadcn)..."

if [ -d "components/ui" ]; then
    cp -r components/ui/* frontend/ui/
    echo "✅ Componentes UI copiados"
else
    echo "⚠️  No encontrada carpeta: components/ui"
fi

# Copiar componentes Figma (sin modificar)
echo ""
echo "📦 Copiando componentes Figma..."

if [ -d "components/figma" ]; then
    cp -r components/figma/* frontend/figma/
    echo "✅ Componentes Figma copiados"
else
    echo "⚠️  No encontrada carpeta: components/figma"
fi

# Copiar estilos (sin modificar)
echo ""
echo "📦 Copiando estilos..."

if [ -f "styles/globals.css" ]; then
    cp styles/globals.css frontend/styles/globals.css
    echo "✅ Estilos copiados"
else
    echo "⚠️  No encontrado: styles/globals.css"
fi

echo ""
echo "✨ Migración completada!"
echo ""
echo "📋 Siguientes pasos:"
echo "1. Actualizar el import de globals.css en tu index/main file"
echo "2. Verificar que no haya errores de compilación"
echo "3. Probar todas las funcionalidades"
echo "4. Eliminar carpetas antiguas si todo funciona correctamente"
echo ""
echo "💡 Ver MIGRATION_GUIDE.md para más detalles"

# 📝 Formulario de Registro con Autocompletado por DNI

Este ejemplo muestra cómo implementar un formulario de registro con autocompletado automático de datos usando la consulta de DNI.

## 🚀 Características

- ✅ Autocompletado automático al escribir DNI
- ✅ Validación de formato de DNI (8 dígitos)
- ✅ Consulta a API externa con token
- ✅ Manejo de errores sin romper el formulario
- ✅ Indicadores visuales de carga
- ✅ Código limpio y comentado
- ✅ JavaScript puro (sin dependencias)

## 📁 Archivos

- `registro-dni.html` - Formulario completo listo para usar

## 🔧 Configuración

### 1. Configurar el Backend

Asegúrate de tener configurado el archivo `.env` en el backend:

```env
EXTERNAL_API_RENIEC_URL=https://tu-api-endpoint.com/v1/reniec/dni
EXTERNAL_API_RENIEC_TOKEN=tu_token_aqui
```

### 2. Configurar el Frontend

En el archivo `registro-dni.html`, actualiza la constante:

```javascript
const API_BASE_URL = 'http://localhost:4000/api'; // Tu URL del backend
```

### 3. Iniciar el Backend

```bash
cd backend
npm install
npm run dev
```

### 4. Abrir el Formulario

Abre el archivo `registro-dni.html` en tu navegador o sirve desde un servidor local.

## 📋 Flujo de Funcionamiento

1. **Usuario escribe DNI** (solo números, máximo 8 dígitos)
2. **Al perder el foco** (blur) o presionar Enter, se valida que tenga 8 dígitos
3. **Se muestra indicador de carga** mientras consulta
4. **Se llama al backend** `/api/consulta-dni/:dni`
5. **El backend consulta la API externa** con el token configurado
6. **Si hay datos**, se autocompletan los campos:
   - Nombres
   - Apellido Paterno
   - Apellido Materno
7. **Si hay error**, se muestra mensaje sin romper el formulario

## 🔌 Endpoints Utilizados

### GET `/api/consulta-dni/:dni`

Consulta datos de un DNI en la API externa de RENIEC.

**Parámetros:**
- `dni` (path) - Número de DNI (8 dígitos)

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Consulta RENIEC exitosa",
  "data": {
    "dni": "12345678",
    "nombres": "JUAN CARLOS",
    "apellidoPaterno": "PEREZ",
    "apellidoMaterno": "GARCIA",
    "nombreCompleto": "JUAN CARLOS PEREZ GARCIA",
    "fechaNacimiento": "1990-01-01",
    "sexo": "M",
    "distrito": "Lima",
    "provincia": "Lima",
    "departamento": "Lima",
    "consultado_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Respuesta de error:**
```json
{
  "success": false,
  "message": "El DNI debe tener exactamente 8 dígitos"
}
```

## 💻 Uso en React

El componente `AuthScreen.tsx` ya incluye esta funcionalidad integrada. Solo necesitas:

1. Configurar la variable de entorno `VITE_API_URL` en tu frontend
2. El componente detectará automáticamente cuando el usuario termine de escribir el DNI
3. Autocompletará los campos automáticamente

## 🎨 Personalización

### Cambiar el estilo

Modifica las clases CSS en el `<style>` del HTML o integra con tu framework CSS favorito.

### Cambiar el comportamiento

- **Consulta inmediata**: Cambia `blur` por `input` en el event listener
- **Debounce**: Agrega un delay antes de consultar
- **Validación adicional**: Agrega más validaciones en la función `consultarDNI`

## 🐛 Troubleshooting

### Error: "Cannot connect to API"
- Verifica que el backend esté corriendo
- Verifica la URL en `API_BASE_URL`
- Revisa la consola del navegador para errores CORS

### Error: "El DNI debe tener 8 dígitos"
- Asegúrate de escribir exactamente 8 números
- El campo solo acepta números automáticamente

### No se autocompletan los campos
- Verifica que la API externa esté respondiendo correctamente
- Revisa el token en el backend
- Revisa los logs del backend para ver errores

## 📚 Integración con el Backend Completo

Este formulario se integra perfectamente con el backend Express que ya tienes configurado. Solo necesitas:

1. Configurar el token en `.env`
2. Asegurarte de que el backend esté corriendo
3. Usar la URL correcta en el frontend

## ✅ Validaciones Incluidas

- ✅ DNI solo números
- ✅ DNI exactamente 8 dígitos
- ✅ Email válido
- ✅ Contraseña mínimo 6 caracteres
- ✅ Campos requeridos marcados con *

## 🎯 Próximos Pasos

1. Integrar con el endpoint de registro real (`/api/auth/register`)
2. Agregar validación de contraseña (confirmación)
3. Agregar términos y condiciones
4. Mejorar UX con animaciones
5. Agregar tests automatizados


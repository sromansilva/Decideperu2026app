# 🚀 Backend API - DecidePerú 2026

Backend completo y moderno construido con **Node.js + Express**, conectado a **Supabase**, y preparado para integrarse perfectamente con el frontend React + Vite.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Endpoints](#-endpoints)
- [Despliegue](#-despliegue)
- [Integración con Frontend](#-integración-con-frontend)

## ✨ Características

- ✅ **API REST** estructurada y modular
- ✅ **Autenticación** con Supabase (email/password)
- ✅ **Integración con RENIEC** para consulta de DNI
- ✅ **CRUD completo** para candidatos, noticias, eventos
- ✅ **Validación** con Joi
- ✅ **Manejo de errores** centralizado
- ✅ **Rate limiting** para protección
- ✅ **CORS** configurado
- ✅ **Helmet** para seguridad
- ✅ **Logging** con Morgan
- ✅ **Row Level Security (RLS)** en Supabase

## 🛠 Tecnologías

- **Node.js** (ES Modules)
- **Express.js** - Framework web
- **Supabase** - Base de datos y autenticación
- **Axios** - Cliente HTTP para APIs externas
- **Joi** - Validación de datos
- **Helmet** - Seguridad HTTP
- **Morgan** - Logging de requests
- **express-rate-limit** - Rate limiting
- **dotenv** - Variables de entorno

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js          # Configuración de Supabase
│   ├── controllers/
│   │   ├── auth.controller.js   # Controlador de autenticación
│   │   ├── voters.controller.js # Controlador de votantes
│   │   ├── reniec.controller.js # Controlador de RENIEC
│   │   ├── candidates.controller.js
│   │   ├── news.controller.js
│   │   ├── events.controller.js
│   │   └── notifications.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js    # Middleware de autenticación
│   │   ├── error.middleware.js   # Manejo de errores
│   │   └── validation.middleware.js # Validación con Joi
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── voters.routes.js
│   │   ├── reniec.routes.js
│   │   ├── candidates.routes.js
│   │   ├── news.routes.js
│   │   ├── events.routes.js
│   │   └── notifications.routes.js
│   ├── services/
│   │   ├── supabase.service.js   # Servicio base para Supabase
│   │   └── reniec.service.js     # Servicio para API RENIEC
│   └── index.js                  # Punto de entrada
├── .env.example                  # Ejemplo de variables de entorno
├── package.json
├── supabase-schema.sql           # Schema SQL para Supabase
└── README.md
```

## 🚀 Instalación

### 1. Clonar o navegar al proyecto

```bash
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Supabase Configuration
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
SUPABASE_ANON_KEY=tu_anon_key

# External APIs
EXTERNAL_API_RENIEC_URL=https://api.decolecta.com/v1/reniec/dni
EXTERNAL_API_RENIEC_TOKEN=your_reniec_api_token_here

# Server Configuration
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Secret (opcional)
JWT_SECRET=tu_jwt_secret_key
```

### 4. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a **SQL Editor** en el dashboard de Supabase
3. Ejecuta el contenido del archivo `supabase-schema.sql`
4. Obtén tus credenciales desde **Settings > API**

## 🎯 Uso

### Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### Producción

```bash
npm start
```

### Health Check

```bash
curl http://localhost:4000/health
```

## 📡 Endpoints

### 🔐 Autenticación

#### `POST /api/auth/register`
Registrar nuevo usuario

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123",
  "full_name": "Juan Pérez",
  "dni": "12345678"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "usuario@example.com",
      "full_name": "Juan Pérez",
      "dni": "12345678"
    }
  }
}
```

#### `POST /api/auth/login`
Iniciar sesión

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "usuario@example.com",
      "full_name": "Juan Pérez"
    },
    "session": {
      "access_token": "token...",
      "refresh_token": "token...",
      "expires_at": 1234567890
    }
  }
}
```

#### `GET /api/auth/me`
Obtener información del usuario actual (requiere token)

**Headers:**
```
Authorization: Bearer <token>
```

### 👥 Votantes

#### `GET /api/voters/reniec/:dni`
Obtener información de votante por DNI

**Ejemplo:**
```bash
GET /api/voters/reniec/12345678
```

### 🆔 RENIEC

#### `GET /api/reniec/:dni`
Consultar DNI en RENIEC

**Ejemplo:**
```bash
GET /api/reniec/12345678
```

**Response:**
```json
{
  "success": true,
  "message": "Consulta RENIEC exitosa",
  "data": {
    "dni": "12345678",
    "nombres": "Juan",
    "apellidoPaterno": "Pérez",
    "apellidoMaterno": "García",
    "nombreCompleto": "Juan Pérez García",
    "fechaNacimiento": "1990-01-01",
    "sexo": "M",
    "distrito": "Lima",
    "provincia": "Lima",
    "departamento": "Lima"
  }
}
```

### 👔 Candidatos

#### `GET /api/candidates`
Obtener todos los candidatos (con paginación y filtros)

**Query params:**
- `page` - Número de página (default: 1)
- `limit` - Resultados por página (default: 20)
- `cargo` - Filtrar por cargo
- `partido` - Filtrar por partido
- `distrito` - Filtrar por distrito

**Ejemplo:**
```bash
GET /api/candidates?page=1&limit=10&cargo=presidente
```

#### `GET /api/candidates/:id`
Obtener candidato por ID

#### `POST /api/candidates`
Crear candidato (requiere autenticación y admin)

**Body:**
```json
{
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "cargo": "presidente",
  "partido": "Partido X",
  "biografia": "Biografía del candidato...",
  "propuestas": ["Propuesta 1", "Propuesta 2"]
}
```

#### `PUT /api/candidates/:id`
Actualizar candidato (requiere autenticación y admin)

#### `DELETE /api/candidates/:id`
Eliminar candidato (requiere autenticación y admin)

### 📰 Noticias

#### `GET /api/news`
Obtener todas las noticias

**Query params:**
- `page` - Número de página
- `limit` - Resultados por página
- `category` - Filtrar por categoría
- `featured` - Solo destacadas (true/false)

#### `GET /api/news/:id`
Obtener noticia por ID

### 📅 Eventos

#### `GET /api/events`
Obtener todos los eventos (calendario electoral)

**Query params:**
- `page` - Número de página
- `limit` - Resultados por página
- `type` - Filtrar por tipo
- `start_date` - Fecha inicio
- `end_date` - Fecha fin

#### `GET /api/events/:id`
Obtener evento por ID

### 🔔 Notificaciones

#### `GET /api/notifications/:userId`
Obtener notificaciones de un usuario

**Query params:**
- `page` - Número de página
- `limit` - Resultados por página
- `read` - Filtrar por estado (true/false)

#### `PATCH /api/notifications/:userId/:notificationId/read`
Marcar notificación como leída

## 🚢 Despliegue

### Railway

1. Crea una cuenta en [Railway](https://railway.app)
2. Conecta tu repositorio
3. Agrega las variables de entorno en Railway
4. Railway detectará automáticamente Node.js y ejecutará `npm start`

### Render

1. Crea una cuenta en [Render](https://render.com)
2. Crea un nuevo **Web Service**
3. Conecta tu repositorio
4. Configura:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Agrega las variables de entorno

### Supabase Edge Functions (Alternativa)

Si prefieres usar Supabase Edge Functions en lugar de un servidor separado, puedes migrar la lógica a funciones Deno.

## 🔗 Integración con Frontend

### Configurar el cliente API en React

Crea un archivo `src/lib/api-client.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### Ejemplo de uso en React

```typescript
import apiClient from '@/lib/api-client';

// Login
const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  localStorage.setItem('access_token', response.data.data.session.access_token);
  return response.data;
};

// Obtener candidatos
const getCandidates = async () => {
  const response = await apiClient.get('/candidates');
  return response.data.data.candidates;
};

// Consultar RENIEC
const consultarRENIEC = async (dni: string) => {
  const response = await apiClient.get(`/reniec/${dni}`);
  return response.data.data;
};
```

### Variables de entorno en Vite

Crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:4000/api
```

## 🔒 Seguridad

- ✅ **Helmet** - Headers de seguridad HTTP
- ✅ **CORS** - Configurado para tu frontend
- ✅ **Rate Limiting** - 100 requests por 15 minutos por IP
- ✅ **Validación** - Todos los inputs validados con Joi
- ✅ **Row Level Security** - Políticas RLS en Supabase
- ✅ **Autenticación** - JWT tokens de Supabase

## 🐛 Troubleshooting

### Error: "Missing SUPABASE_URL"
- Verifica que el archivo `.env` existe y tiene las variables correctas

### Error: "Invalid or expired token"
- Verifica que estás enviando el token en el header `Authorization: Bearer <token>`
- Asegúrate de que el token no haya expirado

### Error: "Cannot connect to RENIEC API"
- Verifica que la URL de la API externa sea correcta
- Revisa tu conexión a internet
- La API externa puede tener rate limiting

### Error: "Database error"
- Verifica que hayas ejecutado el schema SQL en Supabase
- Revisa que las tablas existan y tengan los permisos correctos

## 📝 Notas

- El backend usa **ES Modules** (`type: "module"` en package.json)
- Todas las rutas están bajo el prefijo `/api`
- Los errores se manejan de forma centralizada
- Los logs se muestran en consola (desarrollo) o en formato combined (producción)

## 📄 Licencia

ISC

---

**Desarrollado para DecidePerú 2026** 🇵🇪


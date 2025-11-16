# 🚀 Guía de Inicio Rápido

## Configuración en 5 minutos

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto
2. En el dashboard, ve a **SQL Editor**
3. Copia y pega el contenido de `supabase-schema.sql`
4. Ejecuta el script SQL
5. Ve a **Settings > API** y copia:
   - Project URL
   - `service_role` key (secret)
   - `anon` key (public)

### 3. Crear archivo .env

Crea un archivo `.env` en la carpeta `backend/`:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
SUPABASE_ANON_KEY=tu_anon_key_aqui
EXTERNAL_API_RENIEC_URL=https://api.decolecta.com/v1/reniec/dni
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Iniciar el servidor

```bash
npm run dev
```

### 5. Probar la API

```bash
# Health check
curl http://localhost:4000/health

# Deberías ver:
# {"status":"OK","message":"DecidePerú 2026 API is running",...}
```

## ✅ Verificación

Si todo está bien, deberías ver:

```
🚀 Server running on port 4000
📡 Environment: development
🔗 Health check: http://localhost:4000/health
📚 API Base URL: http://localhost:4000/api
```

## 🔗 Próximos pasos

1. Prueba los endpoints desde Postman o tu frontend
2. Configura CORS si tu frontend está en otro puerto
3. Revisa el `README.md` para documentación completa

## 🐛 Problemas comunes

**Error: "Missing SUPABASE_URL"**
- Verifica que el archivo `.env` existe y tiene las variables correctas

**Error: "Cannot connect to database"**
- Verifica que ejecutaste el schema SQL en Supabase
- Revisa que las credenciales sean correctas

**Error: "Port already in use"**
- Cambia el `PORT` en el archivo `.env` a otro número (ej: 4001)


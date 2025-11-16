# Guía de Integración con Supabase - DecidePerú 2026

## Estructura de Base de Datos Preparada

### Tabla: users
Campos preparados en `AuthContext`:
- `id` (UUID, Primary Key)
- `name` (TEXT) - Nombre completo del usuario
- `email` (TEXT, UNIQUE) - Correo electrónico
- `dni` (TEXT, UNIQUE) - Documento Nacional de Identidad
- `avatar` (TEXT) - URL de la imagen de perfil
- `role` (TEXT) - 'admin' o 'user'
- `voting_status` (TEXT) - 'habilitado' o 'pendiente'
- `phone` (TEXT) - Número de teléfono
- `address` (TEXT) - Dirección
- `voting_location` (TEXT) - Local de votación asignado
- `voting_table` (TEXT) - Mesa de votación asignada
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabla: candidates
Campos usados en `CandidatesScreen`:
- `id` (UUID, Primary Key)
- `name` (TEXT) - Nombre del candidato
- `party` (TEXT) - Partido político
- `photo` (TEXT) - URL de la foto
- `proposals_count` (INTEGER) - Cantidad de propuestas
- `description` (TEXT) - Descripción breve
- `government_plan` (JSONB) - Plan de gobierno completo
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabla: electoral_events
Campos usados en `CalendarScreen`:
- `id` (UUID, Primary Key)
- `title` (TEXT) - Título del evento
- `date` (DATE) - Fecha del evento
- `category` (TEXT) - 'inscripcion' | 'debate' | 'votacion' | 'otro'
- `description` (TEXT) - Descripción detallada
- `location` (TEXT) - Ubicación del evento
- `time` (TIME) - Hora del evento
- `participants` (TEXT[]) - Lista de participantes
- `created_at` (TIMESTAMP)

### Tabla: news
Campos usados en `NewsScreen`:
- `id` (UUID, Primary Key)
- `title` (TEXT) - Título de la noticia
- `excerpt` (TEXT) - Extracto breve
- `content` (TEXT) - Contenido completo
- `image` (TEXT) - URL de imagen principal
- `category` (TEXT) - Categoría de la noticia
- `date` (TIMESTAMP) - Fecha de publicación
- `author` (TEXT) - Autor de la noticia
- `created_by` (UUID, Foreign Key to users) - Quién creó la noticia

### Tabla: notifications
Campos usados en `NotificationsPanel`:
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to users) - Usuario destinatario
- `title` (TEXT) - Título de la notificación
- `message` (TEXT) - Mensaje
- `type` (TEXT) - 'info' | 'warning' | 'success' | 'error'
- `read` (BOOLEAN) - Si fue leída
- `created_at` (TIMESTAMP)

## Configuración de Autenticación

### 1. Auth en `AuthContext.tsx`

El archivo `/frontend/contexts/AuthContext.tsx` está preparado para:

```typescript
// TODO: Integrar con Supabase Auth
// Importar: import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// Login con email/password
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})

// Obtener usuario actual
const { data: { user } } = await supabase.auth.getUser()

// Logout
await supabase.auth.signOut()
```

### 2. Login Social (Opcional)

El componente `LoginScreen.tsx` puede extenderse para incluir:
- Google OAuth
- Facebook Login
- GitHub Login

### 3. Row Level Security (RLS)

Políticas de seguridad recomendadas:

```sql
-- Users: Solo pueden ver y editar su propio perfil
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Candidates: Lectura pública, escritura solo admins
CREATE POLICY "Anyone can view candidates"
  ON candidates FOR SELECT
  TO public USING (true);

CREATE POLICY "Only admins can manage candidates"
  ON candidates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- News: Similar a candidates
CREATE POLICY "Anyone can view news"
  ON news FOR SELECT
  TO public USING (true);

CREATE POLICY "Only admins can manage news"
  ON news FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Notifications: Solo propias
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);
```

## Funciones CRUD Preparadas

### En `AuthContext.tsx`

- ✅ `login()` - Autenticación de usuario
- ✅ `logout()` - Cerrar sesión
- ✅ `updateUser()` - Actualizar datos del usuario
- ⏳ `changePassword()` - Pendiente de implementar

### En componentes de Candidatos

- ⏳ `getCandidates()` - Obtener lista de candidatos
- ⏳ `getCandidateById()` - Obtener candidato específico
- ⏳ `createCandidate()` - Crear nuevo candidato (admin)
- ⏳ `updateCandidate()` - Actualizar candidato (admin)
- ⏳ `deleteCandidate()` - Eliminar candidato (admin)

### En componentes de Noticias

- ⏳ `getNews()` - Obtener lista de noticias
- ⏳ `getNewsById()` - Obtener noticia específica
- ⏳ `createNews()` - Crear nueva noticia (admin)
- ⏳ `updateNews()` - Actualizar noticia (admin)
- ⏳ `deleteNews()` - Eliminar noticia (admin)

### En componentes de Eventos

- ⏳ `getEvents()` - Obtener calendario electoral
- ⏳ `createEvent()` - Crear evento (admin)
- ⏳ `updateEvent()` - Actualizar evento (admin)
- ⏳ `deleteEvent()` - Eliminar evento (admin)

## Variables de Entorno

Crear archivo `.env.local`:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-publica
```

## Storage de Archivos

### Configurar buckets en Supabase:

1. **avatars** - Fotos de perfil de usuarios
2. **candidates** - Fotos de candidatos
3. **news-images** - Imágenes de noticias

### Políticas de Storage:

```sql
-- Avatars: Cualquiera puede leer, solo dueño puede subir
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Próximos Pasos

1. ✅ Sistema de autenticación y roles implementado
2. ✅ Tutorial interactivo tipo walkthrough
3. ✅ Modo oscuro profesional
4. ✅ Edición de perfil con formularios
5. ⏳ Conectar endpoints de Supabase
6. ⏳ Implementar upload de imágenes
7. ⏳ Configurar real-time subscriptions para notificaciones
8. ⏳ Implementar caché con React Query o SWR

## Notas de Seguridad

- ❌ NUNCA exponer `SUPABASE_SERVICE_ROLE_KEY` en el cliente
- ✅ Usar solo `SUPABASE_ANON_KEY` en el frontend
- ✅ Implementar RLS en todas las tablas
- ✅ Validar roles en el backend además del frontend
- ✅ Sanitizar inputs antes de guardar en la base de datos

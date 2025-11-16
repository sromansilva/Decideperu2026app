# ⚡ QUICK START - Supabase Integration

## 🚀 Setup en 10 Minutos

---

## 1️⃣ CREAR PROYECTO SUPABASE (3 min)

```
1. Ir a https://supabase.com
2. Click "New Project"
3. Completar:
   - Name: decideperu-2026
   - Password: (guardar seguro)
   - Region: South America
4. Esperar 2 minutos
```

---

## 2️⃣ COPIAR KEYS (1 min)

```
Dashboard → Settings → API

Copiar:
- Project URL
- anon public key
- service_role key
```

Crear archivo `.env`:

```bash
VITE_SUPABASE_URL=tu-project-url
VITE_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

---

## 3️⃣ EJECUTAR SQL (2 min)

```
1. Dashboard → SQL Editor
2. Copiar TODO de: /supabase/migrations/001_create_tables.sql
3. Pegar y Run
4. Verificar: ✅ sin errores
```

---

## 4️⃣ CREAR ADMIN (1 min)

```
Dashboard → Authentication → Users → Add User

Email: admin@decideperu.com
Password: admin123
Auto Confirm: ✅

Luego en SQL Editor:

UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@decideperu.com';
```

---

## 5️⃣ INSTALAR DEPENDENCIA (1 min)

```bash
npm install @supabase/supabase-js
```

---

## 6️⃣ INTEGRAR EN APP.TSX (2 min)

```tsx
import { useState } from 'react';
import { AuthProvider } from './hooks/useAuth';
import { LoginScreen } from './components/auth/LoginScreen';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  const [authView, setAuthView] = useState<'login' | 'app'>('login');
  
  return (
    <AuthProvider>
      {authView === 'login' ? (
        <LoginScreen 
          onLoginSuccess={() => setAuthView('app')}
          onNavigateToRegister={() => {/* implementar */}}
        />
      ) : (
        <ProtectedRoute>
          {/* Tu app actual aquí */}
          <YourMainApp />
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}

export default App;
```

---

## 7️⃣ USAR EN COMPONENTES

### CandidatesScreen.tsx

```tsx
import { useCandidates } from '../hooks/useCandidates';

function CandidatesScreen() {
  const { candidates, loading, error } = useCandidates();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {candidates.map(c => (
        <div key={c.id}>
          <img src={c.photo_url} alt={c.name} />
          <h3>{c.name}</h3>
          <p>{c.party}</p>
        </div>
      ))}
    </div>
  );
}
```

### AdminPanel.tsx

```tsx
import { useAdminCandidates } from '../hooks/useCandidates';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

function AdminPanel() {
  const { 
    candidates,
    createCandidate,
    updateCandidate,
    deleteCandidate 
  } = useAdminCandidates();
  
  const handleCreate = async (data) => {
    const result = await createCandidate({
      name: 'Nuevo Candidato',
      party: 'Partido Demo',
      shortParty: 'PD',
      position: 'Presidencial',
      region: 'Lima',
      status: 'active',
    });
    
    if (result.success) alert('Creado!');
  };
  
  return (
    <ProtectedRoute requireAdmin={true}>
      <div>
        <button onClick={() => handleCreate({})}>
          Crear Candidato
        </button>
        
        {candidates.map(c => (
          <div key={c.id}>
            {c.name} - {c.status}
            <button onClick={() => deleteCandidate(c.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
```

---

## ✅ TEST RÁPIDO

### Login Test:

```
1. npm run dev
2. Debe aparecer LoginScreen
3. Ingresar: admin@decideperu.com / admin123
4. Debe entrar a la app
```

### Admin Test:

```tsx
import { useAuth } from './hooks/useAuth';

function ProfileScreen() {
  const { user, isAdmin } = useAuth();
  
  console.log('User:', user);
  console.log('Is Admin:', isAdmin);
  
  return (
    <div>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.role}</p>
      {isAdmin && <button>Panel Admin</button>}
    </div>
  );
}
```

### Crear Candidato Test:

```tsx
const handleTest = async () => {
  const { createCandidate } = useAdminCandidates();
  
  const result = await createCandidate({
    name: 'Test Candidate',
    party: 'Test Party',
    shortParty: 'TP',
    position: 'Congreso',
    region: 'Lima',
    status: 'active',
  });
  
  console.log('Result:', result);
};
```

Verificar en Supabase → Table Editor → candidates

---

## 🎯 CÓDIGOS ÚTILES

### Verificar Sesión:

```tsx
import { supabase } from './lib/supabaseClient';

const checkSession = async () => {
  const { data } = await supabase.auth.getSession();
  console.log('Session:', data.session);
};
```

### Obtener Usuario:

```tsx
const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  console.log('User:', data.user);
};
```

### Verificar Rol:

```tsx
const checkRole = async () => {
  const { data } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user?.id)
    .single();
    
  console.log('Role:', profile?.role);
};
```

### Test CRUD:

```tsx
import { candidatesService } from './services/candidates.service';

// Create
const result = await candidatesService.create({
  name: 'Juan Pérez',
  party: 'Partido Test',
  shortParty: 'PT',
  position: 'Presidencial',
  region: 'Lima',
  status: 'active',
});

// Read
const candidates = await candidatesService.getAllActive();

// Update
await candidatesService.update(id, { status: 'pending' });

// Delete
await candidatesService.delete(id);
```

---

## 🔥 COMANDOS SQL ÚTILES

### Ver todos los candidatos:

```sql
SELECT * FROM public.candidates;
```

### Ver usuarios y roles:

```sql
SELECT id, email, role FROM public.users;
```

### Convertir usuario en admin:

```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'tu@email.com';
```

### Eliminar todos los candidatos:

```sql
DELETE FROM public.candidates;
```

### Ver buckets de storage:

```sql
SELECT * FROM storage.buckets;
```

### Ver políticas RLS:

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'candidates';
```

---

## 📦 ESTRUCTURA DE DATOS

### Candidate:

```typescript
{
  id: string;
  name: string;
  party: string;
  short_party: string;
  position: 'Presidencial' | 'Congreso' | 'Parlamento Andino';
  region: string;
  photo_url: string | null;
  bio: string | null;
  plan_resumen: string | null;
  proposals: string | null;
  history: string | null;
  social_media: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  status: 'active' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
  created_by: string | null;
}
```

### User:

```typescript
{
  id: string;
  email: string;
  role: 'admin' | 'user';
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
```

---

## 🐛 TROUBLESHOOTING RÁPIDO

### Error: "Missing Supabase URL"
```bash
# Verificar .env
cat .env

# Debe contener:
# VITE_SUPABASE_URL=...
```

### Error: "Invalid API key"
```bash
# Copiar keys de nuevo desde Supabase Dashboard
# Settings → API
```

### Error: "RLS policy violation"
```sql
-- Verificar que el SQL migration se ejecutó
SELECT COUNT(*) FROM pg_policies 
WHERE tablename = 'candidates';

-- Debe retornar más de 5
```

### No puedo crear candidatos
```sql
-- Verificar que eres admin
SELECT role FROM public.users 
WHERE email = 'tu@email.com';

-- Si no es 'admin', ejecutar:
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'tu@email.com';
```

### Fotos no se suben
```sql
-- Verificar buckets
SELECT * FROM storage.buckets 
WHERE id = 'candidate-photos';

-- Si no existe, crear:
INSERT INTO storage.buckets (id, name, public)
VALUES ('candidate-photos', 'candidate-photos', true);
```

---

## ⚡ ATAJOS DE TECLADO

### VS Code:

```
Ctrl+P → Buscar archivo rápido
Ctrl+Shift+F → Buscar en todo el proyecto
Ctrl+` → Abrir terminal
```

### Supabase Dashboard:

```
Settings → API → Copy keys
SQL Editor → New query
Table Editor → View data
```

---

## 📞 AYUDA RÁPIDA

### ¿No funciona?

1. Leer: `SUPABASE_IMPLEMENTATION_GUIDE.md`
2. Verificar: `.env` tiene las keys correctas
3. Revisar: SQL migration se ejecutó sin errores
4. Confirmar: Usuario es admin en tabla `users`

### ¿Quieres más detalles?

- **Setup completo**: `SUPABASE_IMPLEMENTATION_GUIDE.md`
- **Ejemplos de código**: `INTEGRATION_EXAMPLES.md`
- **Tests**: `TEST_SUPABASE.md`
- **Resumen**: `SUPABASE_COMPLETE_SUMMARY.md`

---

## 🎉 ¡LISTO EN 10 MINUTOS!

Ahora tienes:

✅ Autenticación real  
✅ Base de datos PostgreSQL  
✅ Roles (admin/user)  
✅ CRUD de candidatos  
✅ Upload de fotos  
✅ Realtime updates  
✅ Seguridad con RLS  

**¡A desarrollar!** 🚀🇵🇪

---

**Versión**: 3.0.0  
**Tiempo**: 10-15 minutos  
**Estado**: ✅ Ready to use

# 🧪 Tests Rápidos de Supabase

## Comandos para probar que todo funciona

---

## ✅ Test 1: Health Check

Abre la consola del navegador y ejecuta:

```javascript
// Importar el cliente
import { apiClient } from './frontend/lib/api-client';

// Test básico
const testHealth = async () => {
  const response = await apiClient.healthCheck();
  console.log('✅ Servidor:', response);
  // Esperado: { success: true, data: { status: "ok" } }
};

testHealth();
```

---

## ✅ Test 2: Crear Candidato

```javascript
const testCreateCandidate = async () => {
  const response = await apiClient.createCandidate({
    name: "Juan Pérez Test",
    party: "Partido de Prueba",
    shortParty: "PP",
    position: "Congreso",
    region: "Lima",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    status: "active",
    proposals: "Propuestas de prueba",
  });
  
  console.log('✅ Candidato creado:', response);
  return response.data?.id; // Guardar el ID para siguientes tests
};

const candidateId = await testCreateCandidate();
```

---

## ✅ Test 3: Obtener Candidatos

```javascript
const testGetCandidates = async () => {
  const response = await apiClient.getCandidates();
  console.log('✅ Candidatos:', response);
  console.log('📊 Total:', response.data?.length);
};

testGetCandidates();
```

---

## ✅ Test 4: Actualizar Candidato

```javascript
const testUpdateCandidate = async (id) => {
  const response = await apiClient.updateCandidate(id, {
    status: "pending",
    proposals: "Propuestas actualizadas",
  });
  
  console.log('✅ Candidato actualizado:', response);
};

testUpdateCandidate(candidateId);
```

---

## ✅ Test 5: Eliminar Candidato

```javascript
const testDeleteCandidate = async (id) => {
  const response = await apiClient.deleteCandidate(id);
  console.log('✅ Candidato eliminado:', response);
};

// testDeleteCandidate(candidateId);
```

---

## ✅ Test 6: Crear Noticia

```javascript
const testCreateNews = async () => {
  const response = await apiClient.createNews({
    title: "Noticia de Prueba",
    category: "Oficial",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400",
    excerpt: "Este es un resumen de la noticia de prueba",
    content: "Contenido completo de la noticia de prueba...",
    date: new Date().toISOString(),
    author: "Admin Test",
    status: "published",
  });
  
  console.log('✅ Noticia creada:', response);
  return response.data?.id;
};

const newsId = await testCreateNews();
```

---

## ✅ Test 7: Crear Evento

```javascript
const testCreateEvent = async () => {
  const response = await apiClient.createEvent({
    title: "Evento de Prueba",
    date: "2026-05-15",
    time: "10:00",
    location: "Lima, Perú",
    description: "Descripción del evento de prueba",
    category: "electoral",
    participants: 1000,
    status: "upcoming",
  });
  
  console.log('✅ Evento creado:', response);
  return response.data?.id;
};

const eventId = await testCreateEvent();
```

---

## ✅ Test 8: Enviar Notificación

```javascript
const testSendNotification = async () => {
  const response = await apiClient.sendNotification({
    title: "Notificación de Prueba",
    message: "Este es un mensaje de prueba",
    type: "update",
    target: "all",
    recipients: 45231,
  });
  
  console.log('✅ Notificación enviada:', response);
};

testSendNotification();
```

---

## ✅ Test 9: Estadísticas

```javascript
const testGetStats = async () => {
  const response = await apiClient.getDashboardStats();
  console.log('✅ Estadísticas:', response);
  console.log('📊 Candidatos:', response.data?.totalCandidates);
  console.log('📰 Noticias:', response.data?.totalNews);
  console.log('📅 Eventos:', response.data?.totalEvents);
};

testGetStats();
```

---

## ✅ Test 10: Consulta RENIEC

```javascript
const testReniec = async () => {
  const response = await apiClient.consultReniec("12345678");
  console.log('✅ Consulta RENIEC:', response);
  console.log('👤 Nombre:', response.data?.nombres);
  console.log('🏠 Dirección:', response.data?.direccion);
  console.log('💾 Caché:', response.cached ? 'Sí' : 'No');
};

testReniec();
```

---

## ✅ Test 11: Hook useAdminCandidates

En un componente React:

```typescript
import { useAdminCandidates } from '../hooks/useAdminCandidates';

function TestComponent() {
  const {
    candidates,
    loading,
    error,
    createCandidate,
  } = useAdminCandidates();

  console.log('📊 Candidatos desde hook:', candidates);
  console.log('⏳ Cargando:', loading);
  console.log('❌ Error:', error);

  const testCreate = async () => {
    const result = await createCandidate({
      name: "Test desde Hook",
      party: "Partido Hook",
      shortParty: "PH",
      position: "Presidencial",
      region: "Arequipa",
      image: "",
      status: "active",
    });
    
    console.log('✅ Resultado:', result);
  };

  return (
    <div>
      <button onClick={testCreate}>Test Create</button>
      <p>Total candidatos: {candidates.length}</p>
    </div>
  );
}
```

---

## 🔄 Test Completo de CRUD

Ejecuta todos los pasos en secuencia:

```javascript
const testCRUD = async () => {
  console.log('🚀 Iniciando Test Completo de CRUD...\n');

  // 1. CREATE
  console.log('1️⃣ CREATE');
  const createResponse = await apiClient.createCandidate({
    name: "Candidato CRUD Test",
    party: "Partido CRUD",
    shortParty: "PC",
    position: "Congreso",
    region: "Lima",
    image: "",
    status: "active",
  });
  
  if (!createResponse.success) {
    console.error('❌ Error en CREATE:', createResponse.error);
    return;
  }
  
  const id = createResponse.data.id;
  console.log('✅ Candidato creado con ID:', id);
  console.log('');

  // 2. READ (todos)
  console.log('2️⃣ READ (todos)');
  const readAllResponse = await apiClient.getCandidates();
  console.log('✅ Total de candidatos:', readAllResponse.data?.length);
  console.log('');

  // 3. READ (uno)
  console.log('3️⃣ READ (uno)');
  const readOneResponse = await apiClient.getCandidate(id);
  console.log('✅ Candidato encontrado:', readOneResponse.data?.name);
  console.log('');

  // 4. UPDATE
  console.log('4️⃣ UPDATE');
  const updateResponse = await apiClient.updateCandidate(id, {
    name: "Candidato CRUD Test ACTUALIZADO",
    status: "pending",
  });
  console.log('✅ Candidato actualizado:', updateResponse.data?.name);
  console.log('✅ Nuevo estado:', updateResponse.data?.status);
  console.log('');

  // 5. DELETE
  console.log('5️⃣ DELETE');
  const deleteResponse = await apiClient.deleteCandidate(id);
  console.log('✅ Candidato eliminado:', deleteResponse.success);
  console.log('');

  // 6. Verificar eliminación
  console.log('6️⃣ Verificar eliminación');
  const verifyResponse = await apiClient.getCandidate(id);
  if (verifyResponse.success === false) {
    console.log('✅ Confirmado: Candidato ya no existe');
  }
  
  console.log('\n🎉 Test CRUD completado exitosamente!');
};

testCRUD();
```

---

## 📊 Test de Performance

```javascript
const testPerformance = async () => {
  console.log('⏱️ Test de Performance\n');

  // Crear 10 candidatos
  const startCreate = Date.now();
  const promises = Array.from({ length: 10 }, (_, i) =>
    apiClient.createCandidate({
      name: `Candidato Perf ${i + 1}`,
      party: "Partido Perf",
      shortParty: "PP",
      position: "Congreso",
      region: "Lima",
      image: "",
      status: "active",
    })
  );
  
  await Promise.all(promises);
  const createTime = Date.now() - startCreate;
  console.log(`✅ 10 candidatos creados en ${createTime}ms`);
  console.log(`📊 Promedio: ${createTime / 10}ms por candidato\n`);

  // Obtener todos
  const startRead = Date.now();
  await apiClient.getCandidates();
  const readTime = Date.now() - startRead;
  console.log(`✅ Lectura completada en ${readTime}ms\n`);

  console.log('🎉 Test de performance completado!');
};

testPerformance();
```

---

## 🔍 Test de Validación

```javascript
const testValidation = async () => {
  console.log('🔍 Test de Validación\n');

  // Test 1: DNI inválido
  console.log('1️⃣ DNI muy corto');
  const result1 = await apiClient.consultReniec("123");
  console.log(result1.success ? '❌ Debería fallar' : '✅ Validación correcta');
  console.log('');

  // Test 2: DNI válido
  console.log('2️⃣ DNI válido');
  const result2 = await apiClient.consultReniec("12345678");
  console.log(result2.success ? '✅ Consulta exitosa' : '❌ Debería funcionar');
  console.log('');

  // Test 3: Candidato sin datos requeridos
  console.log('3️⃣ Candidato sin nombre (debería funcionar con validación futura)');
  const result3 = await apiClient.createCandidate({
    name: "", // vacío
    party: "Test",
    shortParty: "T",
    position: "Congreso",
    region: "Lima",
    image: "",
    status: "active",
  });
  console.log('Resultado:', result3);
  
  console.log('\n🎉 Test de validación completado!');
};

testValidation();
```

---

## 🎯 Test Rápido Todo-en-Uno

Copia y pega esto en la consola para probar todo de una vez:

```javascript
const quickTest = async () => {
  console.log('🚀 QUICK TEST - Supabase Integration\n');
  console.log('═'.repeat(50));

  try {
    // Health
    console.log('\n1. Health Check...');
    const health = await apiClient.healthCheck();
    console.log(health.success ? '✅ Servidor OK' : '❌ Servidor Offline');

    // Candidato
    console.log('\n2. Crear Candidato...');
    const candidate = await apiClient.createCandidate({
      name: "Quick Test",
      party: "Test Party",
      shortParty: "TP",
      position: "Congreso",
      region: "Lima",
      image: "",
      status: "active",
    });
    console.log(candidate.success ? '✅ Candidato creado' : '❌ Error');

    // Noticia
    console.log('\n3. Crear Noticia...');
    const news = await apiClient.createNews({
      title: "Quick Test News",
      category: "Test",
      image: "",
      excerpt: "Test",
      content: "Test content",
      date: new Date().toISOString(),
      author: "Test",
      status: "draft",
    });
    console.log(news.success ? '✅ Noticia creada' : '❌ Error');

    // Estadísticas
    console.log('\n4. Obtener Estadísticas...');
    const stats = await apiClient.getDashboardStats();
    console.log(stats.success ? '✅ Stats obtenidas' : '❌ Error');
    if (stats.success && stats.data) {
      console.log(`   📊 ${stats.data.totalCandidates} candidatos`);
      console.log(`   📰 ${stats.data.totalNews} noticias`);
      console.log(`   📅 ${stats.data.totalEvents} eventos`);
    }

    // RENIEC
    console.log('\n5. Consulta RENIEC...');
    const reniec = await apiClient.consultReniec("12345678");
    console.log(reniec.success ? '✅ Consulta exitosa' : '❌ Error');

    console.log('\n' + '═'.repeat(50));
    console.log('🎉 QUICK TEST COMPLETADO!\n');
    
  } catch (error) {
    console.error('❌ Error en Quick Test:', error);
  }
};

quickTest();
```

---

## 📋 Checklist de Testing

Marca cada test cuando lo completes:

### Tests Básicos
- [ ] Health check funciona
- [ ] Crear candidato funciona
- [ ] Obtener candidatos funciona
- [ ] Actualizar candidato funciona
- [ ] Eliminar candidato funciona

### Tests Avanzados
- [ ] Crear noticia funciona
- [ ] Crear evento funciona
- [ ] Enviar notificación funciona
- [ ] Obtener estadísticas funciona
- [ ] Consulta RENIEC funciona

### Tests de Hooks
- [ ] useAdminCandidates funciona
- [ ] useAdminNews funciona
- [ ] useAdminEvents funciona
- [ ] useAdminStats funciona
- [ ] useNotifications funciona
- [ ] useReniec funciona

### Tests de UI
- [ ] Loading states se muestran
- [ ] Error states se muestran
- [ ] Datos se actualizan en tiempo real
- [ ] Formularios funcionan
- [ ] Eliminación con confirmación funciona

---

## 🐛 Debugging

Si algo falla, revisa:

### 1. Console del navegador
```javascript
// Activa logging detallado
localStorage.setItem('debug', 'true');
```

### 2. Network tab
- Ve a DevTools → Network
- Filtra por "Fetch/XHR"
- Revisa las peticiones a `/make-server-c94da9a3/`

### 3. Logs del servidor
- Ve a Supabase Dashboard
- Edge Functions → Logs
- Busca errores en tiempo real

### 4. Test de conectividad
```javascript
const testConnection = async () => {
  try {
    const response = await fetch(
      'https://{projectId}.supabase.co/functions/v1/make-server-c94da9a3/health',
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      }
    );
    const data = await response.json();
    console.log('Conectividad:', data);
  } catch (error) {
    console.error('Error de red:', error);
  }
};

testConnection();
```

---

## ✅ Resultado Esperado

Todos los tests deberían mostrar:

```
✅ Servidor OK
✅ Candidato creado
✅ Noticia creada
✅ Evento creado
✅ Estadísticas obtenidas
✅ Consulta RENIEC exitosa
✅ CRUD completo funcionando
✅ Hooks funcionando
✅ UI reactiva
```

---

## 🎉 ¡Todo Listo!

Si todos los tests pasan, el sistema está **100% funcional** con Supabase.

**Próximo paso**: Integrar los hooks en los componentes admin.

Consulta `INTEGRATION_EXAMPLES.md` para ver cómo hacerlo.

---

**Versión**: 1.0.0  
**Fecha**: Noviembre 2026  
**Estado**: ✅ Ready to Test

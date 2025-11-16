/**
 * Utilidades de desarrollo para DecidePerú 2026
 * Estas funciones son solo para desarrollo/testing
 */

import { STORAGE_KEYS } from './constants/app';

/**
 * Mock data para desarrollo
 */
export const mockData = {
  users: [
    {
      id: '1',
      email: 'admin@decideperu.pe',
      name: 'Administrador Sistema',
      dni: '12345678',
      votingStatus: 'habilitado' as const,
      isAdmin: true,
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      email: 'usuario@decideperu.pe',
      name: 'Usuario Demo',
      dni: '87654321',
      votingStatus: 'habilitado' as const,
      isAdmin: false,
      createdAt: '2024-01-15T00:00:00Z',
    },
  ],
  
  candidates: [
    {
      id: '1',
      name: 'María González',
      party: 'Partido A',
      slogan: 'Por un Perú mejor',
      category: 'presidency' as const,
      votes: 1250000,
      percentage: 35.5,
    },
    {
      id: '2',
      name: 'Carlos Ramírez',
      party: 'Partido B',
      slogan: 'Juntos por el cambio',
      category: 'presidency' as const,
      votes: 980000,
      percentage: 28.2,
    },
  ],
  
  news: [
    {
      id: '1',
      title: 'Debates presidenciales confirmados para marzo',
      summary: 'La JNE confirma las fechas oficiales de los debates',
      category: 'Debates',
      date: '2024-11-16T10:00:00Z',
      verified: true,
      source: 'ONPE',
    },
    {
      id: '2',
      title: 'Finaliza inscripción de candidatos',
      summary: '24 candidatos inscritos para elecciones 2026',
      category: 'Inscripciones',
      date: '2024-11-15T15:30:00Z',
      verified: true,
      source: 'JNE',
    },
  ],
};

/**
 * Helpers de desarrollo
 */
export const devTools = {
  /**
   * Simula login automático
   */
  autoLogin: (asAdmin: boolean = false) => {
    const user = asAdmin ? mockData.users[0] : mockData.users[1];
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
    console.log(`✅ Auto-login as ${asAdmin ? 'ADMIN' : 'USER'}:`, user);
    window.location.reload();
  },
  
  /**
   * Limpia todos los datos de localStorage
   */
  clearStorage: () => {
    localStorage.clear();
    console.log('🗑️ Storage cleared');
    window.location.reload();
  },
  
  /**
   * Activa modo oscuro
   */
  enableDarkMode: () => {
    localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    document.documentElement.classList.add('dark');
    console.log('🌙 Dark mode enabled');
  },
  
  /**
   * Activa modo claro
   */
  enableLightMode: () => {
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    document.documentElement.classList.remove('dark');
    console.log('☀️ Light mode enabled');
  },
  
  /**
   * Resetea onboarding para verlo de nuevo
   */
  resetOnboarding: () => {
    localStorage.removeItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING);
    console.log('🔄 Onboarding reset');
    window.location.reload();
  },
  
  /**
   * Muestra estado actual
   */
  showStatus: () => {
    const status = {
      authenticated: localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true',
      theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'system',
      hasSeenOnboarding: localStorage.getItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING) === 'true',
      storage: { ...localStorage },
    };
    console.table(status);
    return status;
  },
  
  /**
   * Genera datos de prueba
   */
  generateMockData: () => {
    console.log('📦 Mock data generated');
    return mockData;
  },
  
  /**
   * Simula delay de red
   */
  delay: (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms)),
  
  /**
   * Simula error de red
   */
  simulateError: () => {
    throw new Error('🔴 Simulated network error');
  },
};

/**
 * Expone devTools en window para acceso desde consola del navegador
 */
if (typeof window !== 'undefined') {
  (window as any).devTools = devTools;
  (window as any).mockData = mockData;
  
  console.log(`
    🛠️  DevTools disponibles en consola:
    
    devTools.autoLogin(true)     - Login como admin
    devTools.autoLogin(false)    - Login como usuario
    devTools.clearStorage()      - Limpiar storage
    devTools.enableDarkMode()    - Activar modo oscuro
    devTools.enableLightMode()   - Activar modo claro
    devTools.resetOnboarding()   - Resetear tutorial
    devTools.showStatus()        - Ver estado actual
    
    mockData.users              - Usuarios de prueba
    mockData.candidates         - Candidatos de prueba
    mockData.news               - Noticias de prueba
  `);
}

/**
 * Shortcuts de teclado para desarrollo
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + D = Toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        devTools.enableLightMode();
      } else {
        devTools.enableDarkMode();
      }
    }
    
    // Ctrl/Cmd + Shift + L = Auto login
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
      e.preventDefault();
      devTools.autoLogin(false);
    }
    
    // Ctrl/Cmd + Shift + A = Auto login as admin
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      devTools.autoLogin(true);
    }
    
    // Ctrl/Cmd + Shift + C = Clear storage
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      if (confirm('¿Limpiar todo el storage?')) {
        devTools.clearStorage();
      }
    }
  });
  
  console.log(`
    ⌨️  Atajos de teclado:
    
    Ctrl/Cmd + Shift + D    - Toggle modo oscuro
    Ctrl/Cmd + Shift + L    - Login automático (usuario)
    Ctrl/Cmd + Shift + A    - Login automático (admin)
    Ctrl/Cmd + Shift + C    - Limpiar storage
  `);
}

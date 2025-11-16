/**
 * Constantes de la aplicación DecidePerú 2026
 */

export const APP_NAME = 'DecidePerú 2026';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Información electoral confiable para las elecciones de Perú 2026';

// Fechas importantes (mock data - actualizar con fechas reales)
export const IMPORTANT_DATES = {
  CANDIDATE_REGISTRATION_END: '2025-12-15',
  FIRST_ROUND: '2026-04-11',
  SECOND_ROUND: '2026-06-06',
  DEBATES_START: '2026-03-01',
};

// Colores temáticos peruanos (para referencia)
export const THEME_COLORS = {
  light: {
    primary: '#d62828',
    primaryLight: '#ef4444',
    primaryDark: '#991b1b',
    background: '#fafafa',
    card: '#ffffff',
    border: '#e5e7eb',
  },
  dark: {
    primary: '#ef4444',
    primaryLight: '#f87171',
    primaryDark: '#dc2626',
    background: '#0a0a0a',
    card: '#1a1a1a',
    border: '#262626',
  },
};

// Límites y configuración
export const CONFIG = {
  MAX_NEWS_PER_PAGE: 10,
  MAX_CANDIDATES_DISPLAY: 50,
  SEARCH_DEBOUNCE_MS: 300,
  NOTIFICATION_DURATION_MS: 5000,
  MAX_UPLOAD_SIZE_MB: 10,
};

// Tipos de notificación
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
  EVENT: 'event',
} as const;

// Categorías de candidatos
export const CANDIDATE_CATEGORIES = {
  PRESIDENCY: 'presidency',
  CONGRESS: 'congress',
  REGIONAL: 'regional',
} as const;

// Estados de votación
export const VOTING_STATUS = {
  ENABLED: 'habilitado',
  PENDING: 'pendiente',
  DISABLED: 'inhabilitado',
} as const;

// Roles de usuario
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu internet.',
  AUTH_ERROR: 'Error de autenticación. Por favor, inicia sesión nuevamente.',
  NOT_FOUND: 'No se encontró el recurso solicitado.',
  PERMISSION_DENIED: 'No tienes permisos para realizar esta acción.',
  GENERIC_ERROR: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '¡Bienvenido de vuelta!',
  LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
  SAVE_SUCCESS: 'Cambios guardados exitosamente',
  DELETE_SUCCESS: 'Eliminado exitosamente',
  SEND_SUCCESS: 'Enviado exitosamente',
};

// Configuración de almacenamiento local
export const STORAGE_KEYS = {
  THEME: 'theme',
  HAS_SEEN_ONBOARDING: 'hasSeenOnboarding',
  IS_AUTHENTICATED: 'isAuthenticated',
  USER_PREFERENCES: 'userPreferences',
  LAST_SYNC: 'lastSync',
};

// URLs externas (placeholder - actualizar con URLs reales)
export const EXTERNAL_LINKS = {
  TERMS_OF_SERVICE: 'https://decideperu2026.pe/terminos',
  PRIVACY_POLICY: 'https://decideperu2026.pe/privacidad',
  HELP_CENTER: 'https://decideperu2026.pe/ayuda',
  ONPE_WEBSITE: 'https://www.onpe.gob.pe',
  JNE_WEBSITE: 'https://www.jne.gob.pe',
};

// Configuración de animaciones
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

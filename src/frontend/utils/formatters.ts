/**
 * Utilidades de formateo para la aplicación DecidePerú 2026
 */

/**
 * Formatea una fecha a formato legible en español
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return d.toLocaleDateString('es-PE', options);
}

/**
 * Formatea una fecha a formato corto (DD/MM/YYYY)
 */
export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Formatea una fecha relativa (hace X días)
 */
export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Hoy';
  if (diffInDays === 1) return 'Ayer';
  if (diffInDays < 7) return `Hace ${diffInDays} días`;
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
  if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
  
  return `Hace ${Math.floor(diffInDays / 365)} años`;
}

/**
 * Calcula días restantes hasta una fecha
 */
export function daysUntil(date: string | Date): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = d.getTime() - now.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

/**
 * Formatea un número con separadores de miles
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('es-PE');
}

/**
 * Formatea un porcentaje
 */
export function formatPercentage(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`;
}

/**
 * Trunca un texto con ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Capitaliza la primera letra de un string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitaliza la primera letra de cada palabra
 */
export function capitalizeWords(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Formatea un DNI peruano (8 dígitos)
 */
export function formatDNI(dni: string): string {
  const cleaned = dni.replace(/\D/g, '');
  if (cleaned.length !== 8) return dni;
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
}

/**
 * Valida un DNI peruano
 */
export function isValidDNI(dni: string): boolean {
  const cleaned = dni.replace(/\D/g, '');
  return cleaned.length === 8 && /^\d+$/.test(cleaned);
}

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formatea un tamaño de archivo en bytes a formato legible
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Genera iniciales de un nombre completo
 */
export function getInitials(name: string): string {
  if (!name) return '';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Extrae el color de una categoría de candidato
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    presidency: 'text-primary bg-primary/10',
    congress: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30',
    regional: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30',
  };
  
  return colors[category] || 'text-muted-foreground bg-muted';
}

/**
 * Extrae el color de un estado de votación
 */
export function getVotingStatusColor(status: string): string {
  const colors: Record<string, string> = {
    habilitado: 'text-success bg-success/10',
    pendiente: 'text-warning bg-warning/10',
    inhabilitado: 'text-destructive bg-destructive/10',
  };
  
  return colors[status] || 'text-muted-foreground bg-muted';
}

/**
 * Convierte un slug a texto legible
 */
export function slugToText(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Convierte texto a slug
 */
export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Genera un ID único simple
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper functions for event data enrichment

export const getFullDate = (title: string): string => {
  if (title.includes('Inscripción')) return 'Domingo 15 de Diciembre, 2025';
  if (title.includes('Primera vuelta')) return 'Domingo 11 de Abril, 2026';
  if (title.includes('Debates')) return 'Durante todo Marzo, 2026';
  return '';
};

export const getEventDescription = (title: string): string => {
  if (title.includes('Inscripción')) {
    return 'Último día para que los partidos políticos y movimientos presenten sus candidatos ante el Jurado Nacional de Elecciones. Después de esta fecha no se aceptarán más inscripciones.';
  }
  if (title.includes('Primera vuelta')) {
    return 'Elección general donde todos los ciudadanos peruanos mayores de 18 años ejercerán su derecho al voto para elegir Presidente, Vicepresidentes y Congresistas de la República.';
  }
  if (title.includes('Debates')) {
    return 'Serie de debates presidenciales organizados por el JNE donde los candidatos presentarán sus propuestas en temas como economía, salud, educación, seguridad y más.';
  }
  return '';
};

export const getEventLocation = (title: string): string | undefined => {
  if (title.includes('Inscripción')) return 'Jurado Nacional de Elecciones - Lima, Perú';
  if (title.includes('Primera vuelta')) return 'Locales de votación a nivel nacional';
  if (title.includes('Debates')) return 'Gran Teatro Nacional - Lima, Perú';
  return undefined;
};

export const getEventTime = (title: string): string | undefined => {
  if (title.includes('Inscripción')) return 'Hasta las 23:59';
  if (title.includes('Primera vuelta')) return '08:00 AM - 04:00 PM';
  if (title.includes('Debates')) return 'Por confirmar';
  return undefined;
};

export const getEventParticipants = (title: string): string | undefined => {
  if (title.includes('Inscripción')) return 'Partidos políticos y movimientos';
  if (title.includes('Primera vuelta')) return 'Todos los ciudadanos peruanos';
  if (title.includes('Debates')) return 'Candidatos presidenciales registrados';
  return undefined;
};

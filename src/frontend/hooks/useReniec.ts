import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export interface PersonData {
  dni: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  direccion: string;
  ubigeo: string;
  estadoCivil: string;
  consultedAt: string;
}

export function useReniec() {
  const [history, setHistory] = useState<PersonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getReniecHistory();
      if (response.success && response.data) {
        setHistory(response.data);
      } else {
        setError(response.error || 'Failed to fetch history');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching RENIEC history:', err);
    } finally {
      setLoading(false);
    }
  };

  const consultDni = async (dni: string) => {
    if (dni.length !== 8) {
      return { success: false, error: 'El DNI debe tener 8 dígitos' };
    }

    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.consultReniec(dni);
      if (response.success && response.data) {
        // If not cached, add to history
        if (!response.cached) {
          setHistory(prev => [response.data, ...prev]);
        }
        return { success: true, data: response.data, cached: response.cached };
      } else {
        setError(response.error || 'Failed to consult DNI');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error consulting DNI:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    loading,
    error,
    consultDni,
    refreshHistory: fetchHistory,
  };
}

/**
 * useCandidates Hook
 * Gestión completa de candidatos con Supabase real-time
 */

import { useState, useEffect } from 'react';
import { candidatesService, CreateCandidateData } from '../services/candidates.service';
import { supabase } from '../lib/supabaseClient';

export function useCandidates() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar candidatos al montar
  useEffect(() => {
    loadCandidates();
    
    // Suscripción en tiempo real
    const subscription = supabase
      .channel('candidates-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'candidates',
        },
        (payload) => {
          console.log('Cambio en candidatos:', payload);
          loadCandidates();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await candidatesService.getAllActive();
      
      if (result.success) {
        setCandidates(result.data);
      } else {
        setError(result.error || 'Error al cargar candidatos');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCandidateById = async (id: string) => {
    try {
      const result = await candidatesService.getById(id);
      return result.data;
    } catch (err) {
      console.error('Error obteniendo candidato:', err);
      return null;
    }
  };

  const filterByPosition = async (position: string) => {
    try {
      setLoading(true);
      const result = await candidatesService.getByPosition(position);
      
      if (result.success) {
        setCandidates(result.data);
      }
    } catch (err) {
      console.error('Error filtrando por posición:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterByRegion = async (region: string) => {
    try {
      setLoading(true);
      const result = await candidatesService.getByRegion(region);
      
      if (result.success) {
        setCandidates(result.data);
      }
    } catch (err) {
      console.error('Error filtrando por región:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchCandidates = async (query: string) => {
    try {
      setLoading(true);
      const result = await candidatesService.search(query);
      
      if (result.success) {
        setCandidates(result.data);
      }
    } catch (err) {
      console.error('Error buscando candidatos:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    candidates,
    loading,
    error,
    loadCandidates,
    getCandidateById,
    filterByPosition,
    filterByRegion,
    searchCandidates,
  };
}

/**
 * Hook para administración de candidatos (solo admin)
 */
export function useAdminCandidates() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllCandidates();

    // Suscripción en tiempo real
    const subscription = supabase
      .channel('admin-candidates-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'candidates',
        },
        () => {
          loadAllCandidates();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadAllCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await candidatesService.getAll();
      
      if (result.success) {
        setCandidates(result.data);
      } else {
        setError(result.error || 'Error al cargar candidatos');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCandidate = async (data: CreateCandidateData) => {
    try {
      setLoading(true);
      const result = await candidatesService.create(data);
      
      if (result.success) {
        await loadAllCandidates();
      }
      
      return result;
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (id: string, data: Partial<CreateCandidateData>) => {
    try {
      setLoading(true);
      const result = await candidatesService.update(id, data);
      
      if (result.success) {
        await loadAllCandidates();
      }
      
      return result;
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id: string) => {
    try {
      setLoading(true);
      const result = await candidatesService.delete(id);
      
      if (result.success) {
        await loadAllCandidates();
      }
      
      return result;
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id: string, status: 'active' | 'pending' | 'rejected') => {
    try {
      const result = await candidatesService.changeStatus(id, status);
      
      if (result.success) {
        await loadAllCandidates();
      }
      
      return result;
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    }
  };

  const getStats = async () => {
    try {
      return await candidatesService.getStats();
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    }
  };

  return {
    candidates,
    loading,
    error,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    changeStatus,
    getStats,
    refreshCandidates: loadAllCandidates,
  };
}

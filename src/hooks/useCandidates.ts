/**
 * useCandidates Hook
 * Gestión completa de candidatos con Supabase real-time
 */

import { useState, useEffect } from 'react';
import { candidatesService, CreateCandidateData } from '../services/candidates.service';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Mock data para cuando Supabase no está configurado
const MOCK_CANDIDATES = [
  {
    id: '1',
    name: 'Ana María Torres',
    party: 'Partido Democrático Nacional',
    short_party: 'PDN',
    position: 'Presidencial',
    region: 'Lima',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    proposals: 'Educación de calidad, salud universal',
    bio: 'Economista con 15 años de experiencia',
    status: 'active',
  },
  {
    id: '2',
    name: 'Carlos Mendoza Silva',
    party: 'Alianza por el Progreso',
    short_party: 'APP',
    position: 'Congreso',
    region: 'La Libertad',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    proposals: 'Infraestructura y desarrollo regional',
    bio: 'Ingeniero civil y empresario',
    status: 'active',
  },
  {
    id: '3',
    name: 'María Elena Vega',
    party: 'Frente Renovador',
    short_party: 'FR',
    position: 'Presidencial',
    region: 'Arequipa',
    photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    proposals: 'Igualdad de género y justicia social',
    bio: 'Abogada especializada en derechos humanos',
    status: 'pending',
  },
];

export function useCandidates() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar candidatos al montar
  useEffect(() => {
    loadCandidates();
    
    // Solo suscribirse si Supabase está configurado
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

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
      
      // Si Supabase no está configurado, usar mock data
      if (!isSupabaseConfigured) {
        setCandidates(MOCK_CANDIDATES.filter(c => c.status === 'active'));
        setLoading(false);
        return;
      }

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
      if (!isSupabaseConfigured) {
        return MOCK_CANDIDATES.find(c => c.id === id);
      }
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
      
      if (!isSupabaseConfigured) {
        setCandidates(MOCK_CANDIDATES.filter(c => 
          c.position.toLowerCase() === position.toLowerCase() && c.status === 'active'
        ));
        setLoading(false);
        return;
      }

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
      
      if (!isSupabaseConfigured) {
        setCandidates(MOCK_CANDIDATES.filter(c => 
          c.region === region && c.status === 'active'
        ));
        setLoading(false);
        return;
      }

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
      
      if (!isSupabaseConfigured) {
        setCandidates(MOCK_CANDIDATES.filter(c => 
          c.name.toLowerCase().includes(query.toLowerCase()) && c.status === 'active'
        ));
        setLoading(false);
        return;
      }

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

    // Solo suscribirse si Supabase está configurado
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

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
      
      // Si Supabase no está configurado, usar mock data
      if (!isSupabaseConfigured) {
        setCandidates(MOCK_CANDIDATES);
        setLoading(false);
        return;
      }

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
      // Si Supabase no está configurado, simular creación
      if (!isSupabaseConfigured) {
        const newCandidate = {
          id: `${Date.now()}`,
          name: data.name,
          party: data.party,
          short_party: data.shortParty,
          position: data.position,
          region: data.region,
          photo_url: data.photoFile ? URL.createObjectURL(data.photoFile) : null,
          proposals: data.proposals || null,
          bio: data.bio || null,
          status: data.status || 'pending',
        };
        setCandidates(prev => [...prev, newCandidate]);
        return {
          success: true,
          data: newCandidate,
        };
      }

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
      // Si Supabase no está configurado, simular actualización
      if (!isSupabaseConfigured) {
        setCandidates(prev => prev.map(c => 
          c.id === id 
            ? { 
                ...c, 
                name: data.name || c.name,
                party: data.party || c.party,
                short_party: data.shortParty || c.short_party,
                position: data.position || c.position,
                region: data.region || c.region,
                proposals: data.proposals || c.proposals,
                bio: data.bio || c.bio,
                status: data.status || c.status,
              }
            : c
        ));
        return { success: true };
      }

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
      // Si Supabase no está configurado, simular eliminación
      if (!isSupabaseConfigured) {
        setCandidates(prev => prev.filter(c => c.id !== id));
        return { success: true };
      }

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
      // Si Supabase no está configurado, simular cambio de estado
      if (!isSupabaseConfigured) {
        setCandidates(prev => prev.map(c => 
          c.id === id ? { ...c, status } : c
        ));
        return { success: true };
      }

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
      if (!isSupabaseConfigured) {
        return {
          success: true,
          data: {
            total: candidates.length,
            active: candidates.filter(c => c.status === 'active').length,
            pending: candidates.filter(c => c.status === 'pending').length,
            rejected: candidates.filter(c => c.status === 'rejected').length,
          },
        };
      }

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
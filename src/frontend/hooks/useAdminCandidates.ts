import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  shortParty: string;
  position: string;
  region: string;
  image: string;
  proposals?: string;
  history?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  status: 'active' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export function useAdminCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getCandidates();
      if (response.success && response.data) {
        setCandidates(response.data);
      } else {
        setError(response.error || 'Failed to fetch candidates');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCandidate = async (data: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.createCandidate(data);
      if (response.success && response.data) {
        setCandidates(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Failed to create candidate');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error creating candidate:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (id: string, data: Partial<Candidate>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.updateCandidate(id, data);
      if (response.success && response.data) {
        setCandidates(prev => prev.map(c => c.id === id ? response.data : c));
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Failed to update candidate');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error updating candidate:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidate = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.deleteCandidate(id);
      if (response.success) {
        setCandidates(prev => prev.filter(c => c.id !== id));
        return { success: true };
      } else {
        setError(response.error || 'Failed to delete candidate');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error deleting candidate:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return {
    candidates,
    loading,
    error,
    fetchCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate,
  };
}

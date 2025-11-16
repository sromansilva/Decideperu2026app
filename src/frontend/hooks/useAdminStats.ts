import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export interface DashboardStats {
  totalCandidates: number;
  activeCandidates: number;
  totalNews: number;
  publishedNews: number;
  totalEvents: number;
  upcomingEvents: number;
  totalNotifications: number;
  sentNotifications: number;
}

export function useAdminStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getDashboardStats();
      if (response.success && response.data) {
        setStats(response.data);
      } else {
        setError(response.error || 'Failed to fetch stats');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats,
  };
}

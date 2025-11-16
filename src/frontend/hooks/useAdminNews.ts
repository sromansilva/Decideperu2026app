import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export interface News {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  views: number;
  status: 'published' | 'draft' | 'scheduled';
  createdAt: string;
  updatedAt: string;
}

export function useAdminNews() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getNews();
      if (response.success && response.data) {
        setNewsList(response.data);
      } else {
        setError(response.error || 'Failed to fetch news');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNews = async (data: Omit<News, 'id' | 'views' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.createNews(data);
      if (response.success && response.data) {
        setNewsList(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Failed to create news');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error creating news:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const updateNews = async (id: string, data: Partial<News>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.updateNews(id, data);
      if (response.success && response.data) {
        setNewsList(prev => prev.map(n => n.id === id ? response.data : n));
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Failed to update news');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error updating news:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.deleteNews(id);
      if (response.success) {
        setNewsList(prev => prev.filter(n => n.id !== id));
        return { success: true };
      } else {
        setError(response.error || 'Failed to delete news');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error deleting news:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    newsList,
    loading,
    error,
    fetchNews,
    createNews,
    updateNews,
    deleteNews,
  };
}

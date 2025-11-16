import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export interface AdminEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'electoral' | 'capacity' | 'deadline' | 'general';
  participants?: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export function useAdminEvents() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getEvents();
      if (response.success && response.data) {
        setEvents(response.data);
      } else {
        setError(response.error || 'Failed to fetch events');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (data: Omit<AdminEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.createEvent(data);
      if (response.success && response.data) {
        setEvents(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Failed to create event');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error creating event:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, data: Partial<AdminEvent>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.updateEvent(id, data);
      if (response.success && response.data) {
        setEvents(prev => prev.map(e => e.id === id ? response.data : e));
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Failed to update event');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error updating event:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.deleteEvent(id);
      if (response.success) {
        setEvents(prev => prev.filter(e => e.id !== id));
        return { success: true };
      } else {
        setError(response.error || 'Failed to delete event');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error deleting event:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}

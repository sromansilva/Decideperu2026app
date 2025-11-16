import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'news' | 'event' | 'reminder' | 'update';
  target: 'all' | 'specific' | 'candidate-followers';
  targetDetails?: string;
  recipients: number;
  status: 'sent' | 'scheduled' | 'draft';
  sentAt: string;
  scheduled?: boolean;
  scheduledFor?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getNotifications();
      if (response.success && response.data) {
        setNotifications(response.data);
      } else {
        setError(response.error || 'Failed to fetch notifications');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = async (data: Omit<Notification, 'id' | 'status' | 'sentAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.sendNotification(data);
      if (response.success && response.data) {
        setNotifications(prev => [response.data, ...prev]);
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Failed to send notification');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error sending notification:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    sendNotification,
  };
}

import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c94da9a3`;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  cached?: boolean;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          ...options?.headers,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error(`API Error (${endpoint}):`, data);
        return { success: false, error: data.error || 'Request failed' };
      }

      return data;
    } catch (error) {
      console.error(`Network Error (${endpoint}):`, error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  // ============================================
  // CANDIDATES
  // ============================================
  async getCandidates() {
    return this.request<any[]>('/candidates');
  }

  async getCandidate(id: string) {
    return this.request<any>(`/candidates/${id}`);
  }

  async createCandidate(data: any) {
    return this.request<any>('/candidates', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCandidate(id: string, data: any) {
    return this.request<any>(`/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCandidate(id: string) {
    return this.request<any>(`/candidates/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // NEWS
  // ============================================
  async getNews() {
    return this.request<any[]>('/news');
  }

  async getSingleNews(id: string) {
    return this.request<any>(`/news/${id}`);
  }

  async createNews(data: any) {
    return this.request<any>('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateNews(id: string, data: any) {
    return this.request<any>(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteNews(id: string) {
    return this.request<any>(`/news/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // EVENTS
  // ============================================
  async getEvents() {
    return this.request<any[]>('/events');
  }

  async getEvent(id: string) {
    return this.request<any>(`/events/${id}`);
  }

  async createEvent(data: any) {
    return this.request<any>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(id: string, data: any) {
    return this.request<any>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: string) {
    return this.request<any>(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================
  // NOTIFICATIONS
  // ============================================
  async getNotifications() {
    return this.request<any[]>('/notifications');
  }

  async sendNotification(data: any) {
    return this.request<any>('/notifications/send', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ============================================
  // STATISTICS
  // ============================================
  async getDashboardStats() {
    return this.request<any>('/stats/dashboard');
  }

  // ============================================
  // RENIEC
  // ============================================
  async consultReniec(dni: string) {
    return this.request<any>('/reniec/consult', {
      method: 'POST',
      body: JSON.stringify({ dni }),
    });
  }

  async getReniecHistory() {
    return this.request<any[]>('/reniec/history');
  }

  // ============================================
  // HEALTH CHECK
  // ============================================
  async healthCheck() {
    return this.request<{ status: string }>('/health');
  }
}

export const apiClient = new ApiClient();

import { Resume } from './resume-schema';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Resume endpoints
  async getResume(): Promise<Resume> {
    return this.request<Resume>('/api/resume');
  }

  async saveResume(resume: Resume): Promise<{ success: boolean; message: string }> {
    return this.request('/api/resume', {
      method: 'POST',
      body: JSON.stringify(resume),
    });
  }

  async deleteResume(): Promise<{ success: boolean; message: string }> {
    return this.request('/api/resume', {
      method: 'DELETE',
    });
  }

  // User endpoints
  async getUser(): Promise<{ id: string; email: string; username: string; createdAt: Date }> {
    return this.request('/api/user');
  }

  async updateUsername(username: string): Promise<{ success: boolean; username: string }> {
    return this.request('/api/user', {
      method: 'PATCH',
      body: JSON.stringify({ username }),
    });
  }

  // Public endpoints
  async getPublicResume(username: string): Promise<Resume> {
    return this.request<Resume>(`/api/public/resume/${username}`);
  }

  async checkUsernameAvailability(username: string): Promise<{ available: boolean; username: string }> {
    return this.request(`/api/username/check?username=${encodeURIComponent(username)}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string; database: string }> {
    return this.request('/api/health');
  }
}

export const apiClient = new ApiClient();
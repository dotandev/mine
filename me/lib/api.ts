const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  filters?: any;
  stats?: any;
  lastUpdated?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Portfolio endpoints
  async getAbout() {
    return this.request('/portfolio/about');
  }

  async getExperience() {
    return this.request('/portfolio/experience');
  }

  async getSkills() {
    return this.request('/portfolio/skills');
  }

  async getProjects(params?: {
    category?: string;
    search?: string;
    language?: string;
    framework?: string;
    limit?: number;
    sort?: string;
    order?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const query = searchParams.toString();
    return this.request(`/portfolio/projects${query ? `?${query}` : ''}`);
  }

  async getProject(id: string) {
    return this.request(`/portfolio/projects/${id}`);
  }

  async getHackathons(params?: {
    limit?: number;
    sort?: string;
    order?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const query = searchParams.toString();
    return this.request(`/portfolio/hackathons${query ? `?${query}` : ''}`);
  }

  async getResearch(params?: {
    category?: string;
    status?: string;
    year?: string;
    limit?: number;
    sort?: string;
    order?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const query = searchParams.toString();
    return this.request(`/portfolio/research${query ? `?${query}` : ''}`);
  }

  async getResearchPaper(id: string) {
    return this.request(`/portfolio/research/${id}`);
  }

  async getCertifications(params?: {
    issuer?: string;
    limit?: number;
    sort?: string;
    order?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const query = searchParams.toString();
    return this.request(`/portfolio/certifications${query ? `?${query}` : ''}`);
  }

  async getBlog(params?: {
    category?: string;
    tag?: string;
    status?: string;
    limit?: number;
    sort?: string;
    order?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const query = searchParams.toString();
    return this.request(`/portfolio/blog${query ? `?${query}` : ''}`);
  }

  async getBlogPost(slug: string) {
    return this.request(`/portfolio/blog/${slug}`);
  }

  async getContact() {
    return this.request('/portfolio/contact');
  }

  async getActivityStats() {
    return this.request('/portfolio/activity/stats');
  }

  async getComprehensive() {
    return this.request('/portfolio/comprehensive');
  }

  // GitHub endpoints
  async getGitHubUser() {
    return this.request('/github/user');
  }

  async getGitHubRepositories() {
    return this.request('/github/repositories');
  }

  async getGitHubContributions(year?: number) {
    return this.request(`/github/contributions${year ? `?year=${year}` : ''}`);
  }

  async getGitHubStats() {
    return this.request('/github/stats');
  }
}

export const apiClient = new ApiClient();
export default apiClient;
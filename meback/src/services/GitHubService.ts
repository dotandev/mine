import axios, { AxiosInstance } from 'axios';
import {
  GitHubUser,
  GitHubRepository,
  ContributionCalendar,
  GitHubStats,
  MonthlyContribution,
  PullRequest,
  Issue,
  LanguageStats,
  CommitActivity
} from '../types/github';

export class GitHubService {
  private restClient: AxiosInstance;
  private graphqlClient: AxiosInstance;
  private username: string;
  private hasToken: boolean;

  constructor() {
    const token = process.env.GITHUB_TOKEN;
    this.username = process.env.GITHUB_USERNAME || '';
    this.hasToken = !!token;

    if (!token) {
      console.warn('⚠️  GITHUB_TOKEN not provided. GitHub features will be disabled.');
      // Create dummy clients that will throw meaningful errors if used
      this.restClient = axios.create();
      this.graphqlClient = axios.create();
      return;
    }

    // REST API client
    this.restClient = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    // GraphQL API client
    this.graphqlClient = axios.create({
      baseURL: 'https://api.github.com/graphql',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  private checkToken(): void {
    if (!this.hasToken) {
      throw new Error('GitHub token not configured. Please set GITHUB_TOKEN environment variable.');
    }
  }

  async fetchUser(): Promise<GitHubUser> {
    this.checkToken();
    try {
      const response = await this.restClient.get(`/users/${this.username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async fetchRepositories(): Promise<GitHubRepository[]> {
    this.checkToken();
    try {
      const allRepos: GitHubRepository[] = [];
      let page = 1;
      const perPage = 100;

      while (true) {
        const response = await this.restClient.get(`/users/${this.username}/repos`, {
          params: {
            per_page: perPage,
            page,
            sort: 'updated',
            direction: 'desc'
          }
        });

        const repos = response.data;
        allRepos.push(...repos);

        if (repos.length < perPage) break;
        page++;
      }

      return allRepos;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  async fetchRepositoryLanguages(fullName: string): Promise<LanguageStats> {
    this.checkToken();
    try {
      const response = await this.restClient.get(`/repos/${fullName}/languages`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching languages for ${fullName}:`, error);
      return {};
    }
  }

  async fetchCommitActivity(fullName: string): Promise<CommitActivity[]> {
    this.checkToken();
    try {
      const response = await this.restClient.get(`/repos/${fullName}/stats/commit_activity`);
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching commit activity for ${fullName}:`, error);
      return [];
    }
  }

  async fetchContributionCalendar(year?: number): Promise<ContributionCalendar> {
    this.checkToken();
    const targetYear = year || new Date().getFullYear();
    const from = `${targetYear}-01-01T00:00:00Z`;
    const to = `${targetYear}-12-31T23:59:59Z`;

    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.graphqlClient.post('', {
        query,
        variables: {
          login: this.username,
          from,
          to
        }
      });

      return response.data.data.user.contributionsCollection.contributionCalendar;
    } catch (error) {
      console.error('Error fetching contribution calendar:', error);
      throw error;
    }
  }

  async fetchPullRequests(): Promise<PullRequest[]> {
    this.checkToken();
    const query = `
      query($login: String!, $first: Int!, $after: String) {
        user(login: $login) {
          pullRequests(first: $first, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              number
              title
              state
              createdAt
              mergedAt
              repository {
                name
                nameWithOwner
              }
            }
          }
        }
      }
    `;

    try {
      const allPRs: any[] = [];
      let hasNextPage = true;
      let after: string | null = null;

      while (hasNextPage) {
        const response: any = await this.graphqlClient.post('', {
          query,
          variables: {
            login: this.username,
            first: 100,
            after
          }
        });

        const data: any = response.data.data.user.pullRequests;
        allPRs.push(...data.nodes);

        hasNextPage = data.pageInfo.hasNextPage;
        after = data.pageInfo.endCursor;
      }

      return allPRs.map(pr => ({
        id: parseInt(pr.id.replace('PR_', '')),
        number: pr.number,
        title: pr.title,
        state: pr.state.toLowerCase(),
        created_at: pr.createdAt,
        merged_at: pr.mergedAt,
        repository: {
          name: pr.repository.name,
          full_name: pr.repository.nameWithOwner
        }
      }));
    } catch (error) {
      console.error('Error fetching pull requests:', error);
      throw error;
    }
  }

  async fetchIssues(): Promise<Issue[]> {
    this.checkToken();
    const query = `
      query($login: String!, $first: Int!, $after: String) {
        user(login: $login) {
          issues(first: $first, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              number
              title
              state
              createdAt
              closedAt
              repository {
                name
                nameWithOwner
              }
            }
          }
        }
      }
    `;

    try {
      const allIssues: any[] = [];
      let hasNextPage = true;
      let after: string | null = null;

      while (hasNextPage) {
        const response: any = await this.graphqlClient.post('', {
          query,
          variables: {
            login: this.username,
            first: 100,
            after
          }
        });

        const data: any = response.data.data.user.issues;
        allIssues.push(...data.nodes);

        hasNextPage = data.pageInfo.hasNextPage;
        after = data.pageInfo.endCursor;
      }

      return allIssues.map(issue => ({
        id: parseInt(issue.id.replace('I_', '')),
        number: issue.number,
        title: issue.title,
        state: issue.state.toLowerCase(),
        created_at: issue.createdAt,
        closed_at: issue.closedAt,
        repository: {
          name: issue.repository.name,
          full_name: issue.repository.nameWithOwner
        }
      }));
    } catch (error) {
      console.error('Error fetching issues:', error);
      throw error;
    }
  }

  async fetchTotalCommits(): Promise<number> {
    this.checkToken();
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            totalCommitContributions
          }
        }
      }
    `;

    try {
      const response = await this.graphqlClient.post('', {
        query,
        variables: { login: this.username }
      });

      return response.data.data.user.contributionsCollection.totalCommitContributions;
    } catch (error) {
      console.error('Error fetching total commits:', error);
      return 0;
    }
  }

  generateMonthlyContributions(
    contributionCalendar: ContributionCalendar,
    pullRequests: PullRequest[],
    issues: Issue[]
  ): MonthlyContribution[] {
    const monthlyData: { [key: string]: MonthlyContribution } = {};

    // Process contributions
    contributionCalendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        const date = new Date(day.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            month: monthKey,
            commits: 0,
            prs: 0,
            issues: 0
          };
        }
        
        monthlyData[monthKey].commits += day.contributionCount;
      });
    });

    // Process PRs
    pullRequests.forEach(pr => {
      const date = new Date(pr.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].prs++;
      }
    });

    // Process Issues
    issues.forEach(issue => {
      const date = new Date(issue.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].issues++;
      }
    });

    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  }
}
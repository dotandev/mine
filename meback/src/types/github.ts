export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  clone_url: string;
  language?: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  size: number;
  default_branch: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface LanguageStats {
  [language: string]: number;
}

export interface CommitActivity {
  week: number;
  total: number;
  days: number[];
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  followers: number;
  following: number;
  yearsActive: number;
  languagesUsed: string[];
  topLanguages: LanguageStats;
}

export interface MonthlyContribution {
  month: string;
  commits: number;
  prs: number;
  issues: number;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  merged_at?: string;
  repository: {
    name: string;
    full_name: string;
  };
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  closed_at?: string;
  repository: {
    name: string;
    full_name: string;
  };
}
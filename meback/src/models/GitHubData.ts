import mongoose, { Schema, Document } from 'mongoose';
import {
  GitHubUser,
  GitHubRepository,
  ContributionCalendar,
  GitHubStats,
  MonthlyContribution,
  PullRequest,
  Issue,
  LanguageStats
} from '../types/github';

// User Profile Schema
export interface IGitHubUser extends Omit<GitHubUser, 'id'>, Document {
  github_id: number;
  lastUpdated: Date;
}

const GitHubUserSchema = new Schema<IGitHubUser>({
  login: { type: String, required: true, unique: true },
  github_id: { type: Number, required: true },
  avatar_url: { type: String, required: true },
  name: { type: String, required: true },
  company: String,
  blog: String,
  location: String,
  email: String,
  bio: String,
  public_repos: { type: Number, required: true },
  public_gists: { type: Number, required: true },
  followers: { type: Number, required: true },
  following: { type: Number, required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

// Repository Schema
export interface IGitHubRepository extends Omit<GitHubRepository, 'id'>, Document {
  github_id: number;
  lastUpdated: Date;
  languageStats?: LanguageStats;
  commitCount?: number;
}

const GitHubRepositorySchema = new Schema<IGitHubRepository>({
  github_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  full_name: { type: String, required: true },
  description: String,
  html_url: { type: String, required: true },
  clone_url: { type: String, required: true },
  language: String,
  stargazers_count: { type: Number, default: 0 },
  watchers_count: { type: Number, default: 0 },
  forks_count: { type: Number, default: 0 },
  size: { type: Number, default: 0 },
  default_branch: { type: String, default: 'main' },
  topics: [String],
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
  pushed_at: { type: String, required: true },
  private: { type: Boolean, default: false },
  fork: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now },
  languageStats: { type: Map, of: Number },
  commitCount: Number
});

// Contributions Schema
export interface IContributionData extends Document {
  username: string;
  year: number;
  contributionCalendar: ContributionCalendar;
  monthlyContributions: MonthlyContribution[];
  lastUpdated: Date;
}

const ContributionDataSchema = new Schema<IContributionData>({
  username: { type: String, required: true },
  year: { type: Number, required: true },
  contributionCalendar: {
    totalContributions: { type: Number, required: true },
    weeks: [{
      contributionDays: [{
        date: { type: String, required: true },
        contributionCount: { type: Number, required: true },
        color: { type: String, required: true }
      }]
    }]
  },
  monthlyContributions: [{
    month: { type: String, required: true },
    commits: { type: Number, default: 0 },
    prs: { type: Number, default: 0 },
    issues: { type: Number, default: 0 }
  }],
  lastUpdated: { type: Date, default: Date.now }
});

ContributionDataSchema.index({ username: 1, year: 1 }, { unique: true });

// Pull Requests Schema
export interface IPullRequest extends Omit<PullRequest, 'id'>, Document {
  github_id: number;
  username: string;
  lastUpdated: Date;
}

const PullRequestSchema = new Schema<IPullRequest>({
  github_id: { type: Number, required: true, unique: true },
  number: { type: Number, required: true },
  title: { type: String, required: true },
  state: { type: String, required: true },
  created_at: { type: String, required: true },
  merged_at: String,
  repository: {
    name: { type: String, required: true },
    full_name: { type: String, required: true }
  },
  username: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

// Issues Schema
export interface IIssue extends Omit<Issue, 'id'>, Document {
  github_id: number;
  username: string;
  lastUpdated: Date;
}

const IssueSchema = new Schema<IIssue>({
  github_id: { type: Number, required: true, unique: true },
  number: { type: Number, required: true },
  title: { type: String, required: true },
  state: { type: String, required: true },
  created_at: { type: String, required: true },
  closed_at: String,
  repository: {
    name: { type: String, required: true },
    full_name: { type: String, required: true }
  },
  username: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

// GitHub Stats Schema
export interface IGitHubStats extends GitHubStats, Document {
  username: string;
  lastUpdated: Date;
}

const GitHubStatsSchema = new Schema<IGitHubStats>({
  username: { type: String, required: true, unique: true },
  totalRepos: { type: Number, required: true },
  totalStars: { type: Number, required: true },
  totalForks: { type: Number, required: true },
  totalCommits: { type: Number, required: true },
  followers: { type: Number, required: true },
  following: { type: Number, required: true },
  yearsActive: { type: Number, required: true },
  languagesUsed: [String],
  topLanguages: { type: Map, of: Number },
  lastUpdated: { type: Date, default: Date.now }
});

export const GitHubUserModel = mongoose.model<IGitHubUser>('GitHubUser', GitHubUserSchema);
export const GitHubRepositoryModel = mongoose.model<IGitHubRepository>('GitHubRepository', GitHubRepositorySchema);
export const ContributionDataModel = mongoose.model<IContributionData>('ContributionData', ContributionDataSchema);
export const PullRequestModel = mongoose.model<IPullRequest>('PullRequest', PullRequestSchema);
export const IssueModel = mongoose.model<IIssue>('Issue', IssueSchema);
export const GitHubStatsModel = mongoose.model<IGitHubStats>('GitHubStats', GitHubStatsSchema);
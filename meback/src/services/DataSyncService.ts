import { GitHubService } from './GitHubService';
import { PortfolioDataService } from './PortfolioDataService';
import {
  GitHubUserModel,
  GitHubRepositoryModel,
  ContributionDataModel,
  PullRequestModel,
  IssueModel,
  GitHubStatsModel
} from '../models/GitHubData';
import { GitHubStats, LanguageStats } from '../types/github';

export class DataSyncService {
  private githubService: GitHubService;
  private portfolioDataService: PortfolioDataService;
  private hasGitHubToken: boolean;

  constructor() {
    this.hasGitHubToken = !!process.env.GITHUB_TOKEN;
    this.githubService = new GitHubService();
    this.portfolioDataService = new PortfolioDataService();
  }

  async syncAllData(): Promise<void> {
    if (!this.hasGitHubToken) {
      console.log('⚠️  GitHub token not configured. Skipping GitHub data sync.');
      return;
    }

    console.log('🔄 Starting GitHub data sync...');
    
    try {
      await Promise.all([
        this.syncUserProfile(),
        this.syncRepositories(),
        this.syncContributions(),
        this.syncPullRequests(),
        this.syncIssues()
      ]);

      await this.calculateAndSaveStats();
      
      // Update portfolio activity stats with GitHub contributions
      const contributionData = await ContributionDataModel.findOne({ 
        username: process.env.GITHUB_USERNAME, 
        year: new Date().getFullYear() 
      });
      
      if (contributionData) {
        await this.portfolioDataService.updateActivityStats(
          contributionData.contributionCalendar.totalContributions
        );
      }
      
      console.log('✅ GitHub data sync completed successfully');
    } catch (error) {
      console.error('❌ Error during data sync:', error);
      throw error;
    }
  }

  async syncUserProfile(): Promise<void> {
    try {
      console.log('📊 Syncing user profile...');
      const userData = await this.githubService.fetchUser();
      
      await GitHubUserModel.findOneAndUpdate(
        { login: userData.login },
        { ...userData, github_id: userData.id, lastUpdated: new Date() },
        { upsert: true, new: true }
      );
      
      console.log('✅ User profile synced');
    } catch (error) {
      console.error('❌ Error syncing user profile:', error);
      throw error;
    }
  }

  async syncRepositories(): Promise<void> {
    try {
      console.log('📚 Syncing repositories...');
      const repositories = await this.githubService.fetchRepositories();
      
      for (const repo of repositories) {
        // Fetch language stats for each repository
        const languageStats = await this.githubService.fetchRepositoryLanguages(repo.full_name);
        
        // Fetch commit activity to get commit count
        const commitActivity = await this.githubService.fetchCommitActivity(repo.full_name);
        const commitCount = Array.isArray(commitActivity) ? 
          commitActivity.reduce((total, week) => total + week.total, 0) : 0;
        
        await GitHubRepositoryModel.findOneAndUpdate(
          { github_id: repo.id },
          {
            ...repo,
            github_id: repo.id,
            languageStats: languageStats || {},
            commitCount,
            lastUpdated: new Date()
          },
          { upsert: true, new: true }
        );
      }
      
      console.log(`✅ ${repositories.length} repositories synced`);
    } catch (error) {
      console.error('❌ Error syncing repositories:', error);
      throw error;
    }
  }

  async syncContributions(): Promise<void> {
    try {
      console.log('📈 Syncing contributions...');
      const currentYear = new Date().getFullYear();
      const years = [currentYear, currentYear - 1]; // Current and previous year
      
      for (const year of years) {
        const contributionCalendar = await this.githubService.fetchContributionCalendar(year);
        
        // Fetch PRs and Issues for monthly calculations
        const pullRequests = await this.githubService.fetchPullRequests();
        const issues = await this.githubService.fetchIssues();
        
        // Filter PRs and Issues for the specific year
        const yearPRs = pullRequests.filter(pr => 
          new Date(pr.created_at).getFullYear() === year
        );
        const yearIssues = issues.filter(issue => 
          new Date(issue.created_at).getFullYear() === year
        );
        
        const monthlyContributions = this.githubService.generateMonthlyContributions(
          contributionCalendar,
          yearPRs,
          yearIssues
        );
        
        await ContributionDataModel.findOneAndUpdate(
          { username: process.env.GITHUB_USERNAME, year },
          {
            username: process.env.GITHUB_USERNAME,
            year,
            contributionCalendar,
            monthlyContributions,
            lastUpdated: new Date()
          },
          { upsert: true, new: true }
        );
      }
      
      console.log(`✅ Contributions synced for ${years.length} years`);
    } catch (error) {
      console.error('❌ Error syncing contributions:', error);
      throw error;
    }
  }

  async syncPullRequests(): Promise<void> {
    try {
      console.log('🔀 Syncing pull requests...');
      const pullRequests = await this.githubService.fetchPullRequests();
      
      for (const pr of pullRequests) {
        await PullRequestModel.findOneAndUpdate(
          { github_id: pr.id },
          {
            ...pr,
            github_id: pr.id,
            username: process.env.GITHUB_USERNAME,
            lastUpdated: new Date()
          },
          { upsert: true, new: true }
        );
      }
      
      console.log(`✅ ${pullRequests.length} pull requests synced`);
    } catch (error) {
      console.error('❌ Error syncing pull requests:', error);
      throw error;
    }
  }

  async syncIssues(): Promise<void> {
    try {
      console.log('🐛 Syncing issues...');
      const issues = await this.githubService.fetchIssues();
      
      for (const issue of issues) {
        await IssueModel.findOneAndUpdate(
          { github_id: issue.id },
          {
            ...issue,
            github_id: issue.id,
            username: process.env.GITHUB_USERNAME,
            lastUpdated: new Date()
          },
          { upsert: true, new: true }
        );
      }
      
      console.log(`✅ ${issues.length} issues synced`);
    } catch (error) {
      console.error('❌ Error syncing issues:', error);
      throw error;
    }
  }

  async calculateAndSaveStats(): Promise<void> {
    try {
      console.log('📊 Calculating GitHub stats...');
      
      const user = await GitHubUserModel.findOne({ login: process.env.GITHUB_USERNAME });
      const repositories = await GitHubRepositoryModel.find({});
      const totalCommits = await this.githubService.fetchTotalCommits();
      
      if (!user) {
        throw new Error('User data not found');
      }

      // Calculate aggregated stats
      const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
      
      // Calculate years active
      const accountCreated = new Date(user.created_at);
      const yearsActive = new Date().getFullYear() - accountCreated.getFullYear();
      
      // Calculate language statistics
      const languageStats: LanguageStats = {};
      const languagesUsed: string[] = [];
      
      repositories.forEach(repo => {
        if (repo.languageStats) {
          Object.entries((repo.languageStats as any)?.toObject() || {}).forEach(([lang, bytes]) => {
            languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
            if (!languagesUsed.includes(lang)) {
              languagesUsed.push(lang);
            }
          });
        }
      });

      const stats: GitHubStats = {
        totalRepos: repositories.length,
        totalStars,
        totalForks,
        totalCommits,
        followers: user.followers,
        following: user.following,
        yearsActive,
        languagesUsed,
        topLanguages: languageStats
      };

      await GitHubStatsModel.findOneAndUpdate(
        { username: process.env.GITHUB_USERNAME },
        {
          ...stats,
          username: process.env.GITHUB_USERNAME,
          lastUpdated: new Date()
        },
        { upsert: true, new: true }
      );
      
      console.log('✅ GitHub stats calculated and saved');
    } catch (error) {
      console.error('❌ Error calculating stats:', error);
      throw error;
    }
  }

  async getLastSyncTime(): Promise<Date | null> {
    try {
      const user = await GitHubUserModel.findOne({ login: process.env.GITHUB_USERNAME });
      return user?.lastUpdated || null;
    } catch (error) {
      console.error('Error getting last sync time:', error);
      return null;
    }
  }

  async isDataStale(maxAgeHours: number = 6): Promise<boolean> {
    const lastSync = await this.getLastSyncTime();
    if (!lastSync) return true;
    
    const maxAge = maxAgeHours * 60 * 60 * 1000; // Convert to milliseconds
    return Date.now() - lastSync.getTime() > maxAge;
  }
}
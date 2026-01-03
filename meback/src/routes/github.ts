import { Router, Request, Response, NextFunction } from 'express';
import {
  GitHubUserModel,
  GitHubRepositoryModel,
  ContributionDataModel,
  PullRequestModel,
  IssueModel,
  GitHubStatsModel
} from '../models/GitHubData';
import { DataSyncService } from '../services/DataSyncService';

const router = Router();
const dataSyncService = new DataSyncService();

// Helper function to check if GitHub features are available
const checkGitHubAvailable = () => {
  return !!process.env.GITHUB_TOKEN;
};

// Middleware to check GitHub availability for sync endpoints
const requireGitHub = (req: Request, res: Response, next: NextFunction) => {
  if (!checkGitHubAvailable()) {
    return res.status(503).json({ 
      error: 'GitHub features are not available. Please configure GITHUB_TOKEN environment variable.' 
    });
  }
  next();
};

// Get user profile
router.get('/user', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await GitHubUserModel.findOne({ login: process.env.GITHUB_USERNAME });
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      success: true,
      data: user,
      lastUpdated: user.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get repositories with optional filtering and sorting
router.get('/repositories', async (req: Request, res: Response) => {
  try {
    const {
      limit = 100,
      sort = 'stargazers_count',
      order = 'desc',
      language,
      includePrivate = 'false'
    } = req.query;

    const query: any = {};
    
    if (includePrivate === 'false') {
      query.private = false;
    }
    
    if (language) {
      query.language = language;
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort as string] = sortOrder;

    const repositories = await GitHubRepositoryModel
      .find(query)
      .sort(sortObj)
      .limit(Number(limit));

    res.json({
      success: true,
      data: repositories,
      count: repositories.length
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get contribution calendar for a specific year
router.get('/contributions/:year?', async (req: Request, res: Response): Promise<void> => {
  try {
    const year = req.params.year ? parseInt(req.params.year) : new Date().getFullYear();
    
    const contributionData = await ContributionDataModel.findOne({
      username: process.env.GITHUB_USERNAME,
      year
    });

    if (!contributionData) {
      res.status(404).json({ error: 'Contribution data not found for the specified year' });
      return;
    }

    res.json({
      success: true,
      data: contributionData,
      year
    });
  } catch (error) {
    console.error('Error fetching contributions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get monthly contribution summary
router.get('/contributions/monthly/:year?', async (req: Request, res: Response): Promise<void> => {
  try {
    const year = req.params.year ? parseInt(req.params.year) : new Date().getFullYear();
    
    const contributionData = await ContributionDataModel.findOne({
      username: process.env.GITHUB_USERNAME,
      year
    });

    if (!contributionData) {
      res.status(404).json({ error: 'Contribution data not found for the specified year' });
      return;
    }

    res.json({
      success: true,
      data: contributionData.monthlyContributions,
      year
    });
  } catch (error) {
    console.error('Error fetching monthly contributions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get pull requests
router.get('/pull-requests', async (req: Request, res: Response) => {
  try {
    const {
      limit = 100,
      state,
      sort = 'created_at',
      order = 'desc'
    } = req.query;

    const query: any = { username: process.env.GITHUB_USERNAME };
    
    if (state) {
      query.state = state;
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort as string] = sortOrder;

    const pullRequests = await PullRequestModel
      .find(query)
      .sort(sortObj)
      .limit(Number(limit));

    res.json({
      success: true,
      data: pullRequests,
      count: pullRequests.length
    });
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get issues
router.get('/issues', async (req: Request, res: Response) => {
  try {
    const {
      limit = 100,
      state,
      sort = 'created_at',
      order = 'desc'
    } = req.query;

    const query: any = { username: process.env.GITHUB_USERNAME };
    
    if (state) {
      query.state = state;
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort as string] = sortOrder;

    const issues = await IssueModel
      .find(query)
      .sort(sortObj)
      .limit(Number(limit));

    res.json({
      success: true,
      data: issues,
      count: issues.length
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get GitHub stats
router.get('/stats', async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await GitHubStatsModel.findOne({ username: process.env.GITHUB_USERNAME });
    
    if (!stats) {
      res.status(404).json({ error: 'Stats not found' });
      return;
    }

    res.json({
      success: true,
      data: stats,
      lastUpdated: stats.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get language statistics
router.get('/languages', async (req: Request, res: Response) => {
  try {
    const repositories = await GitHubRepositoryModel.find({ private: false });
    
    const languageStats: { [key: string]: number } = {};
    const languageRepos: { [key: string]: number } = {};
    
    repositories.forEach(repo => {
      if (repo.languageStats) {
        Object.entries((repo.languageStats as any)?.toObject() || {}).forEach(([lang, bytes]) => {
          languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
          languageRepos[lang] = (languageRepos[lang] || 0) + 1;
        });
      }
    });

    // Calculate percentages
    const totalBytes = Object.values(languageStats).reduce((a, b) => a + b, 0);
    const languageData = Object.entries(languageStats).map(([language, bytes]) => ({
      language,
      bytes,
      percentage: (bytes / totalBytes) * 100,
      repositories: languageRepos[language]
    })).sort((a, b) => b.bytes - a.bytes);

    res.json({
      success: true,
      data: languageData,
      totalBytes,
      totalLanguages: languageData.length
    });
  } catch (error) {
    console.error('Error fetching language stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Force sync data (admin endpoint)
router.post('/sync', requireGitHub, async (req: Request, res: Response): Promise<void> => {
  try {
    await dataSyncService.syncAllData();
    
    res.json({
      success: true,
      message: 'Data sync completed successfully',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error during manual sync:', error);
    res.status(500).json({ error: 'Sync failed' });
  }
});

// Get sync status
router.get('/sync/status', async (req: Request, res: Response) => {
  try {
    const lastSync = await dataSyncService.getLastSyncTime();
    const isStale = await dataSyncService.isDataStale();
    
    res.json({
      success: true,
      data: {
        lastSync,
        isStale,
        nextSyncDue: isStale ? 'Now' : 'Within 6 hours'
      }
    });
  } catch (error) {
    console.error('Error fetching sync status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get comprehensive data for contributions page
router.get('/contributions/comprehensive/:year?', async (req: Request, res: Response): Promise<void> => {
  try {
    const year = req.params.year ? parseInt(req.params.year) : new Date().getFullYear();
    
    // Fetch all related data
    const [contributionData, pullRequests, issues, repositories, stats] = await Promise.all([
      ContributionDataModel.findOne({ username: process.env.GITHUB_USERNAME, year }),
      PullRequestModel.find({ 
        username: process.env.GITHUB_USERNAME,
        created_at: { $regex: `^${year}` }
      }).sort({ created_at: -1 }),
      IssueModel.find({ 
        username: process.env.GITHUB_USERNAME,
        created_at: { $regex: `^${year}` }
      }).sort({ created_at: -1 }),
      GitHubRepositoryModel.find({ private: false }).sort({ stargazers_count: -1 }).limit(10),
      GitHubStatsModel.findOne({ username: process.env.GITHUB_USERNAME })
    ]);

    if (!contributionData) {
      res.status(404).json({ error: 'Contribution data not found for the specified year' });
      return;
    }

    // Calculate language stats for the year
    const languageStats: { [key: string]: number } = {};
    repositories.forEach(repo => {
      if (repo.languageStats) {
        Object.entries((repo.languageStats as any)?.toObject() || {}).forEach(([lang, bytes]) => {
          languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
        });
      }
    });

    const totalBytes = Object.values(languageStats).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(languageStats)
      .map(([language, bytes]) => ({
        language,
        percentage: (bytes / totalBytes) * 100,
        bytes
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 10);

    res.json({
      success: true,
      data: {
        year,
        contributionCalendar: contributionData.contributionCalendar,
        monthlyContributions: contributionData.monthlyContributions,
        pullRequests: pullRequests.slice(0, 20), // Latest 20 PRs
        issues: issues.slice(0, 20), // Latest 20 issues
        topRepositories: repositories,
        topLanguages,
        stats: stats ? {
          totalContributions: contributionData.contributionCalendar.totalContributions,
          totalPRs: pullRequests.length,
          totalIssues: issues.length,
          totalRepos: stats.totalRepos,
          totalStars: stats.totalStars
        } : null
      },
      lastUpdated: contributionData.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching comprehensive contribution data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
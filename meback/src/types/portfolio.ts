// Portfolio-wide types for all sections

export interface Experience {
  experience_id: string;
  type: 'company' | 'break';
  company?: string;
  location?: string;
  duration?: string;
  description?: string;
  roles?: Role[];
  lastUpdated: Date;
}

export interface Role {
  title: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
  lastUpdated: Date;
}

export interface Project {
  project_id: string;
  searchName: string;
  name: string;
  category: string;
  description: string;
  image: string;
  languages: string[];
  technologies: string[];
  tags: string[];
  date: string;
  framework: string;
  industry: string;
  tasks: string[];
  requirements: string[];
  details: string;
  github: string;
  demo?: string;
  links: {
    github?: string;
    demo?: string;
    case_study?: string;
    devpost?: string;
  };
  status?: string;
  team?: string;
  year?: string;
  lastUpdated: Date;
}

export interface HackathonProject {
  hackathon_id: string;
  title: string;
  hackathon: string;
  duration: string;
  team: string;
  placement: string;
  prize: string;
  description: string;
  technologies: string[];
  image: string;
  links: {
    github?: string;
    demo?: string;
    devpost?: string;
  };
  date: string;
  lastUpdated: Date;
}

export interface ResearchPaper {
  paper_id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  status: 'Published' | 'Under Review' | 'In Progress';
  category: string;
  abstract: string;
  citations: number;
  impact_factor: number;
  links: {
    pdf?: string;
    arxiv?: string;
    doi?: string;
    code?: string;
    preprint?: string;
  };
  keywords: string[];
  date: string;
  lastUpdated: Date;
}

export interface Certification {
  cert_id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
  logo: string;
  description?: string;
  skills?: string[];
  verification_id?: string;
  lastUpdated: Date;
}

export interface BlogPost {
  blog_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published_date: string;
  updated_date?: string;
  tags: string[];
  category: string;
  featured_image?: string;
  reading_time: number;
  status: 'published' | 'draft' | 'archived';
  views: number;
  likes: number;
  lastUpdated: Date;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  social_links: {
    github: string;
    linkedin: string;
    twitter?: string;
    website?: string;
  };
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message?: string;
  };
  lastUpdated: Date;
}

export interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar: string;
  resume_url?: string;
  interests: string[];
  languages: string[];
  fun_facts: string[];
  current_focus: string[];
  lastUpdated: Date;
}

export interface ActivityStats {
  total_projects: number;
  total_contributions: number;
  years_experience: number;
  technologies_used: number;
  hackathons_won: number;
  research_papers: number;
  lastUpdated: Date;
}

// GitHub Types
export interface GitHubUser {
  login: string;
  github_id: number;
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
  lastUpdated: Date;
}

export interface GitHubRepository {
  github_id: number;
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
  lastUpdated: Date;
  languageStats?: Record<string, number>;
  commitCount?: number;
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

export interface MonthlyContribution {
  month: string;
  commits: number;
  prs: number;
  issues: number;
}

export interface ContributionData {
  username: string;
  year: number;
  contributionCalendar: ContributionCalendar;
  monthlyContributions: MonthlyContribution[];
  lastUpdated: Date;
}

export interface PullRequest {
  github_id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  merged_at?: string;
  repository: {
    name: string;
    full_name: string;
  };
  username: string;
  lastUpdated: Date;
}

export interface Issue {
  github_id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  closed_at?: string;
  repository: {
    name: string;
    full_name: string;
  };
  username: string;
  lastUpdated: Date;
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
  topLanguages: Record<string, number>;
  username: string;
  lastUpdated: Date;
}

// Comprehensive data for homepage
export interface ComprehensiveData {
  about: AboutInfo;
  recentProjects: Project[];
  topSkills: Skill[];
  recentExperience: Experience[];
  stats: ActivityStats;
  recentPapers: ResearchPaper[];
  recentPosts: BlogPost[];
}
import mongoose, { Schema, Document } from 'mongoose';
import {
  Experience,
  Role,
  Skill,
  Project,
  HackathonProject,
  ResearchPaper,
  Certification,
  BlogPost,
  ContactInfo,
  AboutInfo,
  ActivityStats
} from '../types/portfolio';

// Experience Schema
export interface IExperience extends Omit<Experience, 'id'>, Document {
  experience_id: string;
  lastUpdated: Date;
}

const RoleSchema = new Schema<Role>({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  achievements: [String],
  technologies: [String]
});

const ExperienceSchema = new Schema<IExperience>({
  experience_id: { type: String, required: true, unique: true },
  type: { type: String, enum: ['company', 'break'], required: true },
  company: String,
  location: String,
  duration: String,
  description: String,
  roles: [RoleSchema],
  lastUpdated: { type: Date, default: Date.now }
});

// Skills Schema
export interface ISkill extends Skill, Document {
  lastUpdated: Date;
}

const SkillSchema = new Schema<ISkill>({
  category: { type: String, required: true, unique: true },
  items: [String],
  lastUpdated: { type: Date, default: Date.now }
});

// Projects Schema
export interface IProject extends Omit<Project, 'id'>, Document {
  project_id: string;
  long_description?: string;
  timeline?: { date: string; title: string; description: string }[];
  images?: string[];
  lastUpdated: Date;
}

const ProjectSchema = new Schema<IProject>({
  project_id: { type: String, required: true, unique: true },
  searchName: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  languages: [String],
  technologies: [String],
  tags: [String],
  date: { type: String, required: true },
  framework: { type: String, required: true },
  industry: { type: String, required: true },
  tasks: [String],
  requirements: [String],
  details: { type: String, required: true },
  github: { type: String, required: true },
  demo: String,
  links: {
    github: String,
    demo: String,
    case_study: String,
    devpost: String
  },
  status: String,
  team: String,
  year: String,
  long_description: String,
  timeline: [{
    date: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  images: [String],
  lastUpdated: { type: Date, default: Date.now }
});

// Hackathon Projects Schema
export interface IHackathonProject extends Omit<HackathonProject, 'id'>, Document {
  hackathon_id: string;
  lastUpdated: Date;
}

const HackathonProjectSchema = new Schema<IHackathonProject>({
  hackathon_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  hackathon: { type: String, required: true },
  duration: { type: String, required: true },
  team: { type: String, required: true },
  placement: { type: String, required: true },
  prize: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  image: { type: String, required: true },
  links: {
    github: String,
    demo: String,
    devpost: String
  },
  date: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

// Research Papers Schema
export interface IResearchPaper extends Omit<ResearchPaper, 'id'>, Document {
  paper_id: string;
  lastUpdated: Date;
}

const ResearchPaperSchema = new Schema<IResearchPaper>({
  paper_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: [String],
  journal: { type: String, required: true },
  year: { type: String, required: true },
  status: { type: String, enum: ['Published', 'Under Review', 'In Progress'], required: true },
  category: { type: String, required: true },
  abstract: { type: String, required: true },
  citations: { type: Number, default: 0 },
  impact_factor: { type: Number, required: true },
  links: {
    pdf: String,
    arxiv: String,
    doi: String,
    code: String,
    preprint: String
  },
  keywords: [String],
  date: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

// Certifications Schema
export interface ICertification extends Omit<Certification, 'id'>, Document {
  cert_id: string;
  lastUpdated: Date;
}

const CertificationSchema = new Schema<ICertification>({
  cert_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
  logo: { type: String, required: true },
  description: String,
  skills: [String],
  verification_id: String,
  lastUpdated: { type: Date, default: Date.now }
});

// Blog Posts Schema
export interface IBlogPost extends Omit<BlogPost, 'id'>, Document {
  blog_id: string;
  lastUpdated: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  blog_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  published_date: { type: String, required: true },
  updated_date: String,
  tags: [String],
  category: { type: String, required: true },
  featured_image: String,
  reading_time: { type: Number, required: true },
  status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

// Contact Info Schema
export interface IContactInfo extends ContactInfo, Document {
  lastUpdated: Date;
}

const ContactInfoSchema = new Schema<IContactInfo>({
  email: { type: String, required: true },
  phone: String,
  location: { type: String, required: true },
  social_links: {
    github: { type: String, required: true },
    linkedin: { type: String, required: true },
    twitter: String,
    website: String
  },
  availability: {
    status: { type: String, enum: ['available', 'busy', 'unavailable'], required: true },
    message: String
  },
  lastUpdated: { type: Date, default: Date.now }
});

// About Info Schema
export interface IAboutInfo extends AboutInfo, Document {
  lastUpdated: Date;
}

const AboutInfoSchema = new Schema<IAboutInfo>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  location: { type: String, required: true },
  avatar: { type: String, required: true },
  resume_url: String,
  interests: [String],
  languages: [String],
  fun_facts: [String],
  current_focus: [String],
  lastUpdated: { type: Date, default: Date.now }
});

// Activity Stats Schema
export interface IActivityStats extends ActivityStats, Document {
  lastUpdated: Date;
}

const ActivityStatsSchema = new Schema<IActivityStats>({
  total_projects: { type: Number, required: true },
  total_contributions: { type: Number, required: true },
  years_experience: { type: Number, required: true },
  technologies_used: { type: Number, required: true },
  hackathons_won: { type: Number, required: true },
  research_papers: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

// Export models
export const ExperienceModel = mongoose.model<IExperience>('Experience', ExperienceSchema);
export const SkillModel = mongoose.model<ISkill>('Skill', SkillSchema);
export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
export const HackathonProjectModel = mongoose.model<IHackathonProject>('HackathonProject', HackathonProjectSchema);
export const ResearchPaperModel = mongoose.model<IResearchPaper>('ResearchPaper', ResearchPaperSchema);
export const CertificationModel = mongoose.model<ICertification>('Certification', CertificationSchema);
export const BlogPostModel = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
export const ContactInfoModel = mongoose.model<IContactInfo>('ContactInfo', ContactInfoSchema);
export const AboutInfoModel = mongoose.model<IAboutInfo>('AboutInfo', AboutInfoSchema);
export const ActivityStatsModel = mongoose.model<IActivityStats>('ActivityStats', ActivityStatsSchema);
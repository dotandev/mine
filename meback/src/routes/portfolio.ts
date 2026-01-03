import { Router, Request, Response } from 'express';
import {
  ExperienceModel,
  SkillModel,
  ProjectModel,
  HackathonProjectModel,
  ResearchPaperModel,
  CertificationModel,
  BlogPostModel,
  ContactInfoModel,
  AboutInfoModel,
  ActivityStatsModel
} from '../models/Portfolio';

const router = Router();

// About endpoint
router.get('/about', async (req: Request, res: Response): Promise<void> => {
  try {
    const aboutInfo = await AboutInfoModel.findOne();
    
    if (!aboutInfo) {
      res.status(404).json({ error: 'About information not found' });
      return;
    }

    res.json({
      success: true,
      data: aboutInfo,
      lastUpdated: aboutInfo.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching about info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Experience endpoint
router.get('/experience', async (req: Request, res: Response) => {
  try {
    const experiences = await ExperienceModel.find().sort({ lastUpdated: -1 });
    
    res.json({
      success: true,
      data: experiences,
      count: experiences.length
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Skills endpoint
router.get('/skills', async (req: Request, res: Response) => {
  try {
    const skills = await SkillModel.find().sort({ category: 1 });
    
    res.json({
      success: true,
      data: skills,
      count: skills.length
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Projects endpoint with filtering and search
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const {
      category,
      search,
      language,
      framework,
      limit = 50,
      sort = 'date',
      order = 'desc'
    } = req.query;

    const query: any = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { searchName: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }
    
    if (language) {
      query.languages = { $in: [language] };
    }
    
    if (framework) {
      query.framework = { $regex: framework, $options: 'i' };
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort as string] = sortOrder;

    const projects = await ProjectModel
      .find(query)
      .sort(sortObj)
      .limit(Number(limit));

    // Get unique categories, languages, and frameworks for filtering
    const allProjects = await ProjectModel.find();
    const categories = [...new Set(allProjects.map(p => p.category))];
    const languages = [...new Set(allProjects.flatMap(p => p.languages))];
    const frameworks = [...new Set(allProjects.map(p => p.framework))];

    res.json({
      success: true,
      data: projects,
      count: projects.length,
      filters: {
        categories,
        languages,
        frameworks
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Single project endpoint
router.get('/projects/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await ProjectModel.findOne({ project_id: req.params.id });
    
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Hackathon projects endpoint
router.get('/hackathons', async (req: Request, res: Response) => {
  try {
    const {
      limit = 20,
      sort = 'date',
      order = 'desc'
    } = req.query;

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort as string] = sortOrder;

    const hackathonProjects = await HackathonProjectModel
      .find()
      .sort(sortObj)
      .limit(Number(limit));

    // Calculate hackathon stats
    const totalHackathons = hackathonProjects.length;
    const totalPrizes = hackathonProjects.reduce((sum, project) => {
      const prizeAmount = project.prize.match(/\$(\d+,?\d*)/);
      return sum + (prizeAmount ? parseInt(prizeAmount[1].replace(',', '')) : 0);
    }, 0);
    const awards = hackathonProjects.filter(p => 
      p.placement.includes('1st') || 
      p.placement.includes('2nd') || 
      p.placement.includes('3rd') || 
      p.placement.includes('Winner')
    ).length;

    res.json({
      success: true,
      data: hackathonProjects,
      count: hackathonProjects.length,
      stats: {
        totalHackathons,
        totalPrizes,
        awards
      }
    });
  } catch (error) {
    console.error('Error fetching hackathon projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Research papers endpoint
router.get('/research', async (req: Request, res: Response) => {
  try {
    const {
      category,
      status,
      year,
      limit = 20,
      sort = 'year',
      order = 'desc'
    } = req.query;

    const query: any = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (year) {
      query.year = year;
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort as string] = sortOrder;

    const papers = await ResearchPaperModel
      .find(query)
      .sort(sortObj)
      .limit(Number(limit));

    // Get unique categories and years for filtering
    const allPapers = await ResearchPaperModel.find();
    const categories = [...new Set(allPapers.map(p => p.category))];
    const years = [...new Set(allPapers.map(p => p.year))].sort().reverse();
    
    // Calculate research stats
    const totalCitations = allPapers.reduce((sum, paper) => sum + paper.citations, 0);
    const avgImpactFactor = allPapers.reduce((sum, paper) => sum + paper.impact_factor, 0) / allPapers.length;

    res.json({
      success: true,
      data: papers,
      count: papers.length,
      filters: {
        categories,
        years
      },
      stats: {
        totalPapers: allPapers.length,
        totalCitations,
        avgImpactFactor: Math.round(avgImpactFactor * 10) / 10,
        collaborators: [...new Set(allPapers.flatMap(p => p.authors))].length
      }
    });
  } catch (error) {
    console.error('Error fetching research papers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Certifications endpoint
router.get('/certifications', async (req: Request, res: Response) => {
  try {
    const {
      issuer,
      limit = 20,
      sort = 'date',
      order = 'desc'
    } = req.query;

    const query: any = {};
    
    if (issuer) {
      query.issuer = { $regex: issuer, $options: 'i' };
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort as string] = sortOrder;

    const certifications = await CertificationModel
      .find(query)
      .sort(sortObj)
      .limit(Number(limit));

    res.json({
      success: true,
      data: certifications,
      count: certifications.length
    });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Blog posts endpoint
router.get('/blog', async (req: Request, res: Response) => {
  try {
    const {
      category,
      tag,
      status = 'published',
      limit = 10,
      sort = 'published_date',
      order = 'desc'
    } = req.query;

    const query: any = { status };
    
    if (category) {
      query.category = category;
    }
    
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sort as string] = sortOrder;

    const posts = await BlogPostModel
      .find(query)
      .sort(sortObj)
      .limit(Number(limit));

    // Get unique categories and tags for filtering
    const allPosts = await BlogPostModel.find({ status: 'published' });
    const categories = [...new Set(allPosts.map(p => p.category))];
    const tags = [...new Set(allPosts.flatMap(p => p.tags))];

    res.json({
      success: true,
      data: posts,
      count: posts.length,
      filters: {
        categories,
        tags
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Single blog post endpoint
router.get('/blog/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await BlogPostModel.findOne({ slug: req.params.slug, status: 'published' });
    
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }

    // Increment view count
    await BlogPostModel.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact info endpoint
router.get('/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const contactInfo = await ContactInfoModel.findOne();
    
    if (!contactInfo) {
      res.status(404).json({ error: 'Contact information not found' });
      return;
    }

    res.json({
      success: true,
      data: contactInfo,
      lastUpdated: contactInfo.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Activity stats endpoint
router.get('/activity/stats', async (req: Request, res: Response) => {
  try {
    let stats = await ActivityStatsModel.findOne();
    
    if (!stats) {
      // Calculate stats from existing data if not found
      const [projects, hackathons, papers, experiences, skills] = await Promise.all([
        ProjectModel.countDocuments(),
        HackathonProjectModel.countDocuments(),
        ResearchPaperModel.countDocuments(),
        ExperienceModel.find({ type: 'company' }),
        SkillModel.find()
      ]);

      const hackathonWins = await HackathonProjectModel.countDocuments({
        $or: [
          { placement: { $regex: '1st', $options: 'i' } },
          { placement: { $regex: 'winner', $options: 'i' } }
        ]
      });

      const technologiesUsed = [...new Set(skills.flatMap(s => s.items))].length;
      const yearsExperience = experiences.length > 0 ? 
        new Date().getFullYear() - new Date(experiences[0].roles?.[0]?.duration.split(' – ')[0] || '2020').getFullYear() : 0;

      stats = new ActivityStatsModel({
        total_projects: projects,
        total_contributions: 0, // Will be updated by GitHub sync
        years_experience: yearsExperience,
        technologies_used: technologiesUsed,
        hackathons_won: hackathonWins,
        research_papers: papers
      });
      
      await stats.save();
    }

    res.json({
      success: true,
      data: stats,
      lastUpdated: stats.lastUpdated
    });
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Comprehensive data endpoint for homepage
router.get('/comprehensive', async (req: Request, res: Response) => {
  try {
    const [
      aboutInfo,
      recentProjects,
      topSkills,
      recentExperience,
      stats,
      recentPapers,
      recentPosts
    ] = await Promise.all([
      AboutInfoModel.findOne(),
      ProjectModel.find().sort({ date: -1 }).limit(6),
      SkillModel.find().limit(6),
      ExperienceModel.find({ type: 'company' }).sort({ lastUpdated: -1 }).limit(3),
      ActivityStatsModel.findOne(),
      ResearchPaperModel.find({ status: 'Published' }).sort({ year: -1 }).limit(3),
      BlogPostModel.find({ status: 'published' }).sort({ published_date: -1 }).limit(3)
    ]);

    res.json({
      success: true,
      data: {
        about: aboutInfo,
        recentProjects,
        topSkills,
        recentExperience,
        stats,
        recentPapers,
        recentPosts
      }
    });
  } catch (error) {
    console.error('Error fetching comprehensive data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
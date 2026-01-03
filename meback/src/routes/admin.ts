import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AdminModel } from '../models/Admin';
import { authenticateAdmin, requireRole } from '../middleware/auth';
import {
  ExperienceModel,
  SkillModel,
  ProjectModel,
  HackathonProjectModel,
  ResearchPaperModel,
  CertificationModel,
  BlogPostModel,
  ContactInfoModel,
  AboutInfoModel
} from '../models/Portfolio';

const router = Router();

interface AuthRequest extends Request {
  admin?: any;
}

// Admin Authentication Routes
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }

    const admin = await AdminModel.findOne({
      $or: [{ username }, { email: username }],
      isActive: true
    });

    if (!admin || !(await admin.comparePassword(password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create initial admin (only if no admins exist)
router.post('/setup', async (req: Request, res: Response): Promise<void> => {
  try {
    const adminCount = await AdminModel.countDocuments();

    if (adminCount > 0) {
      res.status(400).json({ error: 'Admin already exists' });
      return;
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ error: 'Username, email, and password are required' });
      return;
    }

    const admin = new AdminModel({
      username,
      email,
      password,
      role: 'admin'
    });

    await admin.save();

    res.json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected routes (require authentication)
router.use(authenticateAdmin);

// Get admin profile
router.get('/profile', (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

// Dashboard stats
router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    const [
      projectsCount,
      experiencesCount,
      hackathonsCount,
      papersCount,
      certificationsCount,
      blogPostsCount
    ] = await Promise.all([
      ProjectModel.countDocuments(),
      ExperienceModel.countDocuments(),
      HackathonProjectModel.countDocuments(),
      ResearchPaperModel.countDocuments(),
      CertificationModel.countDocuments(),
      BlogPostModel.countDocuments()
    ]);

    res.json({
      success: true,
      stats: {
        projects: projectsCount,
        experiences: experiencesCount,
        hackathons: hackathonsCount,
        papers: papersCount,
        certifications: certificationsCount,
        blogPosts: blogPostsCount
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Experience Management
router.get('/experiences', async (req: AuthRequest, res: Response) => {
  try {
    const experiences = await ExperienceModel.find().sort({ lastUpdated: -1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/experiences', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const experience = new ExperienceModel(req.body);
    await experience.save();
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/experiences/:id', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experience = await ExperienceModel.findOneAndUpdate(
      { experience_id: req.params.id },
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );

    if (!experience) {
      res.status(404).json({ error: 'Experience not found' });
      return;
    }

    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/experiences/:id', requireRole(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experience = await ExperienceModel.findOneAndDelete({ experience_id: req.params.id });

    if (!experience) {
      res.status(404).json({ error: 'Experience not found' });
      return;
    }

    res.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Skills Management
router.get('/skills', async (req: AuthRequest, res: Response) => {
  try {
    const skills = await SkillModel.find().sort({ category: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/skills/:category', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const skill = await SkillModel.findOneAndUpdate(
      { category: req.params.category },
      { ...req.body, lastUpdated: new Date() },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Projects Management
router.get('/projects', async (req: AuthRequest, res: Response) => {
  try {
    const projects = await ProjectModel.find().sort({ date: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/projects', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const project = new ProjectModel(req.body);
    await project.save();
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/projects/:id', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Try to find by project_id first, then by _id if possible
    let query: any = { project_id: req.params.id };

    // Check if the id param is a valid ObjectId (hex string of 24 chars)
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ project_id: req.params.id }, { _id: req.params.id }] };
    }

    const project = await ProjectModel.findOneAndUpdate(
      query,
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );

    if (!project) {
      console.log(`Debug: Project not found for ID: ${req.params.id}`);
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/projects/:id', requireRole(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await ProjectModel.findOneAndDelete({ project_id: req.params.id });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Research Paper Management
router.get('/research', async (req: AuthRequest, res: Response) => {
  try {
    const papers = await ResearchPaperModel.find().sort({ year: -1 });
    res.json({ success: true, data: papers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/research', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const paper = new ResearchPaperModel(req.body);
    await paper.save();
    res.json({ success: true, data: paper });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/research/:id', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Try to find by id (string) first, then by _id if possible
    let query: any = { id: req.params.id };

    // If not found by custom id field, try finding by MongoDB _id
    // But ResearchPaperModel uses 'id' as a string field in the interface provided in frontend code?
    // Let's check the model definition. Inspecting the frontend code, it uses 'id'.
    // Inspecting the backend model is safer. Assuming 'paper_id' or '_id'.
    // The frontend sends `paper.id` as the URL param.
    // Let's support both 'paper_id' and '_id' like Projects.

    let search = { paper_id: req.params.id };
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      search = { $or: [{ paper_id: req.params.id }, { _id: req.params.id }] } as any;
    }

    const paper = await ResearchPaperModel.findOneAndUpdate(
      search,
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );

    if (!paper) {
      res.status(404).json({ error: 'Research paper not found' });
      return;
    }

    res.json({ success: true, data: paper });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/research/:id', requireRole(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let search = { paper_id: req.params.id };
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      search = { $or: [{ paper_id: req.params.id }, { _id: req.params.id }] } as any;
    }

    const paper = await ResearchPaperModel.findOneAndDelete(search);

    if (!paper) {
      res.status(404).json({ error: 'Research paper not found' });
      return;
    }

    res.json({ success: true, message: 'Research paper deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Hackathon Project Management
router.get('/hackathons', async (req: AuthRequest, res: Response) => {
  try {
    const hackathons = await HackathonProjectModel.find().sort({ date: -1 });
    res.json({ success: true, data: hackathons });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/hackathons', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const hackathon = new HackathonProjectModel(req.body);
    await hackathon.save();
    res.json({ success: true, data: hackathon });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/hackathons/:id', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let query: any = { hackathon_id: req.params.id };

    // Support hackathon_id or _id lookup
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ hackathon_id: req.params.id }, { _id: req.params.id }] };
    } else {
      query = { hackathon_id: req.params.id };
    }

    const hackathon = await HackathonProjectModel.findOneAndUpdate(
      query,
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );

    if (!hackathon) {
      res.status(404).json({ error: 'Hackathon project not found' });
      return;
    }

    res.json({ success: true, data: hackathon });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/hackathons/:id', requireRole(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let query: any = { hackathon_id: req.params.id };
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ hackathon_id: req.params.id }, { _id: req.params.id }] };
    }

    const hackathon = await HackathonProjectModel.findOneAndDelete(query);

    if (!hackathon) {
      res.status(404).json({ error: 'Hackathon project not found' });
      return;
    }

    res.json({ success: true, message: 'Hackathon project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Certification Management
router.get('/certifications', async (req: AuthRequest, res: Response) => {
  try {
    const certifications = await CertificationModel.find().sort({ date: -1 });
    res.json({ success: true, data: certifications });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/certifications', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const certification = new CertificationModel(req.body);
    await certification.save();
    res.json({ success: true, data: certification });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/certifications/:id', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let query: any = { cert_id: req.params.id };
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ cert_id: req.params.id }, { _id: req.params.id }] };
    }

    const certification = await CertificationModel.findOneAndUpdate(
      query,
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );

    if (!certification) {
      res.status(404).json({ error: 'Certification not found' });
      return;
    }

    res.json({ success: true, data: certification });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/certifications/:id', requireRole(['admin']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let query: any = { cert_id: req.params.id };
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { $or: [{ cert_id: req.params.id }, { _id: req.params.id }] };
    }

    const certification = await CertificationModel.findOneAndDelete(query);

    if (!certification) {
      res.status(404).json({ error: 'Certification not found' });
      return;
    }

    res.json({ success: true, message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Blog Posts Management
router.get('/blog', async (req: AuthRequest, res: Response) => {
  try {
    const posts = await BlogPostModel.find().sort({ published_date: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/blog', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const post = new BlogPostModel(req.body);
    await post.save();
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/blog/:id', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await BlogPostModel.findOneAndUpdate(
      { blog_id: req.params.id },
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );

    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }

    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// About & Contact Management
router.get('/about', async (req: AuthRequest, res: Response) => {
  try {
    const about = await AboutInfoModel.findOne();
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/about', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const about = await AboutInfoModel.findOneAndUpdate(
      {},
      { ...req.body, lastUpdated: new Date() },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/contact', async (req: AuthRequest, res: Response) => {
  try {
    const contact = await ContactInfoModel.findOne();
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/contact', requireRole(['admin', 'editor']), async (req: AuthRequest, res: Response) => {
  try {
    const contact = await ContactInfoModel.findOneAndUpdate(
      {},
      { ...req.body, lastUpdated: new Date() },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
# Portfolio Admin System Setup Guide

This guide will help you set up and use the comprehensive admin system for your portfolio website.

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
cd meback
npm install
npm run dev
```

The backend will start on `http://localhost:3001`

### 2. Set Up Initial Admin User

```bash
cd meback
npm run setup-admin
```

This creates an admin user with:
- **Username:** `admin`
- **Email:** `admin@portfolio.com`
- **Password:** `admin123`

⚠️ **Important:** Change the password after first login!

### 3. Start the Frontend

```bash
cd me
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Access Admin Panel

Navigate to `http://localhost:3000/admin` and login with the credentials above.

## 📋 Admin Features

### Dashboard
- Overview of all portfolio data
- Statistics for projects, experiences, hackathons, research papers, certifications, and blog posts
- Quick access to all management sections

### About Management
- Edit personal information (name, title, bio, location)
- Manage interests, languages, fun facts, and current focus areas
- Update avatar and resume URLs

### Experience Management
- Add/edit work experiences and career breaks
- Support for multiple roles within the same company
- Track achievements, technologies used, and role descriptions
- Flexible duration and employment type tracking

### Skills Management
- Organize skills by categories (Programming Languages, Databases, etc.)
- Add/remove skills within each category
- Create new skill categories as needed

### Projects Management
- Comprehensive project information (name, description, category)
- Technology stack and tags management
- GitHub and demo links
- Project status tracking
- Rich project details and requirements

### Blog Management
- Full blog post creation and editing
- Markdown content support
- Automatic reading time estimation
- Tag and category management
- Draft/Published/Archived status
- SEO-friendly slug generation

### Contact Management
- Update contact information (email, phone, location)
- Manage social media links (GitHub, LinkedIn, Twitter, Website)
- Set availability status with custom messages
- Real-time preview of contact information

## 🔧 Backend API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/setup` - Create initial admin (only if no admins exist)
- `GET /api/admin/profile` - Get admin profile
- `GET /api/admin/dashboard` - Dashboard statistics

### Data Management
- `GET/PUT /api/admin/about` - About information
- `GET/PUT /api/admin/contact` - Contact information
- `GET/POST/PUT/DELETE /api/admin/experiences/:id` - Experience management
- `GET/PUT /api/admin/skills/:category` - Skills management
- `GET/POST/PUT/DELETE /api/admin/projects/:id` - Project management
- `GET/POST/PUT/DELETE /api/admin/blog/:id` - Blog management

## 🗄️ Database Models

### About Information
```typescript
{
  name: string
  title: string
  bio: string
  location: string
  avatar: string
  resume_url?: string
  interests: string[]
  languages: string[]
  fun_facts: string[]
  current_focus: string[]
}
```

### Experience
```typescript
{
  id: string
  type: 'company' | 'break'
  company?: string
  location?: string
  duration?: string
  description?: string
  roles?: Role[]
}
```

### Skills
```typescript
{
  category: string
  items: string[]
}
```

### Projects
```typescript
{
  id: string
  name: string
  category: string
  description: string
  languages: string[]
  tags: string[]
  github: string
  demo?: string
  // ... more fields
}
```

### Blog Posts
```typescript
{
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published_date: string
  tags: string[]
  category: string
  reading_time: number
  status: 'draft' | 'published' | 'archived'
}
```

### Contact Information
```typescript
{
  email: string
  phone: string
  location: string
  social_links: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  availability: {
    status: 'available' | 'busy' | 'unavailable'
    message: string
  }
}
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (admin/editor roles)
- Protected API routes
- Input validation and sanitization

## 🎨 UI Components

The admin interface uses a modern, responsive design with:
- Clean card-based layouts
- Intuitive forms with validation
- Real-time feedback and notifications
- Mobile-friendly responsive design
- Consistent styling with shadcn/ui components

## 📝 Usage Tips

1. **Data Seeding**: The backend automatically seeds initial data from your existing frontend files
2. **Real-time Updates**: Changes in the admin panel immediately update the database
3. **Validation**: All forms include proper validation to ensure data integrity
4. **Responsive Design**: The admin interface works well on desktop and mobile devices
5. **Backup**: Consider backing up your database regularly

## 🚨 Production Deployment

Before deploying to production:

1. Change the default admin password
2. Set strong JWT secrets in environment variables
3. Configure proper CORS settings
4. Set up SSL/HTTPS
5. Configure database connection strings
6. Set up proper logging and monitoring

## 🔧 Environment Variables

Create a `.env` file in the `meback` directory:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
GITHUB_TOKEN=your-github-personal-access-token
NODE_ENV=development
```

## 📞 Support

If you encounter any issues:
1. Check the browser console for frontend errors
2. Check the backend logs for API errors
3. Ensure MongoDB is running
4. Verify all environment variables are set correctly

The admin system is now fully functional and ready to manage your portfolio data!
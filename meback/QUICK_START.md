# Quick Start Guide

## 🚀 Start the Backend (Without GitHub Token)

### 1. Install Dependencies
```bash
cd meback
npm install
```

### 2. Set Up Environment
The `.env` file is already configured for local development without GitHub token.

### 3. Start MongoDB (if using local)
```bash
# Install MongoDB if not already installed
# macOS with Homebrew:
brew install mongodb-community
brew services start mongodb-community

# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Start the Backend
```bash
npm run dev
```

The server will start on `http://localhost:3001` with GitHub features disabled.

## 🔧 Enable GitHub Features (Optional)

### 1. Get GitHub Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `user`, `read:org`
4. Copy the generated token

### 2. Update Environment
```bash
# Edit .env file
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username
```

### 3. Restart the Server
```bash
npm run dev
```

## 📊 Admin Setup

### 1. Create Admin User
```bash
npm run setup-admin
```

### 2. Access Admin Panel
- URL: `http://localhost:3000/admin`
- Username: `admin`
- Password: `admin123`

## 🗄️ Database Options

### Local MongoDB (Recommended for Development)
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## ✅ Verification

Test the API endpoints:
- Health: `http://localhost:3001/api/portfolio/about`
- Admin: `http://localhost:3001/api/admin/dashboard` (requires auth)

## 🔍 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally
- Check connection string in `.env`
- Verify network access for Atlas

### GitHub Features Not Working
- Verify `GITHUB_TOKEN` is set correctly
- Check token permissions (repo, user, read:org)
- Ensure `GITHUB_USERNAME` matches your GitHub username

### Admin Login Issues
- Run `npm run setup-admin` to create admin user
- Check JWT_SECRET is set in `.env`
- Verify admin credentials: admin/admin123
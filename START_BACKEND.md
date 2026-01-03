# 🚀 Start Backend Server

## Prerequisites

### 1. Start MongoDB
Choose one of these options:

#### Option A: Local MongoDB (Recommended)
```bash
# Install MongoDB (if not installed)
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

#### Option B: Docker MongoDB
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Option C: Use MongoDB Atlas (Cloud)
Update `.env` with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 2. Start Backend Server
```bash
cd meback
npm install
npm run dev
```

## ✅ Success Indicators

You should see:
```
🔄 Connecting to MongoDB...
✅ MongoDB connected successfully
⚠️  GitHub token not configured. GitHub features will be disabled.
🚀 Server running on port 3001
```

## 🔧 Next Steps

1. **Create Admin User:**
   ```bash
   npm run setup-admin
   ```

2. **Start Frontend:**
   ```bash
   cd ../me
   pnpm install
   pnpm run dev
   ```

3. **Access Admin Panel:**
   - URL: http://localhost:3000/admin
   - Username: `admin`
   - Password: `admin123`

## 🐛 Troubleshooting

### MongoDB Connection Failed
- **Local MongoDB:** Run `brew services start mongodb-community`
- **Docker:** Run `docker start mongodb` or create new container
- **Atlas:** Check connection string and network access

### Port Already in Use
- Change `PORT=3001` to another port in `.env`
- Or kill the process using port 3001: `lsof -ti:3001 | xargs kill`

### GitHub Token Warning
- This is normal for development
- GitHub features will be disabled but admin system works fine
- Add `GITHUB_TOKEN` to `.env` to enable GitHub features

## 🎯 Ready to Use!

Once both servers are running:
- **Backend API:** http://localhost:3001/api
- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
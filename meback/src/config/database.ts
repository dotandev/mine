import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      // Remove deprecated options
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('✅ MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔄 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    console.error('💡 Make sure MongoDB is running locally or check your MONGODB_URI');
    console.error('💡 For local MongoDB: brew services start mongodb-community');
    console.error('💡 Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest');
    process.exit(1);
  }
};

export default connectDB;
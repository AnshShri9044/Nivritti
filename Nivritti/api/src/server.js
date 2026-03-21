import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import trainingRoutes from './routes/training.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;
export const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nivritti');
    isConnected = !!db.connections[0].readyState;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/training', trainingRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}

export default app;
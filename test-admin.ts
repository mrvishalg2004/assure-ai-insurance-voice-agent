import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Simple User Schema definition
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  isActive: Boolean,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

async function testFetchUsers() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log('Connecting to', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    console.log('Running query...');
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log(`Found ${users.length} users`);
    const total = await User.countDocuments();
    console.log(`Total documents: ${total}`);

    console.log('First user:', users[0]);
    
  } catch (error) {
    console.error('Error during fetch:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testFetchUsers();

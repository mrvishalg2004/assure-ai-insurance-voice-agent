import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  isActive: Boolean,
});

const User = mongoose.model('User', UserSchema);

async function upgradeToAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Upgrade Student Test to admin
    const result = await User.findOneAndUpdate(
      { email: 'demo@gmail.com' },
      { role: 'admin' },
      { new: true }
    );

    if (result) {
      console.log(`✅ Successfully upgraded ${result.name} to ADMIN`);
      console.log(`   Email: ${result.email}`);
      console.log(`   Role: ${result.role}`);
    } else {
      console.log('❌ User not found');
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

upgradeToAdmin();

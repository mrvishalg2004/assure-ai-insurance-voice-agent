import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'student', 'teacher', 'hod', 'principal'], default: 'user' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BulkCallQueueSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String },
    email: { type: String },
    notes: { type: String },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
    bolnaCallId: { type: String },
    errorMessage: { type: String },
    callAttempts: { type: Number, default: 0 },
    lastAttemptAt: { type: Date },
    conversationTime: { type: Number },
    transcript: { type: String },
    recordingUrl: { type: String },
    callStatus: { type: String },
    hangupBy: { type: String },
    extractedData: { type: mongoose.Schema.Types.Mixed },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ConversationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const BulkCallQueue = mongoose.models.BulkCallQueue || mongoose.model('BulkCallQueue', BulkCallQueueSchema);
const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

async function seedData() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/assure-ai';
  console.log('🔄 Connecting to MongoDB at:', uri);
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');

  // Clear existing collections for a clean, deterministic seed
  await User.deleteMany({});
  await BulkCallQueue.deleteMany({});
  await Conversation.deleteMany({});
  console.log('🧹 Cleaned existing test records');

  const hashedPassword = await bcrypt.hash('Password@123', 10);

  // 1. Create Primary Admin and Users (Indian Names)
  const adminUser = await User.create({
    name: 'Aarav Sharma',
    email: 'admin@assureai.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true,
  });

  const secondaryAdmin = await User.create({
    name: 'Priya Patel',
    email: 'priya.patel@assureai.in',
    password: hashedPassword,
    role: 'admin',
    isActive: true,
  });

  const teamUsers = [
    { name: 'Rohan Kulkarni', email: 'rohan.kulkarni@assureai.in', role: 'user', isActive: true },
    { name: 'Ananya Deshmukh', email: 'ananya.deshmukh@assureai.in', role: 'user', isActive: true },
    { name: 'Vikramaditya Singh', email: 'vikram.singh@assureai.in', role: 'user', isActive: true },
    { name: 'Neha Gupta', email: 'neha.gupta@assureai.in', role: 'user', isActive: true },
    { name: 'Arjun Nair', email: 'arjun.nair@assureai.in', role: 'user', isActive: true },
    { name: 'Kavita Reddy', email: 'kavita.reddy@assureai.in', role: 'user', isActive: true },
    { name: 'Siddharth Joshi', email: 'siddharth.joshi@assureai.in', role: 'user', isActive: true },
    { name: 'Pooja Mehta', email: 'pooja.mehta@assureai.in', role: 'user', isActive: true },
    { name: 'Aditya Verma', email: 'aditya.verma@assureai.in', role: 'user', isActive: true },
    { name: 'Ritu Chatterjee', email: 'ritu.chatterjee@assureai.in', role: 'user', isActive: true },
    { name: 'Manish Malhotra', email: 'manish.malhotra@assureai.in', role: 'user', isActive: false },
    { name: 'Sunita Agarwal', email: 'sunita.agarwal@assureai.in', role: 'user', isActive: true },
    { name: 'Deepak Patil', email: 'deepak.patil@assureai.in', role: 'user', isActive: true },
    { name: 'Rajesh Chauhan', email: 'rajesh.chauhan@assureai.in', role: 'user', isActive: true },
  ];

  for (const u of teamUsers) {
    await User.create({
      ...u,
      password: hashedPassword,
    });
  }
  console.log(`✅ Seeded ${teamUsers.length + 2} Users (Admin: admin@assureai.com)`);

  const adminId = adminUser._id.toString();

  // 2. Create Bulk Call Queue items with realistic Indian insurance data
  const sampleCalls = [
    {
      userId: adminId,
      name: 'Sunita Agarwal',
      phone: '+91 98201 44521',
      city: 'Mumbai',
      email: 'sunita.agarwal@outlook.com',
      notes: 'Family Floater Health Cover 10L inquiry',
      status: 'completed',
      bolnaCallId: 'bolna_exec_ind_101',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 15),
      conversationTime: 142,
      transcript: 'Assistant: Namaste Sunita ji, this is AssureAI calling regarding your family health floater quote for 10 Lakhs sum insured. Sunita: Haanji, does this cover maternity after 2 years? Assistant: Yes, maternity cover is included with a 24-month waiting period up to ₹75,000 for normal delivery and ₹1,00,000 for C-section. Shall I email you the comparison sheet? Sunita: Yes please, send it to sunita.agarwal@outlook.com.',
      recordingUrl: 'https://cdn.assureai.in/recordings/call_101_sunita_agarwal.mp3',
      callStatus: 'completed',
      hangupBy: 'caller',
      extractedData: {
        interest_level: 'High',
        preferred_sum_insured: '₹10,00,000',
        members_covered: 'Self, Spouse, 2 Children',
        follow_up: 'Email quote sent',
      },
    },
    {
      userId: adminId,
      name: 'Rahul Sharma',
      phone: '+91 97112 88390',
      city: 'New Delhi',
      email: 'rahul.sharma@gmail.com',
      notes: 'Car Insurance Zero-Depreciation renewal',
      status: 'completed',
      bolnaCallId: 'bolna_exec_ind_102',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 35),
      conversationTime: 185,
      transcript: 'Assistant: Hello Rahul ji, calling from AssureAI regarding your Honda City policy expiring on 24th November. Rahul: What is the renewal premium with Zero-Dep and Engine Protect? Assistant: With 50% NCB bonus, the total premium is ₹11,420 with complimentary 24x7 Roadside Assistance. Rahul: Great, send me the payment link on WhatsApp.',
      recordingUrl: 'https://cdn.assureai.in/recordings/call_102_rahul_sharma.mp3',
      callStatus: 'completed',
      hangupBy: 'agent',
      extractedData: {
        vehicle: 'Honda City ZX (2022)',
        ncb_discount: '50%',
        addons: ['Zero-Depreciation', 'Engine Protection', '24x7 RSA'],
        quoted_premium: '₹11,420',
      },
    },
    {
      userId: adminId,
      name: 'Deepak Patil',
      phone: '+91 94220 55192',
      city: 'Pune',
      email: 'deepak.patil@yahoo.com',
      notes: 'Term Life 1 Cr Cover Policy Comparison',
      status: 'completed',
      bolnaCallId: 'bolna_exec_ind_103',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 55),
      conversationTime: 210,
      transcript: 'Assistant: Hello Deepak ji, checking if you had any questions on the 1 Crore Term Life plan with accidental disability rider. Deepak: Are tax benefits under 80C applicable for this? Assistant: Yes, the annual premium of ₹8,900 is 100% tax-exempt under Section 80C, and claim payouts are tax-free under 10(10D).',
      recordingUrl: 'https://cdn.assureai.in/recordings/call_103_deepak_patil.mp3',
      callStatus: 'completed',
      hangupBy: 'caller',
      extractedData: {
        coverage: '₹1,00,00,000 (1 Crore)',
        age: 32,
        smoker: false,
        riders: ['Accidental Total Disability Rider'],
      },
    },
    {
      userId: adminId,
      name: 'Meera Iyer',
      phone: '+91 98450 71234',
      city: 'Bengaluru',
      email: 'meera.iyer@gmail.com',
      notes: 'Senior Citizen Health Plan for parents (Age 64 & 61)',
      status: 'completed',
      bolnaCallId: 'bolna_exec_ind_104',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 80),
      conversationTime: 160,
      transcript: 'Assistant: Vanakkam Meera ji, AssureAI assistant here for your senior citizen health plan inquiry. Meera: Does this plan require pre-policy medical checkup? Assistant: For your father aged 64, standard tele-underwriting and home sample collection is provided with zero out-of-pocket charges.',
      recordingUrl: 'https://cdn.assureai.in/recordings/call_104_meera_iyer.mp3',
      callStatus: 'completed',
      hangupBy: 'caller',
      extractedData: {
        policy_type: 'Senior Citizen Silver Health',
        copay: '10%',
        opd_cover: '₹15,000 annual',
      },
    },
    {
      userId: adminId,
      name: 'Rajesh Chauhan',
      phone: '+91 98190 22345',
      city: 'Ahmedabad',
      email: 'rajesh.chauhan@textiles.in',
      notes: 'Commercial Shop & Warehouse Fire Insurance',
      status: 'completed',
      bolnaCallId: 'bolna_exec_ind_105',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 110),
      conversationTime: 95,
      transcript: 'Assistant: Namaste Rajesh bhai, AssureAI commercial desk. We reviewed your warehouse stock valuation of ₹85 Lakhs. Rajesh: Can earthquake and STFI be included? Assistant: Yes, both Storm, Tempest, Flood (STFI) and Earthquake Zone III covers are included in the Bharat Sookshma Udyam Suraksha quote.',
      recordingUrl: 'https://cdn.assureai.in/recordings/call_105_rajesh_chauhan.mp3',
      callStatus: 'completed',
      hangupBy: 'caller',
      extractedData: {
        risk_type: 'Commercial Warehouse',
        stock_value: '₹85 Lakhs',
        clause: 'Bharat Sookshma Udyam Suraksha',
      },
    },
    {
      userId: adminId,
      name: 'Swati Mukherjee',
      phone: '+91 98300 45678',
      city: 'Kolkata',
      email: 'swati.m@tcs.com',
      notes: 'Super Top-up Health Cover 25L with 5L Deductible',
      status: 'completed',
      bolnaCallId: 'bolna_exec_ind_106',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 140),
      conversationTime: 125,
      transcript: 'Assistant: Hello Swati ji, following up on your Super Top-up health plan. Swati: If my corporate insurance pays the first 5 Lakhs, will this activate? Assistant: Absolutely! Any corporate or personal base policy payout counts toward the ₹5 Lakh deductible.',
      recordingUrl: 'https://cdn.assureai.in/recordings/call_106_swati_mukherjee.mp3',
      callStatus: 'completed',
      hangupBy: 'agent',
      extractedData: {
        plan: 'AssureAI Meditop Super Top-up',
        sum_insured: '₹25,00,000',
        deductible: '₹5,00,000',
      },
    },
    {
      userId: adminId,
      name: 'Anand Saxena',
      phone: '+91 98990 11223',
      city: 'Lucknow',
      email: 'anand.saxena@gmail.com',
      notes: 'Critical Illness Rider with 32 illnesses cover',
      status: 'completed',
      bolnaCallId: 'bolna_exec_ind_107',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 180),
      conversationTime: 130,
      transcript: 'Assistant: Namaste Anand ji. Your critical illness lump-sum benefit quote of ₹20 Lakhs covers cancer, stroke, and cardiac surgery on first diagnosis. Anand: Is the claim paid immediately upon diagnosis? Assistant: Yes, 100% sum insured is released as a lump sum after standard 30-day survival period.',
      recordingUrl: 'https://cdn.assureai.in/recordings/call_107_anand_saxena.mp3',
      callStatus: 'completed',
      hangupBy: 'caller',
      extractedData: {
        benefit_type: 'Lump-sum Diagnosis Payout',
        sum_insured: '₹20,00,000',
        illnesses_covered: 32,
      },
    },
    {
      userId: adminId,
      name: 'Shilpa Rao',
      phone: '+91 98490 66789',
      city: 'Hyderabad',
      email: 'shilpa.rao@gmail.com',
      notes: 'Two-Wheeler Comprehensive EV Bike insurance',
      status: 'completed',
      bolnaCallId: 'bolna_exec_ind_108',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 220),
      conversationTime: 85,
      transcript: 'Assistant: Hello Shilpa ji, regarding your Ather 450X EV insurance renewal. Shilpa: Is battery replacement covered in full? Assistant: Yes, with our EV Protection Rider, EV battery degradation and water-ingress damage are covered at zero depreciation.',
      recordingUrl: 'https://cdn.assureai.in/recordings/call_108_shilpa_rao.mp3',
      callStatus: 'completed',
      hangupBy: 'agent',
      extractedData: {
        vehicle_type: 'Electric Two-Wheeler (Ather 450X)',
        battery_protection: 'Included',
        premium: '₹2,140',
      },
    },
    {
      userId: adminId,
      name: 'Sanjay Bhatt',
      phone: '+91 98290 33445',
      city: 'Jaipur',
      email: 'sanjay.bhatt@rajasthan.gov.in',
      notes: 'Child Education & Wealth Booster Insurance',
      status: 'processing',
      bolnaCallId: 'bolna_exec_ind_109',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 30),
      conversationTime: 45,
      transcript: 'Assistant: Namaste Sanjay ji, AssureAI automated voice advisor calling for your Child Education Smart Plan...',
      recordingUrl: '',
      callStatus: 'in-progress',
      hangupBy: '',
    },
    {
      userId: adminId,
      name: 'Divya Pillai',
      phone: '+91 98470 55667',
      city: 'Kochi',
      email: 'divya.pillai@cochinship.com',
      notes: 'Overseas Travel Insurance for Schengen Visa (30 Days)',
      status: 'processing',
      bolnaCallId: 'bolna_exec_ind_110',
      callAttempts: 1,
      lastAttemptAt: new Date(Date.now() - 1000 * 15),
      conversationTime: 25,
      transcript: 'Assistant: Hello Divya ji, AssureAI travel assistant confirming your €50,000 Schengen visa compliant travel policy...',
      recordingUrl: '',
      callStatus: 'ringing',
      hangupBy: '',
    },
    {
      userId: adminId,
      name: 'Kunal Kapoor',
      phone: '+91 98140 88990',
      city: 'Chandigarh',
      email: 'kunal.kapoor@gmail.com',
      notes: 'SUV Commercial Vehicle Fleet Insurance renewal',
      status: 'pending',
      callAttempts: 0,
    },
    {
      userId: adminId,
      name: 'Vandana Tiwari',
      phone: '+91 94150 22334',
      city: 'Varanasi',
      email: 'vandana.tiwari@bhu.ac.in',
      notes: 'Health Insurance OPD & Dental rider inquiry',
      status: 'pending',
      callAttempts: 0,
    },
    {
      userId: adminId,
      name: 'Harish Nambiar',
      phone: '+91 94470 99887',
      city: 'Thiruvananthapuram',
      email: 'harish.nambiar@kerala.nic.in',
      notes: 'Individual Personal Accident Cover 50L',
      status: 'failed',
      errorMessage: 'Customer busy on another call (Line Busy - 486)',
      callAttempts: 3,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      userId: adminId,
      name: 'Preeti Joshi',
      phone: '+91 98260 11223',
      city: 'Indore',
      email: 'preeti.joshi@indore.org',
      notes: 'Home Contents & Jewelry Theft Cover',
      status: 'failed',
      errorMessage: 'Network timeout (No answer after 45s)',
      callAttempts: 2,
      lastAttemptAt: new Date(Date.now() - 1000 * 60 * 75),
    },
  ];

  await BulkCallQueue.insertMany(sampleCalls);
  console.log(`✅ Seeded ${sampleCalls.length} Bulk Calls (8 completed, 2 processing, 2 pending, 2 failed)`);

  // 3. Create Rich Conversation for Chat Assistant Page
  await Conversation.create({
    userId: adminId,
    messages: [
      {
        role: 'user',
        content: 'Hi AssureAI, I want to understand what is covered under a cashless health insurance hospitalization claim in Mumbai network hospitals?',
        timestamp: new Date(Date.now() - 1000 * 60 * 18),
      },
      {
        role: 'assistant',
        content: 'Hello Aarav! With AssureAI Health Shield, cashless hospitalization at our 8,500+ network hospitals in Mumbai (including Lilavati, Kokilaben Dhirubhai Ambani, and Hinduja) covers ICU charges, room rent up to your sum insured limit, surgeon & physician consultation fees, pre-hospitalization medical expenses for 60 days, and post-hospitalization for 90 days.\n\nSimply present your AssureAI digital health card at the hospital insurance desk 48 hours in advance for planned admissions, or within 24 hours in emergency cases.',
        timestamp: new Date(Date.now() - 1000 * 60 * 17),
      },
      {
        role: 'user',
        content: 'Does it cover pre-existing conditions like diabetes or hypertension, and what is the waiting period?',
        timestamp: new Date(Date.now() - 1000 * 60 * 12),
      },
      {
        role: 'assistant',
        content: 'Yes, pre-existing conditions such as Type-2 Diabetes and Hypertension are covered after a standard waiting period of 24 to 36 months depending on the plan tier.\n\nHowever, if you opt for our "Care Plus Buyback Rider", the waiting period is reduced to just 12 months with day-one coverage for prescribed maintenance medications! Would you like me to compare policy quotes with the reduced waiting period rider?',
        timestamp: new Date(Date.now() - 1000 * 60 * 11),
      },
      {
        role: 'user',
        content: 'Yes please, for a 35-year-old non-smoker with a sum insured of ₹15 Lakhs.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        role: 'assistant',
        content: 'Based on our real-time underwriting engine:\n\n• Plan: AssureAI Optima Restore Health (₹15 Lakhs Sum Insured)\n• Annual Premium: ₹14,850/year (inclusive of 18% GST)\n• Key Benefits:\n   ✓ 100% Instant Restore Benefit on exhaustion\n   ✓ Zero Co-payment at all network hospitals\n   ✓ Free Annual Comprehensive Health Checkup\n   ✓ Tax Exemption under Section 80D up to ₹25,000\n\nWould you like me to schedule an automated voice summary call to your phone, or email the official policy proposal brochure?',
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
    ],
  });
  console.log('✅ Seeded Rich Chat Conversation');

  await mongoose.disconnect();
  console.log('🎉 Seeding successfully completed!');
}

seedData().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});

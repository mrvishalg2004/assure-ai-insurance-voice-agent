# 🔧 Fix Bolna API Configuration

## Current Issue
Your bulk calls are failing with error: **"BOLNA_API_KEY is not configured in environment variables"**

## ✅ What's Already Done
- ✅ BOLNA_API_KEY is configured in your `.env.local`
- ✅ Code has been configured to properly load environment variables
- ✅ Backend server runs on port 5001

## ⚠️ What You Need to Do

### Get Your Bolna Agent ID

Your `.env.local` currently has:
```
BOLNA_AGENT_ID=your-bolna-agent-id-here  ← This is a PLACEHOLDER
```

**Follow these steps:**

1. **Visit Bolna Dashboard**
   - Go to: https://app.bolna.dev
   - Or: https://bolna.dev (and login)

2. **Login to Your Account**
   - Use the credentials you signed up with

3. **Navigate to Agents Section**
   - Look for "Agents", "Voice Agents", or "My Agents" in the sidebar/menu

4. **Find or Create an Agent**
   - **If you have an existing agent:**
     - Click on it to view details
     - Look for "Agent ID" or "ID"
   - **If you don't have an agent:**
     - Click "Create Agent" or "New Agent"
     - Configure the voice agent settings
     - Save it
     - Copy the generated Agent ID

5. **Copy Your Agent ID**
   - It will look something like:
     - `agent_abc123xyz456`
     - `agt_xxxxxxxxxxxxx`
     - Or a similar format

6. **Update `.env.local` File**
   - Open `.env.local` in your project root
   - Find the line: `BOLNA_AGENT_ID=your-bolna-agent-id-here`
   - Replace with your actual ID: `BOLNA_AGENT_ID=your_actual_agent_id`
   - Save the file

7. **Restart Backend Server**
   - The server should auto-reload
   - Or manually restart: `npm run server`

8. **Test Bulk Calls**
   - Go to: http://localhost:3001/admin/bulk-calls
   - Click "Retry All Failed" button
   - Your calls should now work! ✅

## 📝 Example `.env.local` Configuration

```bash
# Bolna AI API Key for automated voice calls
BOLNA_API_KEY=your_bolna_api_key_here
BOLNA_AGENT_ID=your_bolna_agent_id_here

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/assure-ai

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key_here

# Next.js App URL
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## 🔍 How to Verify It's Working

After updating the Agent ID:

1. **Check Server Logs**
   - Look for: `📞 Triggering Bolna call to...`
   - Should NOT see: "BOLNA_AGENT_ID is not configured"

2. **Check Bulk Calls Dashboard**
   - Failed calls should show a different error (if any)
   - Or status should change to "Completed" ✅

3. **Test with Sample CSV**
   - Upload `sample-contacts.csv` again
   - Calls should process without API key errors

## ❓ Need Help?

**If you can't find your Agent ID:**
1. Check Bolna documentation: https://docs.bolna.dev
2. Contact Bolna support
3. Look for Account Settings or API Settings in dashboard

**Alternative: Create Test Agent**
If you're just testing, create a simple test agent in Bolna dashboard with basic settings.

---

**Status:** ⏳ Waiting for you to add Bolna Agent ID
**Next Step:** Update `BOLNA_AGENT_ID` in `.env.local` file

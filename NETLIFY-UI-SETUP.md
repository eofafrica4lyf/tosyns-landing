# Netlify UI Setup Guide - Fix Publish Directory Issue

## 🐛 Current Issue
The build is failing because Netlify UI is setting a publish directory that conflicts with the Next.js plugin.

## ✅ Solution: Proper Netlify UI Configuration

### Step 1: Go to Netlify Dashboard
1. Go to your site in the Netlify dashboard
2. Click on **"Site settings"**

### Step 2: Fix Build Settings
1. Go to **"Build & deploy"** → **"Build settings"**
2. **IMPORTANT**: **Remove the publish directory** setting
   - If you see "Publish directory" set to `out`, **delete it**
   - Leave it empty/blank
3. Make sure **Build command** is: `pnpm build`

### Step 3: Verify Environment Variables
1. Go to **"Environment variables"**
2. Make sure you have:
   - `RESEND_API_KEY` = your Resend API key
   - `CONTACT_EMAIL` = your email address
   - `NODE_VERSION` = `18` (optional, but recommended)

### Step 4: Redeploy
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

## 🔧 Alternative: Manual Configuration

If the UI doesn't let you remove the publish directory:

### Option 1: Create New Site
1. Create a **new site** from the same repository
2. **Don't set any publish directory** during setup
3. Let the Next.js plugin handle everything automatically

### Option 2: Use Netlify CLI
```bash
# Install Netlify CLI (if you can)
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod
```

## 📋 What Should Work

After fixing the publish directory issue:
- ✅ Build will complete successfully
- ✅ Next.js plugin will handle routing automatically
- ✅ API routes will work properly
- ✅ Contact form will function
- ✅ All pages will be accessible

## 🎯 Key Points

- **Don't set a publish directory** - let the Next.js plugin handle it
- **The plugin automatically** creates the correct build output
- **API routes work** without manual redirect configuration
- **Environment variables** are still required for the contact form

## 🚀 Expected Result

Your site should deploy successfully and be accessible at:
`https://your-site-name.netlify.app`

The contact form will work and send emails to your specified address. 
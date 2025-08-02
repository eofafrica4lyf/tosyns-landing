# Quick Deploy to Netlify - No CLI Required

## 🚀 Method 1: Netlify UI (Recommended - Easiest)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/tosyns-landing.git
git push -u origin main
```

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub and select your repository
4. Set build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: Leave empty (Netlify will auto-detect)
5. Click **"Deploy site"**

### Step 3: Set Environment Variables
In Netlify dashboard → Site settings → Environment variables:
- `RESEND_API_KEY` = your Resend API key
- `CONTACT_EMAIL` = your email

## 🎯 Method 2: Drag & Drop (Super Easy)

### Step 1: Build Locally
```bash
./build-for-netlify.sh
```

### Step 2: Upload to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop your entire project folder
4. Your site will be live instantly!

### Step 3: Set Environment Variables
- Go to Site settings → Environment variables
- Add your Resend API key and contact email

## 🔧 Prerequisites

1. **Node.js 18+** installed
2. **Resend API key** from [resend.com](https://resend.com)
3. **GitHub account** (for Method 1)

## 📋 What Gets Deployed

- ✅ Responsive landing page
- ✅ Contact form (with email functionality)
- ✅ Modern UI with Tailwind CSS
- ✅ Mobile-friendly design
- ✅ SEO optimized

## 🎨 Customization

After deployment, you can:
- Add a custom domain
- Set up form notifications
- Configure analytics
- Add more pages

## 🆘 Troubleshooting

**Build fails?**
- Make sure Node.js 18+ is installed
- Run `./build-for-netlify.sh` to test locally first

**Contact form not working?**
- Check environment variables are set correctly
- Verify Resend API key is valid

**Images not loading?**
- All images are in `public/images/` and should work automatically

## 🎉 You're Done!

Your Tosyns landing page will be live at a Netlify URL like:
`https://your-site-name.netlify.app` 
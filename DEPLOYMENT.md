# Deploying Tosyns Landing Page to Netlify

## Prerequisites

1. **Node.js 18+** installed on your system
2. **Git** repository with your code pushed to GitHub/GitLab/Bitbucket
3. **Netlify account** (free tier works fine)

## Method 1: Deploy via Netlify UI (Recommended)

### Step 1: Prepare Your Repository
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Make sure the repository is public (or you have a paid Netlify plan)

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider and select your `tosyns-landing` repository
4. Configure the build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `out`
   - **Node version**: Set to 18 or higher in Environment variables

### Step 3: Set Environment Variables
In your Netlify dashboard, go to **Site settings** → **Environment variables** and add:
- `RESEND_API_KEY` - Your Resend API key
- `CONTACT_EMAIL` - Email where contact form submissions should be sent

### Step 4: Deploy
Click **"Deploy site"** and wait for the build to complete.

## Method 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Initialize Netlify (First time only)
```bash
netlify init
```

### Step 4: Build and Deploy
```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Deploy to Netlify
netlify deploy --prod --dir=out
```

## Method 3: Use the Deployment Script

1. Make sure you have Node.js and pnpm installed
2. Run the deployment script:
```bash
./deploy.sh
```

## Configuration Files

The project includes these configuration files for Netlify:

- `netlify.toml` - Netlify build configuration
- `next.config.mjs` - Next.js configuration with static export enabled

## Environment Variables

Make sure to set these environment variables in your Netlify dashboard:

- `RESEND_API_KEY` - Required for the contact form to work
- `CONTACT_EMAIL` - Email address to receive contact form submissions

## Custom Domain (Optional)

1. In your Netlify dashboard, go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your domain

## Troubleshooting

### Build Errors
- Make sure Node.js version is 18 or higher
- Check that all dependencies are installed: `pnpm install`
- Verify the build command works locally: `pnpm build`

### Contact Form Not Working
- Verify `RESEND_API_KEY` is set correctly
- Check that `CONTACT_EMAIL` is a valid email address
- Test the form locally first

### Images Not Loading
- Make sure all images are in the `public/images/` directory
- Verify image paths in the code are correct

## Support

If you encounter issues:
1. Check the Netlify build logs in your dashboard
2. Verify all environment variables are set correctly
3. Test the build locally before deploying 
#!/bin/bash

echo "🚀 Deploying Tosyns Landing Page to Netlify..."

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli@latest
fi

# Build the project
echo "📦 Building project..."
pnpm build

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=out

echo "✅ Deployment complete!" 
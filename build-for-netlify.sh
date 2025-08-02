#!/bin/bash

echo "🚀 Building Tosyns Landing Page for Netlify..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build the project
echo "🔨 Building project..."
pnpm build

# Check if build was successful
if [ -d ".next" ]; then
    echo "✅ Build successful! Files are in the '.next' directory."
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to netlify.com"
    echo "2. Connect your Git repository for automatic deployments"
    echo "3. Or drag and drop the entire project folder for manual deployment"
    echo ""
    echo "📁 Your built files are ready in: $(pwd)/.next"
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi 
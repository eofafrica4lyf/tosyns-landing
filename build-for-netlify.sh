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
if [ -d "out" ]; then
    echo "✅ Build successful! Files are in the 'out' directory."
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to netlify.com"
    echo "2. Drag and drop the 'out' folder to deploy"
    echo "3. Or use the Netlify UI to connect your Git repository"
    echo ""
    echo "📁 Your built files are ready in: $(pwd)/out"
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi 
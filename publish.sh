#!/bin/bash
set -e

echo "Building site..."
rm -f _site/styles.css
npm run build

echo "Committing..."
git add -A -- ':!_site/' ':!node_modules/'
git commit -m "Publish update $(date '+%Y-%m-%d %H:%M')"

echo "Pushing to GitHub..."
git push origin main

echo "Done. Site is live."

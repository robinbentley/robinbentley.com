#!/bin/bash

# let's roll...
echo -e "\033[0;32mStarting deployment...\033[0m"

# terminate when anything fails
set -e

# switch into the public directory remove any .DS_Store files
cd public
find . -name '.DS_Store' -type f -delete

# create a new git repo in pubic and commit all files
echo -e "\033[0;32mInitialize repo...\033[0m"
git init
git checkout -b gh-pages
git add -A
git commit -m "Deployed on $(date +%d/%m/%Y) at $(date +%H:%M)"

# force push to the gh-pages branch
echo -e "\033[0;32mPushing to Github pages...\033[0m"
git remote add origin git@github.com:robinbentley/robinbentley.com.git
git push origin gh-pages --force

#!/usr/bin/env node
// Scans blog/posts/*.md and generates blog/posts.json

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const postsDir = path.join(__dirname, 'blog', 'posts');
const outputFile = path.join(__dirname, 'blog', 'posts.json');

// Create directories if they don't exist
if (!fs.existsSync(path.join(__dirname, 'blog'))) {
  fs.mkdirSync(path.join(__dirname, 'blog'));
}
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir);
}

const posts = [];

// Read all .md files
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const slug = file.replace('.md', '');
  
  // Extract title from first # heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;
  
  // Try to get date from:
  // 1. <!-- date: YYYY-MM-DD --> comment in file
  // 2. Git first commit date
  // 3. File modification time (fallback)
  let date;
  
  const dateMatch = content.match(/<!--\s*date:\s*(\d{4}-\d{2}-\d{2})\s*-->/);
  if (dateMatch) {
    date = dateMatch[1];
  } else {
    // Try git first commit date
    try {
      const gitDate = execSync(
        `git log --follow --format=%aI --diff-filter=A -- "${filePath}"`,
        { encoding: 'utf-8', cwd: __dirname }
      ).trim();
      if (gitDate) {
        date = gitDate.split('T')[0];
      }
    } catch (e) {
      // Git not available or file not committed
    }
    
    // Fallback to file modification time
    if (!date) {
      const stat = fs.statSync(filePath);
      date = stat.mtime.toISOString().split('T')[0];
    }
  }
  
  posts.push({ slug, title, date });
}

// Sort by date descending
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write JSON
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated ${outputFile} with ${posts.length} posts`);

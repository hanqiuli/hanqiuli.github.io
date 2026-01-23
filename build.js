#!/usr/bin/env node
// Scans blog/posts/*.md and generates blog/posts.json

const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'blog', 'posts');
const outputFile = path.join(__dirname, 'blog', 'posts.json');

const posts = [];

// Create directories if they don't exist
if (!fs.existsSync(path.join(__dirname, 'blog'))) {
  fs.mkdirSync(path.join(__dirname, 'blog'));
}
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir);
}

// Read all .md files
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const slug = file.replace('.md', '');
  
  // Extract date from <!-- date: YYYY-MM-DD -->
  const dateMatch = content.match(/<!--\s*date:\s*(\d{4}-\d{2}-\d{2})\s*-->/);
  const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
  
  // Extract title from first # heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;
  
  posts.push({ slug, title, date });
}

// Sort by date descending
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write JSON
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated ${outputFile} with ${posts.length} posts`);

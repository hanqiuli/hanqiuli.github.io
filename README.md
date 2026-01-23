# Personal Website

Ultra-minimal personal website with auto-updating blog.

## Writing a New Post

1. Create `blog/posts/my-post.md`:

```markdown
<!-- date: 2026-01-25 -->

# My Post Title

Your content here...
```

2. Push to GitHub. Done!

GitHub Actions automatically updates `posts.json` and the home page shows your new post.

## Local Development

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

To manually rebuild posts.json locally:
```bash
node build.js
```

## Structure

```
├── index.html          # Home (reads posts.json)
├── cv.html             # CV
├── projects.html       # Projects
├── blog/
│   ├── post.html       # Single post template
│   ├── posts.json      # Auto-generated post index
│   └── posts/*.md      # Your posts (just create these!)
├── build.js            # Generates posts.json
└── .github/workflows/  # Auto-runs build.js on push
```

## Deploy

1. Push to GitHub
2. Settings → Pages → Deploy from branch → main
3. Your site is live!

## Post Format

```markdown
<!-- date: 2026-01-25 -->

# Post Title

Content with **markdown**, $\LaTeX$, and images.

$$
E = mc^2
$$

![alt](https://example.com/image.jpg)
```

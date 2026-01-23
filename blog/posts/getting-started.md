# Getting Started with Static Sites

Static sites are making a comeback, and for good reason. They're fast, secure, and simple to deploy.

## Why Static?

1. **Speed** - No server-side processing means instant page loads
2. **Security** - No database or backend to hack
3. **Simplicity** - Just HTML, CSS, and files
4. **Free hosting** - GitHub Pages, Netlify, and others host static sites for free

## The Simplest Approach

You don't need a build system. You don't need npm. You just need:

- A text editor
- HTML files
- A CSS file
- A web browser

That's it. Write your content, save the file, refresh the browser.

## Markdown for Blog Posts

Writing in Markdown is much nicer than writing HTML. This site uses [zero-md](https://zerodevx.github.io/zero-md/) to render Markdown files directly in the browser.

```markdown
# This is a heading

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2
```

## Getting Your Site Online

The easiest way to deploy:

1. Create a GitHub repository
2. Push your files
3. Enable GitHub Pages in settings
4. Your site is live at `username.github.io/repo-name`

No build step. No CI/CD. Just files.

Happy building!

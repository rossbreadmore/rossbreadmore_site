# Ross Breadmore Site Guide

This guide helps you manage your Eleventy-powered personal site.

---

## ✅ 1. Create New Posts

### Option 1: Manual via Terminal
1. Open terminal and navigate to your posts folder:
   ```bash
   cd ~/Desktop/rossbreadmore_site/posts
   ```

2. Create a new markdown file:
   ```bash
   touch my-new-post.md
   ```

3. Open the file and add front matter + content:
   ```markdown
   ---
   title: "My New Post"
   date: 2025-05-28
   layout: post.njk
   ---

   Here’s the content of my new blog post. Markdown makes writing easy!
   ```

---

## 🚀 2. Push Changes Live Using Terminal

From your root project folder:

```bash
cd ~/Desktop/rossbreadmore_site
git add .
git commit -m "Add new post"
git push
```

This pushes changes to GitHub and triggers a Netlify deploy (if connected).

---

## 🖼️ 3. Insert Images

1. Save images to:
   ```
   /rossbreadmore_site/images/
   ```

2. Reference them in markdown like:
   ```markdown
   ![Alt text](../images/filename.jpg)
   ```

---

## ⚙️ 4. Automate New Post Creation

You can create a script called `new-post.js` (or use `npm run new-post`) to generate posts with a title and current date.

Add this in your `package.json`:
```json
"scripts": {
  "new-post": "node new-post.js"
}
```

And create a `new-post.js` file with logic to prompt for title, create file, and add template.

---

## 🧠 5. Notion Integration (Manual Workflow)

- Use Notion to draft posts.
- Export the draft as Markdown.
- Paste it into a new `.md` file in `/posts/`.
- Push to GitHub as normal.

For automation (optional):
- Use Notion’s API + GitHub Action to sync content.

---

## 🌟 Optional Improvements

- Lazy load images: `loading="lazy"` in `<img>` tags
- Image compression via TinyPNG or ImageMagick
- Use Eleventy plugins for responsive images
- Custom 404 page

---

Enjoy!

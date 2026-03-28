# rossbreadmore.com — Claude instructions

## What this site is
Personal creative showcase for Ross Breadmore — design and product leader. Features writing, professional work history, and creative projects. Built with Eleventy (11ty) v2, Nunjucks templates, vanilla CSS. Deployed via GitHub Pages or similar from the `main` branch.

## Stack
- **Generator:** Eleventy 2.x (`npm run build` to build, output goes to `_site/`)
- **Templates:** Nunjucks (`.njk`) in `_includes/` for layouts, content pages at root or in subdirectories
- **Styles:** Single file — `styles.css` at root, copied to `_site/` on build
- **Fonts:** Inter (body) + Space Grotesk (headings/labels) via Google Fonts
- **Posts:** Markdown files in `posts/`, collected as `collections.posts`
- **No JS frameworks.** Keep it that way.

## Design system
The site uses a bold brutalist aesthetic. Respect these rules in every change:

- **Colours:** `--black: #0a0a0a`, `--white: #ffffff`, `--accent: #F0FF00` (acid yellow). Use accent sparingly — hover states and index chips only.
- **Type:** Space Grotesk for all headings and labels — always uppercase with tight negative letter-spacing. Inter for body copy.
- **Borders:** Heavy rules (`3px solid`) to frame sections. Hairlines (`1px solid`) between list items. No decorative borders.
- **No:** rounded corners, box shadows, gradients, transitions longer than 0.1s, or any visual decoration that isn't structural.
- **Spacing:** Generous — let the type breathe. Don't crowd elements.

## File structure
```
_includes/
  home.njk        # layout for homepage and standalone pages
  post.njk        # layout for blog posts
_data/            # global data files
posts/            # blog post markdown files
work/
  index.njk       # /work page
FAQ/
  index.md        # /faq page
index.njk         # homepage
styles.css        # all styles — single file, no preprocessor
```

## Development rules
1. **Always run `npm run build` and confirm zero errors before committing.**
2. **Before rebuilding, delete `_site/styles.css`** — the sandbox has a permissions quirk that causes EPERM errors if it already exists. Run: `rm -f _site/styles.css && npm run build`
3. **Single CSS file.** Do not create separate CSS files or add inline styles. All styles go in `styles.css`.
4. **No new dependencies.** Don't add npm packages without a strong reason.
5. **Commit cleanly.** Stage only changed source files — never commit `_site/`, `node_modules/`, or `.DS_Store`. These are in `.gitignore`.
6. **I cannot push to GitHub** — the sandbox blocks outbound HTTPS. After committing, tell Ross to run: `cd /Users/rossbreadmore/Desktop/rossbreadmore_site && git push origin main`

## Git config
- Remote: `https://github.com/rossbreadmore/rossbreadmore_site.git`
- Branch: `main`
- Author: Ross Breadmore <rossbreadmore@gmail.com>
- Set before committing: `git config user.email "rossbreadmore@gmail.com" && git config user.name "Ross Breadmore"`

## Content tone
- Direct, minimal, confident. No filler words.
- Professional but not corporate — Ross is a hands-on leader, not a suit.
- Uppercase labels and headings are a design choice, not shouting.

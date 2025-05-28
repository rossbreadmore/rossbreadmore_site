const fs = require("fs");
const path = require("path");

const titleInput = process.argv.slice(2).join(" ");
if (!titleInput) {
  console.log("❌ Please provide a post title.");
  process.exit(1);
}

const slug = titleInput
  .toLowerCase()
  .replace(/[^\w\s-]/g, "")
  .replace(/\s+/g, "-");

const date = new Date().toISOString().split("T")[0];
const filename = `${date}-${slug}.md`;
const filepath = path.join("posts", filename);

const content = `---
title: "${titleInput}"
date: ${date}
layout: post.njk
---

Start writing **${titleInput}** here.

`;

fs.writeFileSync(filepath, content);
console.log(`✅ New post created: posts/${filename}`);

#!/usr/bin/env node
/**
 * Locks portfolio/content.html behind a password.
 *
 * Encrypts the file with AES-256-GCM, keyed by PBKDF2(password), and writes
 * the salt/iv/ciphertext to _data/portfolio.json. The site never stores the
 * password itself — only the browser, given the correct password, can
 * re-derive the key and decrypt the content (see portfolio/index.njk).
 *
 * Usage:
 *   node portfolio/encrypt-content.js "your password"
 *   PORTFOLIO_PASSWORD="your password" node portfolio/encrypt-content.js
 *   npm run portfolio:lock -- "your password"
 *
 * Run this again any time you edit portfolio/content.html or want to change
 * the password — it fully replaces _data/portfolio.json.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const password = process.argv[2] || process.env.PORTFOLIO_PASSWORD;

if (!password) {
  console.error('Usage: node portfolio/encrypt-content.js "your password"');
  console.error('   or: PORTFOLIO_PASSWORD="your password" node portfolio/encrypt-content.js');
  process.exit(1);
}

const contentPath = path.join(__dirname, 'content.html');
const outPath = path.join(__dirname, '..', '_data', 'portfolio.json');

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

// Inline any local <img src="..."> as a base64 data URI, so images ship inside
// the same encrypted blob as the text -- nothing (image included) is ever
// published as a plain, guessable-URL file. Remote (http/https) and existing
// data: URIs are left alone.
function inlineImages(html, baseDir) {
  return html.replace(/(<img\b[^>]*\bsrc=")([^"]+)(")/g, (match, pre, src, post) => {
    if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return match;
    const filePath = path.join(baseDir, src);
    if (!fs.existsSync(filePath)) {
      throw new Error('Portfolio image referenced in content.html not found: ' + filePath);
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext];
    if (!mime) {
      throw new Error('Unsupported image type for ' + filePath + ' -- add it to MIME_TYPES in encrypt-content.js');
    }
    const b64 = fs.readFileSync(filePath).toString('base64');
    return pre + 'data:' + mime + ';base64,' + b64 + post;
  });
}

let plaintext = fs.readFileSync(contentPath, 'utf8');
plaintext = inlineImages(plaintext, __dirname);

const ITERATIONS = 250000;
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);

const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');

const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
const authTag = cipher.getAuthTag();

// Web Crypto's AES-GCM appends the auth tag to the ciphertext, so we match
// that format here — the browser-side decrypt in portfolio/index.njk relies on it.
const ciphertext = Buffer.concat([encrypted, authTag]);

const out = {
  iterations: ITERATIONS,
  salt: salt.toString('base64'),
  iv: iv.toString('base64'),
  ciphertext: ciphertext.toString('base64'),
};

fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log('Portfolio content locked -> _data/portfolio.json');
console.log('(' + plaintext.length + ' bytes of source content encrypted)');

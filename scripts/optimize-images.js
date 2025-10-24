/*
  Image optimization script using sharp.
  - Scans `public/` for jpg/jpeg/png files (recursively)
  - Produces resized WebP variants under `public/optimized/<orig_path>`
  - Sizes: 1600, 1000, 600 (you can customize)

  Usage:
    npm install sharp --save-dev
    npm run optimize-images

  NOTE: This script requires `sharp` native module. Run `npm i sharp` locally before executing.
*/

const fs = require('fs').promises;
const path = require('path');
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('Missing dependency: sharp. Run `npm install sharp --save-dev` and try again.');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..', 'public');
const OUT = path.join(ROOT, 'optimized');
const SIZES = [1600, 1000, 600];
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXTENSIONS.includes(path.extname(e.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function optimize() {
  console.log('Scanning public folder for images...');
  const files = await walk(ROOT);
  console.log(`Found ${files.length} images.`);
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const outBase = path.join(OUT, path.dirname(rel));
    await ensureDir(outBase);
    const name = path.basename(file, path.extname(file));
    try {
      const img = sharp(file, { limitInputPixels: 80000000 });
      const metadata = await img.metadata();
      for (const w of SIZES) {
        const target = Math.min(w, metadata.width || w);
        const outPath = path.join(outBase, `${name}-${target}.webp`);
        await img
          .resize({ width: target })
          .webp({ quality: 80 })
          .toFile(outPath);
        console.log('wrote', outPath);
      }
    } catch (err) {
      console.error('failed optimizing', file, err.message || err);
    }
  }
  console.log('Optimization complete. Outputs are in public/optimized');
}

optimize().catch(err => {
  console.error(err);
  process.exit(1);
});

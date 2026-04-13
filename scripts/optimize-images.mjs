/**
 * Image Optimization Script
 * Compresses and resizes images for better LCP performance
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, "..", "public", "images");

// Images to optimize with their target settings
const OPTIMIZATIONS = [
  // Header images - max 1600px wide, q=75
  { pattern: /Header\/header-\d\.webp$/, maxWidth: 1600, quality: 75 },
  { pattern: /header-\d\.webp$/, maxWidth: 1600, quality: 75 },

  // Background images - max 1920px wide, q=70 (lower for backgrounds)
  { pattern: /services-bg\.webp$/, maxWidth: 1920, quality: 70 },

  // Featured cities - max 600px wide (card size), q=75
  { pattern: /Home\/.*-tourist\.webp$/, maxWidth: 600, quality: 75 },
  { pattern: /.*-tourist\.webp$/, maxWidth: 600, quality: 75 },

  // Tours - max 800px wide, q=75
  { pattern: /Tours\/Tour\d+\.webp$/, maxWidth: 800, quality: 75 },
  { pattern: /Tour\d+\.webp$/, maxWidth: 800, quality: 75 },

  // Excursions - max 800px wide, q=75
  { pattern: /Excursions\/.*\.webp$/, maxWidth: 800, quality: 75 },
];

async function getImageFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getImageFiles(fullPath)));
    } else if (entry.name.endsWith(".webp")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath, relativePath) {
  // Find matching optimization settings
  const config = OPTIMIZATIONS.find((opt) => opt.pattern.test(relativePath));
  if (!config) {
    console.log(`⏭ Skipping: ${relativePath} (no matching rule)`);
    return null;
  }

  const statBefore = await stat(filePath);
  const sizeBefore = statBefore.size / 1024;

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Skip if already smaller than target
    if (metadata.width && metadata.width <= config.maxWidth) {
      console.log(`✓ Already optimized: ${relativePath} (${metadata.width}px)`);
      return null;
    }

    // Resize and compress
    const buffer = await image
      .resize(config.maxWidth, null, {
        withoutEnlargement: true,
        fit: "inside",
      })
      .webp({ quality: config.quality })
      .toBuffer();

    const sizeAfter = buffer.length / 1024;
    const savings = sizeBefore - sizeAfter;
    const savingsPercent = ((savings / sizeBefore) * 100).toFixed(1);

    // Only write if we actually saved space
    if (savings > 0) {
      // Write to temp file first to avoid OneDrive lock issues
      const tempPath = filePath + ".tmp";
      await sharp(buffer).toFile(tempPath);

      // Replace original with optimized version
      const { rename, unlink } = await import("fs/promises");
      await unlink(filePath);
      await rename(tempPath, filePath);

      console.log(`✅ Optimized: ${relativePath}`);
      console.log(
        `   ${sizeBefore.toFixed(1)}KB → ${sizeAfter.toFixed(1)}KB (saved ${savingsPercent}%)`,
      );
      return {
        file: relativePath,
        before: sizeBefore,
        after: sizeAfter,
        savings,
      };
    } else {
      console.log(`⏭ No savings: ${relativePath}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error: ${relativePath} - ${error.message}`);
    return null;
  }
}

async function main() {
  console.log("🖼 Starting image optimization...\n");

  const files = await getImageFiles(IMAGES_DIR);
  const results = [];

  for (const file of files) {
    const relativePath = file.replace(IMAGES_DIR, "").replace(/\\/g, "/");
    const result = await optimizeImage(file, relativePath);
    if (result) results.push(result);
  }

  console.log("\n📊 Summary:");
  console.log(`   Images processed: ${files.length}`);
  console.log(`   Images optimized: ${results.length}`);

  if (results.length > 0) {
    const totalSavings = results.reduce((sum, r) => sum + r.savings, 0);
    console.log(`   Total savings: ${totalSavings.toFixed(1)}KB`);
  }
}

main().catch(console.error);

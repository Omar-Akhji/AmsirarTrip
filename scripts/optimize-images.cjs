/**
 * Image Optimization Script v2
 * Creates optimized versions in a separate folder, then user can manually replace
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = "public/images-optimized";

const IMAGES_TO_OPTIMIZE = [
  // Hero/Header images - resize to max 1920px width with lower quality for LCP
  { src: "public/images/Header/header-1.webp", maxWidth: 1920, quality: 70 },
  { src: "public/images/Header/header-2.webp", maxWidth: 1920, quality: 70 },
  { src: "public/images/Header/header-3.webp", maxWidth: 1920, quality: 70 },

  // Tour images - resize to max 640px width (actual display size) with aggressive compression
  { src: "public/images/Tours/Tour1.webp", maxWidth: 640, quality: 65 },
  { src: "public/images/Tours/Tour2.webp", maxWidth: 640, quality: 65 },
  { src: "public/images/Tours/Tour3.webp", maxWidth: 640, quality: 65 },
  { src: "public/images/Tours/Tour4.webp", maxWidth: 640, quality: 65 },
  { src: "public/images/Tours/Tour5.webp", maxWidth: 640, quality: 65 },
  { src: "public/images/Tours/Tour6.webp", maxWidth: 640, quality: 65 },
  { src: "public/images/Tours/Tour7.webp", maxWidth: 640, quality: 65 },
  { src: "public/images/Tours/Tour8.webp", maxWidth: 640, quality: 65 },
  { src: "public/images/Tours/Tour9.webp", maxWidth: 640, quality: 65 },

  // Excursion images - resize to max 640px width
  {
    src: "public/images/Excursions/Ourika_Valley.webp",
    maxWidth: 640,
    quality: 65,
  },
  {
    src: "public/images/Excursions/Ouzoud_Waterfalls.webp",
    maxWidth: 640,
    quality: 65,
  },
  {
    src: "public/images/Excursions/Essaouira.webp",
    maxWidth: 640,
    quality: 65,
  },

  // Home page destination cards - resize to max 600px width
  {
    src: "public/images/Home/Chefchaouen-tourist.webp",
    maxWidth: 600,
    quality: 65,
  },
  { src: "public/images/Home/Fez-tourist.webp", maxWidth: 600, quality: 65 },
  {
    src: "public/images/Home/valley-tourisit.webp",
    maxWidth: 600,
    quality: 65,
  },
  {
    src: "public/images/Home/Casablanca-tourist.webp",
    maxWidth: 600,
    quality: 65,
  },

  // Services background
  { src: "public/images/services-bg.webp", maxWidth: 1920, quality: 65 },
];

async function optimizeImage(config) {
  const { src, maxWidth, quality } = config;

  if (!fs.existsSync(src)) {
    console.log(`⏭️  Skipped (not found): ${src}`);
    return { saved: 0 };
  }

  const originalSize = fs.statSync(src).size;
  const metadata = await sharp(src).metadata();

  // Create output directory structure
  const relativePath = src.replace("public/images/", "");
  const outputPath = path.join(OUTPUT_DIR, relativePath);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Optimize and save to new location
  await sharp(src)
    .resize(maxWidth, null, { withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  const savings = originalSize - newSize;
  const savingsPercent = Math.round((savings / originalSize) * 100);

  console.log(`✅ ${path.basename(src)}`);
  console.log(`   ${metadata.width}x${metadata.height} → ${maxWidth}px max`);
  console.log(
    `   ${Math.round(originalSize / 1024)}KB → ${Math.round(newSize / 1024)}KB (saved ${Math.round(savings / 1024)}KB, ${savingsPercent}%)`,
  );

  return { saved: savings };
}

async function main() {
  console.log("🖼️  Image Optimization Script\n");
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let totalSaved = 0;

  for (const config of IMAGES_TO_OPTIMIZE) {
    try {
      const result = await optimizeImage(config);
      totalSaved += result.saved;
    } catch (err) {
      console.error(`❌ Error: ${config.src} - ${err.message}`);
    }
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(
    `📊 Total potential savings: ${Math.round(totalSaved / 1024)}KB (${(totalSaved / 1024 / 1024).toFixed(2)}MB)`,
  );
  console.log(`\n📁 Optimized images saved to: ${OUTPUT_DIR}`);
  console.log(
    `\n⚠️  To apply changes, manually copy from ${OUTPUT_DIR} to public/images/`,
  );
}

main().catch(console.error);

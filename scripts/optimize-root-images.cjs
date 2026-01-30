/**
 * Optimize remaining root-level images
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = "public/images-optimized";

const IMAGES = [
  { src: "public/images/Tour2.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/header-1.webp", maxWidth: 1920, quality: 80 },
  { src: "public/images/Ourika Valley.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/Ouzoud Waterfalls.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/header-3.webp", maxWidth: 1920, quality: 80 },
  { src: "public/images/Tour1.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/Essaouira.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/Chefchaouen-tourist.webp", maxWidth: 600, quality: 75 },
  { src: "public/images/header-2.webp", maxWidth: 1920, quality: 80 },
  { src: "public/images/Tour4.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/Tour5.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/Tour6.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/Fez-tourist.webp", maxWidth: 600, quality: 75 },
  { src: "public/images/Airport.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/Agafay.webp", maxWidth: 800, quality: 75 },
  { src: "public/images/Marrakech-tourist.webp", maxWidth: 600, quality: 75 },
  { src: "public/images/Casablanca-tourist.webp", maxWidth: 600, quality: 75 },
  { src: "public/images/Rabat-tourist.webp", maxWidth: 600, quality: 75 },
  {
    src: "public/images/Hot Air Balloon Ride.webp",
    maxWidth: 800,
    quality: 75,
  },
  { src: "public/images/Imlil & Toubkal.webp", maxWidth: 800, quality: 75 },
];

async function main() {
  console.log("🖼️  Optimizing root-level images...\n");

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let totalSaved = 0;

  for (const { src, maxWidth, quality } of IMAGES) {
    if (!fs.existsSync(src)) continue;

    const original = fs.statSync(src).size;
    const outPath = path.join(OUTPUT_DIR, path.basename(src));

    await sharp(src)
      .resize(maxWidth, null, { withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);

    const newSize = fs.statSync(outPath).size;
    const saved = original - newSize;
    totalSaved += saved;

    console.log(
      `✅ ${path.basename(src)}: ${Math.round(original / 1024)}KB → ${Math.round(newSize / 1024)}KB (saved ${Math.round(saved / 1024)}KB)`
    );
  }

  console.log(
    `\n📊 Total: ${Math.round(totalSaved / 1024)}KB (${(totalSaved / 1024 / 1024).toFixed(2)}MB)`
  );
}

main();

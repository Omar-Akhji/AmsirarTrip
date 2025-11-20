import fs from 'fs';
import path from 'path';
import webp from 'webp-converter';

const imagesDir = path.join(process.cwd(), 'public', 'images');

function convertToWebp(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const baseName = path.basename(filePath, ext);
    const dir = path.dirname(filePath);
    const outputPath = path.join(dir, baseName + '.webp');
    webp.cwebp(filePath, outputPath, "-q 80").then(() => {
      console.log(`Converted ${filePath} to ${outputPath}`);
    }).catch(err => console.error(err));
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else {
      convertToWebp(filePath);
    }
  });
}

walkDir(imagesDir);
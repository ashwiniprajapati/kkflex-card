const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'assets');
// Use favicon (KK-only) for PWA icons; logo has full "KK Flexo print" text and is too detailed for icon sizes
const srcPng = path.join(assetsDir, 'favicon.png');
const srcSvg = path.join(assetsDir, 'favicon.svg');
const src = fs.existsSync(srcPng) ? srcPng : fs.existsSync(srcSvg) ? srcSvg : null;
const sizes = [192, 512];

if (!src) {
  console.warn('assets/favicon.png or favicon.svg not found, skipping icon build');
  process.exit(0);
}

Promise.all(
  sizes.map((size) =>
    sharp(src)
      .resize(size, size)
      .png()
      .toFile(path.join(assetsDir, `icon-${size}.png`))
      .then(() => console.log(`Generated assets/icon-${size}.png`))
  )
).catch((err) => {
  console.error('Icon build failed:', err);
  process.exit(1);
});

// Simple icon creation using base64 encoded PNG
// This creates placeholder icons that can be replaced with better designs later

const fs = require('fs');
const path = require('path');

// Simple 1x1 PNG data URLs for different sizes
// These are minimal valid PNG files that can be scaled

const createIcon = (size, filename) => {
  // Create a simple SVG and convert it
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.15}" />
  <rect x="${size * 0.25}" y="${size * 0.2}" width="${size * 0.5}" height="${size * 0.6}" fill="white" rx="${size * 0.05}" />
  <rect x="${size * 0.32}" y="${size * 0.35}" width="${size * 0.36}" height="${size * 0.06}" fill="#667eea" rx="${size * 0.02}" />
  <rect x="${size * 0.32}" y="${size * 0.45}" width="${size * 0.36}" height="${size * 0.06}" fill="#667eea" rx="${size * 0.02}" />
  <rect x="${size * 0.32}" y="${size * 0.55}" width="${size * 0.24}" height="${size * 0.06}" fill="#667eea" rx="${size * 0.02}" />
  <circle cx="${size * 0.75}" cy="${size * 0.25}" r="${size * 0.08}" fill="#ffd700" />
</svg>`;

  fs.writeFileSync(path.join(__dirname, filename), svg);
  console.log(`Created ${filename}`);
};

// Create icons
createIcon(16, 'icon16.svg');
createIcon(32, 'icon32.svg');
createIcon(48, 'icon48.svg');
createIcon(128, 'icon128.svg');

console.log('All icons created! Convert SVG to PNG using an online tool or imagemagick:');
console.log('  convert icon16.svg icon16.png');
console.log('  convert icon32.svg icon32.png');
console.log('  convert icon48.svg icon48.png');
console.log('  convert icon128.svg icon128.png');

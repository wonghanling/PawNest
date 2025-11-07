const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const optimizedDir = path.join(publicDir, 'optimized');

async function convertImage() {
  console.log('🚀 Converting 75.jpg to 15.webp...');
  console.log('Converting to WebP format and resizing to 800x800...\n');

  const inputPath = path.join(publicDir, '75.jpg');
  const outputPath = path.join(optimizedDir, '15.webp');

  if (!fs.existsSync(inputPath)) {
    console.log('❌ Error: 75.jpg not found in public folder');
    return;
  }

  try {
    const inputStats = fs.statSync(inputPath);

    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 80,
        effort: 6
      })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const compressionRatio = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

    console.log(`✅ 75.jpg -> 15.webp`);
    console.log(`   Size: ${Math.round(inputStats.size/1024)}KB -> ${Math.round(outputStats.size/1024)}KB (${compressionRatio}% reduction)`);
    console.log('\n🎉 Conversion completed!');
  } catch (error) {
    console.error(`❌ Error processing 75.jpg -> 15.webp:`, error.message);
  }
}

convertImage().catch(console.error);

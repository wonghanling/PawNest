const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertSingleImage(filename) {
  const optimizedDir = path.join(__dirname, '../public/optimized');
  const inputPath = path.join(optimizedDir, filename);
  const outputFileName = filename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const outputPath = path.join(optimizedDir, outputFileName);

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

    console.log(`✅ Converted: ${filename} -> ${outputFileName}`);
    console.log(`   Size: ${Math.round(inputStats.size/1024)}KB -> ${Math.round(outputStats.size/1024)}KB (${compressionRatio}% reduction)`);
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
}

// Convert 8.jpg
convertSingleImage('8.jpg').catch(console.error);
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizedDir = path.join(__dirname, '../public/optimized');

async function convertSingleFile(filename) {
  const inputPath = path.join(optimizedDir, filename);
  const outputFileName = filename.replace(/\.jpg$/i, '.webp');
  const outputPath = path.join(optimizedDir, outputFileName);

  try {
    if (!fs.existsSync(inputPath)) {
      console.log(`❌ File not found: ${filename}`);
      return;
    }

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

// Only convert 21.jpg
convertSingleFile('21.jpg').catch(console.error);
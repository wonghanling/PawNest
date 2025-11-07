const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const optimizedDir = path.join(publicDir, 'optimized');

async function convertImages() {
  console.log('🚀 Converting 1-11.jpg to 184-194.webp...');
  console.log('Converting to WebP format and resizing to 800x800...\n');

  const promises = [];

  // 处理 1-11.jpg，输出为 184-194.webp
  for (let sourceNum = 1; sourceNum <= 11; sourceNum++) {
    const targetNum = sourceNum + 183; // 1+183=184

    const inputPath = path.join(publicDir, `${sourceNum}.jpg`);
    const outputPath = path.join(optimizedDir, `${targetNum}.webp`);

    if (fs.existsSync(inputPath)) {
      promises.push(convertSingleImage(inputPath, outputPath, sourceNum, targetNum));
    } else {
      console.log(`⚠️  Skipped: ${sourceNum}.jpg (file not found)`);
    }
  }

  await Promise.all(promises);
  console.log('\n🎉 Conversion completed!');
}

async function convertSingleImage(inputPath, outputPath, sourceNum, targetNum) {
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

    console.log(`✅ ${sourceNum}.jpg -> ${targetNum}.webp`);
    console.log(`   Size: ${Math.round(inputStats.size/1024)}KB -> ${Math.round(outputStats.size/1024)}KB (${compressionRatio}% reduction)`);
  } catch (error) {
    console.error(`❌ Error processing ${sourceNum}.jpg -> ${targetNum}.webp:`, error.message);
  }
}

convertImages().catch(console.error);

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const optimizedDir = path.join(publicDir, 'optimized');

async function convertSpecificRange() {
  console.log('🚀 Converting 200-262.jpg to 129-191.webp...');
  console.log('Converting to WebP format and resizing to 800x800...\n');

  const promises = [];

  // 只处理 200-262.jpg，输出为 129-191.webp
  for (let sourceNum = 200; sourceNum <= 262; sourceNum++) {
    const targetNum = sourceNum - 71; // 200-71=129

    const inputPath = path.join(publicDir, `${sourceNum}.jpg`);
    const outputPath = path.join(optimizedDir, `${targetNum}.webp`);

    if (fs.existsSync(inputPath)) {
      promises.push(convertSingleImage(inputPath, outputPath, sourceNum, targetNum));
    } else {
      console.log(`⚠️  Skipped: ${sourceNum}.jpg (file not found)`);
    }
  }

  await Promise.all(promises);
  console.log('\n🎉 Specific range conversion completed!');
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

convertSpecificRange().catch(console.error);
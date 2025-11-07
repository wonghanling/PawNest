const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizedDir = path.join(__dirname, '../public/optimized');

async function optimizeSpecificRange(startNum, endNum) {
  console.log(`🚀 Converting JPG files ${startNum}-${endNum} to WebP format...`);
  console.log('Converting to WebP format and resizing to 800x800...\n');

  const promises = [];

  for (let i = startNum; i <= endNum; i++) {
    const inputPath = path.join(optimizedDir, `${i}.jpg`);
    const outputPath = path.join(optimizedDir, `${i}.webp`);

    if (fs.existsSync(inputPath)) {
      promises.push(optimizeImage(inputPath, outputPath, i));
    } else {
      console.log(`⚠️  Skipped: ${i}.jpg (file not found)`);
    }
  }

  await Promise.all(promises);
  console.log('\n🎉 Range optimization completed!');
}

async function optimizeImage(inputPath, outputPath, number) {
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

    console.log(`✅ Optimized: ${number}.jpg -> ${number}.webp`);
    console.log(`   Size: ${Math.round(inputStats.size/1024)}KB -> ${Math.round(outputStats.size/1024)}KB (${compressionRatio}% reduction)`);
  } catch (error) {
    console.error(`❌ Error processing ${number}.jpg:`, error.message);
  }
}

// Convert 92-118
optimizeSpecificRange(92, 118).catch(console.error);
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const optimizedDir = path.join(publicDir, 'optimized');

// 创建优化后的图片目录
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
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

    console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png)$/i.test(file) &&
    !file.includes('optimized')
  );

  console.log(`🚀 Starting optimization of ${imageFiles.length} images...`);
  console.log('Converting to WebP format and resizing to 800x800...\n');

  const promises = imageFiles.map(async (file) => {
    const inputPath = path.join(publicDir, file);
    const outputFileName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(optimizedDir, outputFileName);

    return optimizeImage(inputPath, outputPath);
  });

  await Promise.all(promises);

  console.log('\n🎉 Image optimization completed!');
  console.log(`📁 Optimized images saved to: ${optimizedDir}`);
}

// 运行优化
optimizeAllImages().catch(console.error);
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const public2Dir = path.join(__dirname, '../public2');
const webDir = path.join(__dirname, '../public/web');

// 创建 web 目录
if (!fs.existsSync(webDir)) {
  fs.mkdirSync(webDir, { recursive: true });
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

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const compressionRatio = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

    console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`   Size: ${Math.round(inputStats.size/1024)}KB -> ${Math.round(outputStats.size/1024)}KB (${compressionRatio}% reduction)`);
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

async function optimizePublic2Images() {
  if (!fs.existsSync(public2Dir)) {
    console.error('❌ public2 directory not found');
    return;
  }

  const files = fs.readdirSync(public2Dir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png)$/i.test(file)
  );

  console.log(`🚀 Starting optimization of ${imageFiles.length} images from public2...`);
  console.log('Converting to WebP format and saving to public/web/...\n');

  const promises = imageFiles.map(async (file) => {
    const inputPath = path.join(public2Dir, file);
    const outputFileName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(webDir, outputFileName);

    return optimizeImage(inputPath, outputPath);
  });

  await Promise.all(promises);

  console.log('\n🎉 Public2 image optimization completed!');
  console.log(`📁 WebP images saved to: ${webDir}`);
}

// 运行优化
optimizePublic2Images().catch(console.error);
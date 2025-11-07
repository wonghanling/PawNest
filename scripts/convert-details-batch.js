const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const sourceDir = path.join(publicDir, '图片');  // 从图片文件夹读取
const detailsDir = path.join(publicDir, 'details');

async function convertImages() {
  console.log('🚀 开始批量转换 public/图片/*.jpg 到 public/details/*.webp');
  console.log('⚠️  只操作 public 文件夹，不会碰 optimized 文件夹');
  console.log('转换设置: 800x800, quality 80, effort 6\n');

  const promises = [];
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // 遍历 1-1502，转换所有存在的 jpg 和 png
  for (let i = 1; i <= 1502; i++) {
    const jpgPath = path.join(sourceDir, `${i}.jpg`);
    const pngPath = path.join(sourceDir, `${i}.png`);
    const outputPath = path.join(detailsDir, `${i}.webp`);

    let inputPath = null;
    if (fs.existsSync(jpgPath)) {
      inputPath = jpgPath;
    } else if (fs.existsSync(pngPath)) {
      inputPath = pngPath;
    }

    if (inputPath) {
      promises.push(
        convertSingleImage(inputPath, outputPath, i).then(result => {
          if (result === 'success') successCount++;
          else if (result === 'error') errorCount++;
        })
      );

      // 每50个图片处理一批，避免内存问题
      if (promises.length >= 50) {
        await Promise.all(promises);
        promises.length = 0;
      }
    } else {
      skipCount++;
    }
  }

  // 处理剩余的
  if (promises.length > 0) {
    await Promise.all(promises);
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 批量转换完成！');
  console.log(`✅ 成功: ${successCount} 个文件`);
  console.log(`⏭️  跳过: ${skipCount} 个文件（不存在）`);
  if (errorCount > 0) {
    console.log(`❌ 错误: ${errorCount} 个文件`);
  }
  console.log('='.repeat(60));
}

async function convertSingleImage(inputPath, outputPath, num) {
  try {
    const inputStats = fs.statSync(inputPath);
    const ext = path.extname(inputPath);

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

    console.log(`✅ ${num}${ext} -> details/${num}.webp (${Math.round(inputStats.size/1024)}KB -> ${Math.round(outputStats.size/1024)}KB, -${compressionRatio}%)`);
    return 'success';
  } catch (error) {
    console.error(`❌ Error processing ${num}: ${error.message}`);
    return 'error';
  }
}

convertImages().catch(console.error);

const sharp = require('sharp')
const path = require('path')

async function convertImage() {
  const inputPath = path.join(__dirname, '..', 'public', '2000.jpg')
  const outputPath = path.join(__dirname, '..', 'public', 'details', '2000.webp')

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
      .toFile(outputPath)

    console.log('✅ 成功转换: 2000.jpg -> details/2000.webp')
  } catch (error) {
    console.error('❌ 转换失败:', error.message)
  }
}

convertImage()
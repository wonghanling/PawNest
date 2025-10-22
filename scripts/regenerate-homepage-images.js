const sharp = require('sharp');
const path = require('path');

async function regenerateSpecificImages() {
  const publicDir = path.join(__dirname, '../public');
  const optimizedDir = path.join(publicDir, 'optimized');

  const filesToProcess = ['2.jpg', '3.jpg'];

  console.log('🚀 Regenerating specific missing WebP files...\n');

  for (const file of filesToProcess) {
    try {
      const inputPath = path.join(publicDir, file);
      const outputFileName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      const outputPath = path.join(optimizedDir, outputFileName);

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

      console.log(`✅ Regenerated: ${file} -> ${outputFileName}`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log('\n🎉 Homepage images regenerated successfully!');
}

regenerateSpecificImages().catch(console.error);
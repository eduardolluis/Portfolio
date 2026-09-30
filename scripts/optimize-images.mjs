import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function optimizeFolder(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await optimizeFolder(fullPath);
    } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const origSize = stat.size;
      const tmpPath = fullPath + '.tmp';
      
      const image = sharp(fullPath);
      const meta = await image.metadata();
      
      // Resize if overly large (> 1400px width)
      let pipeline = sharp(fullPath);
      if (meta.width && meta.width > 1200) {
        pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
      }
      
      if (file.endsWith('.png')) {
        await pipeline
          .png({ compressionLevel: 9, quality: 85 })
          .toFile(tmpPath);
      } else {
        await pipeline
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(tmpPath);
      }
      
      const newStat = fs.statSync(tmpPath);
      if (newStat.size < origSize) {
        fs.renameSync(tmpPath, fullPath);
        console.log(`✓ ${file}: ${(origSize / 1024).toFixed(0)}KB -> ${(newStat.size / 1024).toFixed(0)}KB`);
      } else {
        fs.unlinkSync(tmpPath);
        console.log(`- ${file}: kept original (${(origSize / 1024).toFixed(0)}KB)`);
      }
    }
  }
}

await optimizeFolder(path.resolve('public/images/projects'));
console.log('Finished optimizing project images');

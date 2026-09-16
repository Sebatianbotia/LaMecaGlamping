const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const foldersToConvert = [
  'public',
  'public/restaurante',
  'public/glamping'
];

async function convert() {
  for (const folder of foldersToConvert) {
    const dir = path.join(__dirname, folder);
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === 'og-image.png' || file === 'og-image.jpg' || file.startsWith('favicon') || file === 'apple-touch-icon.png') {
        continue;
      }
      
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const input = path.join(dir, file);
        const output = path.join(dir, file.replace(new RegExp(`\\${ext}$`, 'i'), '.webp'));
        
        await sharp(input).webp({ quality: 80 }).toFile(output);
        console.log(`Converted ${input} to ${output}`);
        // Delete original file
        fs.unlinkSync(input);
      }
    }
  }
}
convert().catch(console.error);

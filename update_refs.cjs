const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  // public/
  ['/fogata.png', '/fogata.webp'],
  ['/fogata.jpg', '/fogata.webp'],
  ['/LOGO.png', '/LOGO.webp'],
  ['/MainImage.jpg', '/MainImage.webp'],
  ['/suite.png', '/suite.webp'],
  ['/suite2.png', '/suite2.webp'],
  ['/web-app-manifest-192x192.png', '/web-app-manifest-192x192.webp'],
  ['/web-app-manifest-512x512.png', '/web-app-manifest-512x512.webp'],
  
  // public/restaurante/
  ['/restaurante/burguer.png', '/restaurante/burguer.webp'],
  ['/restaurante/burguer2.png', '/restaurante/burguer2.webp'],
  ['/restaurante/copa.png', '/restaurante/copa.webp'],
  ['/restaurante/local.png', '/restaurante/local.webp'],
  ['/restaurante/local2.jpg', '/restaurante/local2.webp'],
  ['/restaurante/plato.png', '/restaurante/plato.webp'],
  ['/restaurante/pollo.png', '/restaurante/pollo.webp'],
  ['/restaurante/steak1.png', '/restaurante/steak1.webp'],
  ['/restaurante/steak2.png', '/restaurante/steak2.webp'],
  ['/restaurante/steak3.png', '/restaurante/steak3.webp'],
  ['/restaurante/vino.png', '/restaurante/vino.webp'],
  
  // public/glamping/
  ['/glamping/bano.jpg', '/glamping/bano.webp'],
  ['/glamping/glam1.jpg', '/glamping/glam1.webp'],
  ['/glamping/glam2.jpg', '/glamping/glam2.webp'],
  ['/glamping/glam3.jpg', '/glamping/glam3.webp'],
  ['/glamping/glam4.jpg', '/glamping/glam4.webp'],
  ['/glamping/glam6.jpg', '/glamping/glam6.webp'],
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'public') {
        processDirectory(fullPath);
      }
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.html') || file.endsWith('.css')) {
        // don't read ourselves
        if (fullPath.includes('update_refs')) continue;
        
        let content = fs.readFileSync(fullPath, 'utf8');
        let changed = false;
        
        for (const [oldPath, newPath] of filesToUpdate) {
          if (content.includes(oldPath)) {
            content = content.split(oldPath).join(newPath);
            changed = true;
          }
        }
        
        if (changed) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

// process src directory
const srcPath = path.join(__dirname, 'src');
if (fs.existsSync(srcPath)) {
  processDirectory(srcPath);
}

// process root directory (for index.html)
const rootFiles = fs.readdirSync(__dirname);
for (const file of rootFiles) {
  const fullPath = path.join(__dirname, file);
  if (!fs.statSync(fullPath).isDirectory()) {
    if (file === 'index.html') {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldPath, newPath] of filesToUpdate) {
        if (content.includes(oldPath)) {
          content = content.split(oldPath).join(newPath);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

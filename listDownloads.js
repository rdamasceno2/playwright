// listDownloads.js
const path = require('path');
const os = require('os');
const fs = require('fs').promises;

// Get user's Downloads folder (cross-platform)
const downloadsDir = path.join(os.homedir(), 'Downloads');

async function listAllFiles(dirPath) {
  try {
    console.log(`Reading directory: ${dirPath}`);
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    console.log(`Found ${entries.length} entries`);
    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => entry.name);
    return files;
  } catch (err) {
    console.error('Error reading Downloads directory:', err.message);
    console.error(err);
    process.exit(1);
  }
}

(async () => {
  const files = await listAllFiles(downloadsDir);
  console.log('Files in Downloads folder:');
  files.forEach(file => console.log(file));
})();

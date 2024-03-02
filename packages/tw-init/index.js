const fs = require('fs');
const plugin = require('tailwindcss/plugin');
const initializer = require('./initializer');
const crypto = require('crypto');

module.exports = plugin.withOptions(({ path = 'safelist.txt', patterns = [] }) => ({ theme }) => {
  const safeList = initializer(theme)(patterns).join('\n');
  let currentSafeList = '';
  if (fs.existsSync(path)) {
    currentSafeList = fs.readFileSync(path).toString();
  } else {
    fs.writeFileSync(path, safeList);
  }

  const hash = crypto.createHash('md5').update(JSON.stringify(safeList)).digest('hex');
  const prevHash = crypto.createHash('md5').update(JSON.stringify(currentSafeList)).digest('hex');

  if (hash !== prevHash) {
    return fs.writeFileSync(path, safeList);
  }
});

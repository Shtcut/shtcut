const { writeFileSync } = require('node:fs');
const path = `${__dirname}/../dist`;
const src = '/index.js';
const dest = '/index.mjs';

const cjsExports = Object.keys(require(`${path}${src}`))
  .map((m) => `\t${m}`)
  .join(',\n');

const importHead = `import {\n${cjsExports}\n} from '.${src}'`;
const exportHead = `export {\n${cjsExports}\n`;

writeFileSync(`${path}${dest}`, `${importHead}\n\n${exportHead}`);

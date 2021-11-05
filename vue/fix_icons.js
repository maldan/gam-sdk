const fs = require('fs');

const files = fs.readdirSync('./asset/icon');
for (let i = 0; i < files.length; i++) {
  const file = fs.readFileSync(`./asset/icon/${files[i]}`, 'utf-8');
  const fixed = file.replace(/fill="(.*?)"/g, 'fill="currentcolor"');
  fs.writeFileSync(`./asset/icon/${files[i]}`, fixed);
}

const fs = require('fs');
const path = 'src/locale/i18n.web.ts';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
  "document.documentElement.dir = sanitizedLanguage.startsWith('ar') ? 'rtl' : 'ltr'",
  "document.documentElement.dir = 'ltr'"
);

fs.writeFileSync(path, code, 'utf8');
console.log('Restored layout direction to ltr cleanly!');

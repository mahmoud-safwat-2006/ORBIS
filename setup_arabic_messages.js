const fs = require('fs');

// 1. نسخ messages.ts إلى arabicMessages.ts
const messagesContent = fs.readFileSync('src/locale/locales/ar/messages.ts', 'utf8');
fs.writeFileSync('src/locale/locales/ar/arabicMessages.ts', messagesContent, 'utf8');

// 2. تحديث i18n.web.ts
const path = 'src/locale/i18n.web.ts';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(
  "import(`./locales/ar/messages.ts`).then(m => m.messages)",
  "import(`./locales/ar/arabicMessages`).then(m => m.messages)"
);

fs.writeFileSync(path, code, 'utf8');
console.log('SUCCESS: Now directly importing arabicMessages!');

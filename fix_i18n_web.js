const fs = require('fs');
const path = 'src/locale/i18n.web.ts';
let code = fs.readFileSync(path, 'utf8');

// استيراد messages.ts مباشرة
code = code.replace(
  "import(`./locales/ar/messages`).then(m => m.messages)",
  "import(`./locales/ar/messages.ts`).then(m => m.messages)"
);

// تصحيح اتجاه الصفحة للغة العربية
code = code.replace(
  "document.documentElement.dir = 'ltr'",
  "document.documentElement.dir = sanitizedLanguage.startsWith('ar') ? 'rtl' : 'ltr'"
);

fs.writeFileSync(path, code, 'utf8');
console.log('SUCCESS: i18n.web.ts updated to directly import messages.ts and set RTL!');

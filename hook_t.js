const fs = require('fs');
const path = 'src/locale/i18n.web.ts';
let code = fs.readFileSync(path, 'utf8');

const tHook = `
if (i18n.t) {
  const originalT = i18n.t.bind(i18n);
  i18n.t = function(strings: any, ...expressions: any[]): string {
    const raw = typeof strings === 'string' ? strings : (Array.isArray(strings) ? strings.join('') : '');
    const isArabic = i18n.locale?.startsWith('ar');
    if (isArabic && raw && ARABIC_DICT[raw.trim()]) {
      return ARABIC_DICT[raw.trim()];
    }
    return originalT(strings, ...expressions);
  };
}
`;

if (!code.includes('if (i18n.t)')) {
  code = code.replace("if (!(i18n as any).__arabicHooked) {", "if (!(i18n as any).__arabicHooked) {\n" + tHook);
  fs.writeFileSync(path, code, 'utf8');
  console.log('SUCCESS: Hooked i18n.t!');
} else {
  console.log('i18n.t already hooked.');
}

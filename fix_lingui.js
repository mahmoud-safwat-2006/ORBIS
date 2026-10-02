const fs = require('fs');

const path = 'src/screens/Settings/AboutSettings.tsx';
let code = fs.readFileSync(path, 'utf8');
code = code.replace('const {_, i18n, t: l} = useLingui()', 'const {_, i18n} = useLingui()');
code = code.replace(/title=\{l\`حالة نظام ORBIS\`\}/, 'title={_(msg`حالة نظام ORBIS`)}');
code = code.replace(/description=\{l\`🟢 جميع خوادم وخدمات شبكة ORBIS السحابية تعمل بكفاءة تامة 100% ولا توجد أي انقطاعات مسجلة.\`\}/, 'description={_(msg`🟢 جميع خوادم وخدمات شبكة ORBIS السحابية تعمل بكفاءة تامة 100% ولا توجد أي انقطاعات مسجلة.`)}');
fs.writeFileSync(path, code, 'utf8');

console.log('Fixed AboutSettings with _(msg`...`) !');

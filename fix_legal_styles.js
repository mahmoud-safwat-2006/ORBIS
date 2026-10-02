const fs = require('fs');

['src/view/screens/PrivacyPolicy.tsx', 'src/view/screens/TermsOfService.tsx'].forEach(p => {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/a\.font_heavy/g, 'a.font_bold');
  c = c.replace(/a\.text_contrast_medium/g, 'pal.textLight');
  fs.writeFileSync(p, c, 'utf8');
});

console.log('Fixed styling in legal pages!');

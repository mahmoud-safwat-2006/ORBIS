const fs = require('fs');

// 1. Settings.tsx - Hide Developer options completely
{
  const path = 'src/screens/Settings/Settings.tsx';
  let code = fs.readFileSync(path, 'utf8');
  code = code.replace('{IS_INTERNAL && (', '{false && (');
  fs.writeFileSync(path, code, 'utf8');
  console.log('1. Settings.tsx: Developer options button hidden!');
}

// 2. AboutSettings.tsx - Remove System log, update Links for ORBIS
{
  const path = 'src/screens/Settings/AboutSettings.tsx';
  let code = fs.readFileSync(path, 'utf8');
  
  // Remove System log item
  const sysLogRegex = /<SettingsList\.LinkItem to="\/sys\/log"[\s\S]*?<\/SettingsList\.LinkItem>/;
  code = code.replace(sysLogRegex, '{/* System log removed */}');
  
  fs.writeFileSync(path, code, 'utf8');
  console.log('2. AboutSettings.tsx: System log removed and About cleaned!');
}

// 3. LoginForm.tsx - Hide Network button
{
  const path = 'src/screens/Login/LoginForm.tsx';
  let code = fs.readFileSync(path, 'utf8');
  
  // Wrap the service/network button in false && or remove it
  const btnRegex = /(<Button\s+testID="selectServiceButton"[\s\S]*?<\/Button>)/;
  if (btnRegex.test(code)) {
    code = code.replace(btnRegex, '{/* Network button hidden */ null}');
    fs.writeFileSync(path, code, 'utf8');
    console.log('3. LoginForm.tsx: Network button hidden!');
  } else {
    console.log('3. LoginForm.tsx: Button already hidden or pattern not matched.');
  }
}

// 4. ForgotPasswordForm.tsx - Hide Hosting provider
{
  const path = 'src/screens/Login/ForgotPasswordForm.tsx';
  let code = fs.readFileSync(path, 'utf8');
  
  const hostingViewRegex = /<View>\s*<TextField\.LabelText>\s*<Trans>Hosting provider<\/Trans>[\s\S]*?<\/HostingProvider>\s*<\/View>/;
  if (hostingViewRegex.test(code)) {
    code = code.replace(hostingViewRegex, '{/* Hosting provider hidden */}');
    fs.writeFileSync(path, code, 'utf8');
    console.log('4. ForgotPasswordForm.tsx: Hosting provider section hidden!');
  } else {
    console.log('4. ForgotPasswordForm.tsx: Hosting section already hidden or pattern not matched.');
  }
}

const fs = require('fs');

// 1. Fix LoginForm.tsx
{
  const path = 'src/screens/Login/LoginForm.tsx';
  let code = fs.readFileSync(path, 'utf8');
  code = code.replace(
    /return \(\s*\{\/\* Network button hidden \*\/ null\}\s*\)/,
    'return null'
  );
  fs.writeFileSync(path, code, 'utf8');
  console.log('1. Fixed LoginForm: return null directly!');
}

// 2. Fix ForgotPasswordForm.tsx: remove Hosting provider View
{
  const path = 'src/screens/Login/ForgotPasswordForm.tsx';
  let code = fs.readFileSync(path, 'utf8');
  const target = `      <View>
        <TextField.LabelText>
          <Trans>Hosting provider</Trans>
        </TextField.LabelText>
        <HostingProvider
          serviceUrl={serviceUrl}
          onSelectServiceUrl={setServiceUrl}
          onOpenDialog={onPressSelectService}
        />
      </View>`;
  
  if (code.includes(target)) {
    code = code.replace(target, '{/* Hosting provider removed for ORBIS */}');
    fs.writeFileSync(path, code, 'utf8');
    console.log('2. Removed Hosting provider from ForgotPasswordForm!');
  } else {
    // Fallback regex
    code = code.replace(/<View>\s*<TextField\.LabelText>\s*<Trans>Hosting provider<\/Trans>[\s\S]*?<\/View>/, '{/* Hosting provider removed for ORBIS */}');
    fs.writeFileSync(path, code, 'utf8');
    console.log('2. Removed Hosting provider via regex!');
  }
}

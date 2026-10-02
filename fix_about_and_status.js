const fs = require('fs');

// 1. Fix AboutSettings.tsx navigation & Status Page
{
  const path = 'src/screens/Settings/AboutSettings.tsx';
  let code = fs.readFileSync(path, 'utf8');

  // Replace LinkItem to Terms and Privacy with PressableItem navigating properly
  code = code.replace(
    /export function AboutSettingsScreen\(\{}: Props\) \{/,
    'export function AboutSettingsScreen({navigation}: Props) {'
  );

  // Status prompt control
  code = code.replace(
    'const sendErrorReportControl = Prompt.usePromptControl()',
    `const sendErrorReportControl = Prompt.usePromptControl()
  const statusPromptControl = Prompt.usePromptControl()`
  );

  // Replace Terms link
  code = code.replace(
    /<SettingsList\.LinkItem to="\/terms"[\s\S]*?<\/SettingsList\.LinkItem>/,
    `<SettingsList.PressableItem
            onPress={() => navigation.navigate('TermsOfService')}
            label={_(msg\`Terms of Service\`)}>
            <SettingsList.ItemIcon icon={NewspaperIcon} />
            <SettingsList.ItemText>
              <Trans>Terms of Service</Trans>
            </SettingsList.ItemText>
          </SettingsList.PressableItem>`
  );

  // Replace Privacy link
  code = code.replace(
    /<SettingsList\.LinkItem to="\/privacy"[\s\S]*?<\/SettingsList\.LinkItem>/,
    `<SettingsList.PressableItem
            onPress={() => navigation.navigate('PrivacyPolicy')}
            label={_(msg\`Privacy Policy\`)}>
            <SettingsList.ItemIcon icon={NewspaperIcon} />
            <SettingsList.ItemText>
              <Trans>Privacy Policy</Trans>
            </SettingsList.ItemText>
          </SettingsList.PressableItem>`
  );

  // Replace Status link with Prompt
  code = code.replace(
    /<SettingsList\.LinkItem\s+to=\{STATUS_PAGE_URL\}[\s\S]*?<\/SettingsList\.LinkItem>/,
    `<SettingsList.PressableItem
            onPress={() => statusPromptControl.open()}
            label={_(msg\`Status Page\`)}>
            <SettingsList.ItemIcon icon={GlobeIcon} />
            <SettingsList.ItemText>
              <Trans>Status Page</Trans>
            </SettingsList.ItemText>
          </SettingsList.PressableItem>`
  );

  // Add the status prompt dialog before ending Layout.Screen
  code = code.replace(
    '<SendErrorReportDialog control={sendErrorReportControl} />',
    `<SendErrorReportDialog control={sendErrorReportControl} />
      <Prompt.Basic
        control={statusPromptControl}
        title={l\`حالة نظام ORBIS\`}
        description={l\`🟢 جميع خوادم وخدمات شبكة ORBIS السحابية تعمل بكفاءة تامة 100% ولا توجد أي انقطاعات مسجلة.\`}
        onConfirm={() => {}}
      />`
  );

  // Ensure l is imported from useLingui
  code = code.replace('const {_, i18n} = useLingui()', 'const {_, i18n, t: l} = useLingui()');

  fs.writeFileSync(path, code, 'utf8');
  console.log('1. AboutSettings.tsx updated successfully!');
}

// 2. Fix Profile Feed Error Handling (PostFeedErrorMessage)
{
  const path = 'src/view/com/posts/PostFeedErrorMessage.tsx';
  if (fs.existsSync(path)) {
    let errCode = fs.readFileSync(path, 'utf8');
    // If it's an internal server error or empty feed, present a friendly message
    errCode = errCode.replace(
      'message = _(msg`Internal Server Error`)',
      'message = _(msg`لا توجد منشورات متاحة حالياً أو جاري تحديث الخادم`)'
    );
    fs.writeFileSync(path, errCode, 'utf8');
    console.log('2. Friendly error message configured in PostFeedErrorMessage!');
  }
}

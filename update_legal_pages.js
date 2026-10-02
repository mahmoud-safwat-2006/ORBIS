const fs = require('fs');

// 1. Update STATUS_PAGE_URL in src/lib/constants.ts
{
  const path = 'src/lib/constants.ts';
  let code = fs.readFileSync(path, 'utf8');
  code = code.replace(
    "export const STATUS_PAGE_URL = 'https://status.bsky.app/'",
    "export const STATUS_PAGE_URL = 'https://status.orbis.social/'"
  );
  fs.writeFileSync(path, code, 'utf8');
  console.log('1. Updated STATUS_PAGE_URL to ORBIS!');
}

// 2. Update TermsOfService.tsx
{
  const path = 'src/view/screens/TermsOfService.tsx';
  const newTerms = `import {View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {Trans} from '@lingui/react/macro'

import {usePalette} from '#/lib/hooks/usePalette'
import {
  type CommonNavigatorParams,
  type NativeStackScreenProps,
} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {Text} from '#/view/com/util/text/Text'
import {ScrollView} from '#/view/com/util/Views'
import * as Layout from '#/components/Layout'
import {ViewHeader} from '../com/util/ViewHeader'
import {atoms as a} from '#/alf'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'TermsOfService'>
export const TermsOfServiceScreen = (_props: Props) => {
  const pal = usePalette('default')
  const {_} = useLingui()

  return (
    <Layout.Screen>
      <ViewHeader title={_(msg\`Terms of Service\`)} />
      <ScrollView style={[s.hContentRegion, pal.view]}>
        <View style={[s.p20, a.gap_md]}>
          <Text style={[pal.text, a.text_2xl, a.font_heavy]}>
            شروط خدمة تطبيق أوربيس (ORBIS)
          </Text>
          <Text style={[pal.text, a.text_md, a.leading_snug]}>
            أهلاً بك في منصة ORBIS الاجتماعية. باستخدامك للتطبيق، فإنك توافق على الالتزام بالقواعد الآتية:
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_snug]}>
            1. احترام جميع المستخدمين وعدم نشر أي محتوى يحث على الكراهية أو العنف.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_snug]}>
            2. الحفاظ على سرية بيانات حسابك وعدم مشاركة كلمات المرور مع أي جهة خارجية.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_snug]}>
            3. استخدام المنصة والشبكة اللامركزية بطريقة تتوافق مع القوانين والأنظمة المعمول بها.
          </Text>
          <Text style={[pal.text, a.text_sm, a.text_contrast_medium, a.mt_md]}>
            آخر تحديث: 2026 - جميع الحقوق محفوظة لشبكة ORBIS
          </Text>
        </View>
        <View style={s.footerSpacer} />
      </ScrollView>
    </Layout.Screen>
  )
}
`;
  fs.writeFileSync(path, newTerms, 'utf8');
  console.log('2. Updated TermsOfService.tsx for ORBIS!');
}

// 3. Update PrivacyPolicy.tsx
{
  const path = 'src/view/screens/PrivacyPolicy.tsx';
  const newPrivacy = `import {View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {Trans} from '@lingui/react/macro'

import {usePalette} from '#/lib/hooks/usePalette'
import {
  type CommonNavigatorParams,
  type NativeStackScreenProps,
} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {Text} from '#/view/com/util/text/Text'
import {ScrollView} from '#/view/com/util/Views'
import * as Layout from '#/components/Layout'
import {ViewHeader} from '../com/util/ViewHeader'
import {atoms as a} from '#/alf'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'PrivacyPolicy'>
export const PrivacyPolicyScreen = (_props: Props) => {
  const pal = usePalette('default')
  const {_} = useLingui()

  return (
    <Layout.Screen>
      <ViewHeader title={_(msg\`Privacy Policy\`)} />
      <ScrollView style={[s.hContentRegion, pal.view]}>
        <View style={[s.p20, a.gap_md]}>
          <Text style={[pal.text, a.text_2xl, a.font_heavy]}>
            سياسة الخصوصية لمنصة أوربيس (ORBIS)
          </Text>
          <Text style={[pal.text, a.text_md, a.leading_snug]}>
            نحن في ORBIS نضع خصوصيتك وأمان بياناتك على رأس أولوياتنا:
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_snug]}>
            1. جمع البيانات: نجمع فقط البيانات الضرورية لتشغيل حسابك وتقديم أفضل تجربة تواصل.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_snug]}>
            2. الأمان والتشفير: يتم حماية محادثاتك وبياناتك عبر أحدث بروتوكولات الأمان والتشفير المعتمدة.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_snug]}>
            3. التحكم الكامل: تملك دائماً الحق في تعديل أو حذف بياناتك وحسابك في أي وقت من الإعدادات.
          </Text>
          <Text style={[pal.text, a.text_sm, a.text_contrast_medium, a.mt_md]}>
            آخر تحديث: 2026 - شبكة ORBIS
          </Text>
        </View>
        <View style={s.footerSpacer} />
      </ScrollView>
    </Layout.Screen>
  )
}
`;
  fs.writeFileSync(path, newPrivacy, 'utf8');
  console.log('3. Updated PrivacyPolicy.tsx for ORBIS!');
}

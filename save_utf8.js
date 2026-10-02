const fs = require('fs');

const terms = `import {View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {usePalette} from '#/lib/hooks/usePalette'
import {type CommonNavigatorParams, type NativeStackScreenProps} from '#/lib/routes/types'
import {ScrollView} from '#/view/com/util/Views'
import * as Layout from '#/components/Layout'
import {ViewHeader} from '../com/util/ViewHeader'
import {Text} from '#/view/com/util/text/Text'
import {atoms as a} from '#/alf'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'TermsOfService'>

export const TermsOfServiceScreen = (_props: Props) => {
  const pal = usePalette('default')
  const {_} = useLingui()

  return (
    <Layout.Screen>
      <ViewHeader title={_(msg\`Terms of Service\`)} />
      <ScrollView style={[a.flex_1, pal.view]} contentContainerStyle={[a.p_xl, a.gap_xl, {maxWidth: 800, alignSelf: 'center', width: '100%'}]}>
        
        {/* Hero Card */}
        <View style={[a.p_xl, pal.viewLight, a.rounded_md, a.gap_sm, a.border, pal.border]}>
          <Text style={[pal.text, a.text_2xl, a.font_bold, {textAlign: 'right'}]}>
            شروط استخدام منصة أوربيس (ORBIS)
          </Text>
          <Text style={[pal.textLight, a.text_sm, {textAlign: 'right'}]}>
            تاريخ السريان: أكتوبر 2026 | الإصدار المعتمد
          </Text>
          <Text style={[pal.text, a.text_md, a.leading_relaxed, a.mt_xs, {textAlign: 'right'}]}>
            مرحباً بك في ORBIS. تهدف هذه الشروط إلى توفير بيئة تواصل اجتماعي آمنة وعادلة تحترم خصوصية وحرية الجميع وفق أعلى المعايير.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold, {textAlign: 'right'}]}>
            1. الحسابات والأمان
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • الحفاظ على سرية بيانات الدخول وكلمة المرور هو مسؤولية المستخدم الشخصية.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • يُمنع انتحال صفة الغير أو إنشاء حسابات وهمية بغرض التضليل.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold, {textAlign: 'right'}]}>
            2. حقوق المحتوى والملكية
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • أنت المالك الأول لكل المحتوى والتغريدات والوسائط التي تشاركها عبر حسابك.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • يُحظر نشر أو مشاركة أي مواد تنتهك حقوق الملكية الفكرية أو تحث على العنف والكراهية.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold, {textAlign: 'right'}]}>
            3. إنهاء الخدمة والحذف
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • تملك الحق الكامل في حذف حسابك أو تصدير بياناتك في أي وقت مباشرة من قائمة الإعدادات.
          </Text>
        </View>

        {/* Contact Footer */}
        <View style={[a.pt_xl, a.border_t, pal.border, a.gap_xs]}>
          <Text style={[pal.textLight, a.text_xs, {textAlign: 'right'}]}>
            للاستفسارات والدعم الفني: support@orbis.social
          </Text>
        </View>

      </ScrollView>
    </Layout.Screen>
  )
}
`;

const privacy = `import {View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {usePalette} from '#/lib/hooks/usePalette'
import {type CommonNavigatorParams, type NativeStackScreenProps} from '#/lib/routes/types'
import {ScrollView} from '#/view/com/util/Views'
import * as Layout from '#/components/Layout'
import {ViewHeader} from '../com/util/ViewHeader'
import {Text} from '#/view/com/util/text/Text'
import {atoms as a} from '#/alf'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'PrivacyPolicy'>

export const PrivacyPolicyScreen = (_props: Props) => {
  const pal = usePalette('default')
  const {_} = useLingui()

  return (
    <Layout.Screen>
      <ViewHeader title={_(msg\`Privacy Policy\`)} />
      <ScrollView style={[a.flex_1, pal.view]} contentContainerStyle={[a.p_xl, a.gap_xl, {maxWidth: 800, alignSelf: 'center', width: '100%'}]}>
        
        {/* Hero Card */}
        <View style={[a.p_xl, pal.viewLight, a.rounded_md, a.gap_sm, a.border, pal.border]}>
          <Text style={[pal.text, a.text_2xl, a.font_bold, {textAlign: 'right'}]}>
            سياسة الخصوصية لمنصة أوربيس (ORBIS)
          </Text>
          <Text style={[pal.textLight, a.text_sm, {textAlign: 'right'}]}>
            تاريخ السريان: أكتوبر 2026 | حماية الخصوصية أولويتنا
          </Text>
          <Text style={[pal.text, a.text_md, a.leading_relaxed, a.mt_xs, {textAlign: 'right'}]}>
            نحن نضع خصوصيتك وأمان معلوماتك على رأس أولوياتنا، ونلتزم بحماية كل تفاصيل هويتك الرقمية.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold, {textAlign: 'right'}]}>
            1. جمع البيانات
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • نجمع فقط البيانات الأساسية الضرورية مثل اسم المستخدم والبريد لتأمين حسابك.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • لا نبيع أو نؤجر أي بيانات شخصية لأي جهات تسويقية أو أطراف ثالثة نهائياً.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold, {textAlign: 'right'}]}>
            2. التشفير والأمان
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • جميع الاتصالات مشفرة بأحدث بروتوكولات الأمان لمنع أي اختراق أو تسريب.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • الرسائل والمحادثات الخاصة تتمتع بأقصى درجات السرية والخصوصية.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold, {textAlign: 'right'}]}>
            3. حقوقك في الحذف والتحكم
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed, {textAlign: 'right'}]}>
            • يمكنك حذف حسابك بالكامل ومسح جميع سجلاتك من النظام بضغطة زر واحدة.
          </Text>
        </View>

        {/* Contact Footer */}
        <View style={[a.pt_xl, a.border_t, pal.border, a.gap_xs]}>
          <Text style={[pal.textLight, a.text_xs, {textAlign: 'right'}]}>
            للتواصل مع مسؤول حماية البيانات: privacy@orbis.social
          </Text>
        </View>

      </ScrollView>
    </Layout.Screen>
  )
}
`;

fs.writeFileSync('src/view/screens/TermsOfService.tsx', terms, 'utf8');
fs.writeFileSync('src/view/screens/PrivacyPolicy.tsx', privacy, 'utf8');
console.log('Terms and Privacy saved with proper RTL and centered maxWidth layout!');

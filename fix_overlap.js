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
      <ViewHeader title={_(msg\`شروط الخدمة\`)} />
      <ScrollView 
        style={[a.flex_1, pal.view]} 
        contentContainerStyle={{padding: 24, maxWidth: 840, width: '100%', alignSelf: 'center'}}>
        
        {/* Hero Card */}
        <View style={[{backgroundColor: pal.viewLight.backgroundColor, borderRadius: 12, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: pal.border.borderColor}]}>
          <Text style={[pal.text, {fontSize: 24, fontWeight: '700', lineHeight: 36, textAlign: 'right', marginBottom: 8}]}>
            شروط استخدام منصة أوربيس (ORBIS)
          </Text>
          <Text style={[pal.textLight, {fontSize: 13, textAlign: 'right', marginBottom: 12}]}>
            تاريخ السريان: أكتوبر 2026 | وثيقة معتمدة رسمياً
          </Text>
          <Text style={[pal.text, {fontSize: 15, lineHeight: 28, textAlign: 'right'}]}>
            أهلاً بك في منصة ORBIS الاجتماعية. تحدد هذه الوثيقة القواعد والشروط التي تحكم استخدامك لخدماتنا والشبكة اللامركزية المفتوحة لضمان تجربة آمنة وعادلة للجميع.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={{marginBottom: 24}}>
          <Text style={[pal.text, {fontSize: 18, fontWeight: '700', lineHeight: 30, textAlign: 'right', marginBottom: 8}]}>
            1. الحسابات والتسجيل
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right', marginBottom: 6}]}>
            • الحفاظ على سرية بيانات تسجيل الدخول وكلمة المرور هو مسؤولية المستخدم بشكل كامل.
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right'}]}>
            • يُحظر تماماً انتحال شخصيات الأفراد أو المؤسسات أو تسجيل حسابات وهمية بقصد الخداع.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={{marginBottom: 24}}>
          <Text style={[pal.text, {fontSize: 18, fontWeight: '700', lineHeight: 30, textAlign: 'right', marginBottom: 8}]}>
            2. الملكية الفكرية والمحتوى
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right', marginBottom: 6}]}>
            • أنت المالك الوحيد لكافة المنشورات والتغريدات والوسائط التي تشاركها عبر حسابك.
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right'}]}>
            • يُمنع نشر أي محتوى ينتهك حقوق الآخرين أو يحث على الكراهية، العنف أو المضايقة.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={{marginBottom: 24}}>
          <Text style={[pal.text, {fontSize: 18, fontWeight: '700', lineHeight: 30, textAlign: 'right', marginBottom: 8}]}>
            3. إنهاء الحساب والبيانات
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right'}]}>
            • يحق لك حذف حسابك في أي وقت أو تصدير بياناتك ومتابعاتك مباشرة من الإعدادات.
          </Text>
        </View>

        {/* Footer */}
        <View style={{paddingTop: 20, borderTopWidth: 1, borderColor: pal.border.borderColor, marginTop: 12}}>
          <Text style={[pal.textLight, {fontSize: 13, textAlign: 'right'}]}>
            فريق الدعم والمساعدة: support@orbis.social
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
      <ViewHeader title={_(msg\`سياسة الخصوصية\`)} />
      <ScrollView 
        style={[a.flex_1, pal.view]} 
        contentContainerStyle={{padding: 24, maxWidth: 840, width: '100%', alignSelf: 'center'}}>
        
        {/* Hero Card */}
        <View style={[{backgroundColor: pal.viewLight.backgroundColor, borderRadius: 12, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: pal.border.borderColor}]}>
          <Text style={[pal.text, {fontSize: 24, fontWeight: '700', lineHeight: 36, textAlign: 'right', marginBottom: 8}]}>
            سياسة الخصوصية لمنصة أوربيس (ORBIS)
          </Text>
          <Text style={[pal.textLight, {fontSize: 13, textAlign: 'right', marginBottom: 12}]}>
            تاريخ السريان: أكتوبر 2026 | حماية الخصوصية أولويتنا
          </Text>
          <Text style={[pal.text, {fontSize: 15, lineHeight: 28, textAlign: 'right'}]}>
            نحن نضع خصوصيتك وأمان معلوماتك على رأس أولوياتنا، ونلتزم التزاماً كاملاً بحماية هويتك الرقمية وعدم مشاركة بياناتك مع أي طرف ثالث.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={{marginBottom: 24}}>
          <Text style={[pal.text, {fontSize: 18, fontWeight: '700', lineHeight: 30, textAlign: 'right', marginBottom: 8}]}>
            1. جمع البيانات واستخدامها
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right', marginBottom: 6}]}>
            • نجمع فقط البيانات الأساسية الضرورية مثل اسم المستخدم والبريد الإلكتروني لتشغيل حسابك.
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right'}]}>
            • لا نبيع أو نؤجر أي بيانات شخصية لأي جهات تسويقية أو شركات إعلانية على الإطلاق.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={{marginBottom: 24}}>
          <Text style={[pal.text, {fontSize: 18, fontWeight: '700', lineHeight: 30, textAlign: 'right', marginBottom: 8}]}>
            2. الأمان والتشفير
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right', marginBottom: 6}]}>
            • تتم حماية حركة المرور والاتصال عبر أحدث معايير التشفير المتقدمة لمنع أي اختراق.
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right'}]}>
            • رسائلك ومحادثاتك الخاصة مشفرة وتتمتع بأعلى درجات السرية.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={{marginBottom: 24}}>
          <Text style={[pal.text, {fontSize: 18, fontWeight: '700', lineHeight: 30, textAlign: 'right', marginBottom: 8}]}>
            3. حقوق المستخدم والتحكم
          </Text>
          <Text style={[pal.text, {fontSize: 14, lineHeight: 26, textAlign: 'right'}]}>
            • يمكنك حذف حسابك نهائياً ومسح كامل أرشيفك من خوادم النظام في أي لحظة.
          </Text>
        </View>

        {/* Footer */}
        <View style={{paddingTop: 20, borderTopWidth: 1, borderColor: pal.border.borderColor, marginTop: 12}}>
          <Text style={[pal.textLight, {fontSize: 13, textAlign: 'right'}]}>
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
console.log('Fixed overlapping text by setting explicit lineHeights and separation!');

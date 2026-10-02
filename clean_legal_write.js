const fs = require('fs');

const termsCode = `import {View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {usePalette} from '#/lib/hooks/usePalette'
import {
  type CommonNavigatorParams,
  type NativeStackScreenProps,
} from '#/lib/routes/types'
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
      <ScrollView style={[a.flex_1, pal.view]} contentContainerStyle={[a.p_xl, a.gap_xl]}>
        
        {/* Header Hero */}
        <View style={[a.p_xl, pal.viewLight, a.rounded_md, a.gap_sm, a.border, pal.border]}>
          <Text style={[pal.text, a.text_2xl, a.font_bold]}>
            شروط استخدام منصة أوربيس (ORBIS)
          </Text>
          <Text style={[pal.textLight, a.text_sm]}>
            تاريخ السريان: أكتوبر 2026 | الإصدار الرسمي المعتمد
          </Text>
          <Text style={[pal.text, a.text_md, a.leading_relaxed, a.mt_xs]}>
            مرحباً بك في ORBIS، الشبكة الاجتماعية اللامركزية الحديثة. تهدف هذه الشروط إلى توفير بيئة تواصل آمنة، عادلة ومفتوحة لجميع المستخدمين حول العالم.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold]}>
            1. الحسابات والتسجيل
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • يجب أن تكون مؤهلاً قانونياً لإنشاء حساب في بلدك.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • تقع على عاتقك مسؤولية حماية كلمة المرور ومعرف الحساب الخاص بك.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • لا يُسمح بانتحال شخصية أي فرد أو مؤسسة أو تقديم معلومات مضللة عن هويتك.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold]}>
            2. المحتوى والسلوك المقبول
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • أنت تحتفظ بملكية المحتوى الذي تنشره على ORBIS مع منح المنصة ترخيصاً لعرضه ونقله عبر البروتوكول.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • يُحظر تماماً نشر أو ترويج أي محتوى يحث على العنف، الكراهية، التحرش، الاحتيال، أو استغلال القاصرين.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • تحتفظ إدارة المنصة بالحق في اتخاذ الإجراءات اللازمة ضد أي محتوى أو حساب ينتهك هذه المعايير.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold]}>
            3. الشبكة اللامركزية وتخزين البيانات
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • يعتمد تطبيق ORBIS على بنية مفتوحة تتيح للمستخدمين استضافة بياناتهم أو نقلها بحرية.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • المنشورات العامة هي جزء من سجل الشبكة الموزعة ويمكن فهرستها بواسطة أدوات البحث ومزودي الخلاصات.
          </Text>
        </View>

        {/* Section 4 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold]}>
            4. إنهاء الخدمة والتعديلات
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • يمكنك حذف حسابك أو تصدير بياناتك في أي وقت من خلال قائمة إعدادات الحساب.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • قد نقوم بتحديث هذه الشروط دورياً، وسنقوم بإشعارك بأي تغييرات جوهرية قبل دخولها حيز التنفيذ.
          </Text>
        </View>

        {/* Footer Note */}
        <View style={[a.pt_xl, a.border_t, pal.border, a.gap_xs]}>
          <Text style={[pal.textLight, a.text_xs]}>
            إذا كان لديك أي استفسار حول شروط الخدمة، يمكنك التواصل مع فريق الدعم الفني عبر: support@orbis.social
          </Text>
        </View>

      </ScrollView>
    </Layout.Screen>
  )
}
`;

const privacyCode = `import {View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {usePalette} from '#/lib/hooks/usePalette'
import {
  type CommonNavigatorParams,
  type NativeStackScreenProps,
} from '#/lib/routes/types'
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
      <ScrollView style={[a.flex_1, pal.view]} contentContainerStyle={[a.p_xl, a.gap_xl]}>
        
        {/* Header Hero */}
        <View style={[a.p_xl, pal.viewLight, a.rounded_md, a.gap_sm, a.border, pal.border]}>
          <Text style={[pal.text, a.text_2xl, a.font_bold]}>
            سياسة الخصوصية وأمان البيانات في ORBIS
          </Text>
          <Text style={[pal.textLight, a.text_sm]}>
            تاريخ السريان: أكتوبر 2026 | حماية الخصوصية أولويتنا
          </Text>
          <Text style={[pal.text, a.text_md, a.leading_relaxed, a.mt_xs]}>
            نحن نؤمن بأن الخصوصية حق أصيل لكل إنسان. توضح هذه السياسة كيفية تعاملنا مع بياناتك وكيف نمنحك السيطرة الكاملة على هويتك وتفاعلاتك.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold]}>
            1. المعلومات التي نجمعها
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • معلومات الحساب الأساسية: اسم المستخدم، الاسم المعروض، البريد الإلكتروني (لتأكيد الهوية واستعادة كلمة المرور).
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • المحتوى العام: منشوراتك، الردود، الإعجابات وإعادة النشر التي تشاركها برغبتك للعامة.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • معلومات تشغيلية تقنية: بيانات التشخيص لمنع الهجمات الإلكترونية وضمان استقرار الخوادم.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold]}>
            2. كيفية استخدام بياناتك
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • تشغيل المنصة وتمكينك من التواصل ومتابعة المحتوى المفضل لديك.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • حماية مجتمع ORBIS من السبام، الحسابات الوهمية والمحتوى الضار.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • نحن لا نبيع بياناتك الشخصية لأي طرف ثالث ولا نستخدمها لأغراض إعلانية تطفلية.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold]}>
            3. الرسائل الخاصة والأمان
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • تحظى محادثاتك الخاصة بحماية أمنية مشددة تمنع الوصول غير المصرح به.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • يتم تطبيق أفضل معايير التشفير لضمان سرية مراسلاتك الشخصية.
          </Text>
        </View>

        {/* Section 4 */}
        <View style={[a.gap_sm]}>
          <Text style={[pal.text, a.text_lg, a.font_bold]}>
            4. حقوقك والتحكم في البيانات
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • الحق في تصدير البيانات: يمكنك طلب نسخة كاملة من جميع بياناتك المسجلة على المنصة.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • الحق في النسيان والحذف: عند قيامك بحذف حسابك، يتم مسح بياناتك نهائياً من سيرفرات الخدمة.
          </Text>
          <Text style={[pal.text, a.text_sm, a.leading_relaxed]}>
            • تعديل خيارات الخصوصية: يمكنك تحديد من يمكنه الرد على منشوراتك أو مراسلتك من إعدادات الخصوصية.
          </Text>
        </View>

        {/* Footer Note */}
        <View style={[a.pt_xl, a.border_t, pal.border, a.gap_xs]}>
          <Text style={[pal.textLight, a.text_xs]}>
            للاستفسارات المتعلقة بحماية الخصوصية ومسؤول البيانات: privacy@orbis.social
          </Text>
        </View>

      </ScrollView>
    </Layout.Screen>
  )
}
`;

fs.writeFileSync('src/view/screens/TermsOfService.tsx', termsCode, 'utf8');
fs.writeFileSync('src/view/screens/PrivacyPolicy.tsx', privacyCode, 'utf8');
console.log('Both legal screens rewritten cleanly without escape errors!');

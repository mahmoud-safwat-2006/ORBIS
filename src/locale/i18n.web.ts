import {useEffect, useState} from 'react'
import {i18n, type Messages} from '@lingui/core'
import {type Locale} from 'date-fns/locale'
import {enUS as defaultLocale} from 'date-fns/locale/en-US'

import {sanitizeAppLanguageSetting} from '#/locale/helpers'
import {AppLanguage} from '#/locale/languages'
import {useLanguagePrefs} from '#/state/preferences'

/**
 * We do a dynamic import of just the catalog that we need
 */
export async function dynamicActivate(locale: AppLanguage) {
  let messages: Messages
  let dateLocale: Locale = defaultLocale

  switch (locale) {
    case AppLanguage.ar: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/ar/arabicMessages`).then(m => m.messages),
        import('date-fns/locale/ar-SA').then(m => m.arSA),
      ])
      break
    }
    case AppLanguage.an: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/an/messages`).then(m => m.messages),
        import('date-fns/locale/es').then(m => m.es),
      ])
      break
    }
    case AppLanguage.ast: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/ast/messages`).then(m => m.messages),
        import('date-fns/locale/es').then(m => m.es),
      ])
      break
    }
    case AppLanguage.ca: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/ca/messages`).then(m => m.messages),
        import('date-fns/locale/ca').then(m => m.ca),
      ])
      break
    }
    case AppLanguage.cs: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/cs/messages`).then(m => m.messages),
        import('date-fns/locale/cs').then(m => m.cs),
      ])
      break
    }
    case AppLanguage.cy: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/cy/messages`).then(m => m.messages),
        import('date-fns/locale/cy').then(m => m.cy),
      ])
      break
    }
    case AppLanguage.da: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/da/messages`).then(m => m.messages),
        import('date-fns/locale/da').then(m => m.da),
      ])
      break
    }
    case AppLanguage.de: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/de/messages`).then(m => m.messages),
        import('date-fns/locale/de').then(m => m.de),
      ])
      break
    }
    case AppLanguage.el: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/el/messages`).then(m => m.messages),
        import('date-fns/locale/el').then(m => m.el),
      ])
      break
    }
    case AppLanguage.en_GB: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/en-GB/messages`).then(m => m.messages),
        import('date-fns/locale/en-GB').then(m => m.enGB),
      ])
      break
    }
    case AppLanguage.eo: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/eo/messages`).then(m => m.messages),
        import('date-fns/locale/eo').then(m => m.eo),
      ])
      break
    }
    case AppLanguage.es: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/es/messages`).then(m => m.messages),
        import('date-fns/locale/es').then(m => m.es),
      ])
      break
    }
    case AppLanguage.eu: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/eu/messages`).then(m => m.messages),
        import('date-fns/locale/eu').then(m => m.eu),
      ])
      break
    }
    case AppLanguage.fi: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/fi/messages`).then(m => m.messages),
        import('date-fns/locale/fi').then(m => m.fi),
      ])
      break
    }
    case AppLanguage.fr: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/fr/messages`).then(m => m.messages),
        import('date-fns/locale/fr').then(m => m.fr),
      ])
      break
    }
    case AppLanguage.fy: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/fy/messages`).then(m => m.messages),
        import('date-fns/locale/fy').then(m => m.fy),
      ])
      break
    }
    case AppLanguage.ga: {
      messages = await import(`./locales/ga/messages`).then(m => m.messages)
      break
    }
    case AppLanguage.gd: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/gd/messages`).then(m => m.messages),
        import('date-fns/locale/gd').then(m => m.gd),
      ])
      break
    }
    case AppLanguage.gl: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/gl/messages`).then(m => m.messages),
        import('date-fns/locale/gl').then(m => m.gl),
      ])
      break
    }
    case AppLanguage.hi: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/hi/messages`).then(m => m.messages),
        import('date-fns/locale/hi').then(m => m.hi),
      ])
      break
    }
    case AppLanguage.hu: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/hu/messages`).then(m => m.messages),
        import('date-fns/locale/hu').then(m => m.hu),
      ])
      break
    }
    case AppLanguage.ia: {
      messages = await import(`./locales/ia/messages`).then(m => m.messages)
      break
    }
    case AppLanguage.id: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/id/messages`).then(m => m.messages),
        import('date-fns/locale/id').then(m => m.id),
      ])
      break
    }
    case AppLanguage.it: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/it/messages`).then(m => m.messages),
        import('date-fns/locale/it').then(m => m.it),
      ])
      break
    }
    case AppLanguage.ja: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/ja/messages`).then(m => m.messages),
        import('date-fns/locale/ja').then(m => m.ja),
      ])
      break
    }
    case AppLanguage.km: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/km/messages`).then(m => m.messages),
        import('date-fns/locale/km').then(m => m.km),
      ])
      break
    }
    case AppLanguage.ko: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/ko/messages`).then(m => m.messages),
        import('date-fns/locale/ko').then(m => m.ko),
      ])
      break
    }
    case AppLanguage.ne: {
      messages = await import(`./locales/ne/messages`).then(m => m.messages)
      break
    }
    case AppLanguage.nl: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/nl/messages`).then(m => m.messages),
        import('date-fns/locale/nl').then(m => m.nl),
      ])
      break
    }
    case AppLanguage.pl: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/pl/messages`).then(m => m.messages),
        import('date-fns/locale/pl').then(m => m.pl),
      ])
      break
    }
    case AppLanguage.pt_BR: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/pt-BR/messages`).then(m => m.messages),
        import('date-fns/locale/pt-BR').then(m => m.ptBR),
      ])
      break
    }
    case AppLanguage.pt_PT: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/pt-PT/messages`).then(m => m.messages),
        import('date-fns/locale/pt').then(m => m.pt),
      ])
      break
    }
    case AppLanguage.ro: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/ro/messages`).then(m => m.messages),
        import('date-fns/locale/ro').then(m => m.ro),
      ])
      break
    }
    case AppLanguage.ru: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/ru/messages`).then(m => m.messages),
        import('date-fns/locale/ru').then(m => m.ru),
      ])
      break
    }
    case AppLanguage.sv: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/sv/messages`).then(m => m.messages),
        import('date-fns/locale/sv').then(m => m.sv),
      ])
      break
    }
    case AppLanguage.th: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/th/messages`).then(m => m.messages),
        import('date-fns/locale/th').then(m => m.th),
      ])
      break
    }
    case AppLanguage.tr: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/tr/messages`).then(m => m.messages),
        import('date-fns/locale/tr').then(m => m.tr),
      ])
      break
    }
    case AppLanguage.uk: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/uk/messages`).then(m => m.messages),
        import('date-fns/locale/uk').then(m => m.uk),
      ])
      break
    }
    case AppLanguage.vi: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/vi/messages`).then(m => m.messages),
        import('date-fns/locale/vi').then(m => m.vi),
      ])
      break
    }
    case AppLanguage.zh_CN: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/zh-CN/messages`).then(m => m.messages),
        import('date-fns/locale/zh-CN').then(m => m.zhCN),
      ])
      break
    }
    case AppLanguage.zh_HK: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/zh-HK/messages`).then(m => m.messages),
        import('date-fns/locale/zh-HK').then(m => m.zhHK),
      ])
      break
    }
    case AppLanguage.zh_TW: {
      ;[messages, dateLocale] = await Promise.all([
        import(`./locales/zh-TW/messages`).then(m => m.messages),
        import('date-fns/locale/zh-TW').then(m => m.zhTW),
      ])
      break
    }
    default: {
      messages = await import(`./locales/en/messages`).then(m => m.messages)
      break
    }
  }

  i18n.load(locale, messages)
  i18n.activate(locale)

  return dateLocale
}

export function useLocaleLanguage() {
  const {appLanguage} = useLanguagePrefs()
  const [dateLocale, setDateLocale] = useState(defaultLocale)

  useEffect(() => {
    const sanitizedLanguage = sanitizeAppLanguageSetting(appLanguage)

    document.documentElement.lang = sanitizedLanguage
    document.documentElement.dir = 'ltr'

    void dynamicActivate(sanitizedLanguage).then(locale => {
      setDateLocale(locale)
    })
  }, [appLanguage])

  return dateLocale
}


// Universal Arabic Dictionary Interceptor
const ARABIC_DICT: Record<string, string> = {
  "Lists allow you to see content from your favorite people.": "تتيح لك القوائم رؤية محتوى الأشخاص المفضلين لديك.",
  "Public, sharable lists of users to mute or block in bulk.": "قوائم عامة قابلة للمشاركة لكتم أو حظر المستخدمين بشكل جماعي.",
  "You have no lists.": "ليس لديك أي قوائم بعد.",
  "New": "جديد",
  "+ New": "+ جديد",
  "Create user list": "إنشاء قائمة مستخدمين",
  "List name": "اسم القائمة",
  "List description": "وصف القائمة",
  "List avatar": "صورة القائمة",
  "e.g. Great Posters": "مثال: ناشرون رائعون",
  "e.g. The posters who never miss.": "مثال: ناشرون لا يفوتون أي خبر.",
  "Switch account": "تبديل الحساب",
  "Update email": "تحديث البريد الإلكتروني",
  "Handle": "المعرف (@handle)",
  "Birthday": "تاريخ الميلاد",
  "Birthdate": "تاريخ الميلاد",
  "Edit": "تعديل",
  "Automation label": "شارة الحساب الآلي",
  "Off": "إيقاف",
  "On": "تشغيل",
  "Export my data": "تصدير بياناتي",
  "Deactivate account": "تعطيل الحساب",
  "Delete account": "حذف الحساب",
  "Delete my account": "حذف حسابي",
  "Two-factor authentication (2FA)": "المصادقة الثنائية (2FA)",
  "Enable": "تفعيل",
  "Disable": "تعطيل",
  "App passwords": "كلمات مرور التطبيقات",
  "App Password": "كلمة مرور التطبيق",
  "Allow others to be notified of your posts": "إشعار الآخرين بمنشوراتك",
  "Anyone who follows me": "أي شخص يتابعني",
  "Ask apps to hide my posts from algorithmic recommendations": "طلب إخفاء منشوراتي من التوصيات الخوارزمية",
  "Ask apps and sites not to show my account to logged-out users": "طلب عدم إظهار حسابي للزوار غير المسجلين",
  "Moderation tools": "أدوات الإشراف",
  "Interaction settings": "إعدادات التفاعل",
  "Muted words & tags": "الكلمات والوسوم المكتومة",
  "Moderation lists": "قوائم الإشراف",
  "Moderation Lists": "قوائم الإشراف",
  "Muted accounts": "الحسابات المكتومة",
  "Muted Accounts": "الحسابات المكتومة",
  "Blocked accounts": "الحسابات المحظورة",
  "Blocked Accounts": "الحسابات المحظورة",
  "Verification settings": "إعدادات التوثيق",
  "Verification Settings": "إعدادات التوثيق",
  "Content filters": "تصفية المحتوى",
  "Enable adult content": "تفعيل محتوى البالغين",
  "Adult Content": "محتوى البالغين",
  "Adult content": "محتوى البالغين",
  "Sexually Suggestive": "محتوى ذو إيحاء جنسي",
  "Graphic Media": "وسائط حساسة أو عنيفة",
  "Non-sexual Nudity": "عري فني أو غير جنسي",
  "Show": "عرض",
  "Warn": "تحذير",
  "Hide": "إخفاء",
  "Advanced": "متقدم",
  "ORBIS Moderation Service": "خدمة إشراف ORBIS",
  "Official ORBIS moderation service": "خدمة إشراف ORBIS الرسمية",
  "Manage saved feeds": "إدارة الخلاصات المحفوظة",
  "Thread preferences": "تفضيلات المحادثات",
  "Following feed preferences": "تفضيلات خلاصة المتابعين",
  "External media": "الوسائط الخارجية",
  "External Media": "الوسائط الخارجية",
  "Autoplay videos and GIFs": "التشغيل التلقائي للفيديوهات والصور المتحركة",
  "Enable trending topics": "تفعيل المواضيع الأكثر تداولاً",
  "Enable trending videos in your Discover feed": "تفعيل الفيديوهات المتداولة في خلاصة استكشف",
  "New followers": "متابعون جدد",
  "Quotes": "اقتباسات",
  "Reposts": "إعادات النشر",
  "Activity from others": "نشاطات الآخرين",
  "Likes of your reposts": "الإعجابات بإعادات نشرك",
  "Reposts of your reposts": "إعادات نشر ما قمت بإعادة نشره",
  "New messages": "رسائل جديدة",
  "New message requests": "طلبات مراسلة جديدة",
  "Everything else": "كل شيء آخر",
  "Color mode": "نمط الألوان",
  "System": "النظام",
  "Light": "فاتح",
  "Dark": "داكن",
  "Dark theme": "السمة الداكنة",
  "Dim": "معتم",
  "Font": "الخط",
  "Theme": "سمة التطبيق",
  "Font size": "حجم الخط",
  "Smaller": "أصغر",
  "Default": "الافتراضي",
  "Larger": "أكبر",
  "Alt text": "النص البديل",
  "Alt Text": "النص البديل",
  "Require alt text before posting": "طلب كتابة النص البديل قبل النشر",
  "Display larger alt text badges": "عرض شارات نص بديل أكبر",
  "Enable beta features": "تفعيل الميزات التجريبية",
  "Get early access to experimental features we’re testing.": "احصل على وصول مبكر للميزات التجريبية التي نختبرها.",
  "No beta features at the moment.": "لا توجد ميزات تجريبية حالياً.",
  "Check back later!": "تحقق لاحقاً!",
  "Terms of Service": "شروط الخدمة",
  "Privacy Policy": "سياسة الخصوصية",
  "Status Page": "صفحة الحالة",
  "System log": "سجل النظام",
  "Send error report": "إرسال تقرير عن خطأ",
  "Title": "العنوان",
  "Title (100 characters max)": "العنوان (بحد أقصى 100 حرف)",
  "Description (1000 characters max)": "الوصف (بحد أقصى 1000 حرف)",
  "Submit": "إرسال",
  "Suggested accounts": "حسابات مقترحة",
  "Follow": "متابعة",
  "Follow back": "رد المتابعة",
  "Software Dev": "برمجة وتطوير",
  "Music": "موسيقى",
  "Movies": "أفلام",
  "Journalism": "صحافة",
  "News": "أخبار",
  "TV": "تلفزيون وسينما",
  "Education": "تعليم",
  "Video Games": "ألعاب",
  "Comedy": "كوميديا",
  "Page not found": "الصفحة غير موجودة",
  "We're sorry! We can't find the page you were looking for.": "عذراً! لم نتمكن من العثور على الصفحة التي تبحث عنها.",
  "Go back": "العودة",
  "You haven't made any custom feeds yet.": "لم تقم بإنشاء أي خلاصات مخصصة بعد.",
  "Browse custom feeds": "تصفح الخلاصات المخصصة",
  "Starter Packs let you share your favorite feeds and people with your friends.": "تتيح لك حزم البداية مشاركة خلاصاتك وحساباتك المفضلة مع أصدقائك.",
  "Create a Starter Pack": "إنشاء حزمة بداية",
  "Create Starter Pack": "إنشاء حزمة بداية",
  "Your interests help us find what you like!": "اهتماماتك تساعدنا في اقتراح ما يناسب ذوقك!",
  "Select which language to use for the app's user interface.": "اختر اللغة المستخدمة لواجهة التطبيق.",
  "Select your preferred language for translations in your feed.": "اختر لغتك المفضلة لترجمة المنشورات في خلاصتك.",
  "Select which languages you want your subscribed feeds to include. If none are selected, all languages will be shown.": "اختر لغات المحتوى التي تفضل ظهورها في خلاصاتك.",
  "Add more languages…": "إضافة المزيد من اللغات...",
  "Internal Server Error": "خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً"
};

// Hook into i18n._ directly
if (!(i18n as any).__arabicHooked) {

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

  (i18n as any).__arabicHooked = true;
  const originalTranslate = i18n._.bind(i18n);

  i18n._ = function (id: any, values?: any, message?: any): string {
    const isArabic = i18n.locale?.startsWith('ar');
    
    // Check descriptor message or id
    let rawText = '';
    if (typeof id === 'string') {
      rawText = id;
    } else if (id && typeof id === 'object') {
      rawText = id.message || id.id || '';
    }

    if (isArabic && rawText && ARABIC_DICT[rawText]) {
      return ARABIC_DICT[rawText];
    }

    const result = originalTranslate(id, values, message);

    if (isArabic && typeof result === 'string' && ARABIC_DICT[result]) {
      return ARABIC_DICT[result];
    }

    return result;
  };
}

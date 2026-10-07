const fs = require('fs');
const path = 'src/locale/i18n.web.ts';
let code = fs.readFileSync(path, 'utf8');

// قاموس الترجمة الفورية المركزي لجميع نصوص الواجهة
const interceptorCode = `
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
`;

if (!code.includes('ARABIC_DICT')) {
  code = code + '\n' + interceptorCode;
  fs.writeFileSync(path, code, 'utf8');
  console.log('SUCCESS: Injected Universal Arabic Translator Interceptor!');
} else {
  console.log('Already injected.');
}

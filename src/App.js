import React, { useState, useEffect } from 'react';

// ===== DATA =====
const ROLES = [
  { id: 'site_eng', label: 'مهندس موقع', labelEn: 'Site Engineer' },
  {
    id: 'tech_off',
    label: 'مهندس مكتب فني',
    labelEn: 'Technical Office Engineer',
  },
  { id: 'surveyor', label: 'مسّاح', labelEn: 'Land Surveyor' },
  { id: 'skilled', label: 'عامل حرفي', labelEn: 'Skilled Worker' },
  { id: 'laborer', label: 'عامل عام', labelEn: 'General Laborer' },
  { id: 'supervisor', label: 'مراقب مشروع', labelEn: 'Project Supervisor' },
];

const ITEMS_BY_ROLE = {
  site_eng: {
    cat1: [
      {
        id: 'c1_1',
        text: 'الإشراف الفني على التنفيذ',
        desc: 'يراقب الأعمال اليومية ويضمن مطابقتها للمخططات',
      },
      {
        id: 'c1_2',
        text: 'جودة الأعمال بالموقع',
        desc: 'يتحقق من جودة التنفيذ وفق معايير الشركة',
      },
      {
        id: 'c1_3',
        text: 'التخطيط والتنظيم الميداني',
        desc: 'يضع تسلسلاً منطقياً لأعمال الموقع',
      },
      {
        id: 'c1_4',
        text: 'الالتزام بالبرنامج الزمني',
        desc: 'يضمن إنجاز الأعمال حسب الجدول المعتمد',
      },
      {
        id: 'c1_5',
        text: 'التنسيق مع المكتب الفني',
        desc: 'ينقل الملاحظات والاحتياجات بدقة ووضوح',
      },
      {
        id: 'c1_6',
        text: 'السلامة في الموقع',
        desc: 'يراقب التزام العمال بتعليمات السلامة',
      },
      {
        id: 'c1_7',
        text: 'التقارير اليومية والفنية',
        desc: 'يرفع تقارير دقيقة وشاملة عن سير العمل',
      },
      {
        id: 'c1_8',
        text: 'إدارة العمال والمراقبين',
        desc: 'يوزع المهام بوضوح ويتابع التنفيذ ميدانياً',
      },
      {
        id: 'c1_9',
        text: 'التعامل مع الاستشاري والمقاولين',
        desc: 'يتعامل بلباقة واحترافية خلال الاجتماعات',
      },
      {
        id: 'c1_10',
        text: 'مراجعة واعتماد المواد',
        desc: 'يتحقق من مطابقة المواد للمواصفات قبل الاستخدام',
      },
      {
        id: 'c1_11',
        text: 'حل المشكلات الميدانية',
        desc: 'يعالج المشاكل بسرعة دون تعطيل سير العمل',
      },
      {
        id: 'c1_12',
        text: 'فهم المخططات متعددة التخصصات',
        desc: 'يستوعب التنسيق بين التخصصات المختلفة',
      },
      {
        id: 'c1_13',
        text: 'تنفيذ التفاصيل الفنية',
        desc: 'يتأكد من تنفيذ جميع التفاصيل كما بالمخططات',
      },
      {
        id: 'c1_14',
        text: 'إدارة الموارد وتقليل الهدر',
        desc: 'يستخدم المواد والمعدات بكفاءة',
      },
      {
        id: 'c1_15',
        text: 'حصر الكميات الموقعي',
        desc: 'يرفع كميات صحيحة وموثقة للمكتب الفني',
      },
      {
        id: 'c1_16',
        text: 'إجراءات الجودة والتوثيق',
        desc: 'يوثق مراحل التنفيذ ويشارك في إجراءات الفحص',
      },
      {
        id: 'c1_17',
        text: 'تطوير الأداء الميداني',
        desc: 'يقترح حلولاً لتحسين سير العمل بالموقع',
      },
    ],
    cat2: [
      {
        id: 'c2_1',
        text: 'الانضباط بالمواعيد',
        desc: 'الالتزام بساعات العمل والاجتماعات الميدانية',
      },
      {
        id: 'c2_2',
        text: 'تحمل المسؤولية',
        desc: 'يتحمل نتائج قراراته ويُعتمد عليه',
      },
      {
        id: 'c2_3',
        text: 'التواصل والتعاون',
        desc: 'يتعامل بإيجابية مع المهندسين والفنيين',
      },
      {
        id: 'c2_4',
        text: 'تقبل الملاحظات',
        desc: 'يتفاعل مع التوجيهات لتحسين الأداء',
      },
      {
        id: 'c2_5',
        text: 'المظهر والسلوك المهني',
        desc: 'يظهر بمظهر مهندس يمثل الشركة',
      },
    ],
    cat3: [
      {
        id: 'c3_1',
        text: 'العلاقة مع الرؤساء',
        desc: 'يرفع التقارير بوضوح ويتجاوب مع التعليمات',
      },
      {
        id: 'c3_2',
        text: 'العلاقة مع الزملاء',
        desc: 'يتعاون في التنسيق بين الأقسام والتخصصات',
      },
      {
        id: 'c3_3',
        text: 'العلاقة مع العميل/الاستشاري',
        desc: 'يمثل الشركة باحترافية',
      },
    ],
  },
  tech_off: {
    cat1: [
      {
        id: 'c1_1',
        text: 'دقة الرسومات والمستندات',
        desc: 'جودة ودقة المخططات وملفات العمل',
      },
      {
        id: 'c1_2',
        text: 'الالتزام بالمواصفات والمعايير',
        desc: 'الالتزام بكود المشروع والتعليمات الهندسية',
      },
      {
        id: 'c1_3',
        text: 'الكميات والمستخلصات',
        desc: 'الدقة في حساب الكميات وتوثيقها',
      },
      {
        id: 'c1_4',
        text: 'التقارير الفنية',
        desc: 'القدرة على إعداد تقارير واضحة ومنظمة',
      },
      {
        id: 'c1_5',
        text: 'مراجعة RFIs وShop Drawings',
        desc: 'التأكد من اكتمال المستندات الفنية',
      },
      {
        id: 'c1_6',
        text: 'التنسيق مع الأقسام',
        desc: 'فعالية التنسيق مع الموقع والتخطيط والمشتريات',
      },
      {
        id: 'c1_7',
        text: 'الالتزام بالمواعيد',
        desc: 'يسلم الأعمال في الوقت المحدد دون تأخير',
      },
      {
        id: 'c1_8',
        text: 'استخدام البرامج الهندسية',
        desc: 'استخدام جيد لبرامج AutoCAD وRevit وExcel',
      },
      {
        id: 'c1_9',
        text: 'تحليل المشكلات الفنية',
        desc: 'يقدم حلول منطقية للمشكلات الميدانية',
      },
      {
        id: 'c1_10',
        text: 'فهم المخططات والتصميم العام',
        desc: 'يستوعب العلاقة بين المخططات المختلفة',
      },
      {
        id: 'c1_11',
        text: 'متابعة التحديثات الفنية',
        desc: 'يتابع تحديثات الأكواد والبرامج',
      },
      {
        id: 'c1_12',
        text: 'المراجعة والتدقيق قبل الرفع النهائي',
        desc: 'يتحقق من دقة الملفات قبل اعتمادها',
      },
      {
        id: 'c1_13',
        text: 'جودة التنسيق بين المستندات',
        desc: 'يضمن تطابق الرسومات مع الجداول والكميات',
      },
      {
        id: 'c1_14',
        text: 'الالتزام بالنظام الإداري',
        desc: 'يحافظ على تنظيم الملفات والإيميلات',
      },
      {
        id: 'c1_15',
        text: 'إعداد العروض الفنية',
        desc: 'يشارك بفعالية في إعداد للمناقصات',
      },
      {
        id: 'c1_16',
        text: 'تطوير أساليب العمل',
        desc: 'يقترح طرقاً لتسريع وتحسين دورة العمل',
      },
      {
        id: 'c1_17',
        text: 'المرونة في تنفيذ الأعمال الإضافية',
        desc: 'يتعامل بإيجابية مع المهام الجديدة',
      },
    ],
    cat2: [
      {
        id: 'c2_1',
        text: 'الانضباط',
        desc: 'الالتزام بساعات العمل وجدول الاجتماعات',
      },
      {
        id: 'c2_2',
        text: 'الاعتمادية',
        desc: 'يعتمد عليه في المهام الحساسة والدقيقة',
      },
      {
        id: 'c2_3',
        text: 'التعاون',
        desc: 'يعمل بروح الفريق ويشارك في تحقيق أهداف القسم',
      },
      {
        id: 'c2_4',
        text: 'التعلم المستمر',
        desc: 'يتقبل النقد ويعمل على التحسين المستمر',
      },
      {
        id: 'c2_5',
        text: 'السلوك المهني',
        desc: 'يظهر بمظهر مهني وينعكس ذلك في تعاملاته',
      },
    ],
    cat3: [
      {
        id: 'c3_1',
        text: 'مع الرؤساء',
        desc: 'يتواصل بوضوح ويُظهر احتراماً للتسلسل الإداري',
      },
      {
        id: 'c3_2',
        text: 'مع الزملاء',
        desc: 'يعزز التعاون ويشارك المعرفة الفنية',
      },
      {
        id: 'c3_3',
        text: 'مع العملاء/الاستشاريين',
        desc: 'يمثل الشركة باحترافية',
      },
    ],
  },
  surveyor: {
    cat1: [
      {
        id: 'c1_1',
        text: 'دقة القياسات',
        desc: 'ينفذ أعمال الرفع والتوقيع بدقة عالية',
      },
      {
        id: 'c1_2',
        text: 'استخدام الأجهزة',
        desc: 'يجيد استخدام Total Station وGPS وLevel',
      },
      {
        id: 'c1_3',
        text: 'الالتزام بالمخططات',
        desc: 'يطابق القياسات مع المخططات التنفيذية',
      },
      {
        id: 'c1_4',
        text: 'إعداد المخططات المساحية',
        desc: 'يقدم خرائط ورسومات توضح النقاط والمناسيب',
      },
      {
        id: 'c1_5',
        text: 'توثيق الأعمال',
        desc: 'يسجل ويؤرشف القراءات والنقاط بطريقة منظمة',
      },
      {
        id: 'c1_6',
        text: 'المراجعة قبل التوقيع',
        desc: 'يتحقق من الدقة قبل اعتماد أي توقيع أو رفع',
      },
      {
        id: 'c1_7',
        text: 'التنسيق مع الموقع والمكتب الفني',
        desc: 'يعمل بتكامل مع باقي الفريق الهندسي',
      },
      {
        id: 'c1_8',
        text: 'معرفة الأكواد والمواصفات',
        desc: 'يطبق المعايير والمواصفات المطلوبة',
      },
      {
        id: 'c1_9',
        text: 'ضبط المناسيب والمحاور',
        desc: 'يحافظ على صحة المحاور وخطوط البناء',
      },
      {
        id: 'c1_10',
        text: 'الالتزام بخطة العمل',
        desc: 'ينفذ المهام وفق الجدول الزمني المعتمد',
      },
      {
        id: 'c1_11',
        text: 'متابعة التطور التقني',
        desc: 'يطور مهاراته في استخدام الأدوات الحديثة',
      },
      {
        id: 'c1_12',
        text: 'مسؤولية الأجهزة',
        desc: 'يحافظ على سلامة الأجهزة ويبلغ فورًا عن أي خلل',
      },
      {
        id: 'c1_13',
        text: 'السلامة الميدانية',
        desc: 'تطبيق إجراءات السلامة الميدانية',
      },
      {
        id: 'c1_14',
        text: 'سرعة مع دقة',
        desc: 'يوازن بين سرعة الإنجاز وجودة العمل',
      },
      {
        id: 'c1_15',
        text: 'التعاون الميداني',
        desc: 'يوجه فرق التنفيذ حسب النقاط والمحاور',
      },
      {
        id: 'c1_16',
        text: 'معالجة الأخطاء',
        desc: 'يتعامل بسرعة مع أي تعارض في المناسيب',
      },
      {
        id: 'c1_17',
        text: 'الإشراف أثناء التنفيذ',
        desc: 'يتواجد بالموقع وقت التنفيذ للتأكد من صحة العمل',
      },
    ],
    cat2: [
      { id: 'c2_1', text: 'الانضباط', desc: 'التزام بأوقات العمل' },
      {
        id: 'c2_2',
        text: 'تحمل المسؤولية',
        desc: 'يعتمد عليه بالمهام الدقيقة',
      },
      { id: 'c2_3', text: 'التعاون', desc: 'انسجام مع الفريق' },
      {
        id: 'c2_4',
        text: 'تقبل التوجيه',
        desc: 'يتعامل بإيجابية مع ملاحظات المشرفين',
      },
      {
        id: 'c2_5',
        text: 'المظهر والسلوك',
        desc: 'يحافظ على مظهر لائق وسلوك محترم في الموقع',
      },
    ],
    cat3: [
      {
        id: 'c3_1',
        text: 'مع الرؤساء',
        desc: 'يرفع التقارير بوضوح ويتجاوب بسرعة مع التعليمات',
      },
      {
        id: 'c3_2',
        text: 'مع الزملاء',
        desc: 'يتعاون مع مهندسي التنفيذ والفنيين',
      },
      {
        id: 'c3_3',
        text: 'مع العميل/الاستشاري',
        desc: 'يتعامل باحتراف واحترام أثناء زيارات التفتيش',
      },
    ],
  },
  skilled: {
    cat1: [
      {
        id: 'c1_1',
        text: 'إتقان العمل وجودة التنفيذ',
        desc: 'دقة في إنجاز الأعمال ومطابقتها للمواصفات',
      },
      {
        id: 'c1_2',
        text: 'استخدام الأدوات',
        desc: 'استخدام وصيانة الأدوات بشكل صحيح',
      },
      {
        id: 'c1_3',
        text: 'الطريقة الصحيحة للعمل',
        desc: 'يلتزم بالتعليمات الفنية والطرق المعتمدة',
      },
      { id: 'c1_4', text: 'حفظ الأدوات', desc: 'يحافظ عليها من التلف والضياع' },
      {
        id: 'c1_5',
        text: 'سرعة مع جودة',
        desc: 'ينجز عمله بسرعة مناسبة مع جودة عالية',
      },
      {
        id: 'c1_6',
        text: 'السلامة',
        desc: 'يلتزم بتعليمات السلامة الشخصية والموقعية',
      },
      {
        id: 'c1_7',
        text: 'التعاون',
        desc: 'يعمل بروح الفريق ويساعد الآخرين عند الحاجة',
      },
      {
        id: 'c1_8',
        text: 'معرفة المواد',
        desc: 'يعرف نوعية المواد وطرق استخدامها بشكل صحيح',
      },
      {
        id: 'c1_9',
        text: 'الالتزام بالمخططات',
        desc: 'ينفذ العمل حسب الإرشادات دون أخطاء',
      },
      {
        id: 'c1_10',
        text: 'الانتباه أثناء العمل',
        desc: 'يتجنب الأخطاء والمخاطر أثناء التنفيذ',
      },
      {
        id: 'c1_11',
        text: 'الاستجابة للتعليمات',
        desc: 'يتفاعل بسرعة مع أوامر المشرف أو المهندس',
      },
      {
        id: 'c1_12',
        text: 'نظافة المكان',
        desc: 'يترك موقع العمل نظيفاً ومنظماً بعد الإنجاز',
      },
      {
        id: 'c1_13',
        text: 'المبادرة',
        desc: 'لا ينتظر التعليمات في الأمور الواضحة والمتكررة',
      },
      {
        id: 'c1_14',
        text: 'الالتزام بالوقت',
        desc: 'يحضر في الوقت المحدد ويلتزم بساعات العمل',
      },
      {
        id: 'c1_15',
        text: 'تحمل الضغط',
        desc: 'يؤدي مهامه في ظروف صعبة أو عند زيادة الحمل',
      },
      {
        id: 'c1_16',
        text: 'إصلاح الأخطاء البسيطة',
        desc: 'يعالج الملاحظات دون الحاجة لتدخل متكرر',
      },
      {
        id: 'c1_17',
        text: 'جودة النتيجة النهائية',
        desc: 'يحرص على تسليم العمل بمستوى مرضٍ للإشراف',
      },
    ],
    cat2: [
      {
        id: 'c2_1',
        text: 'الالتزام بالأوامر',
        desc: 'ينفذ ما يُطلب منه بدقة وبدون تردد',
      },
      { id: 'c2_2', text: 'الانضباط', desc: 'التزام بالأوقات' },
      { id: 'c2_3', text: 'حسن التعامل', desc: 'يحترم الزملاء' },
      { id: 'c2_4', text: 'تقبل التوجيه', desc: 'يتقبل التوجيه من المشرفين' },
      {
        id: 'c2_5',
        text: 'المظهر والنظافة',
        desc: 'يحافظ على مظهر لائق ومناسب لموقع العمل',
      },
    ],
    cat3: [
      { id: 'c3_1', text: 'مع الرؤساء', desc: 'تنفيذ التوجيهات بإيجابية' },
      { id: 'c3_2', text: 'مع الزملاء', desc: 'تعاون داخل الفريق' },
      {
        id: 'c3_3',
        text: 'مع العميل',
        desc: 'يتعامل بلباقة واحترام إن وُجد تواصل مباشر',
      },
    ],
  },
  laborer: {
    cat1: [
      {
        id: 'c1_1',
        text: 'تنفيذ المهام المطلوبة',
        desc: 'يؤدي المهام اليومية كما يُطلب منه بدقة',
      },
      {
        id: 'c1_2',
        text: 'سرعة الاستجابة',
        desc: 'سرعة الاستجابة عند توجيهه لتنفيذ أي عمل',
      },
      {
        id: 'c1_3',
        text: 'الالتزام بالتعليمات',
        desc: 'يلتزم بتعليمات المشرف دون تكرار التنبيه',
      },
      {
        id: 'c1_4',
        text: 'حفظ الأدوات',
        desc: 'يستخدم الأدوات بحرص ويحافظ عليها من التلف',
      },
      {
        id: 'c1_5',
        text: 'السلامة',
        desc: 'يلتزم بارتداء معدات السلامة (خوذة، سترة، حذاء...)',
      },
      {
        id: 'c1_6',
        text: 'الانتباه أثناء العمل',
        desc: 'يعمل بتركيز ويتجنب الأخطاء أو الإصابات',
      },
      {
        id: 'c1_7',
        text: 'التعاون مع الزملاء',
        desc: 'يعمل بروح الفريق ويساعد الآخرين',
      },
      {
        id: 'c1_8',
        text: 'نظافة الموقع',
        desc: 'يشارك في تنظيف وترتيب مكان العمل',
      },
      {
        id: 'c1_9',
        text: 'الانضباط الزمني',
        desc: 'يحضر في الوقت المحدد ويلتزم بساعات العمل',
      },
      {
        id: 'c1_10',
        text: 'احترام التعليمات الميدانية',
        desc: 'ينفذ تعليمات المهندس أو المراقب كما هي',
      },
      {
        id: 'c1_11',
        text: 'الجدية في العمل',
        desc: 'يبذل جهداً حقيقياً لإنجاز المطلوب دون كسل',
      },
      {
        id: 'c1_12',
        text: 'الاستعداد للعمل الإضافي',
        desc: 'يبدي مرونة في أوقات الذروة',
      },
      {
        id: 'c1_13',
        text: 'الزي الرسمي',
        desc: 'يحافظ على مظهر لائق ومهني في الموقع',
      },
      {
        id: 'c1_14',
        text: 'تحمل الضغط',
        desc: 'يؤدي العمل حتى في الظروف الصعبة',
      },
      {
        id: 'c1_15',
        text: 'جودة المخرجات',
        desc: 'يسعى لتقديم عمل جيد ومقبول من الإشراف',
      },
      {
        id: 'c1_16',
        text: 'المبادرة',
        desc: 'لا ينتظر التوجيه الدائم في الأعمال البسيطة',
      },
      {
        id: 'c1_17',
        text: 'حفظ الممتلكات',
        desc: 'يتعامل مع معدات وموقع العمل بأمانة ومسؤولية',
      },
    ],
    cat2: [
      {
        id: 'c2_1',
        text: 'الحضور والانصراف',
        desc: 'يلتزم بمواعيد العمل اليومية دون غياب متكرر',
      },
      {
        id: 'c2_2',
        text: 'تقبل التوجيهات',
        desc: 'يتعامل بإيجابية مع الملاحظات والتعليمات',
      },
      {
        id: 'c2_3',
        text: 'التعاون',
        desc: 'يحافظ على علاقة جيدة مع فريق العمل',
      },
      {
        id: 'c2_4',
        text: 'السلوك العام',
        desc: 'يحترم الآخرين ويتجنب السلوكيات السلبية',
      },
      {
        id: 'c2_5',
        text: 'المظهر والنظافة',
        desc: 'يهتم بنظافته وملبسه أثناء العمل',
      },
    ],
    cat3: [
      {
        id: 'c3_1',
        text: 'مع المشرفين',
        desc: 'يتعامل باحترام ويتبع التعليمات بدقة',
      },
      {
        id: 'c3_2',
        text: 'مع الزملاء',
        desc: 'يحافظ على روح التعاون والمساعدة',
      },
      {
        id: 'c3_3',
        text: 'مع ممثل العميل',
        desc: 'يتعامل بأدب واحترام في حال التواجد',
      },
    ],
  },
  supervisor: {
    cat1: [
      {
        id: 'c1_1',
        text: 'تطوير أساليب العمل',
        desc: 'يقترح تحسينات لأساليب تنفيذ الأعمال الميدانية',
      },
      {
        id: 'c1_2',
        text: 'تدريب العاملين',
        desc: 'ينقل المعرفة إلى الفنيين والعمال ويوجههم',
      },
      {
        id: 'c1_3',
        text: 'تحديد متطلبات الإنجاز',
        desc: 'يحدد المواد والمعدات والقوى العاملة اللازمة',
      },
      {
        id: 'c1_4',
        text: 'المهارة في التنفيذ',
        desc: 'دقة وكفاءة في تنفيذ الأعمال حسب المخططات',
      },
      {
        id: 'c1_5',
        text: 'تحديد خطوات العمل والبرنامج',
        desc: 'يضع تسلسل زمني عملي للأعمال اليومية',
      },
      {
        id: 'c1_6',
        text: 'المحافظة على أوقات العمل',
        desc: 'الالتزام بمواعيد الحضور والانصراف وجدول المهام',
      },
      {
        id: 'c1_7',
        text: 'تطبيق السلامة',
        desc: 'يلتزم بإجراءات السلامة ويشرف على تطبيقها',
      },
      {
        id: 'c1_8',
        text: 'معرفة الأجهزة والمواد',
        desc: 'يعرف استخدام المعدات وطرق التعامل مع المواد',
      },
      {
        id: 'c1_9',
        text: 'المفاهيم الفنية',
        desc: 'فهم فني جيد لطبيعة الأعمال الإنشائية والكهربائية',
      },
      {
        id: 'c1_10',
        text: 'تجاوز صعوبات العمل',
        desc: 'يتعامل مع التحديات بحلول مناسبة دون تعطيل',
      },
      {
        id: 'c1_11',
        text: 'متابعة المستجدات',
        desc: 'يتابع تعليمات المهندس المسؤول والتحديثات الميدانية',
      },
      {
        id: 'c1_12',
        text: 'اتصالات فعالة',
        desc: 'تنسيق جيد مع المهندسين والموردين والفنيين',
      },
      {
        id: 'c1_13',
        text: 'تحمل مسؤوليات أعلى',
        desc: 'جاهز لتحمل الإشراف الكامل على نطاق أوسع',
      },
      {
        id: 'c1_14',
        text: 'نظم العمل وإجراءاته',
        desc: 'يعرف السياسات الإدارية واللوائح الداخلية',
      },
      {
        id: 'c1_15',
        text: 'الأفكار والمقترحات',
        desc: 'يقدم ملاحظات تطويرية للإدارة الفنية',
      },
      {
        id: 'c1_16',
        text: 'إنجاز العمل في الوقت',
        desc: 'يحقق الأهداف اليومية دون تأخير',
      },
      {
        id: 'c1_17',
        text: 'المراجعة والتدقيق',
        desc: 'يراجع جودة العمل قبل تسليمه للمهندس',
      },
    ],
    cat2: [
      {
        id: 'c2_1',
        text: 'الحوار وعرض الرأي',
        desc: 'يتعامل بلغة مهنية ويحترم وجهات النظر',
      },
      {
        id: 'c2_2',
        text: 'تقدير المسؤولية',
        desc: 'يتحمل مسؤولياته دون تهرب أو تقصير',
      },
      { id: 'c2_3', text: 'حسن التصرف', desc: 'يتصرف بهدوء في المواقف الصعبة' },
      {
        id: 'c2_4',
        text: 'تقبل التوجيهات',
        desc: 'يتقبل التعليمات بروح التعاون',
      },
      {
        id: 'c2_5',
        text: 'المظهر العام',
        desc: 'يلتزم بالزي الرسمي والنظافة العامة',
      },
    ],
    cat3: [
      {
        id: 'c3_1',
        text: 'العلاقة مع الرؤساء',
        desc: 'يحترم التسلسل الإداري وينفذ التوجيهات بدقة',
      },
      {
        id: 'c3_2',
        text: 'العلاقة مع الزملاء',
        desc: 'يتعاون مع الفريق ويُظهر روح العمل الجماعي',
      },
      {
        id: 'c3_3',
        text: 'العلاقة مع العملاء',
        desc: 'يتعامل مع ممثلي العميل باحترام ولباقة',
      },
    ],
  },
};

const GRADE_LABELS = [
  {
    min: 0,
    max: 49,
    ar: 'يحتاج تطوير',
    en: 'Needs Improvement',
    color: '#ef4444',
  },
  { min: 50, max: 74, ar: 'مقبول', en: 'Acceptable', color: '#f97316' },
  { min: 75, max: 94, ar: 'جيد', en: 'Good', color: '#eab308' },
  { min: 95, max: 109, ar: 'جيد جداً', en: 'Very Good', color: '#3b82f6' },
  { min: 110, max: 125, ar: 'ممتاز', en: 'Excellent', color: '#22c55e' },
];

function getGrade(score) {
  return (
    GRADE_LABELS.find((g) => score >= g.min && score <= g.max) ||
    GRADE_LABELS[0]
  );
}

function genId() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

// ===== STORAGE HELPERS =====
async function saveEval(id, data) {
  try {
    await window.storage.set('eval:' + id, JSON.stringify(data), true);
    return true;
  } catch {
    return false;
  }
}

async function loadEval(id) {
  try {
    const r = await window.storage.get('eval:' + id, true);
    return r ? JSON.parse(r.value) : null;
  } catch {
    return null;
  }
}

// ===== MAIN =====
export default function App() {
  const [view, setView] = useState('home'); // home | manager | employee
  const [evalId, setEvalId] = useState(null);
  const [loadedData, setLoadedData] = useState(null);
  const [inputId, setInputId] = useState('');
  const [loadError, setLoadError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleOpenEmployee() {
    if (!inputId.trim()) return;
    setLoading(true);
    setLoadError('');
    const data = await loadEval(inputId.trim().toUpperCase());
    setLoading(false);
    if (!data) {
      setLoadError('لم يُعثر على التقييم. تحقق من الرمز.');
      return;
    }
    if (data.stage !== 'pending_employee') {
      setLoadError('هذا التقييم لم يُعتمد من المدير بعد، أو تم إغلاقه.');
      return;
    }
    setEvalId(inputId.trim().toUpperCase());
    setLoadedData(data);
    setView('employee');
  }

  if (view === 'manager') {
    return (
      <ManagerFlow
        onDone={(id) => {
          setEvalId(id);
          setView('manager_done');
        }}
        onBack={() => setView('home')}
      />
    );
  }
  if (view === 'manager_done') {
    return (
      <ManagerDoneScreen evalId={evalId} onReset={() => setView('home')} />
    );
  }
  if (view === 'employee') {
    return (
      <EmployeeFlow
        evalId={evalId}
        data={loadedData}
        onDone={() => setView('home')}
      />
    );
  }

  // HOME
  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.header}>
        <div style={{ fontWeight: 900, fontSize: 20 }}>نظام تقييم الأداء</div>
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
          Performance Evaluation — تبارك
        </div>
      </div>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '32px 16px' }}>
        {/* Manager card */}
        <div style={styles.homeCard} onClick={() => setView('manager')}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
            أنا المدير
          </div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>
            أعبئ نموذج تقييم موظف وأرسله له
          </div>
          <div
            style={{
              marginTop: 14,
              background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
              borderRadius: 8,
              padding: '10px 20px',
              display: 'inline-block',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            ابدأ التقييم ←
          </div>
        </div>

        {/* Employee card */}
        <div
          style={{
            ...styles.homeCard,
            background: 'rgba(34,197,94,0.08)',
            borderColor: 'rgba(34,197,94,0.2)',
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 12 }}>👤</div>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>
            أنا الموظف
          </div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 14 }}>
            أدخل رمز التقييم الذي أرسله لي مديري
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={inputId}
              onChange={(e) => {
                setInputId(e.target.value.toUpperCase());
                setLoadError('');
              }}
              placeholder="أدخل رمز التقييم"
              style={{
                ...styles.input,
                flex: 1,
                textAlign: 'center',
                letterSpacing: 4,
                fontWeight: 800,
                fontSize: 16,
              }}
            />
            <button
              onClick={handleOpenEmployee}
              disabled={loading || !inputId.trim()}
              style={styles.btnGreen}
            >
              {loading ? '...' : 'فتح'}
            </button>
          </div>
          {loadError && (
            <div style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>
              {loadError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== MANAGER FLOW =====
function ManagerFlow({ onDone, onBack }) {
  const [stage, setStage] = useState('setup'); // setup | fill | approve
  const [form, setForm] = useState({
    role: 'site_eng',
    employeeName: '',
    jobTitle: '',
    department: '',
    period: '',
    evaluatorName: '',
    scores: {},
    strengths: '',
    weaknesses: '',
    recommendations: '',
    managerOpinion: '',
    managerNotes: '',
    managerSignature: '',
    managerApprovalDate: '',
  });

  const items = ITEMS_BY_ROLE[form.role];
  const allItems = [...items.cat1, ...items.cat2, ...items.cat3];
  const scored = allItems.reduce(
    (s, i) => s + (parseInt(form.scores[i.id]) || 0),
    0
  );
  const totalMax = allItems.length * 5;
  const grade = getGrade(scored);
  const progress =
    (allItems.filter((i) => form.scores[i.id]).length / allItems.length) * 100;

  async function handleApprove() {
    const id = genId();
    const data = {
      ...form,
      stage: 'pending_employee',
      evalId: id,
      createdAt: new Date().toISOString(),
    };
    await saveEval(id, data);
    onDone(id);
  }

  if (stage === 'setup')
    return (
      <SetupStage
        form={form}
        setForm={setForm}
        onNext={() => setStage('fill')}
        onBack={onBack}
      />
    );
  if (stage === 'fill')
    return (
      <FillStage
        form={form}
        setForm={setForm}
        items={items}
        allItems={allItems}
        scored={scored}
        totalMax={totalMax}
        grade={grade}
        progress={progress}
        onBack={() => setStage('setup')}
        onNext={() => setStage('approve')}
      />
    );
  if (stage === 'approve')
    return (
      <ApproveStage
        form={form}
        setForm={setForm}
        items={items}
        allItems={allItems}
        scored={scored}
        totalMax={totalMax}
        grade={grade}
        onBack={() => setStage('fill')}
        onApprove={handleApprove}
      />
    );
}

// ===== MANAGER DONE =====
function ManagerDoneScreen({ evalId, onReset }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(evalId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.header}>
        <div style={{ fontWeight: 900, fontSize: 18 }}>
          نظام تقييم الأداء — تبارك
        </div>
      </div>
      <div
        style={{
          maxWidth: 520,
          margin: '40px auto',
          padding: '0 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 900 }}>
          تم اعتماد التقييم بنجاح!
        </h2>
        <p style={{ color: '#64748b', marginBottom: 28 }}>
          أرسل هذا الرمز للموظف ليفتح تقييمه ويوقع بالاطلاع
        </p>

        <div
          style={{
            background: 'rgba(124,58,237,0.15)',
            border: '2px dashed rgba(124,58,237,0.5)',
            borderRadius: 16,
            padding: 28,
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>
            رمز التقييم
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              letterSpacing: 8,
              color: '#a78bfa',
              marginBottom: 16,
            }}
          >
            {evalId}
          </div>
          <button onClick={copy} style={{ ...styles.btnPrimary, fontSize: 14 }}>
            {copied ? '✓ تم النسخ!' : 'نسخ الرمز 📋'}
          </button>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 12,
            padding: 16,
            fontSize: 13,
            color: '#64748b',
            marginBottom: 24,
            textAlign: 'right',
          }}
        >
          <div style={{ fontWeight: 700, color: '#94a3b8', marginBottom: 8 }}>
            تعليمات للموظف:
          </div>
          <div>١. افتح نظام تقييم الأداء</div>
          <div>٢. اضغط على "أنا الموظف"</div>
          <div>
            ٣. أدخل الرمز:{' '}
            <strong style={{ color: '#a78bfa' }}>{evalId}</strong>
          </div>
          <div>٤. اطّلع على نتيجتك ووقّع بالاطلاع</div>
        </div>

        <button onClick={onReset} style={{ ...styles.btnGhost, width: '100%' }}>
          + بدء تقييم جديد
        </button>
      </div>
    </div>
  );
}

// ===== EMPLOYEE FLOW =====
function EmployeeFlow({ evalId, data, onDone }) {
  const [empSig, setEmpSig] = useState('');
  const [empDate, setEmpDate] = useState('');
  const [empComment, setEmpComment] = useState('');
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const items = ITEMS_BY_ROLE[data.role];
  const allItems = [...items.cat1, ...items.cat2, ...items.cat3];
  const scored = allItems.reduce(
    (s, i) => s + (parseInt(data.scores[i.id]) || 0),
    0
  );
  const totalMax = allItems.length * 5;
  const grade = getGrade(scored);
  const cat1Score = items.cat1.reduce(
    (s, i) => s + (parseInt(data.scores[i.id]) || 0),
    0
  );
  const cat2Score = items.cat2.reduce(
    (s, i) => s + (parseInt(data.scores[i.id]) || 0),
    0
  );
  const cat3Score = items.cat3.reduce(
    (s, i) => s + (parseInt(data.scores[i.id]) || 0),
    0
  );
  const canSign = empSig.trim() && empDate;
  const roleName = ROLES.find((r) => r.id === data.role)?.label || '';

  async function handleSign() {
    setSaving(true);
    const updated = {
      ...data,
      stage: 'completed',
      employeeSignature: empSig,
      employeeApprovalDate: empDate,
      employeeComment: empComment,
      completedAt: new Date().toISOString(),
    };
    await saveEval(evalId, updated);
    setSaving(false);
    setDone(true);
  }

  if (done)
    return (
      <div dir="rtl" style={styles.page}>
        <div style={styles.header}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>
            نظام تقييم الأداء — تبارك
          </div>
        </div>
        <div
          style={{
            maxWidth: 520,
            margin: '40px auto',
            padding: '0 16px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ margin: '0 0 8px', fontWeight: 900 }}>
            تم التوقيع بالاطلاع بنجاح
          </h2>
          <p style={{ color: '#64748b' }}>اكتملت دورة التقييم بشكل رسمي</p>
          <div
            style={{
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: 12,
              padding: 20,
              margin: '20px 0',
              textAlign: 'right',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span style={{ color: '#64748b', fontSize: 13 }}>الموظف</span>
              <span style={{ fontWeight: 700 }}>{data.employeeName}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span style={{ color: '#64748b', fontSize: 13 }}>النتيجة</span>
              <span style={{ fontWeight: 800, color: grade.color }}>
                {scored} / {totalMax} — {grade.ar}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontSize: 13 }}>
                تاريخ الاطلاع
              </span>
              <span style={{ fontWeight: 700 }}>{empDate}</span>
            </div>
          </div>
          <button
            onClick={onDone}
            style={{ ...styles.btnGhost, width: '100%' }}
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );

  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.header}>
        <div style={{ fontWeight: 900, fontSize: 18 }}>
          نتيجة تقييمك — {data.employeeName}
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
          {roleName} • {data.period}
        </div>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px 16px' }}>
        {/* Score summary */}
        <ScoreSummary
          scored={scored}
          totalMax={totalMax}
          grade={grade}
          cat1Score={cat1Score}
          cat2Score={cat2Score}
          cat3Score={cat3Score}
          cat1Max={items.cat1.length * 5}
          cat2Max={items.cat2.length * 5}
          cat3Max={items.cat3.length * 5}
        />

        {/* Scores read-only */}
        <Card>
          <h3 style={styles.sectionTitle}>تفاصيل عناصر التقييم</h3>
          {[
            {
              label: 'الفئة الأولى: الكفاءة الفنية والإنتاجية',
              color: '#a78bfa',
              cat: items.cat1,
            },
            {
              label: 'الفئة الثانية: السلوك والانضباط',
              color: '#34d399',
              cat: items.cat2,
            },
            {
              label: 'الفئة الثالثة: العلاقات المهنية',
              color: '#60a5fa',
              cat: items.cat3,
            },
          ].map(({ label, color, cat }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color,
                  marginBottom: 8,
                }}
              >
                {label}
              </div>
              {cat.map((item) => (
                <ScoreRow
                  key={item.id}
                  item={item}
                  value={data.scores[item.id]}
                  readOnly
                />
              ))}
            </div>
          ))}
        </Card>

        {/* Manager comments */}
        {(data.strengths ||
          data.weaknesses ||
          data.recommendations ||
          data.managerOpinion) && (
          <Card>
            <h3 style={styles.sectionTitle}>ملاحظات وتوجيهات المدير</h3>
            {data.strengths && (
              <CommentBlock
                label="مواطن القوة"
                value={data.strengths}
                color="#22c55e"
              />
            )}
            {data.weaknesses && (
              <CommentBlock
                label="مواطن الضعف"
                value={data.weaknesses}
                color="#ef4444"
              />
            )}
            {data.recommendations && (
              <CommentBlock
                label="التوصيات"
                value={data.recommendations}
                color="#f59e0b"
              />
            )}
            {data.managerOpinion && (
              <CommentBlock
                label="رأي المدير"
                value={data.managerOpinion}
                color="#94a3b8"
              />
            )}
          </Card>
        )}

        {/* Manager sig */}
        <Card>
          <h3 style={styles.sectionTitle}>اعتماد المدير</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              background: 'rgba(124,58,237,0.06)',
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: '#64748b' }}>المدير</div>
              <div style={{ fontWeight: 700 }}>{data.managerSignature}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#64748b' }}>التاريخ</div>
              <div style={{ fontWeight: 700 }}>{data.managerApprovalDate}</div>
            </div>
          </div>
        </Card>

        {/* Employee sign */}
        <Card>
          <h3 style={styles.sectionTitle}>توقيعي بالاطلاع</h3>
          <TextArea
            label="ملاحظاتي (اختياري)"
            value={empComment}
            onChange={setEmpComment}
            rows={2}
          />
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
          >
            <Field
              label="اسمي / توقيعي"
              value={empSig}
              onChange={setEmpSig}
              placeholder="اكتب اسمك كتوقيع"
            />
            <Field
              label="تاريخ الاطلاع"
              value={empDate}
              onChange={setEmpDate}
              type="date"
            />
          </div>
          {canSign && (
            <div
              style={{
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 8,
                padding: 10,
                fontSize: 13,
                color: '#22c55e',
                marginBottom: 12,
              }}
            >
              ✓ سيُسجَّل اطلاعك باسم: <strong>{empSig}</strong> بتاريخ {empDate}
            </div>
          )}
          <button
            onClick={handleSign}
            disabled={!canSign || saving}
            style={{
              ...styles.btnGreen,
              width: '100%',
              padding: '14px',
              fontSize: 15,
              fontWeight: 800,
              opacity: !canSign || saving ? 0.5 : 1,
            }}
          >
            {saving ? 'جاري الحفظ...' : 'توقيع بالاطلاع والاعتماد ✓'}
          </button>
        </Card>
      </div>
    </div>
  );
}

// ===== SETUP STAGE =====
function SetupStage({ form, setForm, onNext, onBack }) {
  const valid =
    form.employeeName &&
    form.jobTitle &&
    form.department &&
    form.period &&
    form.evaluatorName;
  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>
          ← رجوع
        </button>
        <div style={{ fontWeight: 900, fontSize: 18 }}>تقييم جديد</div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px' }}>
        <Card>
          <h3 style={styles.sectionTitle}>الفئة الوظيفية</h3>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
          >
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() =>
                  setForm((f) => ({ ...f, role: r.id, scores: {} }))
                }
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: 'none',
                  textAlign: 'right',
                  background:
                    form.role === r.id
                      ? 'linear-gradient(135deg,#7c3aed,#4f46e5)'
                      : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  boxShadow:
                    form.role === r.id
                      ? '0 4px 15px rgba(124,58,237,0.4)'
                      : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {r.label}
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.7,
                    marginTop: 2,
                    fontWeight: 400,
                  }}
                >
                  {r.labelEn}
                </div>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h3 style={styles.sectionTitle}>بيانات الموظف</h3>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
          >
            <Field
              label="اسم الموظف"
              value={form.employeeName}
              onChange={(v) => setForm((f) => ({ ...f, employeeName: v }))}
              placeholder="الاسم الكامل"
            />
            <Field
              label="المسمى الوظيفي"
              value={form.jobTitle}
              onChange={(v) => setForm((f) => ({ ...f, jobTitle: v }))}
              placeholder="مثال: مهندس موقع أول"
            />
            <Field
              label="القسم / المشروع"
              value={form.department}
              onChange={(v) => setForm((f) => ({ ...f, department: v }))}
              placeholder="اسم القسم أو المشروع"
            />
            <Field
              label="فترة التقييم"
              value={form.period}
              onChange={(v) => setForm((f) => ({ ...f, period: v }))}
              placeholder="مثال: Q1 2026"
            />
            <Field
              label="اسم المقيم (المدير)"
              value={form.evaluatorName}
              onChange={(v) => setForm((f) => ({ ...f, evaluatorName: v }))}
              placeholder="اسم المدير المباشر"
            />
          </div>
        </Card>
        <button
          onClick={onNext}
          disabled={!valid}
          style={{
            ...styles.btnPrimary,
            width: '100%',
            opacity: valid ? 1 : 0.4,
          }}
        >
          التالي: تعبئة التقييم ←
        </button>
      </div>
    </div>
  );
}

// ===== FILL STAGE =====
function FillStage({
  form,
  setForm,
  items,
  allItems,
  scored,
  totalMax,
  grade,
  progress,
  onBack,
  onNext,
}) {
  const cat1Score = items.cat1.reduce(
    (s, i) => s + (parseInt(form.scores[i.id]) || 0),
    0
  );
  const cat2Score = items.cat2.reduce(
    (s, i) => s + (parseInt(form.scores[i.id]) || 0),
    0
  );
  const cat3Score = items.cat3.reduce(
    (s, i) => s + (parseInt(form.scores[i.id]) || 0),
    0
  );
  const allScored = allItems.every((i) => form.scores[i.id]);
  const remaining = allItems.filter((i) => !form.scores[i.id]).length;

  function updateScore(id, val) {
    setForm((f) => ({ ...f, scores: { ...f.scores, [id]: val } }));
  }

  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>
          ← رجوع
        </button>
        <div style={{ fontWeight: 900, fontSize: 16 }}>تعبئة التقييم</div>
        <div style={{ fontSize: 13, color: '#a78bfa' }}>
          {Math.round(progress)}%
        </div>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '16px 16px' }}>
        {/* Progress bar */}
        <div
          style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 6,
            height: 6,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg,#7c3aed,#22c55e)',
              borderRadius: 6,
              transition: 'width 0.3s',
            }}
          />
        </div>

        <ScoreSummary
          scored={scored}
          totalMax={totalMax}
          grade={grade}
          cat1Score={cat1Score}
          cat2Score={cat2Score}
          cat3Score={cat3Score}
          cat1Max={items.cat1.length * 5}
          cat2Max={items.cat2.length * 5}
          cat3Max={items.cat3.length * 5}
        />

        <Card>
          <h3 style={{ ...styles.sectionTitle, color: '#a78bfa' }}>
            الفئة الأولى: الكفاءة الفنية والإنتاجية
            <span style={{ float: 'left', fontSize: 13, color: '#64748b' }}>
              {cat1Score}/{items.cat1.length * 5}
            </span>
          </h3>
          {items.cat1.map((item) => (
            <ScoreRow
              key={item.id}
              item={item}
              value={form.scores[item.id]}
              onChange={(v) => updateScore(item.id, v)}
            />
          ))}
        </Card>

        <Card>
          <h3 style={{ ...styles.sectionTitle, color: '#34d399' }}>
            الفئة الثانية: السلوك والانضباط
            <span style={{ float: 'left', fontSize: 13, color: '#64748b' }}>
              {cat2Score}/{items.cat2.length * 5}
            </span>
          </h3>
          {items.cat2.map((item) => (
            <ScoreRow
              key={item.id}
              item={item}
              value={form.scores[item.id]}
              onChange={(v) => updateScore(item.id, v)}
            />
          ))}
        </Card>

        <Card>
          <h3 style={{ ...styles.sectionTitle, color: '#60a5fa' }}>
            الفئة الثالثة: العلاقات المهنية
            <span style={{ float: 'left', fontSize: 13, color: '#64748b' }}>
              {cat3Score}/{items.cat3.length * 5}
            </span>
          </h3>
          {items.cat3.map((item) => (
            <ScoreRow
              key={item.id}
              item={item}
              value={form.scores[item.id]}
              onChange={(v) => updateScore(item.id, v)}
            />
          ))}
        </Card>

        <Card>
          <h3 style={styles.sectionTitle}>ملاحظات</h3>
          <TextArea
            label="مواطن القوة"
            value={form.strengths}
            onChange={(v) => setForm((f) => ({ ...f, strengths: v }))}
            rows={3}
          />
          <TextArea
            label="مواطن الضعف"
            value={form.weaknesses}
            onChange={(v) => setForm((f) => ({ ...f, weaknesses: v }))}
            rows={3}
          />
          <TextArea
            label="التوجيهات والتوصيات"
            value={form.recommendations}
            onChange={(v) => setForm((f) => ({ ...f, recommendations: v }))}
            rows={3}
          />
        </Card>

        <button
          onClick={onNext}
          disabled={!allScored}
          style={{
            ...styles.btnPrimary,
            width: '100%',
            opacity: allScored ? 1 : 0.5,
          }}
        >
          {allScored
            ? 'التالي: اعتماد المدير ←'
            : `تبقى ${remaining} عنصر بدون تقييم`}
        </button>
      </div>
    </div>
  );
}

// ===== APPROVE STAGE =====
function ApproveStage({
  form,
  setForm,
  items,
  allItems,
  scored,
  totalMax,
  grade,
  onBack,
  onApprove,
}) {
  const cat1Score = items.cat1.reduce(
    (s, i) => s + (parseInt(form.scores[i.id]) || 0),
    0
  );
  const cat2Score = items.cat2.reduce(
    (s, i) => s + (parseInt(form.scores[i.id]) || 0),
    0
  );
  const cat3Score = items.cat3.reduce(
    (s, i) => s + (parseInt(form.scores[i.id]) || 0),
    0
  );
  const canApprove =
    form.managerSignature && form.managerApprovalDate && form.managerOpinion;

  return (
    <div dir="rtl" style={styles.page}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>
          ← رجوع
        </button>
        <div style={{ fontWeight: 900, fontSize: 16 }}>اعتماد المدير</div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '16px 16px' }}>
        <ScoreSummary
          scored={scored}
          totalMax={totalMax}
          grade={grade}
          cat1Score={cat1Score}
          cat2Score={cat2Score}
          cat3Score={cat3Score}
          cat1Max={items.cat1.length * 5}
          cat2Max={items.cat2.length * 5}
          cat3Max={items.cat3.length * 5}
        />

        <Card>
          <h3 style={styles.sectionTitle}>ملخص الدرجات</h3>
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {allItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '7px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontSize: 13,
                }}
              >
                <span style={{ flex: 1, paddingLeft: 8 }}>{item.text}</span>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 13,
                    flexShrink: 0,
                    background:
                      parseInt(form.scores[item.id]) <= 2
                        ? '#ef4444'
                        : parseInt(form.scores[item.id]) === 3
                        ? '#f97316'
                        : parseInt(form.scores[item.id]) === 4
                        ? '#3b82f6'
                        : '#22c55e',
                  }}
                >
                  {form.scores[item.id]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={styles.sectionTitle}>اعتماد المدير</h3>
          <TextArea
            label="رأي المدير / تعليق الاعتماد"
            value={form.managerOpinion}
            onChange={(v) => setForm((f) => ({ ...f, managerOpinion: v }))}
            rows={3}
          />
          <TextArea
            label="ملحوظات إضافية (اختياري)"
            value={form.managerNotes}
            onChange={(v) => setForm((f) => ({ ...f, managerNotes: v }))}
            rows={2}
          />
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
          >
            <Field
              label="التوقيع / الاسم"
              value={form.managerSignature}
              onChange={(v) => setForm((f) => ({ ...f, managerSignature: v }))}
              placeholder="اكتب اسمك كتوقيع"
            />
            <Field
              label="تاريخ الاعتماد"
              value={form.managerApprovalDate}
              onChange={(v) =>
                setForm((f) => ({ ...f, managerApprovalDate: v }))
              }
              type="date"
            />
          </div>
        </Card>

        <button
          onClick={onApprove}
          disabled={!canApprove}
          style={{
            ...styles.btnGreen,
            width: '100%',
            padding: 14,
            fontSize: 15,
            fontWeight: 800,
            opacity: canApprove ? 1 : 0.4,
          }}
        >
          اعتماد وإرسال رمز التقييم للموظف ✓
        </button>
      </div>
    </div>
  );
}

// ===== SHARED UI =====
function Card({ children }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 14,
        padding: 18,
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: 'block',
          fontSize: 12,
          color: '#94a3b8',
          marginBottom: 5,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: 9,
          padding: '10px 12px',
          color: '#e2e8f0',
          fontSize: 14,
          outline: 'none',
        }}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: 'block',
          fontSize: 12,
          color: '#94a3b8',
          marginBottom: 5,
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          resize: 'vertical',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: 9,
          padding: '10px 12px',
          color: '#e2e8f0',
          fontSize: 14,
          outline: 'none',
        }}
      />
    </div>
  );
}

function CommentBlock({ label, value, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, color, marginBottom: 4, fontWeight: 700 }}>
        {label}
      </div>
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 8,
          padding: '10px 12px',
          fontSize: 14,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ScoreRow({ item, value, onChange, readOnly = false }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        background: value ? 'rgba(124,58,237,0.09)' : 'rgba(255,255,255,0.02)',
        borderRadius: 9,
        marginBottom: 7,
        border: `1px solid ${
          value ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.06)'
        }`,
      }}
    >
      <div style={{ flex: 1, paddingLeft: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{item.text}</div>
        <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>
          {item.desc}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => !readOnly && onChange(n)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 7,
              border: 'none',
              background:
                parseInt(value) === n
                  ? n <= 2
                    ? '#ef4444'
                    : n === 3
                    ? '#f97316'
                    : n === 4
                    ? '#3b82f6'
                    : '#22c55e'
                  : 'rgba(255,255,255,0.07)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              cursor: readOnly ? 'default' : 'pointer',
              opacity: readOnly && parseInt(value) !== n ? 0.35 : 1,
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScoreSummary({
  scored,
  totalMax,
  grade,
  cat1Score,
  cat2Score,
  cat3Score,
  cat1Max,
  cat2Max,
  cat3Max,
}) {
  const pct = Math.round((scored / totalMax) * 100);
  return (
    <div
      style={{
        background: 'rgba(124,58,237,0.1)',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: 14,
        padding: 18,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <div>
          <div style={{ fontSize: 32, fontWeight: 900, color: grade.color }}>
            {scored}
          </div>
          <div style={{ fontSize: 12, color: '#64748b' }}>من {totalMax}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: grade.color }}>
            {grade.ar}
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>{grade.en}</div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: grade.color }}>
            {pct}%
          </div>
          <div style={{ fontSize: 12, color: '#64748b' }}>النسبة</div>
        </div>
      </div>
      <div
        style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 5,
          height: 8,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: grade.color,
            borderRadius: 5,
            transition: 'width 0.5s',
          }}
        />
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 }}
      >
        {[
          ['الكفاءة الفنية', cat1Score, cat1Max],
          ['السلوك', cat2Score, cat2Max],
          ['العلاقات', cat3Score, cat3Max],
        ].map(([l, s, m]) => (
          <div
            key={l}
            style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 9,
              padding: '8px 0',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 10, color: '#64748b' }}>{l}</div>
            <div style={{ fontWeight: 800, fontSize: 17 }}>
              {s}
              <span style={{ fontSize: 10, color: '#475569' }}>/{m}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== STYLES =====
const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)',
    fontFamily: "'Segoe UI','Tahoma',Arial,sans-serif",
    color: '#e2e8f0',
  },
  header: {
    background: 'linear-gradient(90deg,#7c3aed,#4f46e5)',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
  },
  homeCard: {
    background: 'rgba(124,58,237,0.08)',
    border: '1px solid rgba(124,58,237,0.2)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  input: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: '11px 14px',
    color: '#e2e8f0',
    fontSize: 14,
    outline: 'none',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
  },
  btnGreen: {
    background: 'linear-gradient(135deg,#059669,#10b981)',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    padding: '11px 20px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
  },
  btnGhost: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    color: '#94a3b8',
    padding: '12px 20px',
    fontSize: 14,
    cursor: 'pointer',
  },
  backBtn: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    cursor: 'pointer',
    padding: '4px 8px',
  },
  sectionTitle: {
    margin: '0 0 14px',
    fontSize: 15,
    fontWeight: 800,
  },
};

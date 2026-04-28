import type { Locale } from '@/lib/i18n';

export const serviceSlugs = [
    'general-maintenance',
    'ac-maintenance',
    'washing-machine-maintenance',
    'gas-stove-maintenance',
    'refrigerator-maintenance',
    'water-filters',
    'painting',
    'plastering',
    'gypsum-board',
    'ceramic-tiling',
    'concrete-works',
    'screed-floors',
    'helicopter-floors',
    'plumbing',
    'bathroom-finishing',
    'electrical',
    'carpentry',
    'ironwork',
    'interlock-paving',
    'swimming-pools',
    'demolition-renovation',
    'apartment-shop-renovation',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

const placeholder = (seed: string) => `https://picsum.photos/seed/alnosor-${seed}/1200/800`;

export const serviceImages: Record<ServiceSlug, string> = {
    'general-maintenance': '/images/services/General Home Maintenance.webp',
    'ac-maintenance': '/images/services/AC Maintenance & Service.webp',
    'washing-machine-maintenance': '/images/services/Washing Machine Maintenance.jpg',
    'gas-stove-maintenance': '/images/services/Gas Stove Maintenance.jpg',
    'refrigerator-maintenance': '/images/services/Refrigerator Maintenance.jpeg',
    'water-filters': '/images/services/Water Filter Installation & Service.jpg',
    painting: '/images/services/Painting & Decorating.jpg',
    plastering: '/images/services/Plastering.jpg',
    'gypsum-board': '/images/services/Gypsum Board Ceilings & Walls.jpg',
    'ceramic-tiling': '/images/services/Ceramic Floor & Wall Tiling.webp',
    'concrete-works': '/images/services/Masonry & Concrete Works.jpg',
    'screed-floors': '/images/services/Screed Flooring.jpg',
    'helicopter-floors': '/images/services/Helicopter Power-Float Flooring.webp',
    plumbing: '/images/services/Plumbing Works.jpg',
    'bathroom-finishing': '/images/services/Bathroom Fit-Out.jpg',
    electrical: '/images/services/Electrical Works.jpg',
    carpentry: '/images/services/Carpentry & Joinery.png',
    ironwork: '/images/services/Ironwork & Crittall Fabrication.jpg',
    'interlock-paving': '/images/services/Interlock Paving.webp',
    'swimming-pools': '/images/services/Swimming Pool Construction & Service.jpg',
    'demolition-renovation': '/images/services/Demolition & Restoration Prep.jpg',
    'apartment-shop-renovation': '/images/services/Apartment & Shop Renovation.jpg',
};

export function getServiceIndexBySlug(slug: string): number {
    return serviceSlugs.indexOf(slug as ServiceSlug);
}

export function getSlugByIndex(idx: number): ServiceSlug {
    return serviceSlugs[idx];
}

export type GalleryItem = {
    id: string;
    serviceIdx: number;
    type: 'image' | 'video';
    src: string;
    thumb?: string;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    date: string;
    location: Record<Locale, string>;
};

const projectTitles: Record<number, { en: string[]; ar: string[] }> = {
    0: {
        en: ['Same-Day Home Repair', 'Emergency Call-Out', 'Routine Maintenance Visit', 'Quick-Fix Job', 'Annual Maintenance Contract'],
        ar: ['إصلاح منزلي في نفس اليوم', 'صيانة طارئة', 'زيارة صيانة دورية', 'مهمة إصلاح سريعة', 'عقد صيانة سنوي'],
    },
    1: {
        en: ['Split AC Service', 'Central AC Cleaning', 'Refrigerant Top-Up', 'AC Fault Diagnosis', 'AC Coil Cleaning', 'Annual AC Service'],
        ar: ['صيانة تكييف سبليت', 'تنظيف تكييف مركزي', 'شحن غاز فريون', 'تشخيص عطل تكييف', 'تنظيف ملف التكييف', 'صيانة سنوية للتكييف'],
    },
    2: {
        en: ['Top-Load Washer Repair', 'Front-Load Washer Service', 'Drum Bearing Replacement', 'Control Board Repair', 'On-Site Washer Diagnostic'],
        ar: ['إصلاح غسالة علوية', 'صيانة غسالة أمامية', 'استبدال رولمان البلي', 'إصلاح لوحة التحكم', 'تشخيص غسالة في الموقع'],
    },
    3: {
        en: ['Burner Cleaning Service', 'Gas Line Safety Check', 'Ignition Replacement', 'Built-In Hob Repair', 'Cooker Valve Service'],
        ar: ['تنظيف شعلات البوتاجاز', 'فحص خط الغاز', 'استبدال الإشعال', 'إصلاح بوتاجاز بلت إن', 'صيانة صمامات البوتاجاز'],
    },
    4: {
        en: ['Cooling System Repair', 'Compressor Replacement', 'Refrigerant Gas Refill', 'Thermostat Replacement', 'Door Seal Replacement'],
        ar: ['إصلاح نظام التبريد', 'استبدال الكمبروسر', 'شحن غاز التبريد', 'استبدال الثرموستات', 'استبدال إطار الباب'],
    },
    5: {
        en: ['Under-Sink Filter Install', 'Whole-House Filter System', 'Cartridge Replacement', 'RO System Service', 'Annual Filter Maintenance'],
        ar: ['تركيب فلتر تحت الحوض', 'نظام فلاتر للمنزل بالكامل', 'استبدال الشمعات', 'صيانة نظام التناضح العكسي', 'صيانة سنوية للفلاتر'],
    },
    6: {
        en: ['Apartment Repaint', 'Villa Exterior Paint', 'Office Refresh', 'Decorative Wall Finish', 'Full Interior Paint'],
        ar: ['إعادة دهان شقة', 'دهان خارجي لفيلا', 'تجديد دهان مكتب', 'تشطيب جدار ديكوري', 'دهان داخلي كامل'],
    },
    7: {
        en: ['Wall Plastering — Villa', 'Ceiling Plastering', 'Pre-Paint Smoothing', 'Skim Coat Finish', 'Repair & Re-Plaster'],
        ar: ['محارة جدران فيلا', 'محارة سقف', 'تنعيم قبل الدهان', 'طبقة سكيم نهائية', 'ترميم وإعادة محارة'],
    },
    8: {
        en: ['Suspended Ceiling Install', 'Decorative Wall Feature', 'Concealed Lighting Cove', 'Office Gypsum Ceiling', 'Modern Wall Panels'],
        ar: ['تركيب سقف معلق', 'فيتشر جدار ديكوري', 'مخباة إضاءة مخفية', 'سقف جبس بورد لمكتب', 'لوحات جدران حديثة'],
    },
    9: {
        en: ['Bathroom Floor Tiling', 'Living Room Floor Tile', 'Kitchen Wall Tile', 'Lobby Marble-Effect Tile', 'Outdoor Tile Install'],
        ar: ['تركيب سيراميك حمام', 'سيراميك أرضية معيشة', 'سيراميك حائط مطبخ', 'سيراميك رخامي للوبي', 'تركيب سيراميك خارجي'],
    },
    10: {
        en: ['Boundary Wall Build', 'Reinforced Slab Pour', 'Block Wall Construction', 'Foundation Works', 'Concrete Column Casting'],
        ar: ['بناء سور خارجي', 'صب بلاطة مسلحة', 'بناء جدار طوب', 'أعمال أساسات', 'صب أعمدة خرسانية'],
    },
    11: {
        en: ['Apartment Floor Screed', 'Villa Screed Levelling', 'Pre-Marble Screed Layer', 'Self-Levelling Screed', 'Industrial Floor Screed'],
        ar: ['سكريد أرضية شقة', 'تسوية سكريد فيلا', 'طبقة سكريد قبل الرخام', 'سكريد ذاتي التسوية', 'سكريد أرضية صناعية'],
    },
    12: {
        en: ['Warehouse Power-Float Floor', 'Garage Helicopter Finish', 'Workshop Concrete Polish', 'Industrial Floor Finish', 'Showroom Power-Trowel'],
        ar: ['أرضية مخزن هليكوبتر', 'تشطيب جراج هليكوبتر', 'تلميع خرسانة ورشة', 'تشطيب أرضية صناعية', 'هليكوبتر صالة عرض'],
    },
    13: {
        en: ['Pipework Replacement', 'Mixer Tap Installation', 'Drain Unblocking', 'Bathroom Plumbing Rough-In', 'Kitchen Plumbing'],
        ar: ['استبدال مواسير', 'تركيب خلاط', 'تسليك انسداد', 'تأسيس سباكة حمام', 'سباكة مطبخ'],
    },
    14: {
        en: ['Master Bathroom Fit-Out', 'Guest Bathroom Renovation', 'En-Suite Build', 'Powder Room Finish', 'Full Bathroom Remodel'],
        ar: ['تشطيب حمام رئيسي', 'تجديد حمام ضيوف', 'إنشاء حمام داخلي', 'تشطيب باودر روم', 'تجديد كامل للحمام'],
    },
    15: {
        en: ['Apartment Re-Wiring', 'Distribution Board Upgrade', 'Lighting Circuit Install', 'Power Socket Add-Ons', 'Fault Diagnosis'],
        ar: ['إعادة تسليك شقة', 'ترقية لوحة التوزيع', 'تركيب دائرة إضاءة', 'إضافة أفياش كهرباء', 'تشخيص الأعطال'],
    },
    16: {
        en: ['Custom Kitchen Build', 'Bedroom Wardrobe Install', 'Wooden Door Set', 'Bespoke Window Frames', 'Joinery Repairs'],
        ar: ['تصنيع مطبخ مخصص', 'تركيب دولاب غرفة نوم', 'طقم أبواب خشبية', 'إطارات شبابيك خاصة', 'إصلاحات نجارة'],
    },
    17: {
        en: ['Iron Main Door', 'Crittall-Style Window Set', 'Steel Staircase Build', 'Security Grille Install', 'Custom Iron Gate'],
        ar: ['باب حديد رئيسي', 'شبابيك كريتال', 'بناء سلم حديدي', 'تركيب شبك حماية', 'بوابة حديد مخصصة'],
    },
    18: {
        en: ['Driveway Interlock Paving', 'Walkway Paving Install', 'Car Park Paving', 'Garden Path Pavers', 'Entrance Plaza Paving'],
        ar: ['تركيب إنترلوك مدخل', 'تركيب ممشى', 'إنترلوك موقف سيارات', 'بلاط ممرات حديقة', 'إنترلوك بلازا مدخل'],
    },
    19: {
        en: ['Villa Pool Construction', 'Pool Tile Renovation', 'Pool Pump Service', 'Pool Filter Installation', 'Pool Resurfacing'],
        ar: ['بناء حمام سباحة فيلا', 'تجديد بلاط حمام سباحة', 'صيانة مضخة حمام سباحة', 'تركيب فلتر مسبح', 'إعادة تشطيب مسبح'],
    },
    20: {
        en: ['Apartment Strip-Out', 'Old Tile Removal', 'Wall Demolition', 'Renovation Site Prep', 'Debris Clearance'],
        ar: ['تجهيز شقة للتجديد', 'إزالة سيراميك قديم', 'هدم جدران', 'تجهيز موقع تجديد', 'إزالة المخلفات'],
    },
    21: {
        en: ['Full Apartment Renovation', 'Retail Shop Fit-Out', 'Studio Modernisation', 'Boutique Refurbishment', 'Office Renovation'],
        ar: ['تجديد كامل لشقة', 'تشطيب محل تجاري', 'تحديث استوديو', 'تجديد بوتيك', 'تجديد مكتب'],
    },
};

const descriptions: Record<Locale, string[]> = {
    en: [
        'Delivered on schedule with full coordination from start to handover.',
        'A flagship engagement showcasing our end-to-end capability.',
        'Bespoke specification, premium materials and zero-defect handover.',
        'Cross-discipline collaboration that brought every detail together.',
        'Tight timelines met without compromising on craft or quality.',
        'A long-term client relationship built on trust and consistent delivery.',
    ],
    ar: [
        'تم التسليم في الوقت المحدد مع تنسيق كامل من البداية حتى التسليم.',
        'مشروع رئيسي يعرض قدرتنا الشاملة من البداية إلى النهاية.',
        'مواصفات مخصصة، مواد عالية الجودة، وتسليم بدون عيوب.',
        'تعاون متعدد التخصصات جمع كل التفاصيل معاً.',
        'مواعيد دقيقة دون التضحية بالحرفية أو الجودة.',
        'علاقة طويلة الأمد مع العميل مبنية على الثقة والتسليم المستمر.',
    ],
};

const locations: Record<Locale, string[]> = {
    en: ['Ajman, UAE', 'Dubai, UAE', 'Sharjah, UAE', 'Abu Dhabi, UAE', 'Umm Al Quwain, UAE'],
    ar: ['عجمان، الإمارات', 'دبي، الإمارات', 'الشارقة، الإمارات', 'أبو ظبي، الإمارات', 'أم القيوين، الإمارات'],
};

const dates = ['2024', '2024', '2025', '2025', '2025'];

const sampleVideoUrls = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
];

export function generateGalleryItem(index: number): GalleryItem {
    const serviceIdx = index % serviceSlugs.length;
    const positionInService = Math.floor(index / serviceSlugs.length);
    const titleListEn = projectTitles[serviceIdx].en;
    const titleListAr = projectTitles[serviceIdx].ar;
    const titleEn = titleListEn[positionInService % titleListEn.length];
    const titleAr = titleListAr[positionInService % titleListAr.length];
    const isVideo = index % 7 === 6;

    return {
        id: `${index + 1}`,
        serviceIdx,
        type: isVideo ? 'video' : 'image',
        src: isVideo
            ? sampleVideoUrls[index % sampleVideoUrls.length]
            : `https://picsum.photos/seed/alnosor-${index + 1}/1200/800`,
        thumb: `https://picsum.photos/seed/alnosor-${index + 1}/600/400`,
        title: { en: `${titleEn} #${index + 1}`, ar: `${titleAr} #${index + 1}` },
        description: {
            en: descriptions.en[index % descriptions.en.length],
            ar: descriptions.ar[index % descriptions.ar.length],
        },
        date: dates[index % dates.length],
        location: {
            en: locations.en[index % locations.en.length],
            ar: locations.ar[index % locations.ar.length],
        },
    };
}

export const galleryItems: GalleryItem[] = Array.from({ length: 50 }, (_, i) => generateGalleryItem(i));

export function getGalleryByService(serviceIdx: number): GalleryItem[] {
    return galleryItems.filter((g) => g.serviceIdx === serviceIdx);
}

import type { Locale } from '@/lib/i18n';

export const serviceSlugs = [
    'commercial-brokers',
    'building-materials',
    'decoration-partitions',
    'e-commerce',
    'project-management',
    'interior-design',
    'equipment-rental',
    'event-management',
    'washing-machine-maintenance',
    'gas-stove-maintenance',
    'refrigerator-maintenance',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceImages: Record<ServiceSlug, string> = {
    'commercial-brokers': '/images/services/Commercial Brokers.jpg',
    'building-materials': '/images/services/Building & Construction Materials Wholesale Trading.jpg',
    'decoration-partitions': '/images/services/Decoration Materials & Partitions Trading.jpg',
    'e-commerce': '/images/services/E-Commerce.jpg',
    'project-management': '/images/services/Project Management Services.webp',
    'interior-design': '/images/services/Interior Design Consultancy.jpg',
    'equipment-rental': '/images/services/Construction Equipment Rental.jpg',
    'event-management': '/images/services/Social Event Management.jpg',
    'washing-machine-maintenance': '/images/services/Washing Machine Maintenance.jpg',
    'gas-stove-maintenance': '/images/services/Gas Stove Maintenance.jpg',
    'refrigerator-maintenance': '/images/services/Refrigerator Maintenance.jpeg',
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
        en: [
            'Trade Match — UAE/KSA',
            'Cross-Border Deal — Egypt',
            'Vendor Connection',
            'Bulk Order Closure',
            'Regional Distribution',
            'Strategic Partnership',
            'Procurement Consultation',
        ],
        ar: [
            'صفقة تجارية — الإمارات/السعودية',
            'صفقة عبر الحدود — مصر',
            'ربط الموردين',
            'إغلاق طلب بالجملة',
            'توزيع إقليمي',
            'شراكة استراتيجية',
            'استشارة شراء',
        ],
    },
    1: {
        en: [
            'Residential Tower Supply',
            'Hotel Project Materials',
            'Cement Bulk Order',
            'Steel Frame Delivery',
            'Aggregate Shipment',
            'Tiles & Sanitary Set',
            'Mall Construction Supply',
        ],
        ar: [
            'إمداد برج سكني',
            'مواد مشروع فندق',
            'طلب إسمنت بالجملة',
            'توريد هيكل حديد',
            'شحنة ركام',
            'بلاط وأدوات صحية',
            'إمداد بناء مول تجاري',
        ],
    },
    2: {
        en: [
            'Office Partition Install',
            'Villa Wall Cladding',
            'Glass Partition Project',
            'Decorative Panel Setup',
            'Lobby Finishing',
            'Restaurant Decor',
        ],
        ar: [
            'تركيب قواطع مكتب',
            'كسوة جدران فيلا',
            'مشروع قواطع زجاجية',
            'تركيب لوحات ديكورية',
            'تشطيب لوبي',
            'ديكور مطعم',
        ],
    },
    3: {
        en: [
            'Online Catalogue Launch',
            'Digital Showcase',
            'B2B Portal Setup',
            'Online Order Fulfilment',
            'E-Commerce Integration',
            'Dropship Network',
        ],
        ar: [
            'إطلاق كتالوج إلكتروني',
            'عرض رقمي',
            'بوابة B2B',
            'تنفيذ طلبات إلكترونية',
            'دمج تجارة إلكترونية',
            'شبكة دروبشيب',
        ],
    },
    4: {
        en: [
            'Villa Construction PM',
            'Office Fit-out PM',
            'Mall Refurbishment',
            'Resort Development',
            'Industrial Facility',
            'Mixed-Use Project',
        ],
        ar: [
            'إدارة بناء فيلا',
            'إدارة تشطيب مكتب',
            'تجديد مول',
            'تطوير منتجع',
            'منشأة صناعية',
            'مشروع متعدد الاستخدامات',
        ],
    },
    5: {
        en: [
            'Hotel Lobby Design',
            'Corporate Office Concept',
            'Penthouse Interior',
            'Restaurant Concept',
            'Showroom Design',
            'Hospitality Suite',
        ],
        ar: [
            'تصميم لوبي فندق',
            'مفهوم مكتب شركات',
            'تصميم بنتهاوس',
            'مفهوم مطعم',
            'تصميم صالة عرض',
            'جناح ضيافة',
        ],
    },
    6: {
        en: [
            'Crane Hire — Tower Site',
            'Loader Deployment',
            'Lift Equipment Project',
            'Construction Machinery',
            'Heavy-Duty Hire',
            'Long-Term Equipment',
        ],
        ar: [
            'تأجير رافعة — موقع برج',
            'نشر محمّلات',
            'مشروع معدات رفع',
            'آلات بناء',
            'تأجير معدات ثقيلة',
            'معدات إيجار طويل الأمد',
        ],
    },
    7: {
        en: [
            'Corporate Gala',
            'Wedding Setup',
            'Cultural Festival',
            'Brand Launch',
            'Conference Production',
            'Private Celebration',
        ],
        ar: [
            'حفل شركات',
            'تجهيز حفل زفاف',
            'مهرجان ثقافي',
            'إطلاق علامة تجارية',
            'إنتاج مؤتمر',
            'احتفال خاص',
        ],
    },
    8: {
        en: [
            'Top-Load Washer Repair',
            'Front-Load Washer Service',
            'Drum Bearing Replacement',
            'Control Board Repair',
            'On-Site Washer Diagnostic',
            'Annual Maintenance Contract',
        ],
        ar: [
            'إصلاح غسالة علوية',
            'صيانة غسالة أمامية',
            'استبدال رولمان البلي',
            'إصلاح لوحة التحكم',
            'تشخيص غسالة في الموقع',
            'عقد صيانة سنوي',
        ],
    },
    9: {
        en: [
            'Burner Cleaning Service',
            'Gas Line Safety Check',
            'Ignition Replacement',
            'Built-In Hob Repair',
            'Cooker Valve Service',
            'Full Stove Maintenance',
        ],
        ar: [
            'تنظيف شعلات البوتجاز',
            'فحص خط الغاز',
            'استبدال الإشعال',
            'إصلاح بوتجاز بلت إن',
            'صيانة صمامات البوتجاز',
            'صيانة بوتجاز شاملة',
        ],
    },
    10: {
        en: [
            'Cooling System Repair',
            'Compressor Replacement',
            'Refrigerant Gas Refill',
            'Thermostat Replacement',
            'Door Seal Replacement',
            'Freezer Service',
        ],
        ar: [
            'إصلاح نظام التبريد',
            'استبدال الكمبروسر',
            'شحن غاز التبريد',
            'استبدال الثرموستات',
            'استبدال إطار الباب',
            'صيانة الفريزر',
        ],
    },
};

const descriptions: Record<Locale, string[]> = {
    en: [
        'Delivered on schedule with full coordination from procurement through handover.',
        'A flagship engagement showcasing our end-to-end capability.',
        'Bespoke specification, premium materials and zero-defect handover.',
        'Cross-discipline collaboration that brought every detail together.',
        'Tight timelines met without compromising on craft or quality.',
        'A long-term client relationship built on trust and consistent delivery.',
    ],
    ar: [
        'تم التسليم في الوقت المحدد مع تنسيق كامل من الشراء حتى التسليم.',
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

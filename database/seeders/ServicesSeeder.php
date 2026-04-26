<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * @var array<int, array{slug:string,icon:string,image_path:?string,title:array{ar:string,en:string},body:array{ar:string,en:string},bullets:array{ar:array<int,string>,en:array<int,string>}}>
     */
    private array $services = [
        [
            'slug' => 'commercial-brokers',
            'icon' => 'Handshake',
            'image_path' => '/images/services/Commercial Brokers.jpg',
            'title' => [
                'en' => 'Commercial Brokers',
                'ar' => 'وسيط تجاري',
            ],
            'body' => [
                'en' => 'We facilitate trade between buyers and sellers across multiple sectors — sourcing the right counterparties, negotiating terms, and ensuring smooth handovers.',
                'ar' => 'نسهّل التجارة بين المشترين والبائعين عبر قطاعات متعددة — نختار الأطراف المناسبة، ونتفاوض على الشروط، ونضمن انتقالاً سلساً.',
            ],
            'bullets' => [
                'en' => ['Vendor and buyer matchmaking', 'Contract negotiation support', 'Cross-border trade coordination'],
                'ar' => ['ربط البائعين والمشترين', 'دعم التفاوض على العقود', 'تنسيق التجارة عبر الحدود'],
            ],
        ],
        [
            'slug' => 'building-materials',
            'icon' => 'Building2',
            'image_path' => '/images/services/Building & Construction Materials Wholesale Trading.jpg',
            'title' => [
                'en' => 'Building & Construction Materials Wholesale Trading',
                'ar' => 'تجارة مواد البناء بالجملة',
            ],
            'body' => [
                'en' => 'Bulk supply of construction materials for contractors, developers and project managers — competitive pricing with reliable lead times.',
                'ar' => 'إمداد بالجملة بمواد البناء للمقاولين والمطورين ومديري المشاريع — أسعار تنافسية ومواعيد تسليم موثوقة.',
            ],
            'bullets' => [
                'en' => ['Cement, steel & aggregates', 'Tiles, sanitaryware & fittings', 'Project-volume procurement'],
                'ar' => ['الإسمنت والحديد والركام', 'البلاط والأدوات الصحية', 'مشتريات بأحجام المشاريع'],
            ],
        ],
        [
            'slug' => 'decoration-partitions',
            'icon' => 'Hammer',
            'image_path' => '/images/services/Decoration Materials & Partitions Trading.jpg',
            'title' => [
                'en' => 'Decoration Materials & Partitions Trading',
                'ar' => 'تجارة مواد الديكور والقواطع',
            ],
            'body' => [
                'en' => 'A curated catalogue of decoration materials, gypsum partitions, panels and finishing elements for residential and commercial fit-outs.',
                'ar' => 'كتالوج منتقى من مواد الديكور وقواطع الجبس واللوحات وعناصر التشطيب للمساحات السكنية والتجارية.',
            ],
            'bullets' => [
                'en' => ['Gypsum & glass partitions', 'Wall panels and cladding', 'Decorative finishing materials'],
                'ar' => ['قواطع الجبس والزجاج', 'لوحات الجدران والكسوة', 'مواد التشطيب الديكورية'],
            ],
        ],
        [
            'slug' => 'e-commerce',
            'icon' => 'ShoppingCart',
            'image_path' => '/images/services/E-Commerce.jpg',
            'title' => [
                'en' => 'E-Commerce',
                'ar' => 'التجارة الإلكترونية',
            ],
            'body' => [
                'en' => 'A growing online presence connecting our trading capabilities to customers across the region — order, track and receive with ease.',
                'ar' => 'حضور إلكتروني متنامٍ يربط قدراتنا التجارية بالعملاء في جميع أنحاء المنطقة — اطلب وتتبع واستلم بسهولة.',
            ],
            'bullets' => [
                'en' => ['Digital catalogue access', 'Online ordering & quotes', 'Logistics coordination'],
                'ar' => ['وصول للكتالوج الرقمي', 'الطلبات والعروض عبر الإنترنت', 'تنسيق الخدمات اللوجستية'],
            ],
        ],
        [
            'slug' => 'project-management',
            'icon' => 'Briefcase',
            'image_path' => '/images/services/Project Management Services.webp',
            'title' => [
                'en' => 'Project Management Services',
                'ar' => 'خدمات إدارة المشاريع',
            ],
            'body' => [
                'en' => 'End-to-end coordination of construction and fit-out projects — planning, procurement, scheduling, contractor management and handover.',
                'ar' => 'تنسيق شامل لمشاريع البناء والتشطيب — التخطيط، الشراء، الجدولة، إدارة المقاولين والتسليم.',
            ],
            'bullets' => [
                'en' => ['Schedule & cost control', 'Vendor coordination', 'Quality & safety oversight'],
                'ar' => ['التحكم في الجدول والتكلفة', 'تنسيق الموردين', 'الإشراف على الجودة والسلامة'],
            ],
        ],
        [
            'slug' => 'interior-design',
            'icon' => 'Palette',
            'image_path' => '/images/services/Interior Design Consultancy.jpg',
            'title' => [
                'en' => 'Interior Design Consultancy',
                'ar' => 'استشارات التصميم الداخلي',
            ],
            'body' => [
                'en' => 'Tailored interior design direction — from concept and material selection to detailed drawings — for homes, offices and hospitality spaces.',
                'ar' => 'توجيه تصميم داخلي مخصص — من المفهوم واختيار المواد إلى الرسومات التفصيلية — للمنازل والمكاتب والضيافة.',
            ],
            'bullets' => [
                'en' => ['Concept & mood boards', 'Material specifications', '3D visualisation & drawings'],
                'ar' => ['المفاهيم ولوحات الإلهام', 'مواصفات المواد', 'التصور ثلاثي الأبعاد والرسومات'],
            ],
        ],
        [
            'slug' => 'equipment-rental',
            'icon' => 'Truck',
            'image_path' => '/images/services/Construction Equipment Rental.jpg',
            'title' => [
                'en' => 'Construction Equipment Rental',
                'ar' => 'تأجير معدات البناء',
            ],
            'body' => [
                'en' => 'Rental of loading, lifting and construction equipment — wheeled and motorised — available with skilled operators when required.',
                'ar' => 'تأجير معدات التحميل والرفع والبناء — بعجلات ومحركات — متاحة مع مشغلين مهرة عند الطلب.',
            ],
            'bullets' => [
                'en' => ['Loaders, lifts & cranes', 'Short-term & long-term hire', 'Operator-included options'],
                'ar' => ['المحملات والرافعات والروافع', 'إيجار قصير وطويل الأجل', 'خيارات تشمل المشغل'],
            ],
        ],
        [
            'slug' => 'event-management',
            'icon' => 'CalendarHeart',
            'image_path' => '/images/services/Social Event Management.jpg',
            'title' => [
                'en' => 'Social Event Management',
                'ar' => 'إدارة الفعاليات الاجتماعية',
            ],
            'body' => [
                'en' => 'Memorable corporate, cultural and private events — design, planning, vendor coordination and on-day execution from start to finish.',
                'ar' => 'فعاليات مؤسسية وثقافية وخاصة لا تُنسى — التصميم والتخطيط وتنسيق الموردين والتنفيذ في اليوم.',
            ],
            'bullets' => [
                'en' => ['Corporate gatherings', 'Weddings & private events', 'Cultural & community functions'],
                'ar' => ['التجمعات المؤسسية', 'حفلات الزفاف والفعاليات الخاصة', 'الفعاليات الثقافية والمجتمعية'],
            ],
        ],
        [
            'slug' => 'washing-machine-maintenance',
            'icon' => 'WashingMachine',
            'image_path' => '/images/services/Washing Machine Maintenance.jpg',
            'title' => [
                'en' => 'Washing Machine Maintenance',
                'ar' => 'صيانة غسالات',
            ],
            'body' => [
                'en' => 'Professional repair and maintenance for all washing machine brands and models — fast diagnosis, genuine spare parts and on-site service.',
                'ar' => 'صيانة وإصلاح احترافي لجميع أنواع الغسالات وموديلاتها — تشخيص سريع، قطع غيار أصلية، وخدمة في الموقع.',
            ],
            'bullets' => [
                'en' => ['All brands & models', 'Genuine spare parts', 'On-site repair service'],
                'ar' => ['جميع الماركات والموديلات', 'قطع غيار أصلية', 'خدمة إصلاح في المنزل'],
            ],
        ],
        [
            'slug' => 'gas-stove-maintenance',
            'icon' => 'Flame',
            'image_path' => '/images/services/Gas Stove Maintenance.jpg',
            'title' => [
                'en' => 'Gas Stove Maintenance',
                'ar' => 'صيانة بوتجازات',
            ],
            'body' => [
                'en' => 'Safe and certified maintenance of gas stoves and cookers — burner servicing, gas line checks and full safety inspection.',
                'ar' => 'صيانة آمنة ومعتمدة للبوتجازات والمواقد — تنظيف الشعلات وفحص خطوط الغاز وفحص شامل للسلامة.',
            ],
            'bullets' => [
                'en' => ['Burner cleaning & repair', 'Gas line safety checks', 'Ignition & valve replacement'],
                'ar' => ['تنظيف وإصلاح الشعلات', 'فحص خطوط الغاز والسلامة', 'استبدال الإشعال والصمامات'],
            ],
        ],
        [
            'slug' => 'refrigerator-maintenance',
            'icon' => 'Refrigerator',
            'image_path' => '/images/services/Refrigerator Maintenance.jpeg',
            'title' => [
                'en' => 'Refrigerator Maintenance',
                'ar' => 'صيانة تلاجات',
            ],
            'body' => [
                'en' => 'Specialised refrigerator and freezer repair — cooling diagnostics, compressor service, gas refill and thermostat replacement.',
                'ar' => 'إصلاح متخصص للثلاجات والمجمدات — تشخيص أعطال التبريد، صيانة الكمبروسر، شحن غاز التبريد، واستبدال الثرموستات.',
            ],
            'bullets' => [
                'en' => ['Cooling system diagnostics', 'Compressor & gas refill', 'Thermostat & seal replacement'],
                'ar' => ['تشخيص نظام التبريد', 'صيانة الكمبروسر وشحن الغاز', 'استبدال الثرموستات والإطارات'],
            ],
        ],
    ];

    public function run(): void
    {
        foreach ($this->services as $idx => $data) {
            Service::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'icon' => $data['icon'],
                    'image_path' => $data['image_path'],
                    'title' => $data['title'],
                    'body' => $data['body'],
                    'bullets' => $data['bullets'],
                    'sort' => $idx + 1,
                ],
            );
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * @var array<int, array{slug:string,icon:string,category:string,image_path:?string,title:array{ar:string,en:string},body:array{ar:string,en:string},bullets:array{ar:array<int,string>,en:array<int,string>}}>
     */
    private array $services = [
        [
            'slug' => 'general-maintenance',
            'icon' => 'Wrench',
            'category' => 'maintenance',
            'image_path' => null,
            'title' => [
                'en' => 'General Home Maintenance',
                'ar' => 'صيانة عامة',
            ],
            'body' => [
                'en' => 'Fast and professional fixes for everyday household issues — same-day response and a clean handover.',
                'ar' => 'إصلاح الأعطال المنزلية اليومية بشكل سريع واحترافي.',
            ],
            'bullets' => [
                'en' => ['Rapid call-out response', 'Emergency fault repairs', 'Trained, vetted technicians'],
                'ar' => ['استجابة سريعة للبلاغات', 'إصلاح فوري للأعطال الطارئة', 'فنيون متخصصون مدربون'],
            ],
        ],
        [
            'slug' => 'ac-maintenance',
            'icon' => 'AirVent',
            'category' => 'maintenance',
            'image_path' => null,
            'title' => [
                'en' => 'AC Maintenance & Service',
                'ar' => 'صيانة تكييفات',
            ],
            'body' => [
                'en' => 'Cleaning, refrigerant top-up, fault repair and tuning to restore peak cooling efficiency.',
                'ar' => 'تنظيف، شحن فريون، إصلاح الأعطال وتحسين كفاءة التبريد.',
            ],
            'bullets' => [
                'en' => ['Indoor & outdoor unit cleaning', 'Refrigerant gas refill', 'Fault diagnosis & repair'],
                'ar' => ['تنظيف الوحدات الداخلية والخارجية', 'شحن غاز الفريون', 'تشخيص وإصلاح الأعطال'],
            ],
        ],
        [
            'slug' => 'washing-machine-maintenance',
            'icon' => 'WashingMachine',
            'category' => 'maintenance',
            'image_path' => '/images/services/Washing Machine Maintenance.jpg',
            'title' => [
                'en' => 'Washing Machine Repair',
                'ar' => 'صيانة غسالات',
            ],
            'body' => [
                'en' => 'Diagnosis and repair across all washing-machine brands and models — top-load and front-load.',
                'ar' => 'كشف وإصلاح الأعطال بجميع أنواع الغسالات.',
            ],
            'bullets' => [
                'en' => ['All brands & models', 'Genuine spare parts', 'On-site repair service'],
                'ar' => ['جميع الماركات والموديلات', 'قطع غيار أصلية', 'خدمة إصلاح في الموقع'],
            ],
        ],
        [
            'slug' => 'gas-stove-maintenance',
            'icon' => 'Flame',
            'category' => 'maintenance',
            'image_path' => '/images/services/Gas Stove Maintenance.jpg',
            'title' => [
                'en' => 'Gas Stove Maintenance',
                'ar' => 'صيانة بوتاجازات',
            ],
            'body' => [
                'en' => 'Repair of gas faults, ignition issues and burner tuning for safe, reliable cooking performance.',
                'ar' => 'تصليح مشاكل الغاز والإشعال وضبط الأداء.',
            ],
            'bullets' => [
                'en' => ['Gas fault repair', 'Ignition system service', 'Burner performance tuning'],
                'ar' => ['إصلاح مشاكل الغاز', 'صيانة منظومة الإشعال', 'ضبط أداء الشعلات'],
            ],
        ],
        [
            'slug' => 'refrigerator-maintenance',
            'icon' => 'Refrigerator',
            'category' => 'maintenance',
            'image_path' => '/images/services/Refrigerator Maintenance.jpeg',
            'title' => [
                'en' => 'Refrigerator Repair',
                'ar' => 'صيانة تلاجات',
            ],
            'body' => [
                'en' => 'Cooling diagnostics, refrigerant leak repair and electrical fault service for fridges and freezers.',
                'ar' => 'معالجة ضعف التبريد، تسريب الفريون، والأعطال الكهربائية.',
            ],
            'bullets' => [
                'en' => ['Cooling system diagnostics', 'Refrigerant leak repair', 'Electrical fault service'],
                'ar' => ['تشخيص ضعف التبريد', 'إصلاح تسريب الفريون', 'معالجة الأعطال الكهربائية'],
            ],
        ],
        [
            'slug' => 'water-filters',
            'icon' => 'Droplets',
            'category' => 'maintenance',
            'image_path' => null,
            'title' => [
                'en' => 'Water Filter Installation & Service',
                'ar' => 'فلاتر مياه',
            ],
            'body' => [
                'en' => 'Installation and servicing of all water-filter types — including cartridge replacement — for clean, safe water at home.',
                'ar' => 'تركيب وصيانة جميع أنواع فلاتر المياه وتغيير الشمعات لضمان مياه نقية.',
            ],
            'bullets' => [
                'en' => ['All filter types installed', 'Regular cartridge replacement', 'Periodic system maintenance'],
                'ar' => ['تركيب جميع أنواع الفلاتر', 'تغيير الشمعات بانتظام', 'صيانة دورية للأنظمة'],
            ],
        ],
        [
            'slug' => 'painting',
            'icon' => 'Paintbrush',
            'category' => 'finishing',
            'image_path' => null,
            'title' => [
                'en' => 'Painting & Decorating',
                'ar' => 'نقاشة ودهانات',
            ],
            'body' => [
                'en' => 'Interior and exterior painting using premium materials — clean prep work and a flawless finish.',
                'ar' => 'تنفيذ جميع أعمال الدهانات الداخلية والخارجية بأفضل الخامات.',
            ],
            'bullets' => [
                'en' => ['Interior & exterior paint', 'Premium-grade materials', 'Meticulous final finishing'],
                'ar' => ['دهانات داخلية وخارجية', 'خامات عالية الجودة', 'تشطيبات نهائية متقنة'],
            ],
        ],
        [
            'slug' => 'plastering',
            'icon' => 'Layers',
            'category' => 'finishing',
            'image_path' => null,
            'title' => [
                'en' => 'Plastering',
                'ar' => 'محارة',
            ],
            'body' => [
                'en' => 'Expert wall and ceiling plastering — straight, smooth surfaces ready for a perfect final finish.',
                'ar' => 'تجهيز الحوائط والأسقف بشكل متقن قبل التشطيب.',
            ],
            'bullets' => [
                'en' => ['Wall & ceiling preparation', 'Smooth, level surfaces', 'Ready for paint or tile'],
                'ar' => ['تجهيز الحوائط والأسقف', 'أسطح ناعمة ومستوية', 'أساس مثالي للتشطيب'],
            ],
        ],
        [
            'slug' => 'gypsum-board',
            'icon' => 'SquareStack',
            'category' => 'finishing',
            'image_path' => null,
            'title' => [
                'en' => 'Gypsum Board Ceilings & Walls',
                'ar' => 'جبس بورد',
            ],
            'body' => [
                'en' => 'Design and installation of modern gypsum-board ceilings, walls and decorative features.',
                'ar' => 'تصميم وتنفيذ ديكورات حديثة للأسقف والحوائط.',
            ],
            'bullets' => [
                'en' => ['Suspended ceiling installation', 'Modern wall feature design', 'Custom-shaped fittings'],
                'ar' => ['تصميم وتنفيذ الأسقف المعلقة', 'ديكورات حوائط حديثة', 'تنفيذ تصاميم مخصصة'],
            ],
        ],
        [
            'slug' => 'ceramic-tiling',
            'icon' => 'Grid3x3',
            'category' => 'finishing',
            'image_path' => null,
            'title' => [
                'en' => 'Ceramic Floor & Wall Tiling',
                'ar' => 'سيراميك (أرضيات وحوائط)',
            ],
            'body' => [
                'en' => 'Professional ceramic tile installation with precise levelling and clean, even joints.',
                'ar' => 'تركيب باحترافية مع ضبط الميزان والفواصل.',
            ],
            'bullets' => [
                'en' => ['Floor & wall tiling', 'Precise levelling & spacing', 'Clean, lasting installation'],
                'ar' => ['تركيب سيراميك للأرضيات والحوائط', 'ضبط الميزان والفواصل', 'تنفيذ احترافي يدوم'],
            ],
        ],
        [
            'slug' => 'concrete-works',
            'icon' => 'BrickWall',
            'category' => 'finishing',
            'image_path' => null,
            'title' => [
                'en' => 'Masonry & Concrete Works',
                'ar' => 'أعمال مباني وخرسانات',
            ],
            'body' => [
                'en' => 'Construction of walls, structures and reinforced concrete elements built to engineering specifications.',
                'ar' => 'تنفيذ وإنشاء الحوائط والهياكل الخرسانية.',
            ],
            'bullets' => [
                'en' => ['Wall & masonry construction', 'Reinforced concrete works', 'Spec-compliant structures'],
                'ar' => ['تنفيذ الحوائط والمباني', 'أعمال خرسانية متينة', 'هياكل مطابقة للمواصفات'],
            ],
        ],
        [
            'slug' => 'screed-floors',
            'icon' => 'Square',
            'category' => 'finishing',
            'image_path' => null,
            'title' => [
                'en' => 'Screed Flooring',
                'ar' => 'أرضيات سكريد',
            ],
            'body' => [
                'en' => 'Precise floor levelling — a flat, true substrate ready for ceramic tile, marble or any final flooring.',
                'ar' => 'تسوية الأرضيات بدقة قبل تركيب السيراميك أو الرخام.',
            ],
            'bullets' => [
                'en' => ['Precise floor levelling', 'Ideal base for tile & marble', 'High-quality materials'],
                'ar' => ['تسوية الأرضيات بدقة', 'أساس مستوٍ للسيراميك والرخام', 'خامات عالية الجودة'],
            ],
        ],
        [
            'slug' => 'helicopter-floors',
            'icon' => 'Cog',
            'category' => 'finishing',
            'image_path' => null,
            'title' => [
                'en' => 'Helicopter Power-Float Flooring',
                'ar' => 'هليكوبتر أرضيات',
            ],
            'body' => [
                'en' => 'Power-trowel finishing of concrete floors — a hard, smooth, durable surface for industrial and commercial spaces.',
                'ar' => 'تشطيب الأرضيات الخرسانية بسطح ناعم ومتين.',
            ],
            'bullets' => [
                'en' => ['Power-float concrete finish', 'Hard, smooth, durable surface', 'Workshops, warehouses, garages'],
                'ar' => ['تشطيب أرضيات خرسانية', 'سطح ناعم ومتين', 'مناسب للورش والمصانع والكراجات'],
            ],
        ],
        [
            'slug' => 'plumbing',
            'icon' => 'Droplet',
            'category' => 'mep',
            'image_path' => null,
            'title' => [
                'en' => 'Plumbing Works',
                'ar' => 'أعمال سباكة',
            ],
            'body' => [
                'en' => 'Installation and maintenance of pipework, mixers and fittings — plus drain and blockage clearing.',
                'ar' => 'تركيب وصيانة المواسير، الخلاطات، وتسليك الانسدادات.',
            ],
            'bullets' => [
                'en' => ['Pipework installation & repair', 'Mixer & fixture fitting', 'Drain & blockage clearing'],
                'ar' => ['تركيب وصيانة المواسير', 'تركيب وإصلاح الخلاطات', 'تسليك الانسدادات'],
            ],
        ],
        [
            'slug' => 'bathroom-finishing',
            'icon' => 'Bath',
            'category' => 'mep',
            'image_path' => null,
            'title' => [
                'en' => 'Bathroom Fit-Out',
                'ar' => 'تشطيب حمامات',
            ],
            'body' => [
                'en' => 'End-to-end bathroom fit-out — plumbing, ceramic tiling and full sanitaryware installation.',
                'ar' => 'تنفيذ كامل للحمامات من سباكة وسيراميك وتركيبات.',
            ],
            'bullets' => [
                'en' => ['Complete plumbing install', 'Ceramic tiling & finishes', 'Sanitaryware installation'],
                'ar' => ['سباكة كاملة للحمام', 'سيراميك وتشطيبات', 'تركيب الأدوات الصحية'],
            ],
        ],
        [
            'slug' => 'electrical',
            'icon' => 'Zap',
            'category' => 'mep',
            'image_path' => null,
            'title' => [
                'en' => 'Electrical Works',
                'ar' => 'أعمال كهرباء',
            ],
            'body' => [
                'en' => 'First-fix and second-fix electrical installation, plus fault diagnosis and repair across the property.',
                'ar' => 'تأسيس وتشطيب الكهرباء وصيانة الأعطال.',
            ],
            'bullets' => [
                'en' => ['First-fix wiring & rough-in', 'Second-fix finishing', 'Fault diagnosis & repair'],
                'ar' => ['تأسيس الأعمال الكهربائية', 'تشطيب اللوحات والمخارج', 'صيانة وإصلاح الأعطال'],
            ],
        ],
        [
            'slug' => 'carpentry',
            'icon' => 'Hammer',
            'category' => 'woodwork',
            'image_path' => null,
            'title' => [
                'en' => 'Carpentry & Joinery',
                'ar' => 'أعمال نجارة',
            ],
            'body' => [
                'en' => 'Custom-made doors, windows, kitchens and bedroom units — built and fitted to your specification.',
                'ar' => 'تنفيذ الأبواب، الشبابيك، المطابخ وغرف النوم حسب الطلب.',
            ],
            'bullets' => [
                'en' => ['Custom doors & windows', 'Bespoke fitted kitchens', 'Made-to-order bedroom sets'],
                'ar' => ['أبواب وشبابيك خشبية', 'مطابخ مصنّعة حسب الطلب', 'غرف نوم متكاملة'],
            ],
        ],
        [
            'slug' => 'ironwork',
            'icon' => 'Anvil',
            'category' => 'woodwork',
            'image_path' => null,
            'title' => [
                'en' => 'Ironwork & Crittall Fabrication',
                'ar' => 'أعمال حدادة',
            ],
            'body' => [
                'en' => 'Fabrication and installation of iron doors, Crittall-style windows, staircases and security grilles.',
                'ar' => 'تصنيع وتركيب الأبواب الحديد، الكريتال، السلالم، والشبابيك.',
            ],
            'bullets' => [
                'en' => ['Iron & Crittall doors', 'Steel staircases', 'Custom iron windows'],
                'ar' => ['أبواب حديد وكريتال', 'سلالم حديدية', 'شبابيك حديد مخصصة'],
            ],
        ],
        [
            'slug' => 'interlock-paving',
            'icon' => 'LayoutGrid',
            'category' => 'exterior',
            'image_path' => null,
            'title' => [
                'en' => 'Interlock Paving',
                'ar' => 'إنترلوك',
            ],
            'body' => [
                'en' => 'Interlock block paving for driveways, walkways and entrances — durable, attractive and low-maintenance.',
                'ar' => 'تركيب بلاط إنترلوك للطرق والمداخل بشكل متين وجمالي.',
            ],
            'bullets' => [
                'en' => ['Driveways & roadways', 'Entrances & car parks', 'Strong, attractive finish'],
                'ar' => ['تركيب إنترلوك للطرق', 'مداخل ومواقف سيارات', 'تركيب متين وأنيق'],
            ],
        ],
        [
            'slug' => 'swimming-pools',
            'icon' => 'WavesLadder',
            'category' => 'exterior',
            'image_path' => null,
            'title' => [
                'en' => 'Swimming Pool Construction & Service',
                'ar' => 'حمامات سباحة',
            ],
            'body' => [
                'en' => 'Build, finish and maintain swimming pools of every shape and size — from concept through ongoing service.',
                'ar' => 'تنفيذ وتشطيب وصيانة حمامات السباحة بكافة الأنواع.',
            ],
            'bullets' => [
                'en' => ['Build & finishing', 'Regular maintenance', 'All shapes & sizes'],
                'ar' => ['تنفيذ وتشطيب الحمامات', 'صيانة دورية', 'جميع الأشكال والأحجام'],
            ],
        ],
        [
            'slug' => 'demolition-renovation',
            'icon' => 'Pickaxe',
            'category' => 'renovation',
            'image_path' => null,
            'title' => [
                'en' => 'Demolition & Restoration Prep',
                'ar' => 'تكسير وترميم',
            ],
            'body' => [
                'en' => 'Safe demolition of old finishes and structures — and full site preparation for the renovation that follows.',
                'ar' => 'إزالة الأجزاء القديمة وتجهيز المكان للتجديد.',
            ],
            'bullets' => [
                'en' => ['Old structure removal', 'Site clearance & prep', 'Safe debris disposal'],
                'ar' => ['إزالة الأجزاء القديمة', 'تجهيز المكان للتجديد', 'تخلص آمن من المخلفات'],
            ],
        ],
        [
            'slug' => 'apartment-shop-renovation',
            'icon' => 'Sparkles',
            'category' => 'renovation',
            'image_path' => null,
            'title' => [
                'en' => 'Apartment & Shop Renovation',
                'ar' => 'تجديد شقق ومحلات',
            ],
            'body' => [
                'en' => 'End-to-end renovation of apartments and retail spaces — modernising every detail to the latest design standards.',
                'ar' => 'تطوير وتجديد كامل حسب طلب العميل بأحدث التصميمات.',
            ],
            'bullets' => [
                'en' => ['Full apartment renovation', 'Retail & shop fit-out', 'Modern bespoke designs'],
                'ar' => ['تجديد كامل للشقق', 'تطوير المحلات التجارية', 'تصاميم حديثة مخصصة'],
            ],
        ],
    ];

    public function run(): void
    {
        Service::query()->whereNotIn('slug', array_column($this->services, 'slug'))->delete();

        $categoryIds = ServiceCategory::query()->pluck('id', 'key');

        foreach ($this->services as $idx => $data) {
            Service::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'icon' => $data['icon'],
                    'service_category_id' => $categoryIds[$data['category']] ?? null,
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

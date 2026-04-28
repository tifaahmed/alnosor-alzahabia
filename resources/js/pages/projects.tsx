import { router, usePage } from '@inertiajs/react';
import { CalendarDays, ImageIcon, MapPin, Play, Video } from 'lucide-react';
import { useState } from 'react';
import Seo, { breadcrumbSchema, organizationSchema } from '@/components/seo';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useLocale } from '@/contexts/locale-context';
import MarketingLayout from '@/layouts/marketing-layout';
import { SITE } from '@/lib/i18n';

type Translatable = { ar?: string; en?: string };
type Category = {
    id: number;
    name: Translatable;
    slug: string;
    projects_count: number;
};
type Project = {
    id: number;
    title: Translatable;
    subject: Translatable;
    project_date: string | null;
    address: Translatable;
    media_path: string;
    media_type: 'image' | 'video';
    category: { id: number; name: Translatable; slug: string } | null;
};

const pick = (t: Translatable, locale: 'ar' | 'en') => t[locale] || t.ar || t.en || '';

export default function Projects({
    projects,
    categories,
    activeCategory,
}: {
    projects: Project[];
    categories: Category[];
    activeCategory: string | null;
}) {
    const { t, locale } = useLocale();
    const page = usePage<{ site?: { url?: string } }>();
    const baseUrl = (page.props.site?.url ?? '').replace(/\/$/, '');
    const [openItem, setOpenItem] = useState<Project | null>(null);

    const setCategory = (slug: string | null) => {
        router.get(
            '/projects',
            slug ? { category: slug } : {},
            { preserveState: false, preserveScroll: false, replace: true },
        );
    };

    return (
        <MarketingLayout current="/projects">
            <Seo
                title={t.seo.projects.title}
                description={t.seo.projects.description}
                keywords={t.seo.projects.keywords}
                structuredData={[
                    organizationSchema(baseUrl),
                    breadcrumbSchema(baseUrl, [
                        { name: t.nav.home, path: '/' },
                        { name: t.nav.projects, path: '/projects' },
                    ]),
                ]}
            />

            <section className="relative overflow-hidden">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 50% 0%, rgba(212,164,55,0.18), transparent 55%)',
                    }}
                />
                <div className="mx-auto max-w-4xl px-6 pt-20 pb-8 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-100/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-amber-800 dark:border-amber-700/40 dark:bg-amber-900/30 dark:text-amber-200">
                        {t.projects.badge}
                    </span>
                    <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1b1b18] md:text-5xl dark:text-amber-100">
                        <span className="sr-only">
                            {locale === 'ar' ? SITE.nameAr : SITE.name} —{' '}
                        </span>
                        {t.projects.heading}
                    </h1>
                    <p className="mt-6 text-lg text-[#4a4a45] dark:text-amber-100/70">{t.projects.lead}</p>
                </div>
            </section>

            <section className="pb-4">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        <FilterChip active={!activeCategory} onClick={() => setCategory(null)}>
                            {locale === 'ar' ? 'الكل' : 'All'}
                        </FilterChip>
                        {categories.map((cat) => (
                            <FilterChip
                                key={cat.id}
                                active={activeCategory === cat.slug}
                                onClick={() => setCategory(cat.slug)}
                            >
                                {pick(cat.name, locale)}
                                <span className="ms-1 text-[10px] opacity-70">({cat.projects_count})</span>
                            </FilterChip>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="mx-auto max-w-7xl px-6">
                    {projects.length === 0 ? (
                        <div className="rounded-3xl border border-amber-200/70 bg-amber-50/40 p-16 text-center text-[#4a4a45] dark:border-amber-900/40 dark:bg-amber-900/10 dark:text-amber-100/70">
                            {locale === 'ar' ? 'لا توجد مشاريع بعد.' : 'No projects yet.'}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                            {projects.map((item) => {
                                const title = pick(item.title, locale);

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setOpenItem(item)}
                                        className="group relative aspect-square overflow-hidden rounded-2xl border border-amber-200/70 bg-amber-100 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:border-amber-400 hover:shadow-2xl dark:border-amber-900/40"
                                    >
                                        {item.media_type === 'video' ? (
                                            <video
                                                src={item.media_path}
                                                title={title || `${t.projects.heading} — ${locale === 'ar' ? SITE.nameAr : SITE.name}`}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                muted
                                                playsInline
                                                preload="metadata"
                                            />
                                        ) : (
                                            <img
                                                src={item.media_path}
                                                alt={title || `${t.projects.heading} — ${locale === 'ar' ? SITE.nameAr : SITE.name}`}
                                                title={title || (locale === 'ar' ? SITE.nameAr : SITE.name)}
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                                            {item.media_type === 'video' ? (
                                                <>
                                                    <Video className="h-3 w-3" /> Video
                                                </>
                                            ) : (
                                                <>
                                                    <ImageIcon className="h-3 w-3" /> Photo
                                                </>
                                            )}
                                        </div>
                                        {item.media_type === 'video' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-amber-700 shadow-lg transition-transform group-hover:scale-110">
                                                    <Play className="h-6 w-6 fill-current" />
                                                </span>
                                            </div>
                                        )}
                                        {title && (
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-white">
                                                <p className="text-sm font-semibold leading-tight line-clamp-2">{title}</p>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <Dialog open={openItem !== null} onOpenChange={(o) => !o && setOpenItem(null)}>
                {openItem && (
                    <DialogContent className="max-w-3xl border-amber-200/70 bg-[#FBF7EF] p-0 dark:border-amber-900/40 dark:bg-[#161615]">
                        <div className="overflow-hidden rounded-t-lg bg-black">
                            {openItem.media_type === 'video' ? (
                                <video
                                    key={openItem.id}
                                    src={openItem.media_path}
                                    title={pick(openItem.title, locale) || (locale === 'ar' ? SITE.nameAr : SITE.name)}
                                    controls
                                    autoPlay
                                    className="max-h-[65vh] w-full"
                                />
                            ) : (
                                <img
                                    src={openItem.media_path}
                                    alt={pick(openItem.title, locale) || `${t.projects.heading} — ${locale === 'ar' ? SITE.nameAr : SITE.name}`}
                                    title={pick(openItem.title, locale) || (locale === 'ar' ? SITE.nameAr : SITE.name)}
                                    className="max-h-[65vh] w-full object-contain"
                                />
                            )}
                        </div>
                        <div className="space-y-3 p-6">
                            <DialogTitle className="text-xl text-[#1b1b18] dark:text-amber-100">
                                {pick(openItem.title, locale) || (openItem.category ? pick(openItem.category.name, locale) : '')}
                            </DialogTitle>
                            {pick(openItem.subject, locale) && (
                                <p className="text-sm text-[#4a4a45] dark:text-amber-100/80">
                                    {pick(openItem.subject, locale)}
                                </p>
                            )}
                            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                                {pick(openItem.address, locale) && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                                        <MapPin className="h-3 w-3" />
                                        {pick(openItem.address, locale)}
                                    </span>
                                )}
                                {openItem.project_date && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                                        <CalendarDays className="h-3 w-3" />
                                        {openItem.project_date}
                                    </span>
                                )}
                                {openItem.category && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/60 px-3 py-1 text-amber-900 dark:bg-amber-800/30 dark:text-amber-200">
                                        {pick(openItem.category.name, locale)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </MarketingLayout>
    );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                active
                    ? 'border-amber-500 bg-amber-500 text-white shadow-sm'
                    : 'border-amber-300/60 bg-white text-[#4a4a45] hover:border-amber-400 hover:text-amber-700 dark:border-amber-700/40 dark:bg-[#161615] dark:text-amber-100/80 dark:hover:text-amber-300'
            }`}
        >
            {children}
        </button>
    );
}

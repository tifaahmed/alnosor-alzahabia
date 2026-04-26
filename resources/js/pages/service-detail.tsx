import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Briefcase,
    Building2,
    CalendarHeart,
    Flame,
    Hammer,
    Handshake,
    Palette,
    Play,
    Refrigerator,
    ShoppingCart,
    Truck,
    WashingMachine,
} from 'lucide-react';
import { useState } from 'react';
import Seo, { breadcrumbSchema, organizationSchema, serviceSchema } from '@/components/seo';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { useLocale } from '@/contexts/locale-context';
import { getServiceIndexBySlug } from '@/lib/gallery';
import MarketingLayout from '@/layouts/marketing-layout';

type LocaleKey = 'ar' | 'en';
type GalleryProp = {
    id: number;
    media_path: string;
    media_type: 'image' | 'video';
    caption: Partial<Record<LocaleKey, string>>;
    sort: number;
};

const serviceIcons = [
    Handshake,
    Building2,
    Hammer,
    ShoppingCart,
    Briefcase,
    Palette,
    Truck,
    CalendarHeart,
    WashingMachine,
    Flame,
    Refrigerator,
];

export default function ServiceDetail({ slug, galleries = [] }: { slug: string; galleries?: GalleryProp[] }) {
    const { t, locale } = useLocale();
    const page = usePage<{ site?: { url?: string } }>();
    const baseUrl = (page.props.site?.url ?? '').replace(/\/$/, '');
    const [openItem, setOpenItem] = useState<GalleryProp | null>(null);
    const serviceIdx = getServiceIndexBySlug(slug);

    const captionFor = (g: GalleryProp) => g.caption[locale] ?? g.caption.en ?? g.caption.ar ?? '';

    if (serviceIdx < 0) {
        return (
            <MarketingLayout current="/services">
                <Head title={t.serviceDetail.notFound} />
                <section className="mx-auto max-w-4xl px-6 py-32 text-center">
                    <h1 className="text-3xl font-semibold text-[#1b1b18] dark:text-amber-100">
                        {t.serviceDetail.notFound}
                    </h1>
                    <Link
                        href="/services"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:scale-105"
                    >
                        {t.serviceDetail.backToServices}
                    </Link>
                </section>
            </MarketingLayout>
        );
    }

    const service = t.services.items[serviceIdx];
    const Icon = serviceIcons[serviceIdx];

    return (
        <MarketingLayout current="/services">
            <Seo
                title={`${service.title} — Al Nosor Al Zahabia`}
                description={service.body}
                keywords={t.seo.services.keywords}
                structuredData={[
                    organizationSchema(baseUrl),
                    serviceSchema(baseUrl, service.title, service.body, slug),
                    breadcrumbSchema(baseUrl, [
                        { name: t.nav.home, path: '/' },
                        { name: t.nav.services, path: '/services' },
                        { name: service.title, path: `/services/${slug}` },
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
                <div className="mx-auto max-w-5xl px-6 pt-16 pb-12">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:scale-105 dark:text-amber-300"
                    >
                        <ArrowRight className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
                        {t.serviceDetail.backToServices}
                    </Link>
                    <div className="mt-8 flex items-start gap-6">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg">
                            <Icon className="h-8 w-8" />
                        </div>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                                {t.services.badge}
                            </span>
                            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[#1b1b18] md:text-4xl dark:text-amber-100">
                                {service.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-12">
                <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                            {t.serviceDetail.aboutThis}
                        </h2>
                        <p className="mt-3 text-lg leading-relaxed text-[#4a4a45] dark:text-amber-100/80">
                            {service.body}
                        </p>
                    </div>
                    <div className="rounded-3xl border border-amber-200/70 bg-white p-6 transition-transform hover:scale-[1.02] dark:border-amber-900/40 dark:bg-[#161615]">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                            {t.serviceDetail.whatWeOffer}
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {service.bullets.map((b) => (
                                <li
                                    key={b}
                                    className="group flex cursor-default items-start gap-2 text-sm text-[#4a4a45] transition-all hover:scale-[1.03] hover:font-semibold hover:text-amber-700 ltr:hover:translate-x-1 rtl:hover:-translate-x-1 dark:text-amber-100/80 dark:hover:text-amber-300"
                                >
                                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 transition-all group-hover:h-2 group-hover:w-2" />
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {galleries.length > 0 && (
            <section className="border-y border-amber-200/60 bg-white py-16 dark:border-amber-900/30 dark:bg-[#0f0f0e]">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                            {t.serviceDetail.previousWork}
                        </span>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1b1b18] md:text-4xl dark:text-amber-100">
                            {service.title}
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-[#4a4a45] dark:text-amber-100/70">
                            {t.serviceDetail.previousWorkLead}
                        </p>
                    </div>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {galleries.map((item) => {
                                const caption = captionFor(item);
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setOpenItem(item)}
                                        className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-amber-100 text-start transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-amber-400 hover:shadow-2xl dark:border-amber-900/40"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            {item.media_type === 'video' ? (
                                                <>
                                                    <video
                                                        src={item.media_path}
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-amber-700 shadow-lg">
                                                            <Play className="h-6 w-6 fill-current" />
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <img
                                                    src={item.media_path}
                                                    alt={caption}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            )}
                                            {caption && (
                                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                    <p className="text-sm font-semibold">{caption}</p>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                </div>
            </section>
            )}

            <section className="py-16">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-2xl font-semibold text-[#1b1b18] md:text-3xl dark:text-amber-100">
                        {t.services.ctaTitle}
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-[#4a4a45] dark:text-amber-100/70">
                        {t.services.ctaBody}
                    </p>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-amber-400 hover:to-amber-600"
                    >
                        {t.services.ctaButton}
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </Link>
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
                                    controls
                                    autoPlay
                                    className="max-h-[60vh] w-full"
                                />
                            ) : (
                                <img
                                    src={openItem.media_path}
                                    alt={captionFor(openItem)}
                                    className="max-h-[60vh] w-full object-contain"
                                />
                            )}
                        </div>
                        {captionFor(openItem) && (
                            <div className="space-y-3 p-6">
                                <DialogTitle className="text-xl text-[#1b1b18] dark:text-amber-100">
                                    {service.title}
                                </DialogTitle>
                                <DialogDescription className="text-[#4a4a45] dark:text-amber-100/80">
                                    {captionFor(openItem)}
                                </DialogDescription>
                            </div>
                        )}
                    </DialogContent>
                )}
            </Dialog>
        </MarketingLayout>
    );
}

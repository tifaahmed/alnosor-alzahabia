import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Briefcase,
    Building2,
    CalendarHeart,
    Flame,
    Hammer,
    Handshake,
    Palette,
    Refrigerator,
    ShoppingCart,
    Truck,
    WashingMachine,
} from 'lucide-react';
import Seo, { breadcrumbSchema, organizationSchema, serviceSchema } from '@/components/seo';
import { useLocale } from '@/contexts/locale-context';
import { serviceImages, serviceSlugs } from '@/lib/gallery';
import MarketingLayout from '@/layouts/marketing-layout';

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

export default function Services() {
    const { t, locale } = useLocale();
    const page = usePage<{ site?: { url?: string } }>();
    const baseUrl = (page.props.site?.url ?? '').replace(/\/$/, '');
    const services = t.services.items.map((s, i) => ({ ...s, icon: serviceIcons[i] }));

    return (
        <MarketingLayout current="/services">
            <Seo
                title={t.seo.services.title}
                description={t.seo.services.description}
                keywords={t.seo.services.keywords}
                structuredData={[
                    organizationSchema(baseUrl),
                    breadcrumbSchema(baseUrl, [
                        { name: t.nav.home, path: '/' },
                        { name: t.nav.services, path: '/services' },
                    ]),
                    ...t.services.items.map((s, i) =>
                        serviceSchema(baseUrl, s.title, s.body, serviceSlugs[i]),
                    ),
                ]}
            />

            <section className="relative overflow-hidden">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 50% 0%, rgba(212,164,55,0.15), transparent 55%)',
                    }}
                />
                <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-100/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-amber-800 dark:border-amber-700/40 dark:bg-amber-900/30 dark:text-amber-200">
                        {t.services.badge}
                    </span>
                    <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1b1b18] md:text-5xl dark:text-amber-100">
                        {t.services.heading}
                    </h1>
                    <p className="mt-6 text-lg text-[#4a4a45] dark:text-amber-100/70">{t.services.lead}</p>
                </div>
            </section>

            <section className="pb-2">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {services.map((s, idx) => {
                            const Icon = s.icon;
                            return (
                                <a
                                    key={`quick-${s.title}`}
                                    href={`#${serviceSlugs[idx]}`}
                                    className="group flex items-center gap-3 rounded-2xl border border-amber-200/70 bg-white px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md dark:border-amber-900/40 dark:bg-[#161615]"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm transition-transform group-hover:scale-110">
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <span className="line-clamp-2 text-xs font-semibold text-[#1b1b18] transition-colors group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
                                        {s.title}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-12 pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {services.map((s, idx) => {
                            const Icon = s.icon;
                            return (
                                <Link
                                    key={s.title}
                                    id={serviceSlugs[idx]}
                                    href={`/services/${serviceSlugs[idx]}`}
                                    as="article"
                                    className="group relative block cursor-pointer overflow-hidden rounded-3xl border border-amber-200/70 bg-white text-start transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-amber-400 hover:shadow-2xl scroll-mt-24 dark:border-amber-900/40 dark:bg-[#161615]"
                                >
                                    <div className="relative aspect-[16/9] overflow-hidden bg-amber-50 dark:bg-amber-900/20">
                                        <img
                                            src={serviceImages[serviceSlugs[idx]]}
                                            alt={s.title}
                                            loading="lazy"
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md ring-2 ring-white/30 transition-transform group-hover:scale-110 group-hover:rotate-6">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <span className="rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200 backdrop-blur-sm">
                                                {(idx + 1).toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US', { minimumIntegerDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                    <h2 className="text-xl font-semibold text-[#1b1b18] transition-colors group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
                                        {s.title}
                                    </h2>
                                    <p className="mt-4 text-[15px] leading-relaxed text-[#4a4a45] dark:text-amber-100/75">
                                        {s.body}
                                    </p>
                                    <ul className="mt-5 space-y-2">
                                        {s.bullets.map((b) => (
                                            <li
                                                key={b}
                                                className="group/item flex cursor-default items-start gap-2 text-sm text-[#4a4a45] transition-all duration-200 hover:scale-[1.04] hover:font-semibold hover:text-amber-700 ltr:hover:translate-x-2 rtl:hover:-translate-x-2 dark:text-amber-100/70 dark:hover:text-amber-300"
                                            >
                                                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 transition-all group-hover/item:h-2 group-hover/item:w-2 group-hover/item:bg-amber-600" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition-all group-hover:gap-3 dark:text-amber-300">
                                        {t.services.viewDetails ?? t.home.exploreServices}
                                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                                    </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-16 rounded-3xl border border-amber-300/60 bg-gradient-to-br from-[#1b1b18] to-[#2a2218] p-10 text-amber-50 shadow-lg transition-transform hover:scale-[1.01]">
                        <div className="grid gap-6 md:grid-cols-3 md:items-center">
                            <div className="md:col-span-2">
                                <h3 className="text-2xl font-semibold">{t.services.ctaTitle}</h3>
                                <p className="mt-3 text-amber-100/80">{t.services.ctaBody}</p>
                            </div>
                            <div className="md:text-end">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-amber-400 hover:to-amber-600"
                                >
                                    {t.services.ctaButton}
                                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}

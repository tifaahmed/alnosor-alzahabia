import { Link, usePage } from '@inertiajs/react';
import {
    AirVent,
    Anvil,
    ArrowRight,
    Bath,
    BrickWall,
    ChevronLeft,
    ChevronRight,
    Cog,
    Droplet,
    Droplets,
    Flame,
    Grid3x3,
    Hammer,
    LayoutGrid,
    Layers,
    Paintbrush,
    Pickaxe,
    Refrigerator,
    ShoppingBag,
    Sparkles,
    Square,
    SquareStack,
    WashingMachine,
    WavesLadder,
    Wrench,
    Zap
    
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import { useEffect, useState } from 'react';
import Seo, { breadcrumbSchema, organizationSchema, websiteSchema } from '@/components/seo';
import { useLocale } from '@/contexts/locale-context';
import MarketingLayout from '@/layouts/marketing-layout';
import { serviceImages, serviceSlugs } from '@/lib/gallery';
import { SITE } from '@/lib/i18n';

const serviceIcons: LucideIcon[] = [
    Wrench,
    AirVent,
    WashingMachine,
    Flame,
    Refrigerator,
    Droplets,
    Paintbrush,
    Layers,
    SquareStack,
    Grid3x3,
    BrickWall,
    Square,
    Cog,
    Droplet,
    Bath,
    Zap,
    Hammer,
    Anvil,
    LayoutGrid,
    WavesLadder,
    Pickaxe,
    Sparkles,
];

export default function Home() {
    const { t, locale } = useLocale();
    const page = usePage<{ site?: { url?: string } }>();
    const baseUrl = (page.props.site?.url ?? '').replace(/\/$/, '');

    const stats = [t.home.statActivities, t.home.statCapital, t.home.statBase, t.home.statReach];
    const services = t.services.items.map((s, i) => ({
        ...s,
        icon: serviceIcons[i],
        slug: serviceSlugs[i],
        image: serviceImages[serviceSlugs[i]],
    }));
    const featuredGrid = services.slice(0, 9);
    const featuredSlides = services.slice(0, 8);

    return (
        <MarketingLayout current="/">
            <Seo
                title={t.seo.home.title}
                description={t.seo.home.description}
                keywords={t.seo.home.keywords}
                structuredData={[
                    organizationSchema(baseUrl),
                    websiteSchema(baseUrl, locale),
                    breadcrumbSchema(baseUrl, [{ name: t.nav.home, path: '/' }]),
                ]}
            />

            <section className="relative overflow-hidden">
                <div
                    className="absolute inset-0 -z-10 opacity-60"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 20% 20%, rgba(212,164,55,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(212,164,55,0.12), transparent 40%)',
                    }}
                />
                <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-24 md:grid-cols-2 md:items-center">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-100/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-amber-800 dark:border-amber-700/40 dark:bg-amber-900/30 dark:text-amber-200">
                            {t.home.badge}
                        </span>
                        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-[#1b1b18] md:text-5xl lg:text-6xl dark:text-amber-100">
                            <span className="sr-only">
                                {locale === 'ar' ? SITE.nameAr : SITE.name} —{' '}
                            </span>
                            {t.home.headlineStart}{' '}
                            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                                {t.home.headlineHighlight}
                            </span>{' '}
                            {t.home.headlineEnd}
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-[#4a4a45] dark:text-amber-100/70">
                            {t.home.lead}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href="/services"
                                title={t.home.exploreServices}
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-amber-400 hover:to-amber-600"
                            >
                                {t.home.exploreServices}
                                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                            </Link>
                            <Link
                                href="/contact"
                                title={t.home.talkToUs}
                                className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-white/60 px-6 py-3 text-sm font-semibold text-amber-800 backdrop-blur transition hover:scale-105 hover:bg-amber-100 dark:border-amber-300/30 dark:bg-amber-900/20 dark:text-amber-100 dark:hover:bg-amber-900/40"
                            >
                                {t.home.talkToUs}
                            </Link>
                        </div>
                        <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="cursor-default border-amber-500 ps-4 transition-transform hover:scale-110 hover:border-amber-600 ltr:border-l-2 rtl:border-r-2"
                                >
                                    <dt className="text-xs uppercase tracking-wider text-[#4a4a45]/70 dark:text-amber-100/60">
                                        {s.label}
                                    </dt>
                                    <dd className="mt-1 text-2xl font-semibold text-[#1b1b18] dark:text-amber-100">
                                        {s.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-amber-200 via-amber-50 to-transparent opacity-70 blur-2xl dark:from-amber-900/30 dark:via-amber-900/10" />
                        <ServicesSlider services={featuredSlides} viewLabel={t.services.viewDetails ?? t.home.exploreServices} />
                    </div>
                </div>
            </section>

            <section className="border-y border-amber-200/60 bg-white py-20 dark:border-amber-900/30 dark:bg-[#0f0f0e]">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                                {t.home.servicesEyebrow}
                            </span>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1b1b18] md:text-4xl dark:text-amber-100">
                                {t.home.servicesHeading}
                            </h2>
                        </div>
                        <Link
                            href="/services"
                            title={t.home.seeAll}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:scale-105 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
                        >
                            {t.home.seeAll}
                            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                        </Link>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                        {featuredGrid.map((s) => {
                            const Icon = s.icon;

                            return (
                                <Link
                                    key={s.title}
                                    href={`/services/${s.slug}`}
                                    title={s.title}
                                    className="group block rounded-2xl border border-amber-200/70 bg-[#FBF7EF] p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-amber-400 hover:shadow-xl sm:p-6 dark:border-amber-900/40 dark:bg-[#161615]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 text-lg font-semibold text-[#1b1b18] transition-colors group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-[#4a4a45] dark:text-amber-100/70">
                                        {s.body}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 transition-all group-hover:gap-2.5 dark:text-amber-300">
                                        {t.services.viewDetails ?? t.home.exploreServices}
                                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                            {t.home.whyEyebrow}
                        </span>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1b1b18] md:text-4xl dark:text-amber-100">
                            {t.home.whyHeading}
                        </h2>
                        <ul className="mt-8 space-y-5">
                            {t.home.why.map((b) => (
                                <li
                                    key={b.title}
                                    className="group flex cursor-default gap-4 transition-transform duration-300 hover:scale-[1.03] ltr:hover:translate-x-2 rtl:hover:-translate-x-2"
                                >
                                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white transition-transform group-hover:scale-125 group-hover:bg-amber-600">
                                        ✓
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-[#1b1b18] transition-colors group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
                                            {b.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-[#4a4a45] dark:text-amber-100/70">{b.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-3xl border border-amber-300/50 bg-gradient-to-br from-amber-100 via-[#FBF7EF] to-white p-8 shadow-sm transition-transform hover:scale-[1.02] dark:border-amber-900/40 dark:from-amber-900/20 dark:via-[#161615] dark:to-[#0a0a0a]">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="h-6 w-6 text-amber-700" />
                            <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-amber-100">
                                {t.home.ctaTitle}
                            </h3>
                        </div>
                        <p className="mt-3 text-sm text-[#4a4a45] dark:text-amber-100/70">{t.home.ctaBody}</p>
                        <Link
                            href="/contact"
                            title={t.home.ctaButton}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1b1b18] px-5 py-3 text-sm font-semibold text-amber-100 transition hover:scale-105 hover:bg-amber-700"
                        >
                            {t.home.ctaButton}
                            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}

type Slide = { title: string; body: string; slug: string; icon: LucideIcon; image: string };

function ServicesSlider({ services, viewLabel }: { services: Slide[]; viewLabel: string }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const total = services.length;

    useEffect(() => {
        if (paused || total < 2) {
return;
}

        const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);

        return () => clearInterval(id);
    }, [paused, total]);

    const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

    return (
        <div
            className="group relative aspect-square overflow-hidden rounded-3xl border border-amber-200 bg-[#1b1b18] shadow-xl dark:border-amber-900/40"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
        >
            {services.map((s, i) => {
                const Icon = s.icon;
                const active = i === index;

                return (
                    <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        title={s.title}
                        aria-hidden={!active}
                        tabIndex={active ? 0 : -1}
                        className={`absolute inset-0 flex flex-col justify-between p-8 text-amber-50 transition-all duration-700 ease-out ${
                            active
                                ? 'pointer-events-auto translate-x-0 opacity-100'
                                : 'pointer-events-none translate-x-2 opacity-0 rtl:-translate-x-2'
                        }`}
                    >
                        <img
                            src={s.image}
                            alt={s.title}
                            title={s.title}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            fetchPriority={i === 0 ? 'high' : 'low'}
                            decoding={i === 0 ? 'sync' : 'async'}
                            className={`absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[5000ms] ease-out ${
                                active ? 'scale-110' : 'scale-100'
                            }`}
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/85" />
                        <div className="flex items-start justify-between">
                            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/90 to-amber-700/90 shadow-lg ring-1 ring-amber-300/40 backdrop-blur-sm">
                                <Icon className="h-7 w-7 text-white" />
                            </span>
                            <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200 backdrop-blur-sm">
                                {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold leading-tight drop-shadow-md md:text-[1.65rem]">{s.title}</h3>
                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-amber-50/90 drop-shadow">{s.body}</p>
                            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all group-hover:gap-2.5 group-hover:bg-amber-400">
                                {viewLabel}
                                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                            </span>
                        </div>
                    </Link>
                );
            })}

            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    go(-1);
                }}
                aria-label="Previous service"
                className="absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-amber-900 opacity-0 shadow-md backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100 dark:bg-[#0a0a0a]/70 dark:text-amber-200"
            >
                <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    go(1);
                }}
                aria-label="Next service"
                className="absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-amber-900 opacity-0 shadow-md backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100 dark:bg-[#0a0a0a]/70 dark:text-amber-200"
            >
                <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>

            <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5">
                {services.map((s, i) => (
                    <button
                        key={s.slug}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === index}
                        className={`h-1.5 rounded-full transition-all ${
                            i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

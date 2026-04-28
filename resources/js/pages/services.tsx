import { Link, usePage } from '@inertiajs/react';
import {
    AirVent,
    Anvil,
    ArrowRight,
    Bath,
    BrickWall,
    Building2,
    ChevronDown,
    Cog,
    Construction,
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
    Sparkles,
    Square,
    SquareStack,
    WashingMachine,
    WavesLadder,
    Wrench,
    Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Seo, { breadcrumbSchema, organizationSchema, serviceSchema } from '@/components/seo';
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

type CategoryKey = 'maintenance' | 'finishing' | 'mep' | 'woodwork' | 'exterior' | 'renovation';

const categoryOrder: CategoryKey[] = ['maintenance', 'finishing', 'mep', 'woodwork', 'exterior', 'renovation'];

const categoryIcons: Record<CategoryKey, LucideIcon> = {
    maintenance: Wrench,
    finishing: Building2,
    mep: Zap,
    woodwork: Hammer,
    exterior: WavesLadder,
    renovation: Construction,
};

export default function Services() {
    const { t, locale } = useLocale();
    const page = usePage<{ site?: { url?: string } }>();
    const baseUrl = (page.props.site?.url ?? '').replace(/\/$/, '');
    const services = t.services.items.map((s, i) => ({
        ...s,
        icon: serviceIcons[i],
        slug: serviceSlugs[i],
        idx: i,
    }));

    const grouped = categoryOrder.map((cat) => ({
        key: cat,
        label: t.services.categories[cat],
        items: services.filter((s) => s.category === cat),
    }));

    const [openCategory, setOpenCategory] = useState<CategoryKey | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const openCat = (key: CategoryKey) => {
        if (closeTimer.current) {
clearTimeout(closeTimer.current);
}

        setOpenCategory(key);
    };
    const scheduleClose = () => {
        if (closeTimer.current) {
clearTimeout(closeTimer.current);
}

        closeTimer.current = setTimeout(() => setOpenCategory(null), 180);
    };

    useEffect(() => {
        if (openCategory === null) {
return;
}

        const onDocClick = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setOpenCategory(null);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
setOpenCategory(null);
}
        };
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('keydown', onKey);

        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [openCategory]);

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
                        <span className="sr-only">
                            {locale === 'ar' ? SITE.nameAr : SITE.name} —{' '}
                        </span>
                        {t.services.heading}
                    </h1>
                    <p className="mt-6 text-lg text-[#4a4a45] dark:text-amber-100/70">{t.services.lead}</p>
                </div>
            </section>

            <section className="pb-2">
                <div className="mx-auto max-w-6xl px-6">
                    <div ref={navRef} className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {grouped.map((g) => {
                            const CatIcon = categoryIcons[g.key];
                            const isOpen = openCategory === g.key;

                            return (
                                <div
                                    key={g.key}
                                    className="relative"
                                    onMouseEnter={() => openCat(g.key)}
                                    onMouseLeave={scheduleClose}
                                    onFocus={() => openCat(g.key)}
                                    onBlur={scheduleClose}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-haspopup="menu"
                                        onClick={() => setOpenCategory(isOpen ? null : g.key)}
                                        className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50 hover:shadow-md dark:hover:bg-amber-900/20 ${
                                            isOpen
                                                ? 'border-amber-400 bg-amber-50 text-[#1b1b18] shadow-md dark:border-amber-500/60 dark:bg-amber-900/20 dark:text-amber-100'
                                                : 'border-amber-200/70 bg-white text-[#1b1b18] dark:border-amber-900/40 dark:bg-[#161615] dark:text-amber-100'
                                        }`}
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm transition-transform group-hover:scale-110">
                                            <CatIcon className="h-3.5 w-3.5" />
                                        </span>
                                        <span>{g.label}</span>
                                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                                            {g.items.length}
                                        </span>
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 text-amber-700 transition-transform duration-200 dark:text-amber-300 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div
                                            role="menu"
                                            className="absolute top-full left-1/2 z-30 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-amber-200/70 bg-white p-2 shadow-2xl ring-1 ring-amber-100/60 dark:border-amber-900/40 dark:bg-[#161615] dark:ring-amber-900/20"
                                            onMouseEnter={() => openCat(g.key)}
                                            onMouseLeave={scheduleClose}
                                        >
                                            <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-amber-200/70 bg-white dark:border-amber-900/40 dark:bg-[#161615]" />
                                            <ul className="relative max-h-80 space-y-0.5 overflow-y-auto">
                                                {g.items.map((s) => {
                                                    const Icon = s.icon;

                                                    return (
                                                        <li key={s.slug} role="none">
                                                            <Link
                                                                role="menuitem"
                                                                href={`/services/${s.slug}`}
                                                                title={s.title}
                                                                onClick={() => setOpenCategory(null)}
                                                                className="group/i flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#1b1b18] transition-colors hover:bg-amber-50 dark:text-amber-100 dark:hover:bg-amber-900/30"
                                                            >
                                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 transition-transform group-hover/i:scale-110 group-hover/i:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300">
                                                                    <Icon className="h-4 w-4" />
                                                                </span>
                                                                <span className="line-clamp-1 flex-1 font-medium">{s.title}</span>
                                                                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-amber-600 opacity-0 transition-opacity group-hover/i:opacity-100 rtl:rotate-180" />
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            <a
                                                href={`#category-${g.key}`}
                                                title={g.label}
                                                onClick={() => setOpenCategory(null)}
                                                className="mt-2 flex items-center justify-between rounded-xl border-t border-amber-200/60 px-3 pt-3 pb-2 text-xs font-semibold text-amber-700 hover:text-amber-900 dark:border-amber-900/40 dark:text-amber-300 dark:hover:text-amber-200"
                                            >
                                                <span>{t.services.viewDetails ?? t.home.exploreServices}</span>
                                                <ChevronDown className="h-3.5 w-3.5" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-12 pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="space-y-16">
                        {grouped.map((g) => {
                            const CatIcon = categoryIcons[g.key];

                            return (
                                <div key={g.key} id={`category-${g.key}`} className="scroll-mt-24">
                                    <div className="mb-8 flex items-center gap-4">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md">
                                            <CatIcon className="h-6 w-6" />
                                        </span>
                                        <div>
                                            <h2 className="text-2xl font-semibold tracking-tight text-[#1b1b18] md:text-3xl dark:text-amber-100">
                                                {g.label}
                                            </h2>
                                            <div className="mt-1 h-0.5 w-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-700" />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 lg:grid-cols-2">
                                        {g.items.map((s) => {
                                            const Icon = s.icon;

                                            return (
                                                <Link
                                                    key={s.slug}
                                                    id={s.slug}
                                                    href={`/services/${s.slug}`}
                                                    title={s.title}
                                                    as="article"
                                                    className="group relative block cursor-pointer overflow-hidden rounded-3xl border border-amber-200/70 bg-white text-start transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-amber-400 hover:shadow-2xl scroll-mt-24 dark:border-amber-900/40 dark:bg-[#161615]"
                                                >
                                                    <div className="relative aspect-[16/9] overflow-hidden bg-amber-50 dark:bg-amber-900/20">
                                                        <img
                                                            src={serviceImages[s.slug]}
                                                            alt={`${s.title} — ${locale === 'ar' ? SITE.nameAr : SITE.name}`}
                                                            title={s.title}
                                                            loading="lazy"
                                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md ring-2 ring-white/30 transition-transform group-hover:scale-110 group-hover:rotate-6">
                                                                <Icon className="h-5 w-5" />
                                                            </div>
                                                            <span className="rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200 backdrop-blur-sm">
                                                                {(s.idx + 1).toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US', { minimumIntegerDigits: 2 })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-8">
                                                        <h3 className="text-xl font-semibold text-[#1b1b18] transition-colors group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
                                                            {s.title}
                                                        </h3>
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
                                </div>
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
                                    title={t.services.ctaButton}
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

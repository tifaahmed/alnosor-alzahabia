import { Link } from '@inertiajs/react';
import { Globe, Mail, MapPin, Menu, Phone, PhoneCall, X } from 'lucide-react';
import { useEffect, useRef, useState  } from 'react';
import type {PropsWithChildren} from 'react';
import FloatingActions from '@/components/floating-actions';
import { useLocale } from '@/contexts/locale-context';
import { serviceSlugs } from '@/lib/gallery';
import { SITE } from '@/lib/i18n';
import { cn } from '@/lib/utils';

function useHideOnScroll(threshold = 80) {
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        lastY.current = window.scrollY;
        let ticking = false;

        const onScroll = () => {
            if (ticking) {
return;
}

            ticking = true;
            window.requestAnimationFrame(() => {
                const y = window.scrollY;
                const diff = y - lastY.current;

                if (y < threshold) {
                    setHidden(false);
                } else if (diff > 6) {
                    setHidden(true);
                } else if (diff < -6) {
                    setHidden(false);
                }

                lastY.current = y;
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return hidden;
}

export function Brand({
    size = 'md',
    onDark = false,
}: {
    size?: 'sm' | 'md' | 'lg';
    onDark?: boolean;
}) {
    const { locale } = useLocale();
    const sizes = {
        sm: { logo: 'h-10', name: 'text-lg md:text-xl', sub: 'text-[11px]' },
        md: { logo: 'h-14 md:h-16', name: 'text-2xl md:text-3xl', sub: 'text-[13px] md:text-sm' },
        lg: { logo: 'h-20', name: 'text-3xl md:text-4xl', sub: 'text-sm md:text-base' },
    }[size];
    const nameEn = 'Al Nosor Al Zahabia';
    const nameAr = 'النسور الذهبية';
    const name = locale === 'ar' ? nameAr : nameEn;

    return (
        <Link
            href="/"
            title={`${name} — ${locale === 'ar' ? 'الرئيسية' : 'Home'}`}
            className="group relative flex items-center gap-3 [perspective:800px]"
            aria-label={`${name} — Home`}
        >
            <span className="relative inline-block shrink-0">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-[-12%] rounded-full bg-[conic-gradient(from_0deg,rgba(217,119,6,0)_0deg,rgba(245,158,11,0.55)_90deg,rgba(217,119,6,0)_180deg,rgba(250,204,21,0.5)_270deg,rgba(217,119,6,0)_360deg)] opacity-70 blur-md motion-safe:animate-spin"
                    style={{ animationDuration: '6s' }}
                />
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full bg-amber-200/0 transition-colors duration-500 group-hover:bg-amber-200/40"
                />
                <img
                    src="/images/logos/logo-with-text-without-background.png"
                    alt="Al Nosor Al Zahabia FZE LLC — النسور الذهبية"
                    title="Al Nosor Al Zahabia FZE LLC"
                    width={120}
                    height={120}
                    className={cn(
                        sizes.logo,
                        'relative w-auto transition-transform duration-500 group-hover:[transform:rotateY(15deg)_scale(1.12)]',
                    )}
                />
            </span>
            <span className="flex flex-col leading-tight">
                <span
                    className={cn(
                        'relative inline-block font-bold tracking-tight transition-transform duration-500 group-hover:[transform:translateY(-2px)_rotateX(8deg)]',
                        sizes.name,
                    )}
                    style={{
                        fontFamily: locale === 'ar' ? 'inherit' : "'Instrument Sans', serif",
                    }}
                >
                    <span
                        className="bg-gradient-to-b from-amber-300 via-amber-600 to-amber-900 bg-clip-text text-transparent dark:from-amber-200 dark:via-amber-400 dark:to-amber-700"
                        style={{ WebkitTextStroke: onDark ? '0px' : '0.5px rgba(180,120,30,0.25)' }}
                    >
                        {name}
                    </span>
                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent bg-clip-text text-transparent motion-safe:[animation:brand-shine_5s_ease-in-out_infinite]"
                        style={{
                            backgroundSize: '40% 100%',
                            backgroundRepeat: 'no-repeat',
                            fontFamily: locale === 'ar' ? 'inherit' : "'Instrument Sans', serif",
                            mixBlendMode: 'overlay',
                        }}
                    >
                        {name}
                    </span>
                </span>
                <span
                    className={cn(
                        'mt-1.5 inline-flex items-center gap-2 font-semibold uppercase tracking-[0.28em] transition-all duration-300 group-hover:gap-3 group-hover:tracking-[0.38em]',
                        onDark ? 'text-amber-200' : 'text-amber-800',
                        sizes.sub,
                    )}
                    style={{ textShadow: onDark ? '0 1px 2px rgba(0,0,0,0.4)' : '0 1px 0 rgba(255,255,255,0.6)' }}
                >
                    <span className="motion-safe:[animation:var(--animate-pulse-soft)]">FZE LLC</span>
                    <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 ring-2 ring-amber-300/50 motion-safe:[animation:var(--animate-twinkle)]"
                    />
                    <span className="motion-safe:[animation:var(--animate-pulse-soft)] [animation-delay:1s]">Ajman</span>
                </span>
            </span>
        </Link>
    );
}

function LanguageToggle({ className }: { className?: string }) {
    const { toggleLocale, t } = useLocale();

    return (
        <button
            type="button"
            onClick={toggleLocale}
            className={cn(
                'inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-white/60 px-3 py-1.5 text-sm font-semibold text-amber-800 transition hover:scale-105 hover:bg-amber-100 dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-200 dark:hover:bg-amber-900/40',
                className,
            )}
            aria-label="Toggle language"
        >
            <Globe className="h-4 w-4" />
            {t.nav.switchTo}
        </button>
    );
}

export default function MarketingLayout({
    children,
    current,
}: PropsWithChildren<{ current: string }>) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { t, dir } = useLocale();
    const headerHidden = useHideOnScroll() && !mobileOpen;
    const serviceItems = t.services.items.map((s, i) => ({ title: s.title, slug: serviceSlugs[i] }));

    const navLinks = [
        { href: '/', label: t.nav.home },
        { href: '/about', label: t.nav.about },
        { href: '/services', label: t.nav.services },
        { href: '/projects', label: t.nav.projects },
        { href: '/contact', label: t.nav.contact },
    ];

    return (
        <div className="min-h-screen bg-[#FBF7EF] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
            <div
                aria-hidden={!headerHidden}
                dir="ltr"
                className={cn(
                    'fixed top-0 right-0 left-0 z-30 overflow-hidden border-b border-amber-200/60 bg-[#FBF7EF]/95 backdrop-blur transition-transform duration-300 ease-out md:hidden dark:border-amber-900/30 dark:bg-[#0a0a0a]/95',
                    headerHidden ? 'translate-y-0' : '-translate-y-full',
                )}
            >
                <div
                    className="flex w-max items-center gap-8 py-3 [animation:marquee-x_28s_linear_infinite] motion-reduce:[animation:none]"
                    style={{ animationDirection: dir === 'rtl' ? 'reverse' : 'normal' }}
                >
                    {[...serviceItems, ...serviceItems].map((item, i) => (
                        <Link
                            key={`m-${i}`}
                            href={`/services/${item.slug}`}
                            title={item.title}
                            dir={dir}
                            className="flex shrink-0 items-center gap-3 text-sm font-semibold text-amber-800 transition-colors hover:text-amber-600 active:text-amber-700 dark:text-amber-200 dark:hover:text-amber-100"
                        >
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>

            <header
                className={cn(
                    'sticky top-0 z-40 border-b border-amber-200/60 bg-[#FBF7EF]/85 backdrop-blur transition-transform duration-300 ease-out will-change-transform dark:border-amber-900/30 dark:bg-[#0a0a0a]/85',
                    headerHidden ? '-translate-y-full' : 'translate-y-0',
                )}
            >
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Brand />
                    <nav className="hidden items-center gap-1 md:flex" aria-label={t.nav.home}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                title={link.label}
                                aria-current={current === link.href ? 'page' : undefined}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm font-medium transition-all hover:scale-105',
                                    current === link.href
                                        ? 'bg-amber-600 text-white shadow-sm'
                                        : 'text-[#1b1b18]/80 hover:bg-amber-100 dark:text-amber-100/80 dark:hover:bg-amber-900/30',
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="hidden items-center gap-3 md:flex">
                        <LanguageToggle />
                        <Link
                            href="/contact"
                            title={t.nav.getQuote}
                            className="rounded-full border border-amber-700 bg-gradient-to-b from-amber-500 to-amber-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-105 hover:from-amber-400 hover:to-amber-600"
                        >
                            {t.nav.getQuote}
                        </Link>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-[#1b1b18] md:hidden dark:text-amber-100"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
                {mobileOpen && (
                    <div className="border-t border-amber-200/60 bg-[#FBF7EF] px-6 py-4 md:hidden dark:border-amber-900/30 dark:bg-[#0a0a0a]">
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    title={link.label}
                                    aria-current={current === link.href ? 'page' : undefined}
                                    className={cn(
                                        'rounded-md px-3 py-2 text-sm font-medium transition-all hover:scale-[1.02]',
                                        current === link.href
                                            ? 'bg-amber-600 text-white'
                                            : 'text-[#1b1b18]/80 hover:bg-amber-100 dark:text-amber-100/80 dark:hover:bg-amber-900/30',
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <LanguageToggle className="mt-2 self-start" />
                        </nav>
                    </div>
                )}
            </header>

            <main>{children}</main>

            <footer className="mt-24 border-t border-amber-200/60 bg-[#1b1b18] text-amber-50/90 dark:border-amber-900/30">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <Brand size="md" onDark />
                        <p className="mt-4 max-w-md text-sm text-amber-100/70">{t.footer.description}</p>
                        <p className="mt-4 text-xs text-amber-100/50">{t.footer.licenseLine}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300">
                            {t.footer.explore}
                        </h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            {navLinks.map((link) => (
                                <li
                                    key={link.href}
                                    className="origin-[inline-start] transition-transform hover:scale-105 ltr:hover:translate-x-1 rtl:hover:-translate-x-1"
                                >
                                    <Link
                                        href={link.href}
                                        title={link.label}
                                        className="inline-block text-amber-100/70 transition-colors hover:text-amber-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300">
                            {t.footer.contact}
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm text-amber-100/70">
                            <li className="flex items-start gap-2 transition-transform hover:scale-[1.03] ltr:hover:translate-x-1 rtl:hover:-translate-x-1">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                                <span>{t.footer.address}</span>
                            </li>
                            <li className="flex items-start gap-2 transition-transform hover:scale-[1.03] ltr:hover:translate-x-1 rtl:hover:-translate-x-1">
                                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                                <a
                                    href={`tel:${SITE.phone}`}
                                    title={`Call ${SITE.name} — ${SITE.phoneDisplay}`}
                                    dir="ltr"
                                    className="transition-colors hover:text-amber-200"
                                >
                                    {SITE.phoneDisplay}
                                </a>
                            </li>
                            <li className="flex items-start gap-2 transition-transform hover:scale-[1.03] ltr:hover:translate-x-1 rtl:hover:-translate-x-1">
                                <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                                <a
                                    href={`tel:${SITE.landline}`}
                                    title={`Call ${SITE.name} landline — ${SITE.landlineDisplay}`}
                                    dir="ltr"
                                    className="transition-colors hover:text-amber-200"
                                >
                                    {SITE.landlineDisplay}
                                </a>
                            </li>
                            <li className="flex items-start gap-2 transition-transform hover:scale-[1.03] ltr:hover:translate-x-1 rtl:hover:-translate-x-1">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                                <a
                                    href="mailto:info@alnosoralzahabia.com"
                                    title={`Email ${SITE.name} — info@alnosoralzahabia.com`}
                                    className="transition-colors hover:text-amber-200"
                                >
                                    info@alnosoralzahabia.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-amber-100/10">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-amber-100/50 md:flex-row">
                        <span>
                            © {new Date().getFullYear()} Al Nosor Al Zahabia FZE LLC. {t.footer.copyright}
                        </span>
                        <span>النسور الذهبيه م.م.ح / ذ.م.م</span>
                    </div>
                </div>
            </footer>

            <FloatingActions />
        </div>
    );
}

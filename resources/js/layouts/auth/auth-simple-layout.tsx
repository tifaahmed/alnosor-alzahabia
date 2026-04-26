import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '@/contexts/locale-context';
import { Brand } from '@/layouts/marketing-layout';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { t, locale } = useLocale();

    return (
        <div className="relative flex min-h-svh flex-col bg-[#FBF7EF] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
            <div
                className="pointer-events-none absolute inset-0 -z-0 opacity-60"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 20% 20%, rgba(212,164,55,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(212,164,55,0.12), transparent 40%)',
                }}
            />

            <header className="relative z-10 border-b border-amber-200/60 bg-[#FBF7EF]/85 backdrop-blur dark:border-amber-900/30 dark:bg-[#0a0a0a]/85">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Brand size="sm" />
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-white/60 px-4 py-1.5 text-sm font-semibold text-amber-800 backdrop-blur transition hover:scale-105 hover:bg-amber-100 dark:border-amber-300/30 dark:bg-amber-900/20 dark:text-amber-100 dark:hover:bg-amber-900/40"
                    >
                        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                        {t.nav.home}
                    </Link>
                </div>
            </header>

            <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 md:py-20">
                <div className="w-full max-w-md">
                    <div className="rounded-2xl border border-amber-200/70 bg-white/80 p-8 shadow-[0_18px_60px_-25px_rgba(180,120,30,0.45)] backdrop-blur md:p-10 dark:border-amber-900/40 dark:bg-[#141312]/80">
                        <div className="mb-8 flex flex-col items-center gap-4 text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-100/40 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-amber-800 dark:border-amber-700/40 dark:bg-amber-900/30 dark:text-amber-200">
                                {locale === 'ar' ? 'منطقة الأعضاء' : 'Members area'}
                            </span>
                            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                <span className="bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                                    {title}
                                </span>
                            </h1>
                            {description && (
                                <p className="max-w-sm text-sm text-[#4a4a45] dark:text-amber-100/70">
                                    {description}
                                </p>
                            )}
                        </div>
                        {children}
                    </div>

                    <p className="mt-6 text-center text-xs text-[#4a4a45]/70 dark:text-amber-100/50">
                        © {new Date().getFullYear()} Al Nosor Al Zahabia FZE LLC
                    </p>
                </div>
            </main>
        </div>
    );
}

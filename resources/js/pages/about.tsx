import { Link, usePage } from '@inertiajs/react';
import { Award, Building, Compass, Globe2, Sparkles, Target } from 'lucide-react';
import Seo, { breadcrumbSchema, organizationSchema } from '@/components/seo';
import { useLocale } from '@/contexts/locale-context';
import MarketingLayout from '@/layouts/marketing-layout';
import { SITE } from '@/lib/i18n';

const valueIcons = [Award, Sparkles, Compass, Globe2];

export default function About() {
    const { t, locale } = useLocale();
    const page = usePage<{ site?: { url?: string } }>();
    const baseUrl = (page.props.site?.url ?? '').replace(/\/$/, '');
    const values = t.about.values.map((v, i) => ({ ...v, icon: valueIcons[i] }));

    return (
        <MarketingLayout current="/about">
            <Seo
                title={t.seo.about.title}
                description={t.seo.about.description}
                keywords={t.seo.about.keywords}
                structuredData={[
                    organizationSchema(baseUrl),
                    breadcrumbSchema(baseUrl, [
                        { name: t.nav.home, path: '/' },
                        { name: t.nav.about, path: '/about' },
                    ]),
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
                        {t.about.badge}
                    </span>
                    <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1b1b18] md:text-5xl dark:text-amber-100">
                        <span className="sr-only">
                            {locale === 'ar' ? SITE.nameAr : SITE.name} —{' '}
                        </span>
                        {t.about.heading}
                    </h1>
                    <p className="mt-6 text-lg text-[#4a4a45] dark:text-amber-100/70">{t.about.lead}</p>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
                    <div className="group rounded-3xl border border-amber-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-amber-400 hover:shadow-xl dark:border-amber-900/40 dark:bg-[#161615]">
                        <Target className="h-8 w-8 text-amber-600 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                        <h2 className="mt-4 text-2xl font-semibold text-[#1b1b18] transition-colors group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
                            {t.about.missionTitle}
                        </h2>
                        <p className="mt-3 text-[#4a4a45] dark:text-amber-100/75">{t.about.missionBody}</p>
                    </div>
                    <div className="group rounded-3xl border border-amber-200/70 bg-[#1b1b18] p-8 text-amber-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-amber-400 hover:shadow-xl dark:border-amber-900/40">
                        <Building className="h-8 w-8 text-amber-400 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                        <h2 className="mt-4 text-2xl font-semibold transition-colors group-hover:text-amber-300">
                            {t.about.visionTitle}
                        </h2>
                        <p className="mt-3 text-amber-100/80">{t.about.visionBody}</p>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                            {t.about.valuesEyebrow}
                        </span>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1b1b18] md:text-4xl dark:text-amber-100">
                            {t.about.valuesHeading}
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((v) => {
                            const Icon = v.icon;

                            return (
                                <div
                                    key={v.title}
                                    className="group rounded-2xl border border-amber-200/70 bg-[#FBF7EF] p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:border-amber-400 hover:shadow-xl dark:border-amber-900/40 dark:bg-[#161615]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white transition-transform group-hover:scale-125 group-hover:rotate-6">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 font-semibold text-[#1b1b18] transition-colors group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
                                        {v.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-[#4a4a45] dark:text-amber-100/70">{v.body}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-10 rounded-3xl border border-amber-200/70 bg-white p-8 md:grid-cols-3 md:p-12 dark:border-amber-900/40 dark:bg-[#161615]">
                        <div className="md:col-span-1">
                            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                                {t.about.leadershipEyebrow}
                            </span>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1b1b18] dark:text-amber-100">
                                {t.about.leadershipName}
                            </h2>
                            <p className="mt-3 text-sm text-[#4a4a45] dark:text-amber-100/70">
                                {t.about.leadershipRole}
                            </p>
                            <div className="mt-4 inline-flex h-32 w-32 cursor-default items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-5xl font-bold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-6">
                                RG
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-[#4a4a45] dark:text-amber-100/80">{t.about.leadershipP1}</p>
                            <p className="mt-4 text-[#4a4a45] dark:text-amber-100/80">{t.about.leadershipP2}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                            {t.about.licenseEyebrow}
                        </span>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1b1b18] md:text-4xl dark:text-amber-100">
                            {t.about.licenseHeading}
                        </h2>
                        <p className="mt-3 text-[#4a4a45] dark:text-amber-100/70">{t.about.licenseLead}</p>
                    </div>
                    <div className="mt-10 overflow-hidden rounded-3xl border border-amber-200/70 bg-white dark:border-amber-900/40 dark:bg-[#161615]">
                        <dl className="divide-y divide-amber-100 dark:divide-amber-900/30">
                            {t.about.licenseRows.map((row) => (
                                <div
                                    key={row.label}
                                    className="group grid cursor-default grid-cols-1 gap-1 px-6 py-4 transition-all duration-200 hover:scale-[1.01] hover:bg-amber-50 sm:grid-cols-3 sm:gap-4 dark:hover:bg-amber-900/20"
                                >
                                    <dt className="text-sm font-semibold text-[#4a4a45] transition-colors group-hover:text-amber-700 sm:col-span-1 dark:text-amber-200/80 dark:group-hover:text-amber-300">
                                        {row.label}
                                    </dt>
                                    <dd className="text-sm text-[#1b1b18] transition-colors group-hover:font-semibold sm:col-span-2 dark:text-amber-100">
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div className="mt-10 text-center">
                        <Link
                            href="/contact"
                            title={t.about.workWithUs}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-amber-400 hover:to-amber-600"
                        >
                            {t.about.workWithUs}
                        </Link>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}

import { useForm, usePage } from '@inertiajs/react';
import { Building2, Clock, Mail, MapPin, MessageSquare, Phone, PhoneCall, Send } from 'lucide-react';
import Seo, { breadcrumbSchema, organizationSchema } from '@/components/seo';
import { useLocale } from '@/contexts/locale-context';
import MarketingLayout from '@/layouts/marketing-layout';
import { SITE } from '@/lib/i18n';

const inputClass =
    'w-full rounded-xl border border-amber-200 bg-[#FBF7EF] px-4 py-2.5 text-sm text-[#1b1b18] placeholder:text-[#4a4a45]/50 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-amber-900/40 dark:bg-[#0f0f0e] dark:text-amber-100 dark:placeholder:text-amber-100/30 dark:focus:bg-[#161615]';

export default function Contact() {
    const { t, locale } = useLocale();
    const page = usePage<{ site?: { url?: string } }>();
    const baseUrl = (page.props.site?.url ?? '').replace(/\/$/, '');
    const form = useForm({
        source: 'website',
        name: '',
        phone: '',
        subject: t.contact.subjects[0],
        email: '',
        message: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post('/contact', {
            preserveScroll: true,
            onSuccess: () => form.reset('name', 'phone', 'email', 'message'),
        });
    }

    return (
        <MarketingLayout current="/contact">
            <Seo
                title={t.seo.contact.title}
                description={t.seo.contact.description}
                keywords={t.seo.contact.keywords}
                structuredData={[
                    organizationSchema(baseUrl),
                    breadcrumbSchema(baseUrl, [
                        { name: t.nav.home, path: '/' },
                        { name: t.nav.contact, path: '/contact' },
                    ]),
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        name: t.seo.contact.title,
                        url: `${baseUrl}/contact`,
                    },
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
                        {t.contact.badge}
                    </span>
                    <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[#1b1b18] md:text-5xl dark:text-amber-100">
                        <span className="sr-only">
                            {locale === 'ar' ? SITE.nameAr : SITE.name} —{' '}
                        </span>
                        {t.contact.heading}
                    </h1>
                    <p className="mt-6 text-lg text-[#4a4a45] dark:text-amber-100/70">{t.contact.lead}</p>
                </div>
            </section>

            <section className="pb-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-10 lg:grid-cols-5">
                        <div className="space-y-6 lg:col-span-2">
                            <div className="rounded-3xl border border-amber-200/70 bg-white p-8 shadow-sm dark:border-amber-900/40 dark:bg-[#161615]">
                                <h2 className="text-lg font-semibold text-[#1b1b18] dark:text-amber-100">
                                    {t.contact.infoHeading}
                                </h2>
                                <ul className="mt-6 space-y-5 text-sm">
                                    <li className="group flex items-start gap-4 transition-all duration-200 hover:scale-[1.03] ltr:hover:translate-x-2 rtl:hover:-translate-x-2">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:bg-amber-900/40 dark:text-amber-300">
                                            <MapPin className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p className="font-semibold text-[#1b1b18] dark:text-amber-100">
                                                {t.contact.office}
                                            </p>
                                            <p className="mt-1 whitespace-pre-line text-[#4a4a45] dark:text-amber-100/70">
                                                {t.contact.officeAddress}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="group flex items-start gap-4 transition-all duration-200 hover:scale-[1.03] ltr:hover:translate-x-2 rtl:hover:-translate-x-2">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:bg-amber-900/40 dark:text-amber-300">
                                            <Phone className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p className="font-semibold text-[#1b1b18] dark:text-amber-100">
                                                {t.contact.mobile}
                                            </p>
                                            <a
                                                href={`tel:${SITE.phone}`}
                                                title={`${t.contact.mobile}: ${SITE.phoneDisplay}`}
                                                dir="ltr"
                                                className="mt-1 block text-[#4a4a45] hover:text-amber-700 dark:text-amber-100/70 dark:hover:text-amber-300"
                                            >
                                                {SITE.phoneDisplay}
                                            </a>
                                        </div>
                                    </li>
                                    <li className="group flex items-start gap-4 transition-all duration-200 hover:scale-[1.03] ltr:hover:translate-x-2 rtl:hover:-translate-x-2">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:bg-amber-900/40 dark:text-amber-300">
                                            <PhoneCall className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p className="font-semibold text-[#1b1b18] dark:text-amber-100">
                                                {t.contact.landline}
                                            </p>
                                            <a
                                                href={`tel:${SITE.landline}`}
                                                title={`${t.contact.landline}: ${SITE.landlineDisplay}`}
                                                dir="ltr"
                                                className="mt-1 block text-[#4a4a45] hover:text-amber-700 dark:text-amber-100/70 dark:hover:text-amber-300"
                                            >
                                                {SITE.landlineDisplay}
                                            </a>
                                        </div>
                                    </li>
                                    <li className="group flex items-start gap-4 transition-all duration-200 hover:scale-[1.03] ltr:hover:translate-x-2 rtl:hover:-translate-x-2">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:bg-amber-900/40 dark:text-amber-300">
                                            <Mail className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p className="font-semibold text-[#1b1b18] dark:text-amber-100">
                                                {t.contact.email}
                                            </p>
                                            <a
                                                href="mailto:info@alnosoralzahabia.com"
                                                title={`${t.contact.email}: info@alnosoralzahabia.com`}
                                                className="mt-1 block text-[#4a4a45] hover:text-amber-700 dark:text-amber-100/70 dark:hover:text-amber-300"
                                            >
                                                info@alnosoralzahabia.com
                                            </a>
                                        </div>
                                    </li>
                                    <li className="group flex items-start gap-4 transition-all duration-200 hover:scale-[1.03] ltr:hover:translate-x-2 rtl:hover:-translate-x-2">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-transform group-hover:scale-110 group-hover:rotate-6 dark:bg-amber-900/40 dark:text-amber-300">
                                            <Clock className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p className="font-semibold text-[#1b1b18] dark:text-amber-100">
                                                {t.contact.hours}
                                            </p>
                                            <p className="mt-1 whitespace-pre-line text-[#4a4a45] dark:text-amber-100/70">
                                                {t.contact.hoursValue}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-3xl border border-amber-200/70 bg-gradient-to-br from-[#1b1b18] to-[#2a2218] p-8 text-amber-50 shadow-sm transition-transform hover:scale-[1.02] dark:border-amber-900/40">
                                <Building2 className="h-7 w-7 text-amber-400" />
                                <h3 className="mt-4 font-semibold">{t.contact.licenseHeading}</h3>
                                <p className="mt-2 whitespace-pre-line text-sm text-amber-100/80">
                                    {t.contact.licenseBody}
                                </p>
                                <p className="mt-3 text-xs text-amber-100/60">{t.contact.licenseNumber}</p>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <form
                                onSubmit={handleSubmit}
                                className="rounded-3xl border border-amber-200/70 bg-white p-8 shadow-sm dark:border-amber-900/40 dark:bg-[#161615]"
                            >
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-6 w-6 text-amber-600" />
                                    <h2 className="text-lg font-semibold text-[#1b1b18] dark:text-amber-100">
                                        {t.contact.formHeading}
                                    </h2>
                                </div>
                                <p className="mt-2 text-sm text-[#4a4a45] dark:text-amber-100/70">
                                    {t.contact.formLead}{' '}
                                    <a
                                        href="mailto:info@alnosoralzahabia.com"
                                        title={`${t.contact.email}: info@alnosoralzahabia.com`}
                                        className="font-semibold text-amber-700 hover:underline dark:text-amber-300"
                                    >
                                        info@alnosoralzahabia.com
                                    </a>
                                    .
                                </p>

                                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                    <Field label={t.contact.fullName} required error={form.errors.name}>
                                        <input
                                            required
                                            type="text"
                                            value={form.data.name}
                                            onChange={(e) => form.setData('name', e.target.value)}
                                            className={inputClass}
                                            placeholder={t.contact.namePlaceholder}
                                        />
                                    </Field>
                                    <Field label={t.contact.phone} required error={form.errors.phone}>
                                        <input
                                            required
                                            type="tel"
                                            value={form.data.phone}
                                            onChange={(e) => form.setData('phone', e.target.value)}
                                            className={inputClass}
                                            placeholder={t.contact.phonePlaceholder}
                                        />
                                    </Field>
                                </div>

                                <Field label={t.contact.subject} required className="mt-5" error={form.errors.subject}>
                                    <select
                                        required
                                        value={form.data.subject}
                                        onChange={(e) => form.setData('subject', e.target.value)}
                                        className={inputClass}
                                    >
                                        {t.contact.subjects.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-amber-400 hover:to-amber-600 disabled:opacity-60 disabled:hover:scale-100"
                                >
                                    {form.processing ? '…' : t.contact.send}
                                    <Send className="h-4 w-4 rtl:-scale-x-100" />
                                </button>
                                {form.recentlySuccessful && (
                                    <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                        ✓ {t.contact.formLead.split('.')[0]}.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}

function Field({
    label,
    children,
    required,
    className,
    error,
}: {
    label: string;
    children: React.ReactNode;
    required?: boolean;
    className?: string;
    error?: string;
}) {
    return (
        <label className={`block ${className ?? ''}`}>
            <span className="text-sm font-semibold text-[#1b1b18] dark:text-amber-100">
                {label}
                {required && <span className="ms-1 text-amber-600">*</span>}
            </span>
            <div className="mt-2">{children}</div>
            {error && <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
        </label>
    );
}

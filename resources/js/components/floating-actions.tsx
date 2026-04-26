import { useForm } from '@inertiajs/react';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { useLocale } from '@/contexts/locale-context';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const WHATSAPP_NUMBER = '971526726662';

function WhatsAppIcon({ className, style }: { className?: string; style?: CSSProperties }) {
    return (
        <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            aria-hidden="true"
            fill="currentColor"
        >
            <path d="M16.001 3C9.374 3 4 8.373 4 14.998c0 2.378.674 4.69 1.953 6.69L4 29l7.5-1.92a12 12 0 0 0 4.5.91h.001c6.626 0 12-5.373 12-12s-5.374-12-12-12Zm0 21.998h-.001a9.97 9.97 0 0 1-4.077-.873l-.292-.13-4.45 1.139 1.187-4.336-.19-.302a9.97 9.97 0 0 1-1.5-5.498c0-5.514 4.485-9.998 10.323-9.998 2.667 0 5.176 1.04 7.064 2.928a9.93 9.93 0 0 1 2.926 7.07c0 5.514-4.485 9.998-9.99 9.998Zm5.475-7.46c-.301-.151-1.78-.879-2.055-.978-.276-.1-.477-.151-.677.151s-.777.978-.952 1.18c-.176.2-.352.226-.652.075-.301-.15-1.272-.469-2.422-1.495-.895-.798-1.5-1.785-1.676-2.087-.176-.301-.018-.464.132-.615.135-.135.301-.352.452-.527.151-.176.2-.302.301-.502.1-.2.05-.377-.025-.527-.075-.15-.677-1.633-.927-2.235-.245-.587-.494-.508-.677-.518l-.577-.01a1.11 1.11 0 0 0-.803.377c-.276.302-1.054 1.03-1.054 2.512 0 1.482 1.078 2.913 1.228 3.114.151.2 2.123 3.241 5.144 4.546.72.31 1.281.495 1.719.633.722.23 1.378.197 1.897.12.578-.087 1.78-.728 2.031-1.43.252-.703.252-1.305.176-1.43-.075-.126-.276-.2-.577-.352Z" />
        </svg>
    );
}

const inputClass =
    'mt-2 w-full rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm text-[#1b1b18] placeholder:text-[#4a4a45]/50 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-amber-900/40 dark:bg-[#0f0f0e] dark:text-amber-100 dark:placeholder:text-amber-100/30';

export default function FloatingActions() {
    const { t, dir } = useLocale();
    const isRtl = dir === 'rtl';
    const [open, setOpen] = useState(false);
    const form = useForm({
        source: 'consultation',
        name: '',
        phone: '',
        subject: t.floating.subjects[0],
    });

    useEffect(() => {
        if (!open) return;
        if (form.data.subject === '' || !t.floating.subjects.includes(form.data.subject)) {
            form.setData('subject', t.floating.subjects[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, t]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        form.post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('name', 'phone');
                setOpen(false);
            },
        });
    }

    return (
        <>
            <div className="group fixed bottom-6 left-6 z-40 h-14 w-14">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full bg-emerald-400/60"
                    style={{ animation: 'var(--animate-glow-ring)' }}
                />
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full bg-emerald-400/40"
                    style={{ animation: 'var(--animate-glow-ring)', animationDelay: '0.9s' }}
                />
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 ring-4 ring-white/40 transition-transform duration-300 hover:scale-125 hover:rotate-6 active:scale-90"
                    style={{ animation: 'var(--animate-bob)' }}
                >
                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                        style={{ animation: 'var(--animate-shimmer)' }}
                    />
                    <WhatsAppIcon
                        className="relative h-7 w-7"
                        style={{ animation: 'var(--animate-wiggle)', transformOrigin: 'center' }}
                    />
                    <span
                        aria-hidden
                        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center"
                    >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
                    </span>
                </a>
                <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-[#1b1b18] px-2.5 py-1 text-[11px] font-semibold text-emerald-300 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    Chat now
                </span>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        aria-label={t.floating.consultBtn}
                        className={`group fixed top-1/2 z-40 flex -translate-y-1/2 items-center gap-2 overflow-hidden bg-gradient-to-b from-amber-500 to-amber-700 px-3 py-5 text-sm font-semibold text-white shadow-lg shadow-amber-900/30 ring-1 ring-amber-300/40 transition-all duration-300 hover:-translate-y-1/2 hover:scale-110 hover:from-amber-400 hover:to-amber-600 hover:shadow-2xl hover:shadow-amber-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                            isRtl ? 'left-0 rounded-r-xl hover:pl-5' : 'right-0 rounded-l-xl hover:pr-5'
                        }`}
                        style={{ writingMode: 'vertical-rl', animation: 'var(--animate-attention)' }}
                    >
                        <span
                            aria-hidden
                            className={`pointer-events-none absolute inset-0 -z-10 bg-amber-300/40 blur-md ${
                                isRtl ? 'rounded-r-xl' : 'rounded-l-xl'
                            }`}
                            style={{ animation: 'var(--animate-pulse-soft)' }}
                        />
                        <span
                            aria-hidden
                            className={`pointer-events-none absolute inset-0 overflow-hidden ${
                                isRtl ? 'rounded-r-xl' : 'rounded-l-xl'
                            }`}
                        >
                            <span
                                className="absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                style={{ animation: 'var(--animate-shimmer)', animationDuration: '3.4s' }}
                            />
                        </span>
                        <Sparkles
                            className="h-4 w-4 text-amber-100 drop-shadow"
                            style={{ writingMode: 'horizontal-tb', animation: 'var(--animate-twinkle)' }}
                        />
                        <span className="relative">{t.floating.consultBtn}</span>
                        <span
                            aria-hidden
                            className={`absolute -top-1.5 flex h-3.5 w-3.5 items-center justify-center ${
                                isRtl ? '-right-1.5' : '-left-1.5'
                            }`}
                            style={{ writingMode: 'horizontal-tb' }}
                        >
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-80" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-200 ring-2 ring-amber-600" />
                        </span>
                    </button>
                </DialogTrigger>
                <DialogContent className="border-amber-200/70 bg-[#FBF7EF] p-0 sm:max-w-md dark:border-amber-900/40 dark:bg-[#161615]">
                    <div className="rounded-t-lg bg-gradient-to-br from-amber-500 to-amber-700 p-6 text-white">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl text-white">
                                <Sparkles className="h-5 w-5" />
                                {t.floating.consultTitle}
                            </DialogTitle>
                            <DialogDescription className="text-amber-50/90">
                                {t.floating.consultLead}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5 p-6">
                        <label className="block">
                            <span className="text-sm font-semibold text-[#1b1b18] dark:text-amber-100">
                                {t.floating.fullName} <span className="text-amber-600">*</span>
                            </span>
                            <input
                                required
                                type="text"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder={t.floating.namePlaceholder}
                                className={inputClass}
                            />
                            {form.errors.name && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{form.errors.name}</p>
                            )}
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-[#1b1b18] dark:text-amber-100">
                                {t.floating.phone} <span className="text-amber-600">*</span>
                            </span>
                            <input
                                required
                                type="tel"
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                placeholder={t.floating.phonePlaceholder}
                                className={inputClass}
                            />
                            {form.errors.phone && (
                                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{form.errors.phone}</p>
                            )}
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-[#1b1b18] dark:text-amber-100">
                                {t.floating.subject} <span className="text-amber-600">*</span>
                            </span>
                            <select
                                required
                                value={form.data.subject}
                                onChange={(e) => form.setData('subject', e.target.value)}
                                className={inputClass}
                            >
                                {t.floating.subjects.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="flex items-center justify-between gap-3 pt-2">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                            >
                                <MessageSquare className="h-4 w-4" />
                                {t.floating.whatsappLink}
                            </a>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-amber-400 hover:to-amber-600 disabled:opacity-60 disabled:hover:scale-100"
                            >
                                {form.processing ? '…' : t.floating.send}
                                <Send className="h-4 w-4 rtl:-scale-x-100" />
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

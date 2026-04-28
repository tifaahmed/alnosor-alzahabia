import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function FormField({
    label,
    htmlFor,
    error,
    hint,
    className,
    children,
}: {
    label?: string;
    htmlFor?: string;
    error?: string;
    hint?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn('grid gap-1.5', className)}>
            {label && <Label htmlFor={htmlFor}>{label}</Label>}
            {children}
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
            <InputError message={error} />
        </div>
    );
}

export function BilingualField({
    label,
    field,
    value,
    onChange,
    errors,
    multiline = false,
    rows = 4,
}: {
    label: string;
    field: string;
    value: { ar: string; en: string };
    onChange: (next: { ar: string; en: string }) => void;
    errors: Partial<Record<string, string>>;
    multiline?: boolean;
    rows?: number;
}) {
    const renderInput = (lang: 'ar' | 'en') => {
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        const v = value[lang];
        const onLangChange = (next: string) => onChange({ ...value, [lang]: next });

        if (multiline) {
            return (
                <textarea
                    dir={dir}
                    rows={rows}
                    value={v}
                    onChange={(e) => onLangChange(e.target.value)}
                    className="rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                />
            );
        }

        return (
            <Input
                dir={dir}
                value={v}
                onChange={(e) => onLangChange(e.target.value)}
            />
        );
    };

    return (
        <div className="grid gap-2 rounded-md border border-sidebar-border/70 p-3 dark:border-sidebar-border">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
            <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-1">
                    <Label className="text-xs">Arabic</Label>
                    {renderInput('ar')}
                    <InputError message={errors[`${field}.ar`]} />
                </div>
                <div className="grid gap-1">
                    <Label className="text-xs">English</Label>
                    {renderInput('en')}
                    <InputError message={errors[`${field}.en`]} />
                </div>
            </div>
        </div>
    );
}

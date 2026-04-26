import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { translations, type Locale, type Translations } from '@/lib/i18n';

type LocaleContextValue = {
    locale: Locale;
    setLocale: (l: Locale) => void;
    toggleLocale: () => void;
    t: Translations;
    dir: 'ltr' | 'rtl';
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'alnosor.locale';

function readInitialLocale(): Locale {
    if (typeof window === 'undefined') return 'ar';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'ar' ? stored : 'ar';
}

export function LocaleProvider({ children }: PropsWithChildren) {
    const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, locale);
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }, [locale]);

    const value = useMemo<LocaleContextValue>(
        () => ({
            locale,
            setLocale: setLocaleState,
            toggleLocale: () => setLocaleState((prev) => (prev === 'ar' ? 'en' : 'ar')),
            t: translations[locale],
            dir: locale === 'ar' ? 'rtl' : 'ltr',
        }),
        [locale],
    );

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
    const ctx = useContext(LocaleContext);
    if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
    return ctx;
}

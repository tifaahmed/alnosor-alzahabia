import { Head, usePage } from '@inertiajs/react';
import { useLocale } from '@/contexts/locale-context';
import { SITE } from '@/lib/i18n';

type SeoProps = {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    type?: 'website' | 'article' | 'profile';
    structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

type SiteSharedProps = {
    site?: {
        url?: string;
        currentUrl?: string;
        path?: string;
    };
};

export default function Seo({
    title,
    description,
    keywords,
    image,
    type = 'website',
    structuredData,
}: SeoProps) {
    const { locale } = useLocale();
    const page = usePage<SiteSharedProps>();
    const baseUrl = (page.props.site?.url ?? '').replace(/\/$/, '');
    const currentUrl = page.props.site?.currentUrl ?? baseUrl;
    const path = page.props.site?.path ?? '/';
    const imagePath = image ?? SITE.logo;
    const absoluteImage = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
    const altLocale = locale === 'ar' ? 'en' : 'ar';
    const ogLocale = locale === 'ar' ? 'ar_AE' : 'en_US';
    const ogLocaleAlt = altLocale === 'ar' ? 'ar_AE' : 'en_US';

    const structuredArray = structuredData
        ? Array.isArray(structuredData)
            ? structuredData
            : [structuredData]
        : [];

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={SITE.name} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="theme-color" content="#D4A437" />

            <link rel="canonical" href={currentUrl} />
            <link rel="alternate" hrefLang={locale} href={currentUrl} />
            <link rel="alternate" hrefLang={altLocale} href={currentUrl} />
            <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${path}`} />

            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:image:alt" content={SITE.name} />
            <meta property="og:site_name" content={SITE.name} />
            <meta property="og:locale" content={ogLocale} />
            <meta property="og:locale:alternate" content={ogLocaleAlt} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />
            <meta name="twitter:image:alt" content={SITE.name} />

            {structuredArray.map((schema, idx) => (
                <script
                    key={`ld-${idx}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </Head>
    );
}

export function organizationSchema(baseUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#organization`,
        name: SITE.name,
        alternateName: SITE.nameAr,
        url: baseUrl,
        logo: `${baseUrl}${SITE.logo}`,
        image: `${baseUrl}${SITE.logo}`,
        telephone: [SITE.phone, SITE.landline],
        email: SITE.email,
        foundingDate: SITE.foundingDate,
        address: {
            '@type': 'PostalAddress',
            streetAddress: SITE.streetAddressEn,
            addressLocality: SITE.locality,
            addressCountry: SITE.countryCode,
        },
        sameAs: [],
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                opens: '09:00',
                closes: '18:00',
            },
        ],
        identifier: {
            '@type': 'PropertyValue',
            name: 'License Number',
            value: SITE.licenseNumber,
        },
    };
}

export function websiteSchema(baseUrl: string, locale: 'en' | 'ar') {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: SITE.name,
        inLanguage: locale === 'ar' ? 'ar-AE' : 'en-US',
        publisher: { '@id': `${baseUrl}/#organization` },
    };
}

export function breadcrumbSchema(baseUrl: string, items: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: it.name,
            item: `${baseUrl}${it.path}`,
        })),
    };
}

export function serviceSchema(baseUrl: string, name: string, description: string, slug: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url: `${baseUrl}/services/${slug}`,
        provider: { '@id': `${baseUrl}/#organization` },
        areaServed: [
            { '@type': 'Country', name: 'United Arab Emirates' },
            { '@type': 'Place', name: 'Gulf Cooperation Council' },
        ],
    };
}

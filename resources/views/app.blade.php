@php
    $siteName = 'Al Nosor Al Zahabia FZE LLC';
    $siteDescription = 'Al Nosor Al Zahabia FZE LLC — a licensed Ajman Free Zone company supplying construction materials, interior design, project management, equipment rental and event services across the UAE.';
    $siteUrl = config('app.url');
    $currentUrl = url()->current();
    $logoPath = '/images/logos/logo-without-background.png';
    $absoluteLogo = $siteUrl . $logoPath;
@endphp
<!DOCTYPE html>
<html lang="ar" dir="rtl" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Default SEO (overridden per-page by Inertia <Seo> component) --}}
        <meta name="description" content="{{ $siteDescription }}">
        <meta name="author" content="{{ $siteName }}">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="theme-color" content="#D4A437">
        <meta name="format-detection" content="telephone=yes">
        <link rel="canonical" href="{{ $currentUrl }}">

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="{{ $siteName }}">
        <meta property="og:title" content="{{ $siteName }} — Trading, Construction & Project Services in Ajman">
        <meta property="og:description" content="{{ $siteDescription }}">
        <meta property="og:url" content="{{ $currentUrl }}">
        <meta property="og:image" content="{{ $absoluteLogo }}">
        <meta property="og:locale" content="ar_AE">
        <meta property="og:locale:alternate" content="en_US">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $siteName }}">
        <meta name="twitter:description" content="{{ $siteDescription }}">
        <meta name="twitter:image" content="{{ $absoluteLogo }}">

        {{-- Organization / LocalBusiness JSON-LD --}}
        <script type="application/ld+json">
        {!! json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            '@id' => $siteUrl . '/#organization',
            'name' => $siteName,
            'alternateName' => 'النسور الذهبية',
            'url' => $siteUrl,
            'logo' => $absoluteLogo,
            'image' => $absoluteLogo,
            'telephone' => '+971526726662',
            'email' => 'info@alnosoralzahabia.com',
            'foundingDate' => '2025-08-14',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'Sheikh Khalifa Street, Amber Gem Tower, 24th Floor',
                'addressLocality' => 'Ajman',
                'addressCountry' => 'AE',
            ],
            'openingHoursSpecification' => [[
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                'opens' => '09:00',
                'closes' => '18:00',
            ]],
            'identifier' => [
                '@type' => 'PropertyValue',
                'name' => 'License Number',
                'value' => '262393310888',
            ],
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
        </script>

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" type="image/png" href="/images/logos/logo-without-background.png">
        <link rel="apple-touch-icon" href="/images/logos/logo-without-background.png">

        @if (($page['component'] ?? '') === 'home')
        <link rel="preload" as="image" href="/images/services/General%20Home%20Maintenance.webp" type="image/webp">
        @endif

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>

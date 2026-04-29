<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $sourceLabel }} — {{ $subjectLine }}</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #f5f0e8;
            padding: 32px 16px;
            color: #1b1b18;
        }
        .wrapper { max-width: 580px; margin: 0 auto; }

        /* Header */
        .header {
            background: linear-gradient(135deg, #1b1b18 0%, #2d2a20 50%, #1b1b18 100%);
            border-radius: 16px 16px 0 0;
            padding: 28px 32px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(180,83,9,0.15) 0%, rgba(245,158,11,0.1) 50%, rgba(180,83,9,0.15) 100%);
        }
        .header-brand {
            position: relative;
            display: inline-block;
        }
        .header-brand-name {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(to bottom, #fcd34d, #d97706, #92400e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .header-brand-sub {
            font-size: 10px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #d97706;
            margin-top: 4px;
        }
        .header-divider {
            width: 48px;
            height: 2px;
            background: linear-gradient(to right, transparent, #d97706, transparent);
            margin: 16px auto;
        }
        .header-badge {
            display: inline-block;
            background: rgba(217,119,6,0.2);
            border: 1px solid rgba(217,119,6,0.4);
            color: #fbbf24;
            font-size: 11px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            padding: 5px 14px;
            border-radius: 999px;
        }

        /* Body card */
        .card {
            background: #ffffff;
            border: 1px solid #fde68a;
            border-top: none;
            padding: 32px;
        }
        .card-title {
            font-size: 20px;
            font-weight: 700;
            color: #1b1b18;
            margin-bottom: 4px;
        }
        .card-subtitle {
            font-size: 13px;
            color: #78716c;
        }
        .divider {
            border: none;
            border-top: 1px solid #fde68a;
            margin: 24px 0;
        }

        /* Fields */
        .field { margin-bottom: 20px; }
        .field-label {
            font-size: 10px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #b45309;
            font-weight: 600;
            margin-bottom: 6px;
        }
        .field-value {
            font-size: 15px;
            color: #1b1b18;
            background: #fffbf0;
            border: 1px solid #fde68a;
            border-radius: 8px;
            padding: 10px 14px;
            word-break: break-word;
            line-height: 1.6;
        }
        .field-value.message {
            white-space: pre-wrap;
            min-height: 80px;
            align-items: flex-start;
        }
        .field-value a { color: #b45309; text-decoration: none; }

        /* CTA */
        .cta-row { text-align: center; margin: 28px 0 0; }
        .cta-btn {
            display: inline-block;
            background: linear-gradient(to bottom, #f59e0b, #b45309);
            color: #ffffff !important;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 12px 28px;
            border-radius: 999px;
            letter-spacing: 0.02em;
        }

        /* Footer */
        .footer-card {
            background: #1b1b18;
            border-radius: 0 0 16px 16px;
            padding: 20px 32px;
            text-align: center;
        }
        .footer-text {
            font-size: 12px;
            color: rgba(251,191,36,0.6);
        }
        .footer-text a { color: #fbbf24; text-decoration: none; }
        .footer-links {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            gap: 16px;
        }
        .footer-links a {
            font-size: 11px;
            color: rgba(251,191,36,0.5);
            text-decoration: none;
        }
        .footer-links a:hover { color: #fbbf24; }
    </style>
</head>
<body>
<div class="wrapper">

    <!-- Header -->
    <div class="header">
        <div class="header-brand">
            <div class="header-brand-name">Al Nosor Al Zahabia</div>
            <div class="header-brand-sub">FZE LLC · Ajman · UAE</div>
        </div>
        <div class="header-divider"></div>
        <span class="header-badge">New Inquiry — {{ $sourceLabel }}</span>
    </div>

    <!-- Body -->
    <div class="card">
        <div class="card-title">{{ $subjectLine }}</div>
        <div class="card-subtitle">Received {{ now()->format('D, d M Y · H:i') }} (UAE time)</div>

        <hr class="divider">

        <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">{{ $name }}</div>
        </div>

        <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value">
                <a href="tel:{{ $phone }}">{{ $phone }}</a>
            </div>
        </div>

        @if (!empty($email))
        <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">
                <a href="mailto:{{ $email }}">{{ $email }}</a>
            </div>
        </div>
        @endif

        @if (!empty($body))
        <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value message">{{ $body }}</div>
        </div>
        @endif

        <hr class="divider">

        <div class="cta-row">
            @if (!empty($email))
                <a href="mailto:{{ $email }}?subject=Re: {{ $subjectLine }}" class="cta-btn">Reply to {{ $name }}</a>
            @else
                <a href="tel:{{ $phone }}" class="cta-btn">Call {{ $name }}</a>
            @endif
        </div>
    </div>

    <!-- Footer -->
    <div class="footer-card">
        <div class="footer-text">
            Sent from <a href="{{ config('app.url') }}">{{ config('app.name') }}</a> website contact form
        </div>
        <div class="footer-links">
            <a href="{{ config('app.url') }}">Website</a>
            <a href="{{ config('app.url') }}/contact">Contact Page</a>
            <a href="{{ config('app.url') }}/services">Services</a>
        </div>
    </div>

</div>
</body>
</html>

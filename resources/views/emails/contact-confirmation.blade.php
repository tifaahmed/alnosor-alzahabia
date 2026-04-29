<!DOCTYPE html>
<html lang="{{ app()->getLocale() === 'ar' ? 'ar' : 'en' }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>We received your message — Al Nosor Al Zahabia</title>
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
            padding: 36px 32px;
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
        .header-brand-name {
            position: relative;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(to bottom, #fcd34d, #d97706, #92400e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .header-brand-ar {
            position: relative;
            font-size: 16px;
            color: rgba(251,191,36,0.7);
            margin-top: 4px;
            font-family: "Segoe UI", Tahoma, Arial, sans-serif;
        }
        .header-brand-sub {
            position: relative;
            font-size: 10px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: #d97706;
            margin-top: 6px;
        }
        .header-divider {
            width: 48px;
            height: 2px;
            background: linear-gradient(to right, transparent, #d97706, transparent);
            margin: 20px auto;
        }
        .checkmark {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(to bottom, #f59e0b, #b45309);
            color: #fff;
            font-size: 26px;
            margin-bottom: 16px;
        }
        .header-title {
            position: relative;
            font-size: 20px;
            font-weight: 700;
            color: #fef3c7;
            margin-bottom: 6px;
        }
        .header-subtitle {
            position: relative;
            font-size: 13px;
            color: rgba(251,191,36,0.6);
        }

        /* Body */
        .card {
            background: #ffffff;
            border: 1px solid #fde68a;
            border-top: none;
            padding: 32px;
        }
        .greeting {
            font-size: 16px;
            color: #1b1b18;
            margin-bottom: 16px;
            line-height: 1.7;
        }
        .greeting strong { color: #b45309; }
        .body-text {
            font-size: 14px;
            color: #44403c;
            line-height: 1.75;
            margin-bottom: 20px;
        }
        .divider { border: none; border-top: 1px solid #fde68a; margin: 24px 0; }

        /* Summary box */
        .summary {
            background: #fffbf0;
            border: 1px solid #fde68a;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .summary-label {
            font-size: 10px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #b45309;
            font-weight: 600;
            margin-bottom: 12px;
        }
        .summary-row {
            display: flex;
            gap: 8px;
            margin-bottom: 8px;
            font-size: 14px;
        }
        .summary-key { color: #78716c; min-width: 80px; }
        .summary-val { color: #1b1b18; font-weight: 500; word-break: break-word; }

        /* Contact info */
        .contact-box {
            background: #1b1b18;
            border-radius: 12px;
            padding: 20px 24px;
            margin-bottom: 24px;
        }
        .contact-box-title {
            font-size: 12px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #d97706;
            font-weight: 600;
            margin-bottom: 14px;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            color: rgba(251,191,36,0.85);
        }
        .contact-item:last-child { margin-bottom: 0; }
        .contact-item a { color: #fbbf24; text-decoration: none; }

        /* CTA */
        .cta-row { text-align: center; margin: 4px 0 20px; }
        .cta-btn {
            display: inline-block;
            background: linear-gradient(to bottom, #f59e0b, #b45309);
            color: #ffffff !important;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 13px 32px;
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
        .footer-text { font-size: 12px; color: rgba(251,191,36,0.5); }
        .footer-text a { color: #fbbf24; text-decoration: none; }
        .footer-links {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            gap: 16px;
        }
        .footer-links a { font-size: 11px; color: rgba(251,191,36,0.5); text-decoration: none; }
    </style>
</head>
<body>
<div class="wrapper">

    <!-- Header -->
    <div class="header">
        <div class="header-brand-name">Al Nosor Al Zahabia</div>
        <div class="header-brand-ar">النسور الذهبية</div>
        <div class="header-brand-sub">FZE LLC · Ajman · UAE</div>
        <div class="header-divider"></div>
        <div class="checkmark">✓</div>
        <div class="header-title">Message Received!</div>
        <div class="header-subtitle">We'll be in touch with you shortly</div>
    </div>

    <!-- Body -->
    <div class="card">
        <p class="greeting">Dear <strong>{{ $name }}</strong>,</p>
        <p class="body-text">
            Thank you for reaching out to <strong>Al Nosor Al Zahabia FZE LLC</strong>. We have successfully received your inquiry and one of our team members will contact you as soon as possible.
        </p>

        <div class="summary">
            <div class="summary-label">Your Inquiry Summary</div>
            <div class="summary-row">
                <span class="summary-key">Subject</span>
                <span class="summary-val">{{ $subjectLine }}</span>
            </div>
            <div class="summary-row">
                <span class="summary-key">Phone</span>
                <span class="summary-val">{{ $phone }}</span>
            </div>
            @if (!empty($body))
            <div class="summary-row">
                <span class="summary-key">Message</span>
                <span class="summary-val">{{ Str::limit($body, 200) }}</span>
            </div>
            @endif
        </div>

        <p class="body-text">
            If you need immediate assistance, please don't hesitate to contact us directly:
        </p>

        <div class="contact-box">
            <div class="contact-box-title">Contact Us Directly</div>
            <div class="contact-item">
                📞 <a href="tel:+971505873736">+971 50 587 3736</a>
            </div>
            <div class="contact-item">
                ☎️ <a href="tel:+97167461299">+971 6 746 1299</a>
            </div>
            <div class="contact-item">
                ✉️ <a href="mailto:info@alnosoralzahabia.com">info@alnosoralzahabia.com</a>
            </div>
            <div class="contact-item">
                📍 Ajman Free Zone, Ajman, UAE
            </div>
        </div>

        <hr class="divider">

        <div class="cta-row">
            <a href="{{ config('app.url') }}/services" class="cta-btn">Explore Our Services</a>
        </div>

        <p class="body-text" style="text-align:center; color:#78716c; font-size:13px;">
            Our team is available Sunday – Thursday, 9:00 AM – 6:00 PM (UAE time).
        </p>
    </div>

    <!-- Footer -->
    <div class="footer-card">
        <div class="footer-text">
            © {{ date('Y') }} <a href="{{ config('app.url') }}">Al Nosor Al Zahabia FZE LLC</a> · All rights reserved
        </div>
        <div class="footer-links">
            <a href="{{ config('app.url') }}">Home</a>
            <a href="{{ config('app.url') }}/services">Services</a>
            <a href="{{ config('app.url') }}/contact">Contact</a>
        </div>
    </div>

</div>
</body>
</html>

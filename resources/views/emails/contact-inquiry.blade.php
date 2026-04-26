<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $sourceLabel }} — {{ $subjectLine }}</title>
    <style>
        body { font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1b1b18; background: #FBF7EF; padding: 24px; }
        .card { max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #fde68a; border-radius: 16px; padding: 28px; }
        h1 { color: #b45309; font-size: 18px; margin: 0 0 4px; }
        .badge { display: inline-block; background: #fef3c7; color: #92400e; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; }
        dt { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #92400e; margin-top: 16px; }
        dd { margin: 4px 0 0; font-size: 15px; color: #1b1b18; word-break: break-word; }
        .msg { white-space: pre-wrap; }
        .footer { color: #6b6b66; font-size: 12px; margin-top: 24px; text-align: center; }
    </style>
</head>
<body>
    <div class="card">
        <span class="badge">{{ $sourceLabel }}</span>
        <h1 style="margin-top: 12px;">{{ $subjectLine }}</h1>
        <dl>
            <dt>Name</dt>
            <dd>{{ $name }}</dd>
            <dt>Phone</dt>
            <dd>{{ $phone }}</dd>
            @if (! empty($email))
                <dt>Email</dt>
                <dd>{{ $email }}</dd>
            @endif
            @if (! empty($body))
                <dt>Message</dt>
                <dd class="msg">{{ $body }}</dd>
            @endif
        </dl>
    </div>
    <p class="footer">Sent from {{ config('app.name') }} website · {{ now()->toDayDateTimeString() }}</p>
</body>
</html>

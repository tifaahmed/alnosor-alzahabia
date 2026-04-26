<?php

namespace App\Http\Controllers;

use App\Mail\ContactInquiryMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function send(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'source' => ['nullable', 'string', 'max:64'],
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:40'],
            'subject' => ['required', 'string', 'max:200'],
            'email' => ['nullable', 'email', 'max:200'],
            'message' => ['nullable', 'string', 'max:4000'],
        ]);

        $to = config('mail.contact_to', config('mail.from.address'));
        $sourceLabel = match ($data['source'] ?? '') {
            'consultation' => 'Free Consultation',
            default => 'Website Contact',
        };

        Mail::to($to)->send(new ContactInquiryMail(
            sourceLabel: $sourceLabel,
            name: $data['name'],
            phone: $data['phone'],
            subjectLine: $data['subject'],
            email: $data['email'] ?? null,
            body: $data['message'] ?? null,
        ));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Message sent. We will get back to you shortly.']);

        return back();
    }
}

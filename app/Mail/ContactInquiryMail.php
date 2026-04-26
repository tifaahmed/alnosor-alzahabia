<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactInquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $sourceLabel,
        public string $name,
        public string $phone,
        public string $subjectLine,
        public ?string $email = null,
        public ?string $body = null,
    ) {}

    public function envelope(): Envelope
    {
        $envelope = new Envelope(
            subject: '['.$this->sourceLabel.'] '.$this->subjectLine,
        );

        if ($this->email) {
            $envelope->replyTo = [new Address($this->email, $this->name)];
        }

        return $envelope;
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-inquiry',
        );
    }
}

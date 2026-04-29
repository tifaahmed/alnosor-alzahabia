<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(): Response
    {
        $messages = ContactMessage::orderByDesc('created_at')
            ->get()
            ->map(fn ($m) => [
                'id' => $m->id,
                'source' => $m->source,
                'name' => $m->name,
                'phone' => $m->phone,
                'subject' => $m->subject,
                'email' => $m->email,
                'message' => $m->message,
                'read' => $m->read,
                'created_at' => $m->created_at->toDateTimeString(),
            ]);

        return Inertia::render('dashboard/contact-messages', [
            'messages' => $messages,
            'unread_count' => ContactMessage::where('read', false)->count(),
        ]);
    }

    public function markRead(ContactMessage $message): RedirectResponse
    {
        $message->update(['read' => true]);

        return back();
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Message deleted.']);

        return back();
    }
}

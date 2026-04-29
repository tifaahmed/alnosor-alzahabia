import { Head, router } from '@inertiajs/react';
import { Mail, MailOpen, Phone, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ContactMessage = {
    id: number;
    source: string;
    name: string;
    phone: string;
    subject: string;
    email: string | null;
    message: string | null;
    read: boolean;
    created_at: string;
};

export default function ContactMessages({
    messages,
    unread_count,
}: {
    messages: ContactMessage[];
    unread_count: number;
}) {
    const handleMarkRead = (msg: ContactMessage) => {
        if (msg.read) return;
        router.patch(`/dashboard/contacts/${msg.id}/read`, {}, { preserveScroll: true });
    };

    const handleDelete = (msg: ContactMessage) => {
        if (!confirm(`Delete message from "${msg.name}"?`)) return;
        router.delete(`/dashboard/contacts/${msg.id}`, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Contact Messages" />

            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <Heading
                        title="Contact Messages"
                        description={`${messages.length} total${unread_count > 0 ? ` — ${unread_count} unread` : ''}`}
                    />
                </div>

                {messages.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-sidebar-border/70 p-12 text-center text-muted-foreground dark:border-sidebar-border">
                        No messages yet.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`rounded-xl border p-5 transition-colors ${
                                    msg.read
                                        ? 'border-sidebar-border/50 bg-background'
                                        : 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/20'
                                }`}
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        {msg.read ? (
                                            <MailOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        ) : (
                                            <Mail className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                        )}
                                        <span className="font-semibold text-foreground">{msg.name}</span>
                                        {!msg.read && (
                                            <Badge variant="outline" className="border-amber-400 text-amber-700 dark:text-amber-300">
                                                New
                                            </Badge>
                                        )}
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(msg.created_at).toLocaleString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        {!msg.read && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleMarkRead(msg)}
                                            >
                                                Mark read
                                            </Button>
                                        )}
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(msg)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                <p className="mt-3 font-medium text-foreground">{msg.subject}</p>

                                {msg.message && (
                                    <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{msg.message}</p>
                                )}

                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="h-3.5 w-3.5" />
                                        <a href={`tel:${msg.phone}`} className="hover:text-foreground">
                                            {msg.phone}
                                        </a>
                                    </span>
                                    {msg.email && (
                                        <span className="flex items-center gap-1.5">
                                            <Mail className="h-3.5 w-3.5" />
                                            <a href={`mailto:${msg.email}`} className="hover:text-foreground">
                                                {msg.email}
                                            </a>
                                        </span>
                                    )}
                                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
                                        {msg.source}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

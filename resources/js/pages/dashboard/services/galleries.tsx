import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, ImageIcon, Plus, Trash2, Video } from 'lucide-react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import servicesRoutes from '@/routes/dashboard/services';
import galleriesRoutes from '@/routes/dashboard/services/galleries';

type Translatable = { ar?: string; en?: string };

type Service = { id: number; slug: string; title: Translatable };

type Gallery = {
    id: number;
    media_path: string;
    media_type: 'image' | 'video';
    caption: Translatable;
    sort: number;
};

type FormData = {
    media: File | null;
    caption: { ar: string; en: string };
};

const emptyForm: FormData = {
    media: null,
    caption: { ar: '', en: '' },
};

export default function ServiceGalleriesIndex({
    service,
    galleries,
}: {
    service: Service;
    galleries: Gallery[];
}) {
    const [createOpen, setCreateOpen] = useState(false);
    const title = service.title.en || service.title.ar || service.slug;

    const handleDelete = (g: Gallery) => {
        if (!confirm('Delete this gallery item?')) return;
        router.delete(galleriesRoutes.destroy([service.id, g.id]).url, { preserveScroll: true });
    };

    return (
        <>
            <Head title={`Galleries — ${title}`} />

            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-1">
                            <Link href={servicesRoutes.index().url}>
                                <ArrowLeft className="h-3.5 w-3.5" /> All services
                            </Link>
                        </Button>
                        <Heading title={`${title} — Galleries`} description="Add images or videos for this service. They appear on the public service page." />
                    </div>
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="h-4 w-4" /> Add Media
                    </Button>
                </div>

                {galleries.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-sidebar-border/70 p-12 text-center text-muted-foreground dark:border-sidebar-border">
                        No gallery items yet. Add the first one.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                        {galleries.map((g) => (
                            <GalleryCard key={g.id} item={g} onDelete={() => handleDelete(g)} />
                        ))}
                    </div>
                )}
            </div>

            <CreateDialog open={createOpen} onClose={() => setCreateOpen(false)} serviceId={service.id} />
        </>
    );
}

function GalleryCard({ item, onDelete }: { item: Gallery; onDelete: () => void }) {
    const captionAr = item.caption.ar;
    const captionEn = item.caption.en;
    return (
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
            <div className="relative aspect-square bg-muted">
                {item.media_type === 'video' ? (
                    <>
                        <video src={item.media_path} className="absolute inset-0 h-full w-full object-cover" muted playsInline preload="metadata" />
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                            <Video className="h-3 w-3" /> Video
                        </span>
                    </>
                ) : (
                    <>
                        <img src={item.media_path} alt={captionEn ?? captionAr ?? ''} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                            <ImageIcon className="h-3 w-3" /> Photo
                        </span>
                    </>
                )}
            </div>
            <div className="space-y-1 p-3 text-xs">
                {captionEn && <div className="font-medium text-foreground line-clamp-2">{captionEn}</div>}
                {captionAr && <div className="text-muted-foreground line-clamp-2" dir="rtl">{captionAr}</div>}
                <div className="flex justify-end pt-1">
                    <Button size="icon" variant="ghost" onClick={onDelete}>
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function CreateDialog({ open, onClose, serviceId }: { open: boolean; onClose: () => void; serviceId: number }) {
    const form = useForm<FormData>(emptyForm);
    const errors = form.errors as unknown as Partial<Record<string, string>>;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(galleriesRoutes.store(serviceId).url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Gallery Item</DialogTitle>
                    <DialogDescription>Upload an image or video. Caption is optional.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                    <div className="grid gap-1.5">
                        <Label htmlFor="media">Media (image or video)</Label>
                        <Input
                            id="media"
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => form.setData('media', e.target.files?.[0] ?? null)}
                        />
                        <InputError message={errors.media} />
                    </div>
                    <div className="grid gap-2 rounded-md border border-sidebar-border/70 p-3 dark:border-sidebar-border">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Caption</Label>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="grid gap-1">
                                <Label className="text-xs">Arabic</Label>
                                <Input
                                    dir="rtl"
                                    value={form.data.caption.ar}
                                    onChange={(e) => form.setData('caption', { ...form.data.caption, ar: e.target.value })}
                                />
                                <InputError message={errors['caption.ar']} />
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-xs">English</Label>
                                <Input
                                    value={form.data.caption.en}
                                    onChange={(e) => form.setData('caption', { ...form.data.caption, en: e.target.value })}
                                />
                                <InputError message={errors['caption.en']} />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={submit} disabled={form.processing}>
                        {form.processing ? 'Uploading…' : 'Upload'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

ServiceGalleriesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Services', href: servicesRoutes.index().url },
        { title: 'Galleries', href: '#' },
    ],
};

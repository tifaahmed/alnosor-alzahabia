import { Head, Link, router, useForm } from '@inertiajs/react';
import { GalleryHorizontalEnd, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
type BulletsMap = { ar?: string[]; en?: string[] };

type Service = {
    id: number;
    slug: string;
    icon: string | null;
    image_path: string | null;
    title: Translatable;
    body: Translatable;
    bullets: BulletsMap;
    sort: number;
    galleries_count: number | null;
};

type FormData = {
    slug: string;
    icon: string;
    title: { ar: string; en: string };
    body: { ar: string; en: string };
    bullets: { ar: string[]; en: string[] };
    sort: number | '';
    image: File | null;
    remove_image: boolean;
};

const emptyForm: FormData = {
    slug: '',
    icon: '',
    title: { ar: '', en: '' },
    body: { ar: '', en: '' },
    bullets: { ar: ['', '', ''], en: ['', '', ''] },
    sort: '',
    image: null,
    remove_image: false,
};

const pickTitle = (s: { title: Translatable }) => s.title.en || s.title.ar || '—';

export default function DashboardServicesIndex({ services }: { services: Service[] }) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editing, setEditing] = useState<Service | null>(null);

    const handleDelete = (s: Service) => {
        if (!confirm(`Delete service "${pickTitle(s)}"? Galleries will also be removed.`)) return;
        router.delete(servicesRoutes.destroy(s.id).url, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Services" />

            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <Heading title="Services" description="Manage the catalog of services shown on the public site." />
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="h-4 w-4" /> New Service
                    </Button>
                </div>

                {services.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-sidebar-border/70 p-12 text-center text-muted-foreground dark:border-sidebar-border">
                        No services yet. Add one to get started.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s) => (
                            <ServiceCard
                                key={s.id}
                                service={s}
                                onEdit={() => setEditing(s)}
                                onDelete={() => handleDelete(s)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <CreateDialog open={createOpen} onClose={() => setCreateOpen(false)} />
            <EditDialog service={editing} onClose={() => setEditing(null)} />
        </>
    );
}

function ServiceCard({ service, onEdit, onDelete }: { service: Service; onEdit: () => void; onDelete: () => void }) {
    return (
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
            <div className="relative aspect-video bg-muted">
                {service.image_path ? (
                    <img src={service.image_path} alt={pickTitle(service)} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">No image</div>
                )}
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                    #{service.sort}
                </span>
                <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                    <GalleryHorizontalEnd className="h-3 w-3" /> {service.galleries_count ?? 0}
                </span>
            </div>
            <div className="space-y-2 p-3 text-sm">
                <div>
                    <div className="font-semibold text-foreground line-clamp-1">{service.title.en || '—'}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1" dir="rtl">{service.title.ar || '—'}</div>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    <span>slug: <code className="rounded bg-muted px-1">{service.slug}</code></span>
                    {service.icon && <span>icon: <code className="rounded bg-muted px-1">{service.icon}</code></span>}
                </div>
                <div className="flex items-center justify-between gap-1 pt-2">
                    <Button size="sm" variant="outline" asChild>
                        <Link href={galleriesRoutes.index(service.id).url}>
                            <GalleryHorizontalEnd className="h-3.5 w-3.5" /> Galleries
                        </Link>
                    </Button>
                    <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={onEdit}>
                            <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={onDelete}>
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreateDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    const form = useForm<FormData>(emptyForm);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(servicesRoutes.store().url, {
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
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>New Service</DialogTitle>
                    <DialogDescription>Create a service entry. Bilingual fields can be left empty in either language.</DialogDescription>
                </DialogHeader>
                <ServiceFormFields form={form} mode="create" />
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={submit} disabled={form.processing}>
                        {form.processing ? 'Saving…' : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function EditDialog({ service, onClose }: { service: Service | null; onClose: () => void }) {
    const form = useForm<FormData>(emptyForm);
    const open = service !== null;

    useEffect(() => {
        if (service) {
            form.setData({
                slug: service.slug,
                icon: service.icon ?? '',
                title: { ar: service.title.ar ?? '', en: service.title.en ?? '' },
                body: { ar: service.body.ar ?? '', en: service.body.en ?? '' },
                bullets: {
                    ar: padBullets(service.bullets.ar),
                    en: padBullets(service.bullets.en),
                },
                sort: service.sort,
                image: null,
                remove_image: false,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [service?.id]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!service) return;
        form.post(servicesRoutes.update(service.id).url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Service</DialogTitle>
                    <DialogDescription>Update service details. Leave the image empty to keep the current one.</DialogDescription>
                </DialogHeader>
                {service && (
                    <>
                        <ServiceFormFields form={form} mode="edit" currentImage={service.image_path} />
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                            <Button onClick={submit} disabled={form.processing}>
                                {form.processing ? 'Saving…' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

function padBullets(arr?: string[]): string[] {
    const base = (arr ?? []).filter((b) => typeof b === 'string');
    while (base.length < 3) base.push('');
    return base;
}

function ServiceFormFields({
    form,
    mode,
    currentImage,
}: {
    form: ReturnType<typeof useForm<FormData>>;
    mode: 'create' | 'edit';
    currentImage?: string | null;
}) {
    const errors = form.errors as unknown as Partial<Record<string, string>>;

    const setBullet = (lang: 'ar' | 'en', idx: number, value: string) => {
        const next = [...(form.data.bullets[lang] ?? [])];
        next[idx] = value;
        form.setData('bullets', { ...form.data.bullets, [lang]: next });
    };

    const addBullet = (lang: 'ar' | 'en') => {
        const next = [...(form.data.bullets[lang] ?? []), ''];
        form.setData('bullets', { ...form.data.bullets, [lang]: next });
    };

    const removeBullet = (lang: 'ar' | 'en', idx: number) => {
        const next = (form.data.bullets[lang] ?? []).filter((_, i) => i !== idx);
        form.setData('bullets', { ...form.data.bullets, [lang]: next });
    };

    return (
        <div className="grid max-h-[65vh] gap-3 overflow-y-auto pr-1">
            <div className="grid gap-2 sm:grid-cols-3">
                <div className="grid gap-1.5 sm:col-span-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        value={form.data.slug}
                        onChange={(e) => form.setData('slug', e.target.value)}
                        placeholder="auto from title if empty"
                    />
                    <InputError message={errors.slug} />
                </div>
                <div className="grid gap-1.5">
                    <Label htmlFor="sort">Sort</Label>
                    <Input
                        id="sort"
                        type="number"
                        min={0}
                        value={form.data.sort}
                        onChange={(e) => form.setData('sort', e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <InputError message={errors.sort} />
                </div>
            </div>

            <div className="grid gap-1.5">
                <Label htmlFor="icon">Icon (lucide name)</Label>
                <Input
                    id="icon"
                    value={form.data.icon}
                    onChange={(e) => form.setData('icon', e.target.value)}
                    placeholder="e.g. Handshake, Building2, Palette"
                />
                <InputError message={errors.icon} />
            </div>

            <div className="grid gap-2 rounded-md border border-sidebar-border/70 p-3 dark:border-sidebar-border">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Title</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-1">
                        <Label className="text-xs">Arabic</Label>
                        <Input dir="rtl" value={form.data.title.ar} onChange={(e) => form.setData('title', { ...form.data.title, ar: e.target.value })} />
                        <InputError message={errors['title.ar']} />
                    </div>
                    <div className="grid gap-1">
                        <Label className="text-xs">English</Label>
                        <Input value={form.data.title.en} onChange={(e) => form.setData('title', { ...form.data.title, en: e.target.value })} />
                        <InputError message={errors['title.en']} />
                    </div>
                </div>
            </div>

            <div className="grid gap-2 rounded-md border border-sidebar-border/70 p-3 dark:border-sidebar-border">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Body</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-1">
                        <Label className="text-xs">Arabic</Label>
                        <textarea
                            dir="rtl"
                            rows={4}
                            value={form.data.body.ar}
                            onChange={(e) => form.setData('body', { ...form.data.body, ar: e.target.value })}
                            className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        />
                        <InputError message={errors['body.ar']} />
                    </div>
                    <div className="grid gap-1">
                        <Label className="text-xs">English</Label>
                        <textarea
                            rows={4}
                            value={form.data.body.en}
                            onChange={(e) => form.setData('body', { ...form.data.body, en: e.target.value })}
                            className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        />
                        <InputError message={errors['body.en']} />
                    </div>
                </div>
            </div>

            <div className="grid gap-3 rounded-md border border-sidebar-border/70 p-3 dark:border-sidebar-border">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Bullets</Label>
                {(['ar', 'en'] as const).map((lang) => (
                    <div key={lang} className="grid gap-2">
                        <Label className="text-xs">{lang === 'ar' ? 'Arabic' : 'English'}</Label>
                        {(form.data.bullets[lang] ?? []).map((b, i) => (
                            <div key={`${lang}-${i}`} className="flex gap-2">
                                <Input
                                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                    value={b}
                                    onChange={(e) => setBullet(lang, i, e.target.value)}
                                    placeholder={`Bullet ${i + 1}`}
                                />
                                <Button type="button" size="icon" variant="ghost" onClick={() => removeBullet(lang, i)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" size="sm" variant="outline" onClick={() => addBullet(lang)}>
                            <Plus className="h-3.5 w-3.5" /> Add bullet
                        </Button>
                    </div>
                ))}
            </div>

            <div className="grid gap-1.5">
                <Label htmlFor="image">Image (jpg/png/webp)</Label>
                {currentImage && !form.data.image && !form.data.remove_image && (
                    <div className="flex items-center gap-3 rounded-md border border-sidebar-border/70 p-2 dark:border-sidebar-border">
                        <img src={currentImage} alt="" className="h-16 w-24 rounded object-cover" />
                        <span className="flex-1 text-xs text-muted-foreground line-clamp-1">{currentImage}</span>
                        <Button type="button" size="sm" variant="outline" onClick={() => form.setData('remove_image', true)}>
                            Remove
                        </Button>
                    </div>
                )}
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => form.setData('image', e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">
                    {mode === 'edit' ? 'Leave empty to keep the existing image.' : 'Optional.'}
                </p>
                <InputError message={errors.image} />
            </div>
        </div>
    );
}

DashboardServicesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Services', href: servicesRoutes.index().url },
    ],
};

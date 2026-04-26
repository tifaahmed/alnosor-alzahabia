import { Head, Link, router, useForm } from '@inertiajs/react';
import { CalendarDays, ImageIcon, MapPin, Pencil, Plus, Trash2, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dashboard } from '@/routes';
import categoriesRoutes from '@/routes/dashboard/project-categories';
import projectsRoutes from '@/routes/dashboard/projects';

type Translatable = { ar?: string; en?: string };
type Category = { id: number; name: Translatable; slug: string };
type Project = {
    id: number;
    project_category_id: number;
    title: Translatable;
    subject: Translatable;
    project_date: string | null;
    address: Translatable;
    media_path: string;
    media_type: 'image' | 'video';
    category?: Category | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
};

type FormData = {
    project_category_id: number | '';
    title: { ar: string; en: string };
    subject: { ar: string; en: string };
    address: { ar: string; en: string };
    project_date: string;
    media: File | null;
};

const emptyForm: FormData = {
    project_category_id: '',
    title: { ar: '', en: '' },
    subject: { ar: '', en: '' },
    address: { ar: '', en: '' },
    project_date: '',
    media: null,
};

const pickName = (cat: { name: Translatable }) => cat.name.ar || cat.name.en || '—';

export default function DashboardProjectsIndex({
    projects,
    categories,
    filters,
}: {
    projects: Paginated<Project>;
    categories: Category[];
    filters: { category: number | null };
}) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editing, setEditing] = useState<Project | null>(null);

    const setCategoryFilter = (categoryId: number | null) => {
        router.get(
            projectsRoutes.index().url,
            categoryId ? { category: categoryId } : {},
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const handleDelete = (project: Project) => {
        if (!confirm(`Delete project "${project.title.ar || project.title.en || 'untitled'}"?`)) return;
        router.delete(projectsRoutes.destroy(project.id).url, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Projects" />

            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <Heading title="Projects" description="Upload and manage project photos and videos." />
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={categoriesRoutes.index().url}>Categories</Link>
                        </Button>
                        <Button onClick={() => setCreateOpen(true)} disabled={categories.length === 0}>
                            <Plus className="h-4 w-4" /> New Project
                        </Button>
                    </div>
                </div>

                {categories.length === 0 && (
                    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-900/20">
                        Add a category first before uploading projects.{' '}
                        <Link href={categoriesRoutes.index().url} className="font-semibold underline">
                            Manage categories
                        </Link>
                    </div>
                )}

                <div className="flex flex-wrap gap-2">
                    <FilterChip active={filters.category === null} onClick={() => setCategoryFilter(null)}>
                        All
                    </FilterChip>
                    {categories.map((cat) => (
                        <FilterChip
                            key={cat.id}
                            active={filters.category === cat.id}
                            onClick={() => setCategoryFilter(cat.id)}
                        >
                            {pickName(cat)}
                        </FilterChip>
                    ))}
                </div>

                {projects.data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-sidebar-border/70 p-12 text-center text-muted-foreground dark:border-sidebar-border">
                        No projects yet. Upload your first one.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                        {projects.data.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onEdit={() => setEditing(project)}
                                onDelete={() => handleDelete(project)}
                            />
                        ))}
                    </div>
                )}

                {projects.last_page > 1 && (
                    <div className="flex flex-wrap justify-center gap-1">
                        {projects.links.map((link, i) => (
                            <Button
                                key={i}
                                size="sm"
                                variant={link.active ? 'default' : 'outline'}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <CreateDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                categories={categories}
                defaultCategoryId={filters.category}
            />
            <EditDialog
                project={editing}
                onClose={() => setEditing(null)}
                categories={categories}
            />
        </>
    );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                active
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : 'border-sidebar-border/70 bg-white text-foreground hover:border-amber-400 dark:border-sidebar-border dark:bg-card'
            }`}
        >
            {children}
        </button>
    );
}

function ProjectCard({ project, onEdit, onDelete }: { project: Project; onEdit: () => void; onDelete: () => void }) {
    const title = project.title.ar || project.title.en || '';
    const subject = project.subject.ar || project.subject.en;
    const address = project.address.ar || project.address.en;

    return (
        <div className="group overflow-hidden rounded-xl border border-sidebar-border/70 bg-card dark:border-sidebar-border">
            <div className="relative aspect-square bg-muted">
                {project.media_type === 'video' ? (
                    <>
                        <video
                            src={project.media_path}
                            className="absolute inset-0 h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                        />
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                            <Video className="h-3 w-3" /> Video
                        </span>
                    </>
                ) : (
                    <>
                        <img
                            src={project.media_path}
                            alt={title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                            <ImageIcon className="h-3 w-3" /> Photo
                        </span>
                    </>
                )}
            </div>
            <div className="space-y-1 p-3 text-xs">
                <div className="font-semibold text-foreground line-clamp-1">{title || '—'}</div>
                {subject && <div className="text-muted-foreground line-clamp-1">{subject}</div>}
                <div className="flex flex-wrap gap-x-2 gap-y-1 pt-1 text-muted-foreground">
                    {project.project_date && (
                        <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {project.project_date}
                        </span>
                    )}
                    {address && (
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{address}</span>
                        </span>
                    )}
                </div>
                <div className="text-[10px] text-muted-foreground">{project.category ? pickName(project.category) : ''}</div>
                <div className="flex justify-end gap-1 pt-2">
                    <Button size="icon" variant="ghost" onClick={onEdit}>
                        <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={onDelete}>
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function CreateDialog({
    open,
    onClose,
    categories,
    defaultCategoryId,
}: {
    open: boolean;
    onClose: () => void;
    categories: Category[];
    defaultCategoryId: number | null;
}) {
    const form = useForm<FormData>({ ...emptyForm, project_category_id: defaultCategoryId ?? '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(projectsRoutes.store().url, {
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
                    <DialogTitle>New Project</DialogTitle>
                    <DialogDescription>Upload an image or video and fill in the details. You can leave English empty if you only have Arabic content.</DialogDescription>
                </DialogHeader>
                <ProjectFormFields form={form} categories={categories} mediaRequired />
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={submit} disabled={form.processing}>
                        {form.processing ? 'Uploading…' : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function EditDialog({
    project,
    onClose,
    categories,
}: {
    project: Project | null;
    onClose: () => void;
    categories: Category[];
}) {
    const form = useForm<FormData>(emptyForm);
    const open = project !== null;

    useEffect(() => {
        if (project) {
            form.setData({
                project_category_id: project.project_category_id,
                title: { ar: project.title.ar ?? '', en: project.title.en ?? '' },
                subject: { ar: project.subject.ar ?? '', en: project.subject.en ?? '' },
                address: { ar: project.address.ar ?? '', en: project.address.en ?? '' },
                project_date: project.project_date ? project.project_date.slice(0, 10) : '',
                media: null,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project?.id]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!project) return;
        form.post(projectsRoutes.update(project.id).url, {
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
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogDescription>Update details. Leave the file empty to keep the current media.</DialogDescription>
                </DialogHeader>
                {project && (
                    <>
                        <div className="overflow-hidden rounded-lg border border-sidebar-border/70 dark:border-sidebar-border">
                            {project.media_type === 'video' ? (
                                <video src={project.media_path} className="h-40 w-full object-cover" muted />
                            ) : (
                                <img src={project.media_path} alt="" className="h-40 w-full object-cover" />
                            )}
                        </div>
                        <ProjectFormFields form={form} categories={categories} mediaRequired={false} />
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

function BilingualField({
    label,
    field,
    value,
    onChange,
    errors,
}: {
    label: string;
    field: 'title' | 'subject' | 'address';
    value: { ar: string; en: string };
    onChange: (next: { ar: string; en: string }) => void;
    errors: Partial<Record<string, string>>;
}) {
    return (
        <div className="grid gap-2 rounded-md border border-sidebar-border/70 p-3 dark:border-sidebar-border">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
            <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-1">
                    <Label className="text-xs">Arabic</Label>
                    <Input
                        dir="rtl"
                        value={value.ar}
                        onChange={(e) => onChange({ ...value, ar: e.target.value })}
                    />
                    <InputError message={errors[`${field}.ar`]} />
                </div>
                <div className="grid gap-1">
                    <Label className="text-xs">English</Label>
                    <Input
                        value={value.en}
                        onChange={(e) => onChange({ ...value, en: e.target.value })}
                    />
                    <InputError message={errors[`${field}.en`]} />
                </div>
            </div>
        </div>
    );
}

function ProjectFormFields({
    form,
    categories,
    mediaRequired,
}: {
    form: ReturnType<typeof useForm<FormData>>;
    categories: Category[];
    mediaRequired: boolean;
}) {
    const errors = form.errors as unknown as Partial<Record<string, string>>;

    return (
        <div className="grid max-h-[60vh] gap-3 overflow-y-auto pr-1">
            <div className="grid gap-1.5">
                <Label>Category</Label>
                <Select
                    value={form.data.project_category_id ? String(form.data.project_category_id) : ''}
                    onValueChange={(v) => form.setData('project_category_id', Number(v))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Pick a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>{pickName(c)}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.project_category_id} />
            </div>

            <BilingualField
                label="Title"
                field="title"
                value={form.data.title}
                onChange={(v) => form.setData('title', v)}
                errors={errors}
            />
            <BilingualField
                label="Subject"
                field="subject"
                value={form.data.subject}
                onChange={(v) => form.setData('subject', v)}
                errors={errors}
            />
            <BilingualField
                label="Address"
                field="address"
                value={form.data.address}
                onChange={(v) => form.setData('address', v)}
                errors={errors}
            />

            <div className="grid gap-1.5">
                <Label htmlFor="project_date">Date</Label>
                <Input
                    id="project_date"
                    type="date"
                    value={form.data.project_date}
                    onChange={(e) => form.setData('project_date', e.target.value)}
                />
                <InputError message={errors.project_date} />
            </div>

            <div className="grid gap-1.5">
                <Label htmlFor="media">Media (image or video)</Label>
                <Input
                    id="media"
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => form.setData('media', e.target.files?.[0] ?? null)}
                />
                {!mediaRequired && (
                    <p className="text-xs text-muted-foreground">Leave empty to keep the existing file.</p>
                )}
                <InputError message={errors.media} />
            </div>
        </div>
    );
}

DashboardProjectsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Projects', href: projectsRoutes.index().url },
    ],
};

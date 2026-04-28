import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { FormField } from '@/components/dashboard/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import categoriesRoutes from '@/routes/dashboard/service-categories';

type Translatable = { ar?: string; en?: string };
type Category = {
    id: number;
    key: string;
    name: Translatable;
    sort: number;
    services_count: number;
};

type CreateForm = {
    key: string;
    name: { ar: string; en: string };
    sort: number | '';
};

const emptyCreate: CreateForm = { key: '', name: { ar: '', en: '' }, sort: '' };

export default function ServiceCategoriesIndex({ categories }: { categories: Category[] }) {
    const create = useForm<CreateForm>(emptyCreate);
    const [editingId, setEditingId] = useState<number | null>(null);

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        create.post(categoriesRoutes.store().url, {
            preserveScroll: true,
            onSuccess: () => create.reset(),
        });
    };

    const handleDelete = (cat: Category) => {
        const confirmMsg =
            cat.services_count > 0
                ? `Delete "${cat.name.ar || cat.name.en}"? ${cat.services_count} services will become uncategorised.`
                : `Delete "${cat.name.ar || cat.name.en}"?`;

        if (!confirm(confirmMsg)) {
return;
}

        router.delete(categoriesRoutes.destroy(cat.id).url, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Service Categories" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Service Categories"
                    description="Manage the headings under which services are grouped on the public site."
                />

                <form
                    onSubmit={submitCreate}
                    className="grid gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4 dark:border-sidebar-border"
                >
                    <div className="grid gap-3 sm:grid-cols-2">
                        <FormField
                            label="الاسم (Arabic)"
                            htmlFor="new-name-ar"
                            error={create.errors['name.ar' as keyof typeof create.errors] as string | undefined}
                        >
                            <Input
                                id="new-name-ar"
                                dir="rtl"
                                value={create.data.name.ar}
                                onChange={(e) => create.setData('name', { ...create.data.name, ar: e.target.value })}
                                placeholder="مثال: السباكة والكهرباء"
                            />
                        </FormField>
                        <FormField
                            label="Name (English)"
                            htmlFor="new-name-en"
                            error={create.errors['name.en' as keyof typeof create.errors] as string | undefined}
                        >
                            <Input
                                id="new-name-en"
                                value={create.data.name.en}
                                onChange={(e) => create.setData('name', { ...create.data.name, en: e.target.value })}
                                placeholder="e.g. Plumbing & Electrical"
                            />
                        </FormField>
                    </div>
                    <div className="flex flex-wrap items-end gap-3">
                        <FormField
                            label="Key"
                            htmlFor="new-key"
                            hint="Optional. Auto-generated from the English name if empty."
                            error={create.errors.key}
                            className="min-w-44 flex-1"
                        >
                            <Input
                                id="new-key"
                                value={create.data.key}
                                onChange={(e) => create.setData('key', e.target.value)}
                                placeholder="e.g. mep"
                            />
                        </FormField>
                        <FormField label="Sort" htmlFor="new-sort" error={create.errors.sort}>
                            <Input
                                id="new-sort"
                                type="number"
                                min={0}
                                value={create.data.sort}
                                onChange={(e) =>
                                    create.setData('sort', e.target.value === '' ? '' : Number(e.target.value))
                                }
                                className="w-24"
                            />
                        </FormField>
                        <Button type="submit" disabled={create.processing}>
                            <Plus className="h-4 w-4" />
                            Add Category
                        </Button>
                    </div>
                </form>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 font-medium">Arabic</th>
                                <th className="px-4 py-3 font-medium">English</th>
                                <th className="px-4 py-3 font-medium">Key</th>
                                <th className="px-4 py-3 font-medium">Services</th>
                                <th className="px-4 py-3 font-medium">Sort</th>
                                <th className="px-4 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                                        No categories yet. Add the first one above.
                                    </td>
                                </tr>
                            )}
                            {categories.map((cat) =>
                                editingId === cat.id ? (
                                    <EditRow key={cat.id} category={cat} onCancel={() => setEditingId(null)} />
                                ) : (
                                    <tr key={cat.id} className="border-t border-sidebar-border/70 dark:border-sidebar-border">
                                        <td className="px-4 py-3 font-medium" dir="rtl">{cat.name.ar || '—'}</td>
                                        <td className="px-4 py-3 font-medium">{cat.name.en || '—'}</td>
                                        <td className="px-4 py-3 text-muted-foreground"><code className="rounded bg-muted px-1">{cat.key}</code></td>
                                        <td className="px-4 py-3">{cat.services_count}</td>
                                        <td className="px-4 py-3">{cat.sort}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button size="icon" variant="ghost" onClick={() => setEditingId(cat.id)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={() => handleDelete(cat)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

function EditRow({ category, onCancel }: { category: Category; onCancel: () => void }) {
    const form = useForm<CreateForm>({
        key: category.key,
        name: { ar: category.name.ar ?? '', en: category.name.en ?? '' },
        sort: category.sort,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(categoriesRoutes.update(category.id).url, {
            preserveScroll: true,
            onSuccess: () => onCancel(),
        });
    };

    return (
        <tr className="border-t border-sidebar-border/70 bg-amber-50/40 dark:border-sidebar-border dark:bg-amber-900/10">
            <td className="px-4 py-3" colSpan={6}>
                <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1fr_1fr_140px_100px_auto_auto] sm:items-end">
                    <div className="grid gap-1">
                        <Label className="text-xs">Arabic</Label>
                        <Input
                            dir="rtl"
                            value={form.data.name.ar}
                            onChange={(e) => form.setData('name', { ...form.data.name, ar: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="text-xs">English</Label>
                        <Input
                            value={form.data.name.en}
                            onChange={(e) => form.setData('name', { ...form.data.name, en: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="text-xs">Key</Label>
                        <Input value={form.data.key} onChange={(e) => form.setData('key', e.target.value)} />
                    </div>
                    <div className="grid gap-1">
                        <Label className="text-xs">Sort</Label>
                        <Input
                            type="number"
                            min={0}
                            value={form.data.sort}
                            onChange={(e) =>
                                form.setData('sort', e.target.value === '' ? '' : Number(e.target.value))
                            }
                        />
                    </div>
                    <Button type="submit" disabled={form.processing}>Save</Button>
                    <Button type="button" variant="ghost" onClick={onCancel}>
                        <X className="h-4 w-4" /> Cancel
                    </Button>
                </form>
            </td>
        </tr>
    );
}

ServiceCategoriesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Service Categories', href: categoriesRoutes.index().url },
    ],
};

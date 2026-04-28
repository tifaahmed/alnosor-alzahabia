import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ExternalLink, FolderTree, GalleryHorizontalEnd, Images, Phone, Tags } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { dashboard } from '@/routes';
import projectCategoriesRoutes from '@/routes/dashboard/project-categories';
import projectsRoutes from '@/routes/dashboard/projects';
import serviceCategoriesRoutes from '@/routes/dashboard/service-categories';
import servicesRoutes from '@/routes/dashboard/services';

type QuickLink = {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    external?: boolean;
};

const quickLinks: QuickLink[] = [
    {
        title: 'Services',
        description: 'Add, edit and reorder the services shown on the public site.',
        href: servicesRoutes.index().url,
        icon: GalleryHorizontalEnd,
    },
    {
        title: 'Service Categories',
        description: 'Manage the six groupings that organise your services.',
        href: serviceCategoriesRoutes.index().url,
        icon: Tags,
    },
    {
        title: 'Projects',
        description: 'Upload photos and manage the projects shown in the gallery.',
        href: projectsRoutes.index().url,
        icon: Images,
    },
    {
        title: 'Project Categories',
        description: 'Manage the folders that group your project galleries.',
        href: projectCategoriesRoutes.index().url,
        icon: FolderTree,
    },
    {
        title: 'View Public Site',
        description: 'Open the live customer-facing website in a new tab.',
        href: '/',
        icon: ExternalLink,
        external: true,
    },
    {
        title: 'Contact Page',
        description: 'Preview phone numbers, address and the enquiry form.',
        href: '/contact',
        icon: Phone,
        external: true,
    },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <header className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-100/40 via-white to-white p-6 dark:border-amber-900/30 dark:from-amber-900/20 dark:via-[#161615] dark:to-[#0f0f0e]">
                    <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-amber-200/70 dark:bg-[#161615] dark:ring-amber-900/40">
                            <img
                                src="/images/logos/logo-without-background.png"
                                alt="Al Nosor Al Zahabia"
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                                Welcome back
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                                Al Nosor Al Zahabia · Admin
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Quick links to manage the site content. Open any section to add, edit or remove entries.
                            </p>
                        </div>
                    </div>
                </header>

                <section>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Quick links
                    </h2>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {quickLinks.map((link) => {
                            const Icon = link.icon;
                            const card = (
                                <div className="group flex h-full flex-col rounded-2xl border border-sidebar-border/70 bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/70 hover:shadow-lg dark:border-sidebar-border">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-4 text-base font-semibold text-foreground transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-300">
                                        {link.title}
                                    </h3>
                                    <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{link.description}</p>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 transition-all group-hover:gap-2.5 dark:text-amber-300">
                                        {link.external ? 'Open' : 'Manage'}
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </span>
                                </div>
                            );

                            if (link.external) {
                                return (
                                    <a
                                        key={link.title}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        {card}
                                    </a>
                                );
                            }

                            return (
                                <Link key={link.title} href={link.href} className="block">
                                    {card}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

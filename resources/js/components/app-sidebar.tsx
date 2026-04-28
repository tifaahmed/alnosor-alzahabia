import { Link } from '@inertiajs/react';
import { Briefcase, FolderTree, Images, LayoutGrid, Tags } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import projectCategoriesRoutes from '@/routes/dashboard/project-categories';
import projectsRoutes from '@/routes/dashboard/projects';
import serviceCategoriesRoutes from '@/routes/dashboard/service-categories';
import servicesRoutes from '@/routes/dashboard/services';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Services',
        href: servicesRoutes.index(),
        icon: Briefcase,
    },
    {
        title: 'Service Categories',
        href: serviceCategoriesRoutes.index(),
        icon: Tags,
    },
    {
        title: 'Projects',
        href: projectsRoutes.index(),
        icon: Images,
    },
    {
        title: 'Project Categories',
        href: projectCategoriesRoutes.index(),
        icon: FolderTree,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" side="left">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

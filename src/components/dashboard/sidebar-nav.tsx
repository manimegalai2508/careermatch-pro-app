'use client'

import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Briefcase, BarChart3, BotMessageSquare, FileText, Home, Search, User, UserCheck } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const candidateNav = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Job Matches", href: "/dashboard/job-matches", icon: Search },
    { name: "Resume Analyzer", href: "/dashboard/resume-analyzer", icon: FileText },
    { name: "Career Path", href: "/dashboard/career-path", icon: BotMessageSquare },
    { name: "Market Insights", href: "/dashboard/market-insights", icon: BarChart3 },
];

const recruiterNav = [
    { name: "Dashboard", href: "/dashboard/recruiter", icon: Home },
    { name: "Job Postings", href: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Market Insights", href: "/dashboard/market-insights", icon: BarChart3 },
];

export function SidebarNav() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // In a real app, role would come from user session. We simulate it with a query param.
    const role = searchParams.get('role') || 'candidate';

    const handleRoleChange = (newRole: string) => {
        const newPath = newRole === 'recruiter' ? '/dashboard/recruiter' : '/dashboard';
        const params = new URLSearchParams(searchParams.toString());
        params.set('role', newRole);
        router.push(`${newPath}?${params.toString()}`);
    };
    
    const isRecruiterView = role === 'recruiter';
    const navItems = isRecruiterView ? recruiterNav : candidateNav;

    return (
        <div className="flex flex-col h-full gap-4">
            <SidebarGroup>
                <SidebarGroupLabel>View As</SidebarGroupLabel>
                 <Select value={role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="candidate">
                            <div className="flex items-center gap-2">
                                <User /> Candidate
                            </div>
                        </SelectItem>
                        <SelectItem value="recruiter">
                             <div className="flex items-center gap-2">
                                <UserCheck /> Recruiter
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                                <Link href={`${item.href}?${searchParams.toString()}`}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </div>
    );
}

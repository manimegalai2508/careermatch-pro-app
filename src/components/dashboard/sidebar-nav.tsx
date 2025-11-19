'use client'

import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Briefcase, BarChart3, BotMessageSquare, FileText, Home, Users } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";


const candidateNav = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Resume Analyzer", href: "/dashboard/resume-analyzer", icon: FileText },
    { name: "Career Path", href: "/dashboard/career-path", icon: BotMessageSquare },
    { name: "Market Insights", href: "/dashboard/market-insights", icon: BarChart3 },
];

const recruiterNav = [
    { name: "Dashboard", href: "/dashboard/recruiter", icon: Home },
    { name: "Job Postings", href: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Candidates", href: "/dashboard/recruiter/jobs", icon: Users },
    { name: "Market Insights", href: "/dashboard/market-insights", icon: BarChart3 },
];

export function SidebarNav() {
    const pathname = usePathname();
    // In a real app, role would come from user session
    const [role, setRole] = useState('candidate');

    const navItems = role === 'candidate' ? candidateNav : recruiterNav;

    return (
        <div className="flex flex-col h-full">
            <div className="p-2">
                 <Accordion type="single" collapsible defaultValue="item-1" onValueChange={(val) => setRole(val === 'item-1' ? 'candidate' : 'recruiter')}>
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline p-2 rounded-md hover:bg-sidebar-accent">Candidate View</AccordionTrigger>
                        <AccordionContent>
                           <p className="text-sm text-muted-foreground p-2">Use AI-powered tools to find your next job and advance your career.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-none">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline p-2 rounded-md hover:bg-sidebar-accent">Recruiter View</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-sm text-muted-foreground p-2">Find and hire the best talent with our smart recruiting dashboard.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <Link href={item.href} passHref>
                                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                                    <span>
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </div>
    );
}

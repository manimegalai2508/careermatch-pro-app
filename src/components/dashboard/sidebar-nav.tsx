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
    { name: "Market Insights", href: "/dashboard/market-insights", icon: BarChart3 },
];

export function SidebarNav() {
    const pathname = usePathname();
    // In a real app, role would come from user session
    const [role, setRole] = useState('candidate'); 

    const isRecruiterView = role === 'recruiter';
    const navItems = isRecruiterView ? recruiterNav : candidateNav;

    // Determine which accordion item should be open based on the current role
    const openAccordionItem = isRecruiterView ? 'recruiter-view' : 'candidate-view';

    const handleRoleChange = (value: string) => {
        if (value === 'candidate-view') {
            setRole('candidate');
        } else if (value === 'recruiter-view') {
            setRole('recruiter');
        }
    };
    
    return (
        <div className="flex flex-col h-full">
            <div className="p-2">
                 <Accordion type="single" collapsible defaultValue={openAccordionItem} onValueChange={handleRoleChange}>
                    <AccordionItem value="candidate-view" className="border-none">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline p-2 rounded-md hover:bg-sidebar-accent">Candidate View</AccordionTrigger>
                        <AccordionContent>
                           <p className="text-sm text-muted-foreground p-2">Use AI-powered tools to find your next job and advance your career.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="recruiter-view" className="border-none">
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
                            <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                                <Link href={item.href}>
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

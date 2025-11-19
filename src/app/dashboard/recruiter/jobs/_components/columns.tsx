'use client';

import { type ColumnDef } from '@tanstack/react-table';
import type { Job } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
        return (
            <div className="font-medium">{row.original.title}</div>
        )
    }
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: "requiredSkills",
    header: "Top Skills",
    cell: ({ row }) => {
      const skills = row.original.requiredSkills;
      return (
        <div className="flex flex-wrap gap-1">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
          {skills.length > 3 && <Badge variant="outline">+{skills.length - 3}</Badge>}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const job = row.original;

      return (
        <div className="text-right">
            <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/recruiter/jobs/${job.id}`}>
                    View Candidates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      );
    },
  },
];

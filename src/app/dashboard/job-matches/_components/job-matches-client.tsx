'use client';

import { useState } from 'react';
import type { JobWithMatch } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JobDetailDrawer } from './job-detail-drawer';
import { RadialProgress } from '@/components/ui/progress';

export function JobMatchesClient({ jobs }: { jobs: JobWithMatch[] }) {
    const [selectedJob, setSelectedJob] = useState<JobWithMatch | null>(null);

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <Card key={job.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
                                    <CardDescription>{job.company} - {job.location}</CardDescription>
                                </div>
                                <RadialProgress value={job.matchScore} size={60} strokeWidth={5}>
                                     <span className="text-sm font-bold">{job.matchScore}%</span>
                                </RadialProgress>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                                {job.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-4">
                                {job.requiredSkills.slice(0, 4).map(skill => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                                {job.requiredSkills.length > 4 && <Badge variant="outline">+{job.requiredSkills.length - 4}</Badge>}
                            </div>
                            <Button className="mt-4 w-full" onClick={() => setSelectedJob(job)}>
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <JobDetailDrawer
                job={selectedJob}
                open={!!selectedJob}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setSelectedJob(null);
                    }
                }}
            />
        </>
    );
}

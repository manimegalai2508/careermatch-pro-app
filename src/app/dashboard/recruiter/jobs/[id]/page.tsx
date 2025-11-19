import { jobs, candidates } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rankCandidatesAction } from "@/app/actions";
import { CandidateRankingList } from "./_components/candidate-ranking-list";
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function JobCandidatesPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);
  if (!job) {
    notFound();
  }

  const result = await rankCandidatesAction({
    job: job,
    candidates: candidates.map(c => ({
        id: c.id,
        skills: c.skills,
        experienceYears: c.experienceYears,
        location: c.location,
        resume: c.resume
    }))
  });

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild>
        <Link href="/dashboard/recruiter/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Jobs
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{job.title}</CardTitle>
          <CardDescription>{job.location}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{job.description}</p>
            </div>
             <div>
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </div>
             </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Ranked Candidates</h2>
        {result.error && <p className="text-red-500">{result.error}</p>}
        {result.data && <CandidateRankingList rankings={result.data} />}
      </div>
    </div>
  );
}

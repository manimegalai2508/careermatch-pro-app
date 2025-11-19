import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { jobs } from "@/lib/data";

export default function RecruiterDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and find top talent.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/recruiter/jobs">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Job
            </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-headline">
              <span>Active Jobs</span>
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{jobs.length}</div>
            <p className="text-xs text-muted-foreground">Total active job postings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-headline">
              <span>New Candidates</span>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
      </div>

       <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Recent Job Postings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.slice(0, 2).map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle className="font-headline">{job.title}</CardTitle>
                <CardDescription>{job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/recruiter/jobs/${job.id}`}>
                    View Candidates <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

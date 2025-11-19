import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BotMessageSquare, FileText } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Candidate Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here are your tools for success.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <FileText className="h-5 w-5 text-primary" />
              Resume Analyzer
            </CardTitle>
            <CardDescription>
              Get an AI-powered analysis of your resume to improve your chances.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/resume-analyzer">
                Analyze My Resume <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BotMessageSquare className="h-5 w-5 text-primary" />
              Career Path Generator
            </CardTitle>
            <CardDescription>
              Discover personalized career paths and skills to learn next.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/career-path">
                Suggest Paths <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { ResumeAnalyzerClient } from "./_components/resume-analyzer-client";

export default function ResumeAnalyzerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Resume Analyzer</h1>
        <p className="text-muted-foreground">
          Paste your resume below to get an in-depth analysis and suggestions for improvement.
        </p>
      </div>
      <ResumeAnalyzerClient />
    </div>
  );
}

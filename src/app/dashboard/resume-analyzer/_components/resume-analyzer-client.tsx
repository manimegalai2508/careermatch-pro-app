'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { analyzeResumeAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, ListChecks, Lightbulb, ThumbsDown, ThumbsUp, Terminal, Loader2 } from 'lucide-react';
import type { ResumeAnalysis } from '@/lib/types';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Analyze Resume
    </Button>
  );
}

function AnalysisResults({ data }: { data: ResumeAnalysis }) {
  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Overall Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Progress value={data.overallScore} />
                    <p className="text-lg font-bold text-center">{data.overallScore}/100</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">ATS Compatibility Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Progress value={data.atsCompatibilityScore} />
                    <p className="text-lg font-bold text-center">{data.atsCompatibilityScore}/100</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><ThumbsUp className="text-green-500" /> Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc space-y-2 pl-5">
                        {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline"><ThumbsDown className="text-red-500" /> Weaknesses</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc space-y-2 pl-5">
                        {data.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Lightbulb className="text-yellow-500"/> Suggestions for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="list-disc space-y-2 pl-5">
                    {data.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><ListChecks className="text-blue-500"/> Grammar Check</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{data.grammarCheck}</p>
            </CardContent>
        </Card>
    </div>
  );
}


export function ResumeAnalyzerClient() {
  const initialState = { error: null, data: null };
  const [state, formAction] = useFormState(analyzeResumeAction, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <Textarea
          name="resume"
          placeholder="Paste your full resume text here..."
          className="min-h-[300px] text-base"
        />
        <SubmitButton />
      </form>

      {state?.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
             {typeof state.error === 'object' ? JSON.stringify(state.error) : state.error}
          </AlertDescription>
        </Alert>
      )}
      
      {state?.data && (
        <>
            <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800 dark:text-green-300">Analysis Complete</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                    Your resume has been successfully analyzed. See the results below.
                </AlertDescription>
            </Alert>
            <AnalysisResults data={state.data as ResumeAnalysis} />
        </>
      )}
    </div>
  );
}

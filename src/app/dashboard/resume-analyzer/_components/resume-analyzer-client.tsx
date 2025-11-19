'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { analyzeResumeAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, ListChecks, Lightbulb, ThumbsDown, ThumbsUp, Terminal, Loader2, Upload, FileText, X } from 'lucide-react';
import type { ResumeAnalysis } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';

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
        <div className="grid gap-6 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-base">Overall Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-center">
                    <Progress value={data.overallScore} />
                    <p className="text-lg font-bold">{data.overallScore}/100</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-base">ATS Compatibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-center">
                    <Progress value={data.atsCompatibilityScore} />
                    <p className="text-lg font-bold">{data.atsCompatibilityScore}/100</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-base">Info Missing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-center">
                    <Progress value={data.missingPercentage} variant={data.missingPercentage > 50 ? "destructive" : "default"} />
                    <p className="text-lg font-bold">{data.missingPercentage}%</p>
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
                <CardTitle className="flex items-center gap-2 font-headline"><ListChecks className="text-blue-500"/> Grammar & Spelling</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground">{data.grammarCheck}</p>
            </CardContent>
        </Card>
    </div>
  );
}

export function ResumeAnalyzerClient() {
  const initialState = { error: null, data: null };
  const [state, formAction] = useFormState(analyzeResumeAction, initialState);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenResumeInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (hiddenResumeInputRef.current && e.target?.result) {
            hiddenResumeInputRef.current.value = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (hiddenResumeInputRef.current) {
        hiddenResumeInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="resume" ref={hiddenResumeInputRef} />
        
        <Card 
            className="border-2 border-dashed bg-muted hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center p-10 text-center cursor-pointer">
              {!fileName ? (
                <>
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT (Max 5MB)</p>
                    <Input
                        ref={fileInputRef}
                        id="resume-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                    />
                </>
              ) : (
                <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-primary" />
                    <p className="font-medium">{fileName}</p>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleRemoveFile();}}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
              )}
          </CardContent>
        </Card>

        <SubmitButton />
      </form>

      {state?.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
             {state.error.resume ? state.error.resume[0] : "An unexpected error occurred."}
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

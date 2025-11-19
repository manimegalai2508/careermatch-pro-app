'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getCareerPathAction } from '@/app/actions';
import { Book, CheckCircle, GraduationCap, Loader2, Map, Terminal } from 'lucide-react';
import type { CareerPathSuggestion } from '@/lib/types';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Generate Paths
    </Button>
  );
}

function SuggestionResults({ data }: { data: CareerPathSuggestion }) {
  return (
    <div className="space-y-6">
        <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800 dark:text-green-300">Suggestions Ready!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
                Here are some career paths based on your profile.
            </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible className="w-full">
            {data.careerPaths.map((path, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-semibold">{path.title}</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <p>{path.description}</p>
                        <div className="grid gap-4 md:grid-cols-2">
                           <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2"><Map className="h-5 w-5 text-primary"/> Skill Roadmap</h4>
                               <ul className="list-disc pl-5 space-y-1 text-sm">
                                   {path.skillRoadmap.split(',').map((skill, i) => <li key={i}>{skill.trim()}</li>)}
                               </ul>
                           </div>
                           <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2"><GraduationCap className="h-5 w-5 text-primary"/> Recommended Courses</h4>
                               <ul className="list-disc pl-5 space-y-1 text-sm">
                                   {path.recommendedCourses.split(',').map((course, i) => <li key={i}>{course.trim()}</li>)}
                               </ul>
                           </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
  );
}

export function CareerPathClient() {
  const initialState = { error: null, data: null };
  const [state, formAction] = useFormState(getCareerPathAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Profile</CardTitle>
        <CardDescription>
          Provide your current skills and a brief summary of your work experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="currentSkills">Current Skills</Label>
            <Input id="currentSkills" name="currentSkills" placeholder="e.g., React, Python, Product Management" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience">Experience Summary</Label>
            <Textarea id="experience" name="experience" placeholder="Describe your work experience..." />
          </div>
          <SubmitButton />
        </form>

        {state?.error && (
            <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {typeof state.error === 'object' ? JSON.stringify(state.error) : state.error}
            </AlertDescription>
            </Alert>
        )}

        {state?.data && <div className="mt-6"><SuggestionResults data={state.data as CareerPathSuggestion} /></div>}
      </CardContent>
    </Card>
  );
}

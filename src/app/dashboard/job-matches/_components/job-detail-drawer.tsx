'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { applyForJobAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BrainCircuit, Check, HelpCircle, Briefcase, MapPin, X, Flame } from 'lucide-react';
import type { JobWithMatch } from '@/lib/types';
import { startTransition, useOptimistic } from 'react';

export function JobDetailDrawer({ job, open, onOpenChange }: { job: JobWithMatch | null; open: boolean; onOpenChange: (open: boolean) => void; }) {
  const { toast } = useToast();
  const [optimisticApplied, setOptimisticApplied] = useOptimistic(false);

  if (!job) return null;

  const handleApply = async () => {
      startTransition(() => {
        setOptimisticApplied(true);
      });
      const result = await applyForJobAction(job.id);
      toast({
          title: "Application Sent!",
          description: result.message,
          variant: "default"
      });
  };
  
  const FactorPill = ({ title, score, icon: Icon }: { title: string; score: number; icon: React.ElementType }) => (
    <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
        <Icon className="h-4 w-4 text-secondary-foreground" />
        <span className="font-medium">{title}:</span>
        <span className="font-semibold text-primary">{score}/100</span>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl">
        <ScrollArea className="h-full pr-6 -mr-6">
            <SheetHeader className="mb-6">
            <SheetTitle className="font-headline text-3xl">{job.title}</SheetTitle>
            <SheetDescription className="text-base flex items-center gap-4">
                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.company}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
            </SheetDescription>
            </SheetHeader>

            <div className="space-y-8">
                <div>
                    <h3 className="font-headline text-xl mb-3">Overall Match: {job.matchScore}%</h3>
                    <Progress value={job.matchScore} />
                </div>
                
                <div>
                    <h3 className="font-headline text-xl mb-4">Match Breakdown</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                           <Flame className="h-5 w-5 text-primary" />
                           <h4 className="font-semibold">Skills: {job.breakdown.skills.score}/50</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">{job.breakdown.skills.explanation}</p>
                        
                        <div className="flex items-center gap-2">
                           <Briefcase className="h-5 w-5 text-primary" />
                           <h4 className="font-semibold">Experience: {job.breakdown.experience.score}/20</h4>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">{job.breakdown.experience.explanation}</p>
                    </div>
                </div>

                {job.breakdown.missingSkills.length > 0 && (
                     <div>
                        <h3 className="font-headline text-xl mb-4">Missing Skills Impact</h3>
                         <div className="flex flex-wrap gap-2">
                            {job.breakdown.missingSkills.map(ms => (
                                <Badge key={ms.skill} variant="destructive" className="flex gap-1.5 items-center">
                                    <X className="h-3 w-3" />
                                    {ms.skill} 
                                    <span className="opacity-80">({ms.impact})</span>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
               
                <div>
                    <h3 className="font-headline text-xl mb-4">AI-Generated Interview Questions</h3>
                    <ul className="space-y-3 list-disc pl-5">
                        {job.interviewQuestions.map((q, i) => (
                            <li key={i} className="text-sm text-muted-foreground">{q}</li>
                        ))}
                    </ul>
                </div>
                 
                 <div>
                    <h3 className="font-headline text-xl mb-4">Job Description</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.description}</p>
                 </div>
            </div>
        </ScrollArea>
        <SheetFooter className="pt-6">
            <SheetClose asChild>
                <Button variant="outline">Close</Button>
            </SheetClose>
             <Button onClick={handleApply} disabled={optimisticApplied}>
                {optimisticApplied ? <><Check className="mr-2 h-4 w-4" />Applied</> : 'Apply Now'}
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

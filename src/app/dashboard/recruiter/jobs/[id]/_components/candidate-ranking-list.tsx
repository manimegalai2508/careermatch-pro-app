'use client';

import { candidates } from "@/lib/data";
import type { CandidateRanking } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function CandidateRankingList({ rankings }: { rankings: CandidateRanking[] }) {
  const sortedRankings = [...rankings].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-4">
      {sortedRankings.map((ranking) => {
        const candidate = candidates.find((c) => c.id === ranking.candidateId);
        if (!candidate) return null;

        return (
          <Card key={candidate.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="font-headline text-xl">{candidate.name}</CardTitle>
                    <CardDescription>{candidate.location}</CardDescription>
                  </div>
                </div>
                 <div className="text-right">
                    <p className="text-sm text-muted-foreground">Overall Match</p>
                    <p className="text-2xl font-bold text-primary">{ranking.matchScore}%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                    <div>
                        <div className="mb-1 flex justify-between items-center">
                            <span className="text-sm font-medium">Skills Match</span>
                            <span className="text-sm font-medium">{ranking.skillMatchScore}%</span>
                        </div>
                        <Progress value={ranking.skillMatchScore} />
                    </div>
                     <div>
                        <div className="mb-1 flex justify-between items-center">
                            <span className="text-sm font-medium">Experience Match</span>
                            <span className="text-sm font-medium">{ranking.experienceMatchScore}%</span>
                        </div>
                        <Progress value={ranking.experienceMatchScore} />
                    </div>
                     <div>
                        <div className="mb-1 flex justify-between items-center">
                            <span className="text-sm font-medium">Location Match</span>
                            <span className="text-sm font-medium">{ranking.locationMatchScore}%</span>
                        </div>
                        <Progress value={ranking.locationMatchScore} />
                    </div>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>View Match Breakdown</AccordionTrigger>
                        <AccordionContent>
                            <p className="whitespace-pre-wrap text-muted-foreground">{ranking.matchExplanation}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

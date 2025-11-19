import type { rankCandidates } from "@/ai/flows/ranked-candidate-job-matching";
import type { getPersonalizedCareerPathSuggestions } from "@/ai/flows/personalized-career-path-suggestions";
import type { analyzeResume } from "@/ai/flows/resume-analysis-and-recommendations";
import type { z } from "zod";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredSkills: string[];
};

export type Candidate = {
  id: string;
  name: string;
  avatarUrl: string;
  skills: string[];
  experienceYears: number;
  location: string;
  resume: string;
};

export type CandidateRanking = z.infer<
  z.output<typeof rankCandidates>
>[number];

export type ResumeAnalysis = z.infer<z.output<typeof analyzeResume>>;

export type CareerPathSuggestion = z.infer<
  z.output<typeof getPersonalizedCareerPathSuggestions>
>;

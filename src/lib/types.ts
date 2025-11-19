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
  resume: string; // This can be resume text or a data URI
};

export type CandidateRanking = z.infer<
  z.output<typeof rankCandidates>
>[number];

export type ResumeAnalysis = z.infer<z.output<typeof analyzeResume>>;

export type CareerPathSuggestion = z.infer<
  z.output<typeof getPersonalizedCareerPathSuggestions>
>;

// Adding a new type for the mocked match breakdown
export type MatchBreakdown = {
    skills: { score: number; explanation: string };
    experience: { score: number; explanation: string };
    location: { score: number; explanation: string };
    extractionConfidence: { score: number; explanation: string };
    missingSkills: { skill: string; impact: string }[];
};

export type JobWithMatch = Job & {
    matchScore: number;
    breakdown: MatchBreakdown;
    interviewQuestions: string[];
};

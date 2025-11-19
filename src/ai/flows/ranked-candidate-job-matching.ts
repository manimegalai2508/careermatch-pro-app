'use server';

/**
 * @fileOverview Ranks candidates based on their suitability for a job posting.
 *
 * - rankCandidates - A function that ranks candidates for a job.
 * - RankCandidatesInput - The input type for the rankCandidates function.
 * - RankCandidatesOutput - The return type for the rankCandidates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CandidateSchema = z.object({
  id: z.string().describe('Unique identifier for the candidate'),
  skills: z.array(z.string()).describe('List of skills possessed by the candidate'),
  experienceYears: z.number().describe('Years of relevant experience'),
  location: z.string().describe('The location of the candidate'),
  resume: z.string().describe('The full text of the candidate resume'),
});

export type Candidate = z.infer<typeof CandidateSchema>;

const JobPostingSchema = z.object({
  id: z.string().describe('Unique identifier for the job posting'),
  title: z.string().describe('Title of the job'),
  description: z.string().describe('Full description of the job'),
  requiredSkills: z.array(z.string()).describe('List of required skills for the job'),
  location: z.string().describe('Location of the job'),
});

export type JobPosting = z.infer<typeof JobPostingSchema>;

const RankCandidatesInputSchema = z.object({
  job: JobPostingSchema.describe('The job posting to match candidates against'),
  candidates: z.array(CandidateSchema).describe('Array of candidate profiles to rank'),
});

export type RankCandidatesInput = z.infer<typeof RankCandidatesInputSchema>;

const CandidateRankingSchema = z.object({
  candidateId: z.string().describe('The ID of the candidate'),
  matchScore: z.number().describe('Overall match score (0-100)'),
  skillMatchScore: z.number().describe('Match score based on skills (0-100)'),
  experienceMatchScore: z.number().describe('Match score based on experience (0-100)'),
  locationMatchScore: z.number().describe('Match score based on location (0-100)'),
  matchExplanation: z.string().describe('Detailed explanation of the match score breakdown'),
});

export type CandidateRanking = z.infer<typeof CandidateRankingSchema>;

const RankCandidatesOutputSchema = z.array(CandidateRankingSchema).describe('Array of ranked candidate profiles');

export type RankCandidatesOutput = z.infer<typeof RankCandidatesOutputSchema>;

export async function rankCandidates(input: RankCandidatesInput): Promise<RankCandidatesOutput> {
  return rankCandidatesFlow(input);
}

const rankCandidatesPrompt = ai.definePrompt({
  name: 'rankCandidatesPrompt',
  input: {schema: RankCandidatesInputSchema},
  output: {schema: RankCandidatesOutputSchema},
  prompt: `You are an expert recruiter, skilled at evaluating candidates for a given job.

For each candidate, assess their suitability for the job based on the following factors:

*   Skills: How well do the candidate's skills match the required skills for the job?
*   Experience: How relevant is the candidate's experience to the job requirements?
*   Location: How close is the candidate's location to the job location?

Provide a match score (0-100) for each of these factors, as well as an overall match score.
Also, provide a detailed explanation of the match score breakdown, including specific examples of skills and experience that make the candidate a good or bad fit.

Job Posting:
Title: {{{job.title}}}
Description: {{{job.description}}}
Required Skills: {{#each job.requiredSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Location: {{{job.location}}}

{{#each candidates}}
Candidate ID: {{{this.id}}}
Candidate Skills: {{#each this.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Candidate Experience: {{{this.experienceYears}}} years
Candidate Location: {{{this.location}}}
Candidate Resume: {{{this.resume}}}

{{~/each}}


Return the output as a JSON array of CandidateRanking objects.
`, 
});

const rankCandidatesFlow = ai.defineFlow(
  {
    name: 'rankCandidatesFlow',
    inputSchema: RankCandidatesInputSchema,
    outputSchema: RankCandidatesOutputSchema,
  },
  async input => {
    const {output} = await rankCandidatesPrompt(input);
    return output!;
  }
);

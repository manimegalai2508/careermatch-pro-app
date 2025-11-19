// Implemented resume analysis and recommendations flow.

'use server';

/**
 * @fileOverview Analyzes a resume and provides feedback and suggestions for improvement.
 *
 * - analyzeResume - A function that analyzes a resume and provides feedback.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be analyzed.'),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalyzeResumeOutputSchema = z.object({
  overallScore: z
    .number()
    .describe('An overall score of the resume on a scale of 0 to 100.'),
  atsCompatibilityScore: z
    .number()
    .describe(
      'A score indicating how well the resume is likely to perform in Applicant Tracking Systems (ATS), on a scale of 0 to 100.'
    ),
  strengths: z.array(z.string()).describe('A list of identified strengths of the resume.'),
  weaknesses: z.array(z.string()).describe('A list of identified weaknesses of the resume.'),
  suggestions: z
    .array(z.string())
    .describe('A list of actionable suggestions to improve the resume.'),
  grammarCheck: z
    .string()
    .describe('A list of grammar issues to fix to make the resume more professional'),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const resumeAnalysisPrompt = ai.definePrompt({
  name: 'resumeAnalysisPrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert resume analyst. You will analyze the provided resume text and provide a score, list strengths and weaknesses, and provide suggestions for improvement.

Analyze the following resume:

{{{resumeText}}}

Provide your analysis in the following JSON format:
{
  "overallScore": number,
  "atsCompatibilityScore": number,
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[],
  "grammarCheck": string,
}

In the grammarCheck field, provide a detailed grammar check of the resume with specific corrections.
`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await resumeAnalysisPrompt(input);
    return output!;
  }
);

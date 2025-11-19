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
  resumeDataUri: z
    .string()
    .describe(
      "A resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
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
  missingPercentage: z
    .number()
    .describe(
      'A percentage representing how much key information is missing from the resume for a typical job in the target field.'
    ),
  strengths: z
    .array(z.string())
    .describe('A list of identified strengths of the resume.'),
  weaknesses: z
    .array(z.string())
    .describe('A list of identified weaknesses of the resume.'),
  suggestions: z
    .array(z.string())
    .describe(
      'A list of actionable suggestions to improve the resume, including why it might not match certain criteria.'
    ),
  grammarCheck: z
    .string()
    .describe(
      'A list of grammar issues to fix to make the resume more professional'
    ),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(
  input: AnalyzeResumeInput
): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const resumeAnalysisPrompt = ai.definePrompt({
  name: 'resumeAnalysisPrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert resume analyst and career coach for a platform called CareerMatch Pro. You will analyze the provided resume and provide a comprehensive, multi-faceted analysis to help the user improve it.

Analyze the following resume:
{{media url=resumeDataUri}}

Provide your analysis in the specified JSON format. Your goal is to be helpful, encouraging, and provide clear, actionable feedback.

- **overallScore**: Give a holistic score from 0-100 based on clarity, impact, and completeness.
- **atsCompatibilityScore**: Score from 0-100. Evaluate based on formatting, keywords, and standard sectioning (like "Work Experience", "Education"). Penalize for images, columns, and headers/footers that can confuse ATS parsers.
- **missingPercentage**: Estimate what percentage of crucial information (e.g., quantifiable achievements, key skills for a target industry, clear contact info) is missing. For example, if there are no metrics of success, that might account for a 20% deficit.
- **strengths**: Identify 3-4 key positive aspects of the resume. Be specific (e.g., "Excellent use of action verbs in the 'Experience' section").
- **weaknesses**: Identify 3-4 areas for improvement. Be constructive (e.g., "Achievements lack quantifiable metrics, making it hard to gauge impact.").
- **suggestions**: Provide concrete, actionable steps. For each weakness, explain *why* it's a problem and *how* to fix it. Example: "Add numbers to your achievements. Instead of 'Managed a team,' try 'Managed a team of 5 engineers to deliver the project 2 weeks ahead of schedule.' This demonstrates the scale and impact of your work."
- **grammarCheck**: Perform a thorough grammar and spelling check. List any errors found with the corrected versions. If none, state "No grammatical or spelling errors found. Excellent work!".`,
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

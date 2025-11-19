'use server';

/**
 * @fileOverview Provides personalized career path suggestions based on user's current skills and experience.
 *
 * - getPersonalizedCareerPathSuggestions - A function that returns career path suggestions.
 * - PersonalizedCareerPathSuggestionsInput - The input type for the getPersonalizedCareerPathSuggestions function.
 * - PersonalizedCareerPathSuggestionsOutput - The return type for the getPersonalizedCareerPathSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCareerPathSuggestionsInputSchema = z.object({
  currentSkills: z
    .string()
    .describe('A comma-separated list of the user\'s current skills.'),
  experience: z
    .string()
    .describe('A description of the user\'s work experience.'),
});
export type PersonalizedCareerPathSuggestionsInput = z.infer<
  typeof PersonalizedCareerPathSuggestionsInputSchema
>;

const PersonalizedCareerPathSuggestionsOutputSchema = z.object({
  careerPaths: z.array(
    z.object({
      title: z.string().describe('The title of the suggested career path.'),
      description: z.string().describe('A description of the career path.'),
      recommendedCourses: z
        .string()
        .describe('A comma-separated list of recommended courses.'),
      skillRoadmap: z
        .string()
        .describe('A comma-separated roadmap of skills to acquire.'),
    })
  ),
});
export type PersonalizedCareerPathSuggestionsOutput = z.infer<
  typeof PersonalizedCareerPathSuggestionsOutputSchema
>;

export async function getPersonalizedCareerPathSuggestions(
  input: PersonalizedCareerPathSuggestionsInput
): Promise<PersonalizedCareerPathSuggestionsOutput> {
  return personalizedCareerPathSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCareerPathSuggestionsPrompt',
  input: {schema: PersonalizedCareerPathSuggestionsInputSchema},
  output: {schema: PersonalizedCareerPathSuggestionsOutputSchema},
  prompt: `You are a career counselor. Based on the user's current skills and experience, you will suggest personalized career paths, recommended courses, and a skill roadmap.

Current Skills: {{{currentSkills}}}
Experience: {{{experience}}}

Suggest three potential career paths with courses and skill roadmaps to get there.`,
});

const personalizedCareerPathSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedCareerPathSuggestionsFlow',
    inputSchema: PersonalizedCareerPathSuggestionsInputSchema,
    outputSchema: PersonalizedCareerPathSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

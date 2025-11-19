'use server';

import { analyzeResume } from '@/ai/flows/resume-analysis-and-recommendations';
import { getPersonalizedCareerPathSuggestions } from '@/ai/flows/personalized-career-path-suggestions';
import { rankCandidates, type RankCandidatesInput } from '@/ai/flows/ranked-candidate-job-matching';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const resumeSchema = z.object({
  resume: z.string().min(1, "Please upload a resume file."),
});

export async function analyzeResumeAction(prevState: any, formData: FormData) {
  const validatedFields = resumeSchema.safeParse({
    resume: formData.get('resume'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const analysis = await analyzeResume({ resumeDataUri: validatedFields.data.resume });
    return { data: analysis };
  } catch (error) {
    console.error(error);
    return { error: "Failed to analyze resume. Please try again." };
  }
}

const careerPathSchema = z.object({
  currentSkills: z.string().min(3, "Please list at least one skill."),
  experience: z.string().min(10, "Please describe your experience in at least 10 characters."),
});

export async function getCareerPathAction(prevState: any, formData: FormData) {
    const validatedFields = careerPathSchema.safeParse({
        currentSkills: formData.get('currentSkills'),
        experience: formData.get('experience'),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const suggestions = await getPersonalizedCareerPathSuggestions(validatedFields.data);
        return { data: suggestions };
    } catch (error) {
        console.error(error);
        return { error: "Failed to generate career paths. Please try again." };
    }
}

export async function rankCandidatesAction(input: RankCandidatesInput) {
  try {
    const rankings = await rankCandidates(input);
    return { data: rankings };
  } catch (error) {
    console.error(error);
    return { error: "Failed to rank candidates. Please try again." };
  }
}

export async function createJobAction(prevState: any, formData: FormData) {
    // This is a mock action. In a real app, you'd save to a database.
    console.log("Creating job:", {
        title: formData.get('title'),
        location: formData.get('location'),
        description: formData.get('description'),
        requiredSkills: formData.get('requiredSkills'),
    });
    
    // Revalidate the jobs page to show the new job (if it were real)
    revalidatePath('/dashboard/recruiter/jobs');

    return { message: "Job created successfully." };
}

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
  experience: z.string().optional(),
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
        const suggestions = await getPersonalizedCareerPathSuggestions({
            currentSkills: validatedFields.data.currentSkills,
            experience: validatedFields.data.experience || "No professional experience listed."
        });
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

// In a real app, jobs and applications would be stored in a database.
// For now, we'll add to the in-memory array and revalidate.
import { jobs } from '@/lib/data';

const jobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    location: z.string().min(2, "Location must be at least 2 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    requiredSkills: z.string().min(1, "Please list at least one skill."),
});

export async function createJobAction(prevState: any, formData: FormData) {
    const validatedFields = jobSchema.safeParse({
        title: formData.get('title'),
        location: formData.get('location'),
        description: formData.get('description'),
        requiredSkills: formData.get('requiredSkills'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const { title, location, description, requiredSkills } = validatedFields.data;

    // This is a mock action. In a real app, you'd save to a database.
    const newJob = {
        id: `job-${Date.now()}`,
        title,
        location,
        description,
        requiredSkills: requiredSkills.split(',').map(s => s.trim()),
        company: "Your Company" // In a real app, this would come from the recruiter's profile
    };

    jobs.unshift(newJob); // Add to the beginning of the array
    
    // Revalidate pages that show the job list
    revalidatePath('/dashboard/recruiter/jobs');
    revalidatePath('/dashboard/job-matches');

    return { message: "Job created successfully." };
}

export async function applyForJobAction(jobId: string) {
    // In a real app, this would create an 'application' record in the database.
    console.log(`Applying for job: ${jobId}`);

    // Here you could trigger a notification to the recruiter.

    return { message: `Successfully applied for job ${jobId}.` };
}

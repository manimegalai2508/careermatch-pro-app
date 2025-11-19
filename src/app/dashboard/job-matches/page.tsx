import { jobs, candidates } from "@/lib/data";
import { JobMatchesClient } from "./_components/job-matches-client";
import type { JobWithMatch } from "@/lib/types";

// This function simulates the AI matching process.
// In a real app, this would be an API call to the backend.
function getMatchedJobs(): JobWithMatch[] {
    const candidate = candidates[0]; // Use the first candidate for simulation

    return jobs.map(job => {
        // Simulate a match score
        const matchScore = Math.floor(Math.random() * 51) + 50; // Random score between 50 and 100

        const missingSkills = job.requiredSkills.filter(skill => !candidate.skills.includes(skill));

        return {
            ...job,
            matchScore,
            breakdown: {
                skills: { score: Math.floor(Math.random() * 11) + 40, explanation: "Strong alignment with core technologies like React and TypeScript." },
                experience: { score: Math.floor(Math.random() * 6) + 15, explanation: "Relevant experience in web application development." },
                location: { score: 10, explanation: "Candidate is in the same location." },
                extractionConfidence: { score: Math.floor(Math.random() * 3) + 8, explanation: "High confidence in parsed resume data." },
                missingSkills: missingSkills.map(skill => ({ skill, impact: `-${Math.floor(Math.random() * 5) + 5}%` })),
            },
            interviewQuestions: [
                "Describe a challenging project you worked on with React. What was your role?",
                "How do you ensure type safety in a large TypeScript project?",
                "Explain your approach to state management in a complex Next.js application.",
                "How would you handle a disagreement with a product manager about a feature requirement?"
            ]
        };
    });
}

export default function JobMatchesPage() {
    const matchedJobs = getMatchedJobs();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Your Job Matches</h1>
                <p className="text-muted-foreground">
                    Here are the top jobs that match your profile, powered by AI.
                </p>
            </div>
            <JobMatchesClient jobs={matchedJobs} />
        </div>
    );
}

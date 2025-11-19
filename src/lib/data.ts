import type { Job, Candidate } from "@/lib/types";

export const jobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "Innovate Inc.",
    location: "San Francisco, CA",
    description: "Seeking a senior frontend engineer with experience in React, TypeScript, and Next.js to build our next-generation user interfaces.",
    requiredSkills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
  },
  {
    id: "job-2",
    title: "AI/ML Engineer",
    company: "DataDriven Co.",
    location: "New York, NY",
    description: "Join our AI team to develop cutting-edge machine learning models for natural language processing and computer vision.",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
  },
  {
    id: "job-3",
    title: "Product Manager",
    company: "Synergy Solutions",
    location: "Austin, TX",
    description: "Lead the product vision and roadmap for our flagship SaaS platform. Strong technical background and user empathy are a must.",
    requiredSkills: ["Product Management", "Agile", "Roadmapping", "User Research", "JIRA"],
  },
];

export const candidates: Candidate[] = [
  {
    id: "candidate-1",
    name: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=candidate-1",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL"],
    experienceYears: 7,
    location: "San Francisco, CA",
    resume: `Alice Johnson - Senior Software Engineer
      Experience: 7 years developing scalable web applications.
      Skills: Proficient in React, TypeScript, Next.js, and GraphQL.
      Projects: Led the development of a major e-commerce platform, improving performance by 30%.
    `,
  },
  {
    id: "candidate-2",
    name: "Bob Williams",
    avatarUrl: "https://i.pravatar.cc/150?u=candidate-2",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
    experienceYears: 5,
    location: "Boston, MA",
    resume: `Bob Williams - Machine Learning Engineer
      Experience: 5 years building and deploying ML models.
      Skills: Expertise in Python, TensorFlow, and PyTorch for NLP tasks.
      Education: M.S. in Computer Science with a focus on AI from MIT.
    `,
  },
  {
    id: "candidate-3",
    name: "Charlie Brown",
    avatarUrl: "https://i.pravatar.cc/150?u=candidate-3",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    experienceYears: 2,
    location: "San Francisco, CA",
    resume: `Charlie Brown - Junior Frontend Developer
      Experience: 2 years of experience in web development.
      Skills: Solid foundation in React, JavaScript, and modern CSS.
      Passion: Eager to learn and contribute to a fast-paced team.
    `,
  },
  {
    id: "candidate-4",
    name: "Diana Prince",
    avatarUrl: "https://i.pravatar.cc/150?u=candidate-4",
    skills: ["Product Management", "Agile", "Scrum", "User Stories", "Market Analysis"],
    experienceYears: 8,
    location: "Austin, TX",
    resume: `Diana Prince - Senior Product Manager
      Experience: 8 years leading cross-functional teams to deliver successful products.
      Skills: Expert in Agile methodologies, product roadmapping, and competitive analysis.
      Accomplishments: Grew user base by 200% for previous product.
    `,
  },
];

import type { Job, Candidate } from "@/lib/types";

export const jobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "Innovate India",
    location: "Bengaluru, Karnataka",
    description: "Seeking a senior frontend engineer with experience in React, TypeScript, and Next.js to build our next-generation user interfaces for the Indian market.",
    requiredSkills: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
  },
  {
    id: "job-2",
    title: "AI/ML Engineer",
    company: "DataDriven AI",
    location: "Hyderabad, Telangana",
    description: "Join our AI team to develop cutting-edge machine learning models for natural language processing and computer vision.",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
  },
  {
    id: "job-3",
    title: "Product Manager - FinTech",
    company: "Synergy Solutions",
    location: "Mumbai, Maharashtra",
    description: "Lead the product vision and roadmap for our flagship SaaS platform in the fintech space. Strong technical background and user empathy are a must.",
    requiredSkills: ["Product Management", "Agile", "Roadmapping", "User Research", "JIRA"],
  },
  {
    id: "job-4",
    title: "Full Stack Developer",
    company: "Tech-Verse",
    location: "Pune, Maharashtra",
    description: "We are looking for a versatile Full Stack Developer to design, develop, and maintain our web applications.",
    requiredSkills: ["Node.js", "React", "MongoDB", "Express.js", "REST APIs"],
  },
];

export const candidates: Candidate[] = [
  {
    id: "candidate-1",
    name: "Aisha Sharma",
    avatarUrl: "https://i.pravatar.cc/150?u=aisha-sharma",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL"],
    experienceYears: 7,
    location: "Bengaluru, Karnataka",
    resume: `Aisha Sharma - Senior Software Engineer
      Experience: 7 years developing scalable web applications.
      Skills: Proficient in React, TypeScript, Next.js, and GraphQL.
      Projects: Led the development of a major e-commerce platform, improving performance by 30%.
    `,
  },
  {
    id: "candidate-2",
    name: "Vikram Singh",
    avatarUrl: "https://i.pravatar.cc/150?u=vikram-singh",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
    experienceYears: 5,
    location: "Hyderabad, Telangana",
    resume: `Vikram Singh - Machine Learning Engineer
      Experience: 5 years building and deploying ML models.
      Skills: Expertise in Python, TensorFlow, and PyTorch for NLP tasks.
      Education: M.Tech in Computer Science with a focus on AI from IIT Bombay.
    `,
  },
  {
    id: "candidate-3",
    name: "Rohan Mehra",
    avatarUrl: "https://i.pravatar.cc/150?u=rohan-mehra",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    experienceYears: 2,
    location: "Bengaluru, Karnataka",
    resume: `Rohan Mehra - Junior Frontend Developer
      Experience: 2 years of experience in web development.
      Skills: Solid foundation in React, JavaScript, and modern CSS.
      Passion: Eager to learn and contribute to a fast-paced team.
    `,
  },
  {
    id: "candidate-4",
    name: "Priya Patel",
    avatarUrl: "https://i.pravatar.cc/150?u=priya-patel",
    skills: ["Product Management", "Agile", "Scrum", "User Stories", "Market Analysis"],
    experienceYears: 8,
    location: "Mumbai, Maharashtra",
    resume: `Priya Patel - Senior Product Manager
      Experience: 8 years leading cross-functional teams to deliver successful products.
      Skills: Expert in Agile methodologies, product roadmapping, and competitive analysis.
      Accomplishments: Grew user base by 200% for previous fintech product.
    `,
  },
];

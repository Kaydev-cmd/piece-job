export interface Skill {
    id: number;
    skillName: string;
}

export interface JobApplication {
    id: number;
    applicationDate: string;
    status: string;
    // These should ideally be the full objects after normalization
    jobPosted: number | PieceJobData;
    jobApplicant: number | JobApplicant;
}

export interface PieceJobData {
    id: number;
    title: string;
    description: string;
    location: string | null;
    payRate: number;
    releaseDate: string | null;
    expectedEndDate: string | null;
    specialRequirement: string | null;
    // Mix of Skill object and Skill ID
    skills: (number | Skill)[];
    // Mix of JobApplication object and JobApplication ID
    jobApplications: (number | JobApplication)[];
}

export interface JobApplicant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    skillSet: Skill[];
    jobsApplied: JobApplication[];
    jobsCompleted: JobApplication[];
}

// interface for the root object you receive
export interface RawEmployerResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyAddress: string;
    companyRegisterNumber: string;
    // Mix of Skill object and Skill ID
    skillsRequired: (number | Skill)[];
    // Mix of Job object, Job ID, and Job object with nested data
    jobsPosted: (number | PieceJobData)[];
}

// interface for the cleaned, normalized data structure
export interface NormalizedEmployerResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyAddress: string;
    companyRegisterNumber: string;
    skillsRequired: Skill[];
    jobsPosted: PieceJobData[]; // Now guaranteed to be Job objects
}
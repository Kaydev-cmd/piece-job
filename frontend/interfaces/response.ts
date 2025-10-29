import { Application, baseSeeker, JobPostData, SkillsProps } from ".";

export interface RawEmployerResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyAddress: string;
    companyRegisterNumber: string;
    // Mix of Skill object and Skill ID
    skillsRequired: (number | SkillsProps)[];
    // Mix of Job object, Job ID, and Job object with nested data
    jobsPosted: (number | PieceJob_PosterView)[];
}
export interface PieceJob_PosterView extends JobPostData{
    // Mix of Skill object and Skill ID
    // Mix of JobApplication object and JobApplication ID
    jobApplications: (number | JobApplication)[];
}
interface JobApplication extends Application{
    jobPosted: number | PieceJob_PosterView;
    // jobApplicant: number | JobApplicant;
}
export interface NormalizedEmployerResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyAddress: string;
    companyRegisterNumber: string;
    skillsRequired: SkillsProps[];
    jobsPosted: PieceJob_PosterView[]; 
}
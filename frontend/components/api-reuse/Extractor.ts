import { Application, JobPostData, JobPosterProfileCardProps, SkillsProps } from "@/interfaces";
import { JobApplicant } from "@/interfaces/response";

// Define utility interfaces for the normalization process
interface JobAppRaw {
    id: number;
    applicationDate: string;
    status: string;
    jobPosted: number | JobPostData;
    jobApplicant: number | JobApplicant;
}
interface Skill {
    id: number;
    skillName: string;
}

interface JobApplication {
    id: number;
    applicationDate: string;
    status: string;
    // These should ideally be the full objects after normalization
    jobPosted: number | Job;
    jobApplicant: number | JobApplicant | undefined;
}

interface Job {
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

// Interface for the root object you receive
interface RawEmployerResponse {
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
    jobsPosted: (number | JobPostData)[];
}
// Function to normalize the raw API response
export function normalizeToJobPosterProfile(rawData: RawEmployerResponse): JobPosterProfileCardProps {
    
    // 1. Create Lookup Maps (JobPostData, Skill, Application, JobApplicant)
    const jobMap: Map<number, JobPostData> = new Map();
    const skillMap: Map<number, SkillsProps> = new Map();
    const applicationMap: Map<number, JobAppRaw> = new Map();
    const applicantMap: Map<number, JobApplicant> = new Map();

    // Helper to add objects to a map and return the array of objects
    const extractObjects = <T extends { id: number }>(items: (number | T)[], map: Map<number, T>): T[] => {
        const objects: T[] = [];
        for (const item of items) {
            if (typeof item === 'object' && item !== null && 'id' in item) {
                map.set(item.id, item as T);
                objects.push(item as T);
            }
        }
        return objects;
    };

    // --- First Pass: Populate Maps with all known complete objects ---

    // Extract all skills from the top-level 'skillsRequired'
    extractObjects(rawData.skillsRequired || [], skillMap);

    // Extract all jobs from the top-level 'jobsPosted'
    const rawJobs = extractObjects(rawData.jobsPosted || [], jobMap) as (JobPostData & { jobApplications?: JobAppRaw[] })[];

    // Iterate through jobs to find all nested data (Applications, Applicants, Skills)
    for (const job of rawJobs) {
        // Extract Skills from this job
        extractObjects(job.skills || [], skillMap);

        // Extract Applications
        const rawApplications = extractObjects(job.jobApplications || [], applicationMap) as (JobAppRaw & { jobApplicant: JobApplicant })[];
        
        // Extract Applicants and their nested data
        for (const app of rawApplications) {
            // Check if jobApplicant is a full object (it is in the first job)
            if (typeof app.jobApplicant === 'object' && app.jobApplicant !== null && 'id' in app.jobApplicant) {
                const applicant = app.jobApplicant;
                applicantMap.set(applicant.id, applicant);

                // Extract Applicant's SkillSet
                extractObjects(applicant.skillSet || [], skillMap);

                // Extract nested JobApplications from the applicant's profile
                extractObjects(applicant.jobsApplied || [], applicationMap);
            }
        }
    }

    // --- 2. Resolution Helper: Replace IDs with Objects ---

    // Function to resolve an array of mixed IDs/Objects (e.g., jobsPosted, skills)
    const resolveArray = <T extends { id: number }>(mixedArray: (number | T)[], map: Map<number, T>): T[] => {
        return (mixedArray || [])
            .map(item => {
                if (typeof item === 'number') {
                    const resolvedItem = map.get(item);
                    // Return the object if found, or undefined to be filtered out
                    return resolvedItem;
                }
                return item; // It's already an object
            })
            .filter((item): item is T => item !== undefined); // Remove unresolved IDs
    };

    // --- 3. Normalization Functions for Nested Types (Recursive Resolution) ---

    // Normalizes a single JobPostData item's nested arrays
    const normalizeJobPost = (job: JobPostData): JobPostData => {
        const normalizedJob = { ...job };
        
        // Resolve skills to full objects
        (normalizedJob as JobPostData).skills = resolveArray(normalizedJob.skills as (number | SkillsProps)[], skillMap) as SkillsProps[];
        
        // NOTE: JobPostData does not include jobApplications, but if it did, 
        // they would be resolved here. We'll use the 'Application' interface
        // if we needed to resolve them fully inside the job.
        
        return normalizedJob;
    };
    
    // Normalizes an Application item (resolving its nested jobApplicant and jobPosted)
    const normalizeApplication = (app: JobAppRaw): Application => {
        const normalizedApp: JobApplication = { ...app };
        
        // Resolve jobApplicant ID to full object
        if (typeof normalizedApp.jobApplicant === 'number') {
            const resolvedApplicant = applicantMap.get(normalizedApp.jobApplicant);
            normalizedApp.jobApplicant = resolvedApplicant;
        } else if (normalizedApp.jobApplicant) {
            // The full object is present, but ensure its skills are resolved
            (normalizedApp.jobApplicant as JobApplicant).skillSet = resolveArray(
                (normalizedApp.jobApplicant as JobApplicant).skillSet as (number | SkillsProps)[],
                skillMap
            );
        }

        // Resolve jobPosted (though the target Application interface doesn't strictly need it, 
        // we'll clean it up to prevent the 'number' type)
        if (typeof normalizedApp.jobPosted === 'number') {
             const resolvedJob = jobMap.get(normalizedApp.jobPosted);
             // Replace with job title/location if needed, or remove, or keep the ID
             // For safety, we keep the ID or the object
             normalizedApp.jobPosted = resolvedJob ? normalizeJobPost(resolvedJob) : normalizedApp.jobPosted;
        } else if (normalizedApp.jobPosted) {
             normalizedApp.jobPosted = normalizeJobPost(normalizedApp.jobPosted as JobPostData);
        }

        return normalizedApp as Application;
    };
    
    // --- 4. Final Construction of JobPosterProfileCardProps ---

    // a. Resolve the top-level 'jobsPosted' array
    const resolvedJobs = resolveArray(rawData.jobsPosted || [], jobMap);
    
    // b. Normalize each resolved job (resolving its nested skills)
    const finalJobsPosted: JobPostData[] = resolvedJobs.map(normalizeJobPost);
    
    // c. Build the final object, mapping raw fields to target interface fields
    const normalizedProfile: JobPosterProfileCardProps = {
        id: rawData.id,
        firstName: rawData.firstName,
        lastName: rawData.lastName,
        companyName: rawData.companyName,
        companyAddress: rawData.companyAddress,
        
        // Populate the normalized array
        jobsPosted: finalJobsPosted,
        
        // Optional fields inferred/calculated from data (or left undefined/null)
        postedJobs: finalJobsPosted.length,
        activeJobs: finalJobsPosted.length, // Assuming all posted are active
        
        // Other fields not present in the raw JSON are omitted or default (undefined)
        userImage: undefined, 
        userRating: undefined, 
        numberOfReviews: undefined,
        isVerified: undefined,
        biography: undefined,
    };
    
    return normalizedProfile;
}
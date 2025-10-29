import React, { useEffect, useState } from "react";
import { Application, baseSeeker, Job, JobPostData, JobPosterProfileCardProps, SkillsProps } from "@/interfaces";
import JobPosterProfileCard from "@/components/common/JobPosterProfileCard";
import Back from "@/components/common/Back";
import BusinessInfoCard from "@/components/common/BusinessInfoCard";
import { useAPIRequster } from "@/components/api-reuse/ApiRequester";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { JOB_SEEKER_REVIEWS_AND_RATINGS_DATA } from "@/constants";
import { motion } from "motion/react";
import { FaStar } from "react-icons/fa6";
import { IoMdTrendingUp } from "react-icons/io";
import { SlSpeech } from "react-icons/sl";
import Pill from "@/components/common/Pill";
import { JobApplicant, JobApplication, NormalizedEmployerResponse, PieceJobData, RawEmployerResponse, Skill } from "@/interfaces/response";

const JobPosterProfilePage = () => {
  const { baseUrl, loggedInToken, loggedUser } = useAuth();
  const { loading, setLoading, loadingScreen } = useAPIRequster();
  const [user, setUser] = useState({} as JobPosterProfileCardProps);

  const fetchEmployerProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/business/user`, {
        headers: {
          Authorization: "Bearer " + loggedInToken,
        },
      });
      console.log("res: ", response);
      setUser( normalizeToJobPosterProfile( response.data.data));
    } catch (error: unknown) {
      console.error("error occured: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerProfile();
  }, [loggedInToken]);
// Define utility interfaces for the normalization process
interface JobAppRaw {
    id: number;
    applicationDate: string;
    status: string;
    jobPosted: number | JobPostData;
    jobApplicant: number | JobApplicant;
}

// Function to normalize the raw API response
function normalizeToJobPosterProfile(rawData: any): JobPosterProfileCardProps {
    
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
        (normalizedJob as any).skills = resolveArray(normalizedJob.skills as (number | SkillsProps)[], skillMap) as SkillsProps[];
        
        // NOTE: JobPostData does not include jobApplications, but if it did, 
        // they would be resolved here. We'll use the 'Application' interface
        // if we needed to resolve them fully inside the job.
        
        return normalizedJob;
    };
    
    // Normalizes an Application item (resolving its nested jobApplicant and jobPosted)
    const normalizeApplication = (app: JobAppRaw): Application => {
        const normalizedApp: any = { ...app };
        
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

// Example usage in your React/TypeScript component:
// const normalizedData = normalizeData(yourJsonResponse);
// setAppState(normalizedData);

  if (loading) return loadingScreen;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section
        className="container"
        style={{ paddingBottom: "0", paddingTop: "32px" }}
      >
        <div
          className="flex justify-center md:justify-start"
          style={{ marginBottom: "32px" }}
        >
          {/* Back */}
          <Back />
        </div>

        <div className="lg:grid grid-cols-1 gap-4">
          {/* User Profile component here... */}
          <div className="grid grid-cols-1  lg:grid-cols-2  gap-4">
            {/* JobPosterProfileCard component here...  */}
            <JobPosterProfileCard
              key={user.id}
              id={user.id}
              userImage={user.userImage}
              lastName={user.lastName}
              firstName={user.firstName}
              companyAddress={user.companyAddress}
              userRating={user.userRating}
              numberOfReviews={user.numberOfReviews}
            />
            {/* Additional components added here */}
            <div>
              <BusinessInfoCard
                key={user.id}
                id={user.id}
                companyName={user.companyName}
                biography={user.biography}
                jobsPosted={user.jobsPosted}
                activeJobs={user.activeJobs}
              />
            </div>
          </div>

          {/* Recent Job Postings here... */}
          <div
            style={{ marginTop: "32px" }}
            className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
          >
            <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold">
              <IoMdTrendingUp size={22} color="#1D4ED8" /> Recent Job Postings
            </h1>
            <div className="w-full">
              <div
                style={{ padding: "16px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4"
              >
                {user.jobsPosted?.map((job, index) => (
                  <div
                    key={index}
                    style={{ padding: "16px" }}
                    className="card flex flex-col gap-4 bg-blue-300/20 rounded-xl"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{job.title}</h2>
                        <p className="text-gray-900 font-semibold">
                          {job.jobApplications.length} applicants
                        </p>
                        <p className="text-sm text-slate-600">
                          {job.timePosted}
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Pill title="status" variant="active" />
                      </div>
                    </div>

                    <div
                      className="flex items-center text-lg"
                      style={{ marginTop: "8px" }}
                    >
                      <span className="font-semibold">Budget</span> : R
                      {job.payRate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews and Ratings here.. */}
          <div
            style={{ marginTop: "32px" }}
            className="card flex flex-col justify-center gap-4 bg-gray-300/30 rounded-xl"
          >
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              <SlSpeech size={20} color="#1D4ED8" /> Reviews & Ratings
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {JOB_SEEKER_REVIEWS_AND_RATINGS_DATA.filter(
                (review) => review.userName === user.companyName
              ).map((review) => (
                <div
                  key={review.id}
                  style={{ marginBottom: "24px", padding: "16px" }}
                  className="bg-blue-300/20 rounded-xl shadow-md hover:shadow-lg w-full"
                >
                  <h2 className="text-lg font-bold">{review.description}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-900">{review.userName}</p>
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 fill-warning text-warning" />
                      {review.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default JobPosterProfilePage;

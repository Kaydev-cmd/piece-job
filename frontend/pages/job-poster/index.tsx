import React, { useEffect, useState } from "react";
import { Application, baseSeeker, Job, JobPosterProfileCardProps, SkillsProps } from "@/interfaces";
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
      setUser(response.data.data);
    } catch (error: unknown) {
      console.error("error occured: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerProfile();
  }, [loggedInToken]);
  
function normalizeData(rawData: RawEmployerResponse): NormalizedEmployerResponse {
    // 1. Create lookup maps
    const jobMap: Map<number, PieceJobData> = new Map();
    const skillMap: Map<number, Skill> = new Map();
    const applicantMap: Map<number, JobApplicant> = new Map();
    const applicationMap: Map<number, JobApplication> = new Map();

    // Helper to extract objects from a mixed array
    const extractObjects = <T extends { id: number }>(items: (number | T)[], map: Map<number, T>): T[] => {
        const objects: T[] = [];
        for (const item of items) {
            if (typeof item === 'object' && item !== null) {
                map.set(item.id, item);
                objects.push(item);
            }
        }
        return objects;
    };

    // Extract Skills (from top level and nested in jobsPosted)
    extractObjects(rawData.skillsRequired, skillMap);

    // Extract Jobs and Applicants/Applications from the jobsPosted array
    const rawJobs = extractObjects(rawData.jobsPosted, jobMap);

    // Process nested structures within Jobs
    for (const job of rawJobs) {
        // Extract Skills from job.skills
        extractObjects(job.skills, skillMap);

        // Extract Applications from job.jobApplications
        const rawApplications = extractObjects(job.jobApplications, applicationMap);

        // Extract Applicants and nested Applications from each Application
        for (const application of rawApplications) {
            if (typeof application.jobApplicant === 'object' && application.jobApplicant !== null) {
                const applicant = application.jobApplicant as JobApplicant;
                applicantMap.set(applicant.id, applicant);
                
                // Extract skills from applicant.skillSet
                extractObjects(applicant.skillSet, skillMap);
                
                // Extract nested applications and jobs from applicant.jobsApplied
                for (const appliedJobApp of applicant.jobsApplied) {
                     if (typeof appliedJobApp === 'object' && appliedJobApp !== null) {
                         applicationMap.set(appliedJobApp.id, appliedJobApp);
                         
                         // Extract the job posted within the application
                         if (typeof appliedJobApp.jobPosted === 'object' && appliedJobApp.jobPosted !== null) {
                            jobMap.set(appliedJobApp.jobPosted.id, appliedJobApp.jobPosted);
                            // Also extract skills from the job
                            extractObjects(appliedJobApp.jobPosted.skills, skillMap);
                        }
                     }
                }
            }
        }
    }

    // --- 2. Iterate and Replace IDs with Objects ---

    // Function to resolve an array of mixed IDs/Objects
    const resolveArray = <T extends { id: number }>(mixedArray: (number | T)[], map: Map<number, T>): T[] => {
        return mixedArray.map(item => {
            if (typeof item === 'number') {
                const resolvedItem = map.get(item);
                if (resolvedItem) return resolvedItem;
                // If ID is not found, you might return undefined, throw an error, or log a warning
                console.warn(`Missing item with ID: ${item}`);
                return undefined;
            }
            return item;
        }).filter((item): item is T => item !== undefined); // Remove any unresolved IDs
    };
    
    // Normalize Applications and recursively apply to nested objects
    const normalizeApplication = (app: JobApplication): JobApplication => {
        const normalizedApp = { ...app };
        
        // Resolve jobPosted ID
        if (typeof normalizedApp.jobPosted === 'number') {
            const resolvedJob = jobMap.get(normalizedApp.jobPosted);
            if (resolvedJob) normalizedApp.jobPosted = resolvedJob;
        } else if (normalizedApp.jobPosted) {
             // If it's an object, make sure its nested arrays are resolved
             normalizedApp.jobPosted = normalizeJob(normalizedApp.jobPosted as PieceJobData);
        }

        // Resolve jobApplicant ID
        if (typeof normalizedApp.jobApplicant === 'number') {
            const resolvedApplicant = applicantMap.get(normalizedApp.jobApplicant);
            if (resolvedApplicant) normalizedApp.jobApplicant = normalizeApplicant(resolvedApplicant);
        } else if (normalizedApp.jobApplicant) {
            normalizedApp.jobApplicant = normalizeApplicant(normalizedApp.jobApplicant as JobApplicant);
        }
        
        return normalizedApp;
    };

    // Normalize Jobs (resolving nested skills and applications)
    const normalizeJob = (job: PieceJobData): PieceJobData => {
        const normalizedJob = { ...job } as any; // Use 'any' temporarily to handle the mixed type being overwritten
        
        normalizedJob.skills = resolveArray(job.skills, skillMap);
        
        // Resolve applications and their nested data
        normalizedJob.jobApplications = resolveArray(job.jobApplications, applicationMap)
                                       .map(normalizeApplication);
                                       
        return normalizedJob as PieceJobData;
    };
    
    // Normalize Applicants (resolving nested skills and applications)
    const normalizeApplicant = (applicant: JobApplicant): JobApplicant => {
        const normalizedApplicant = { ...applicant };
        
        normalizedApplicant.skillSet = resolveArray(applicant.skillSet, skillMap);
        
        normalizedApplicant.jobsApplied = applicant.jobsApplied
                                          .map(app => (typeof app === 'number') ? applicationMap.get(app) : app)
                                          .filter((app): app is JobApplication => app !== undefined)
                                          .map(normalizeApplication);

        normalizedApplicant.jobsCompleted = applicant.jobsCompleted
                                            .map(app => (typeof app === 'number') ? applicationMap.get(app) : app)
                                            .filter((app): app is JobApplication => app !== undefined)
                                            .map(normalizeApplication);
                                            
        return normalizedApplicant;
    }


    // Apply normalization to the top-level arrays
    const normalizedJobsPosted = resolveArray(rawData.jobsPosted, jobMap).map(normalizeJob);
    const normalizedSkillsRequired = resolveArray(rawData.skillsRequired, skillMap);

    // Construct the final, normalized response
    return {
        ...rawData,
        skillsRequired: normalizedSkillsRequired,
        jobsPosted: normalizedJobsPosted
    } as NormalizedEmployerResponse;
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

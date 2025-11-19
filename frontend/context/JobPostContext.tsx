import { JobPostContextType, JobPostData } from "@/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "./AuthContext";
import { useAPIRequster } from "@/components/api-reuse/ApiRequester";

const JobPostContext = createContext<JobPostContextType | undefined>(undefined);

export const JobPostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobFeed, setJobFeed] = useState<JobPostData[]>([]);

  // Store current form draft
  const [draftJob, setDraftJob] = useState<Partial<JobPostData>>({});

  
  // useEffect(() => {
  //   fetchJobs();
  // }, [loggedInToken, loggedUser]);


  // Update the draft form data
  const updateJobData = (data: Partial<JobPostData>) => {
    setDraftJob((prev) => ({ ...prev, ...data }));
  };

  // const requesting = loading;
 
  const resetJobData = () => setDraftJob({});

  return (
    <JobPostContext.Provider
      value={{
        draftJob,
        jobFeed,
        setJobFeed,
        updateJobData,
        // postJob,
        resetJobData,
        // editJob,
        // deleteJob,
        // fetchJobs,
        // requesting,
      }}
    >
      {children}
    </JobPostContext.Provider>
  );
};

export const useJobPost = (): JobPostContextType => {
  const context = useContext(JobPostContext);

  if (!context) {
    throw new Error("useJobPost must be used within JobPostProvider");
  }
  return context;
};

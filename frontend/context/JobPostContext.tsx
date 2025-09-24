import { JobPostContextType, JobPostData } from "@/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const JobPostContext = createContext<JobPostContextType | undefined>(undefined);

export const JobPostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Store all job posts
  const [jobFeed, setJobFeed] = useState<JobPostData[]>([]);

  // Store current form draft
  const [draftJob, setDraftJob] = useState<Partial<JobPostData>>({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs/jobs");
        setJobFeed(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  // Update the draft form data
  const updateJobData = (data: Partial<JobPostData>) => {
    setDraftJob((prev) => ({ ...prev, ...data }));
  };

  // Post the draft as a new job in the feed
  const postJob = async (data?: Partial<JobPostData>) => {
    const jobToPost = data ?? draftJob;

    try {
      const res = await axios.post("/api/jobs/jobs", jobToPost);
      const createdJob = res.data;
      setJobFeed((prev) => [...prev, createdJob]);
    } catch (err) {
      console.error("Failed to post job:", err);
    }
  };

  const resetJobData = () => setDraftJob({});

  return (
    <JobPostContext.Provider
      value={{ draftJob, jobFeed, updateJobData, postJob, resetJobData }}
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

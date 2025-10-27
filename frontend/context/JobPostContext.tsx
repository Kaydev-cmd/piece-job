import { JobPostContextType, JobPostData } from "@/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useAPIRequster } from "@/components/api-reuse/ApiRequester";

const JobPostContext = createContext<JobPostContextType | undefined>(undefined);

export const JobPostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzMTAiLCJpYXQiOjE3NjExNTAwNjEsImV4cCI6MTc2MTI1ODA2MX0.FtLPqCzGFvyzep2VICvefJLqiirY1J2O1LM98ckONNA";
  const { baseUrl, loggedInToken, loggedUser } = useAuth();
  const { loading, setLoading } = useAPIRequster();
  // const loggedInToken = useAuth()
  // Store all job posts
  const [jobFeed, setJobFeed] = useState<JobPostData[]>([]);

  // Store current form draft
  const [draftJob, setDraftJob] = useState<Partial<JobPostData>>({});
  const fetchJobs = async () => {
    console.log("Job Context: ", loggedInToken);
    if (!loggedInToken) {
      setJobFeed([]);
      return;
    }
    try {
      setLoading(true);

      if (loggedUser.role === null) {
        console.error("something went wrong, logged user is null");
        return;
      }

      const feedUrlBasedOnRole =
        loggedUser.role === "employer" ? "/jobs" : "/piece-jobs";

      const res = await axios.get(baseUrl + feedUrlBasedOnRole, {
        headers: {
          Authorization: `Bearer ${loggedInToken}`,
        },
      });

      console.log("Fetched jobs:", res);

      setJobFeed(res.data.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [loggedInToken, loggedUser]);

  // Update the draft form data
  const updateJobData = (data: Partial<JobPostData>) => {
    setDraftJob((prev) => ({ ...prev, ...data }));
  };

  const requesting = loading;
  // Post the draft as a new job in the feed
  const postJob = async (data?: Partial<JobPostData>) => {
    const jobToPost = data ?? draftJob;

    try {
      setLoading(true);
      const res = await axios.post(baseUrl + "/jobs", jobToPost, {
        headers: {
          Authorization: `Bearer ${loggedInToken}`,
        },
      });
      const createdJob = res.data;
      console.log("Posted job: ", createdJob);
      setLoading(false);
      setJobFeed((prev) => [...prev, createdJob]);
    } catch (err) {
      setLoading(false);
      console.error("Failed to post job:", err);
    }
  };

  // Edit the posted job
  const editJob = async (id: number, updatedFields: Partial<JobPostData>) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${baseUrl}/jobs/${id}`,
        {
          id,
          ...updatedFields,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedInToken}`,
          },
        }
      );
      const updatedJob = res.data.data;
      // console.log("Edited job: ", updatedJob);
      setLoading(false);
      setJobFeed((prev) =>
        prev.map((job) => (job.id === id ? updatedJob : job))
      );
    } catch (err) {
      setLoading(false);
      console.error("Failed to update job:", err);
    }
  };

  // Delete the posted job
  const deleteJob = async (id: number) => {
    console.log("Deleting job: ", loggedInToken);
    try {
      setLoading(true);
      await axios.delete(`${baseUrl}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${loggedInToken}`,
        },
      });
      setLoading(false);

      setJobFeed((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
      setLoading(false);
    }
  };

  const resetJobData = () => setDraftJob({});

  return (
    <JobPostContext.Provider
      value={{
        draftJob,
        jobFeed,
        setJobFeed,
        updateJobData,
        postJob,
        resetJobData,
        editJob,
        deleteJob,
        fetchJobs,
        requesting,
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

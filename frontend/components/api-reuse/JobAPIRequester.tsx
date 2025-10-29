import { useAuth } from "@/context/AuthContext";
import { useJobPost } from "@/context/JobPostContext";
import axios, { AxiosError } from "axios";
import React from "react";
import { useAPIRequster } from "./ApiRequester";
import { JobPostData } from "@/interfaces";

export default function useJobAPIRequester(){
    const {setJobFeed} = useJobPost() ;
    const { baseUrl, loggedInToken, loggedUser } = useAuth();
    const { loading, setLoading } = useAPIRequster();
    
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
        } catch (err: unknown) {
          if (err instanceof AxiosError)
            console.error("Failed to fetch jobs:", err);
          /**
           * if error is a 404 
           * then redirect usre to make a profile.
           * if error
           * 
           * 500
           * tell usre of sever backend error
           * 
           */
    
          
        }
        finally {
          setLoading(false);
        }
    };

     // Post the draft as a new job in the feed
    const postJob = async (data?: Partial<JobPostData>) => {
        const jobToPost = data ?? {};

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
  return {fetchJobs,postJob,editJob, deleteJob, loading}
}
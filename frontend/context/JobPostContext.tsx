import { JobPostContextType, JobPostData } from "@/interfaces";
import React, { createContext, useContext, useState } from "react";

const JobPostContext = createContext<JobPostContextType | undefined>(undefined);

export const JobPostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobData, setJobData] = useState<Partial<JobPostData>>({});

  const updateJobData = (data: Partial<JobPostData>) => {
    setJobData((prev) => ({ ...prev, ...data }));
  };

  const resetJobData = () => setJobData({});

  return (
    <JobPostContext.Provider value={{ jobData, updateJobData, resetJobData }}>
      {children}
    </JobPostContext.Provider>
  );
};

export const useJobPost = (): JobPostContextType => {
  const context = useContext(JobPostContext);

  if (!context) {

    throw new Error("useJobPost must be used within JobPostProvider");
  }
  return context
};

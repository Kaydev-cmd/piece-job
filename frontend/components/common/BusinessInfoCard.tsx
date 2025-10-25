import { JobPosterProfileCardProps } from "@/interfaces";
import React from "react";
import { FaMedal } from "react-icons/fa";

const BusinessInfoCard: React.FC<JobPosterProfileCardProps> = ({
  companyName,
  biography,
  jobsPosted,
  activeJobs,
}) => {
  return (
    <div className="card flex flex-col gap-6 bg-gray-300/30 rounded-xl">
      <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold">
        <FaMedal size={20} color="#22C55E" /> Business Information
      </h1>
      <div
        className="flex flex-col items-center gap-4"
        style={{ marginBottom: "14px" }}
      >
        <h3 className="text-xl font-semibold">{companyName}</h3>
        <p className="text-center"> {biography}</p>
      </div>
      <div className="flex flex-col text-center items-center md:flex-row md:justify-center gap-10">
        <div className="flex flex-col items-center">
          {jobsPosted && (
            <p className="text-xl font-bold">{jobsPosted.length}</p>
          )}
          <p className="font-bold">Posted Jobs</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">{activeJobs ? activeJobs : 0}</p>
          <p className="font-bold">Active Jobs</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoCard;

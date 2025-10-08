import { JobPosterProfileCardProps } from "@/interfaces";
import React from "react";
import { FaMedal } from "react-icons/fa";

const BusinessInfoCard: React.FC<JobPosterProfileCardProps> = ({
  businessName,
  biography,
  postedJobs,
  activeJobs,
}) => {
  return (
    <div className="card flex flex-col  items-center gap-8 justify-center bg-gray-300/30 shadow-md hover:shadow-lg transition-shadow rounded-xl">
      <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold self-start  ">
        <FaMedal size={20} color="#22C55E" /> Business Information
      </h1>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg md:text-2xl text-muted-foregroundfont  font-semibold ">
          {businessName}
        </h3>
        <p className="text-center px-4 font-semibold "> {biography}</p>
      </div>
      <div className="flex flex-col text-center md:flex-row gap-10 px-4 hover:underline">
        <div className="flex flex-col  items-center">
          {postedJobs !== undefined && (
            <p className="text-lg font-bold">{postedJobs}</p>
          )}
          <p className="text-sm text-muted-foreground font-bold">Posted Jobs</p>
        </div>
        <div className="flex flex-col items-center">
          {activeJobs !== undefined && (
            <p className="text-lg font-bold">{activeJobs}</p>
          )}
          <p className="text-sm text-muted-foreground  font-bold">
            Active Jobs
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoCard;

import React from "react";
import { JobSeekerRecentJobsCardProps } from "@/interfaces";
import { FaStar } from "react-icons/fa";

const JobSeekerRecentJobsCard: React.FC<JobSeekerRecentJobsCardProps> = ({
  jobTitle,
  client,
  date,
  description,
  rating,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{jobTitle}</h1>
      <p className="font-semibold">Client: {client}</p>
      <p>{description}</p>
      <div className="flex items-center justify-between">
        <p className="text-slate-700">{date}</p>
        <div className="flex items-center gap-1">
          {/* Rating */}
          <FaStar size={16} color="#FFC107" />
          <p className="text-lg">{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerRecentJobsCard;

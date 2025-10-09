import React from "react";
import { RxLightningBolt } from "react-icons/rx";
import { JobReviewCardProps } from "@/interfaces";

const JobPreview: React.FC<JobReviewCardProps> = ({
  jobTitle,
  description,
  location,
  pay,
  duration,
}) => {
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {/* Icon here... */}
        <RxLightningBolt size={20} color="#EAB308" />
        <h1 className="text-2xl font-bold">Job Preview</h1>
      </div>

      {/* Stats here... */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <p>
          <span className="font-bold">Title: </span>
          {jobTitle}
        </p>

        {/* Description */}
        <p>
          <span className="font-bold">Description: </span>
          {description}
        </p>

        {/* Location */}
        <p>
          <span className="font-bold">Location: </span>
          {location}
        </p>

        {/* Pay */}
        <p>
          <span className="font-bold">Pay: </span>R{pay}
        </p>

        {/* Duration */}
        <p>
          <span className="font-bold">Duration: </span>
          {duration}
        </p>
      </div>
    </div>
  );
};

export default JobPreview;

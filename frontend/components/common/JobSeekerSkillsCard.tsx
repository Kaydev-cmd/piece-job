import React from "react";
import { FaMedal } from "react-icons/fa";
import Pill from "./Pill";
import { JobSeekerProfileCardProps } from "@/interfaces";
import { JOB_SEEKER_PROFILE_DATA } from "@/constants";

const JobSeekerSkillsCard: React.FC<JobSeekerProfileCardProps> = ({
  id,
  description,
}) => {
  return (
    <div className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl">
      <div className="flex items-center gap-2">
        {/* Icon here... */}
        <FaMedal size={20} color="#22C55E" />
        <h1 className="text-3xl font-bold">Skills</h1>
      </div>

      {/* Skills here... */}
      <div className="flex items-center flex-wrap gap-2">
        {JOB_SEEKER_PROFILE_DATA.map((seeker) =>
          seeker.skills.map((skill, index) => (
            <Pill
              key={`${seeker.id}-${index}`}
              title={skill}
              variant="topRated"
            />
          ))
        )}
      </div>

      {/* Description here... */}
      <p>{description}</p>
    </div>
  );
};

export default JobSeekerSkillsCard;

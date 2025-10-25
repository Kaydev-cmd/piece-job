import React from "react";
import { FaMedal } from "react-icons/fa";
import Pill from "./Pill";
import { JobSeekerSkillsCardProps } from "@/interfaces";

const JobSeekerSkillsCard: React.FC<JobSeekerSkillsCardProps> = ({
  description,
  skills,
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
        {skills.map((skill, index) => (
          <Pill
            key={`${skill.id}-${index}`}
            title={skill.skillName}
            variant={skill.priorityLevel?skill.priorityLevel: "default"}
          />
        ))}
      </div>

      {/* Description here... */}
      <p>{description}</p>
    </div>
  );
};

export default JobSeekerSkillsCard;

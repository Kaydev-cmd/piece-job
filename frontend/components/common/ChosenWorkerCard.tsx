import React from "react";
import Pill from "./Pill";
import { ChosenWorkerCardProps } from "@/interfaces";
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";

const ChosenWorkerCard: React.FC<ChosenWorkerCardProps> = ({
  id,
  initials,
  fullName,
  rating,
  jobsCompleted,
  status,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 2xl:flex-row 2xl:justify-between">
      <div className="flex flex-col items-center gap-4 2xl:flex-row 2xl:justify-between">
        {/* Initials here... */}
        <div
          className="bg-[linear-gradient(135deg,#1D4ED8,#10B981)] rounded-full"
          style={{ padding: "16px" }}
        >
          <p className="text-white text-2xl">{initials}</p>
        </div>

        {/* Fullname, rating, and jobs completed */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">{fullName}</h1>
          <div className="flex flex-col gap-2 2xl:flex-row 2xl:items-center">
            {/* Rating here... */}
            <div className="flex gap-1 items-center justify-center">
              {/* Icon here... */}
              <FaStar size={14} color="#FFD700" />
              <p className="text-xl">{rating}</p>
            </div>

            <LuDot size={20} className="hidden 2xl:flex" />

            {/* Jobs completed */}
            <div className="flex justify-center xl:text-lg">
              <p>{jobsCompleted} jobs completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pill goes here... */}
      <div>
        <Pill title={status} variant="topRated" />
      </div>
    </div>
  );
};

export default ChosenWorkerCard;

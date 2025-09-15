import React from "react";
import { LuUsersRound } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";

const TipsForSuccess = () => {
  return (
    <div className="card flex flex-col gap-6 bg-gray-300/30 rounded-xl">
      <h1 className="text-3xl font-bold">💡 Tips for Success</h1>

      <div className="flex flex-col justify-between gap-4">
        {/* Be specific here... */}
        <div className="flex gap-3 items-center">
          {/* Icon here... */}
          <LuUsersRound size={40} color="#3B82F6" />
          <p>
            <span className="font-bold">Be specific</span> about what you need
            done to attract the right candidates
          </p>
        </div>

        {/* Fair Pricing here... */}
        <div className="flex gap-3 items-center">
          {/* Icon here... */}
          <FaDollarSign size={28} color="#22C55E" />
          <p>
            <span className="font-bold">Fair pricing</span> gets better
            responses and quality work
          </p>
        </div>

        {/* Realistic Timelines here... */}
        <div className="flex gap-3 items-center">
          {/* Icon here... */}
          <FaRegClock size={36} color="#EAB308" />
          <p>
            <span className="font-bold">Realistic timelines</span> help workers
            plan and deliver better results
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipsForSuccess;

import React from "react";
import Image from "next/image";
import { JobSeekerReviewsAndRatingsCardProps } from "@/interfaces";
import { LuUserRound } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

const JobSeekerReviewsAndRatingsCard: React.FC<
  JobSeekerReviewsAndRatingsCardProps
> = ({ id, userImage, userName, rating, description }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Username and Image here... */}
      <div className="flex items-center gap-2">
        <div>
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={500}
              height={500}
              className="w-full rounded-full"
            />
          ) : (
            <div
              className="bg-gray-200 rounded-full"
              style={{ padding: "8px" }}
            >
              <LuUserRound size={20} />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold">{userName}</h2>
      </div>

      {/* Description here... */}
      <div>
        <p className="text-slate-600">{description}</p>
      </div>

      {/* Icons here... */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar size={20} />
          <FaStar size={20} />
          <FaStar size={20} />
          <FaStar size={20} />
          <FaStar size={20} />
        </div>

        {/* Ratings here... */}
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default JobSeekerReviewsAndRatingsCard;

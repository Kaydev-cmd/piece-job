import { JobPosterProfileCardProps } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";

const JobPosterProfileCard: React.FC<JobPosterProfileCardProps> = ({
  userImage,
  lastName,
  firstName,
  companyName,
  companyAddress,
  userRating,
  numberOfReviews,
}) => {
  return (
    <div
      style={{ padding: "24px" }}
      className="card flex flex-col justify-center items-center gap-4 bg-gray-300/30 rounded-xl"
    >
      {/* Profile Image here... */}
      <div className="md:flex flex-col gap-6 items-center">
        <div className="flex justify-center">
          {userImage ? (
            <Image
              src={userImage || "/default-profile.png"}
              alt={
                companyName
                  ? `${companyName}'s profile picture`
                  : "Profile picture"
              }
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <LuUserRound size={100} />
          )}
        </div>
        {/* User Details */}
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-4xl font-bold">
            {firstName} {lastName}
          </h1>
          <p className="flex items-center justify-center gap-2">
            {/* Location Icon*/}
            <IoLocationOutline size={20} />
            {companyAddress}
          </p>

          <div className="flex items-center  justify-center gap-2">
            <div className="flex items-center gap-2">
              {/* Icon here... */}
              <FaStar size={20} color="#FFC107" />
              <p>{userRating}</p>
            </div>
            <div>
              {numberOfReviews ? (
                <p>{numberOfReviews} (reviews)</p>
              ) : (
                <p>0 (reviews)</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosterProfileCard;

import React from "react";
import Image from "next/image";
import { JobSeekerProfileCardProps } from "@/interfaces";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const JobSeekerProfileCard: React.FC<JobSeekerProfileCardProps> = ({
  userImage,
  userName,
  userAge,
  userLocation,
  userRating,
  numberOfReviews,
}) => {
  return (
    <>
      {/* Name and location */}
      <div className="card flex flex-col justify-center items-center gap-4 bg-gray-300/30 rounded-xl">
        {/* Profile Image here... */}
        <div className="flex justify-center">
          <Image
            src={userImage ?? "/default-profile.png"}
            alt={userName ?? "Profile image"}
            width={500}
            height={500}
            className="w-1/2 rounded-full"
          />
        </div>

        {/* Other details here... */}
        <div className="text-center text-2xl flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{userName}</h1>
          <p>Age: {userAge}</p>
          <p className="flex items-center gap-2">
            {/* Icon here... */}
            <IoLocationOutline size={20} />
            {userLocation}
          </p>
          {/* Rating */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              {/* Icon here... */}
              <FaStar size={20} color="#FFC107" />
              <p>{userRating}</p>
            </div>
            <p>({numberOfReviews} reviews)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSeekerProfileCard;

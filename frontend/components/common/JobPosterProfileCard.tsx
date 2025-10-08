import { JobPosterProfileCardProps } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
const JobPosterProfileCard: React.FC<JobPosterProfileCardProps> = ({
  userImage,
  userName,

  userLocation,
  userRating,
  numberOfReviews,
}) => {
  return (
    /* Name  */
    <div
      style={{ padding: "24px" }}
      className="card flex flex-revese-col md:flex-row md:justify-around p-10 items-center gap-4 justify-center bg-gray-300/30 shadow-md hover:shadow-lg transition-shadow  rounded-xl "
    >
      {/* Profile Image here... */}
      <div className="md:flex flex-col gap-6 items-center">
        <div className="flex justify-center">
          <Image
            src={userImage || "/default-profile.png"}
            alt={userName ? `${userName}'s profile picture` : "Profile picture"}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
        {/* User Details */}
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-2xl   md:text-4xl items-center font-bold">
            {userName}
          </h1>
          <p className="flex items-center gap-2">
            {/* Location Icon*/}
            <IoLocationOutline size={20} />
            {userLocation}
          </p>

          <div className="flex items-center  justify-center gap-2">
            <div className="flex items-center gap-2">
              {/* Icon here... */}
              <FaStar size={20} color="#FFC107" />
              <p>{userRating}</p>
            </div>
            <p>({numberOfReviews} reviews)</p>
          </div>
        </div>
      </div>

      <div className="inline-flex self-start  items-center justify-center gap-2 whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-md px-3">
        {/* settings Link */}
        <Link href="/settings">
          <FiSettings className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default JobPosterProfileCard;

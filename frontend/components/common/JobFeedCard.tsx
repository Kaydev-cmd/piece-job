import React from "react";
import { JobFeedCardProps } from "@/interfaces";
import Image from "next/image";
import { LuUserRound, LuDot } from "react-icons/lu";
import { FaStar, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Pill from "./Pill";
import Button from "./Button";

const JobFeedCard: React.FC<JobFeedCardProps> = ({
  id,
  image,
  userName,
  timePosted,
  rating,
  jobTitle,
  price,
  duration,
  location,
  distance,
  skills,
  description,
}) => {
  return (
    <div className="card border border-gray-300 rounded-xl shadow-md flex flex-col justify-between gap-4 cursor-pointer transition-all duration-300  hover:border-[#1D4ED8]/40 hover:bg-[#1D4ED8]/5 hover:-translate-y-1">
      {/* Image, name and rating here... */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {image ? (
            <Image
              src={image}
              alt={userName}
              width={200}
              height={200}
              className="w-full"
            />
          ) : (
            <div
              className="bg-gray-200 rounded-full"
              style={{ padding: "8px" }}
            >
              <LuUserRound size={20} />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">{userName}</h1>
            <p className="flex items-center gap-1 text-slate-600 font-semibold">
              <FaStar size={16} color="#FFD700" /> {rating}
            </p>
          </div>
        </div>

        {/* Time Posted */}
        <div
          className="bg-orange-500 rounded-xl text-white font-semibold"
          style={{ padding: "8px" }}
        >
          {timePosted}
        </div>
      </div>

      {/* Job Title */}
      <h2 className="font-bold text-2xl">{jobTitle}</h2>

      {/* Price and duration */}
      <div
        className="bg-blue-400/20 flex justify-between items-center rounded-2xl"
        style={{ padding: "16px 16px" }}
      >
        <h3 className="text-blue-600 font-bold text-2xl">R{price}</h3>
        <p className="text-gray-600 flex items-center gap-2">
          <FaRegClock size={16} />
          {duration}
        </p>
      </div>

      {/* Location and distance */}
      <div className="flex items-center gap-2 text-slate-600">
        <div className="flex items-center gap-1">
          <IoLocationOutline size={20} />
          <p>{location}</p>
        </div>
        <LuDot size={20} />
        <p>{distance}</p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap items-center gap-2">
        {skills.map((skill, index) => (
          <Pill key={index} title={skill} />
        ))}
      </div>

      {/* Description */}
      <p className="text-slate-600">{description}</p>

      {/* CTA */}
      <Button title="Apply Now" variant="subscribe" />
    </div>
  );
};

export default JobFeedCard;

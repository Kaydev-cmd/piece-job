import React, { useState } from "react";
import { JobFeedCardProps } from "@/interfaces";
import Image from "next/image";
import { LuUserRound } from "react-icons/lu";
import { FaStar, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Pill from "./Pill";
import { IoMdSettings } from "react-icons/io";

interface Props extends JobFeedCardProps {
  onEdit: (jobId: number) => void;
  onDelete: (jobId: number) => void;
}

const JobPosterFeedCard: React.FC<Props> = ({
  id,
  image,
  userName,
  timePosted,
  rating,
  title,
  payRate,
  duration,
  location,
  skills,
  description,
  onEdit,
  onDelete,
}) => {
  const normalizedSkills: string[] = Array.isArray(skills)
    ? (skills as any[])
        .map((skill) =>
          typeof skill === "string" ? skill : skill?.name ?? skill?.title ?? ""
        )
        .filter(Boolean)
    : skills
    ? (skills as unknown as string)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Time Posted and Settings */}
        <div className="flex items-center gap-4">
          <div
            className="bg-orange-500 rounded-xl text-white font-semibold"
            style={{ padding: "8px" }}
          >
            {timePosted}
          </div>

          {/* Settings Dropdown */}
          <div className="relative">
            <div
              className="bg-gray-200 rounded-full"
              style={{ padding: "8px" }}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <IoMdSettings size={20} />
            </div>

            {menuOpen && (
              <div
                className="absolute right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                style={{ marginTop: "6px" }}
              >
                <button
                  onClick={() => onEdit(id)}
                  className="block w-full text-left text-md text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="block w-full text-left text-md text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="font-bold text-2xl">{title}</h2>

      {/* Price and duration */}
      <div
        className="bg-blue-400/20 flex justify-between items-center rounded-2xl"
        style={{ padding: "16px 16px" }}
      >
        <h3 className="text-blue-600 font-bold text-2xl">R{payRate}</h3>
        <p className="text-gray-600 flex items-center gap-2">
          <FaRegClock size={16} />
          {duration}
        </p>
      </div>

      {/* Location and distance */}
      <div className="flex items-center gap-1 text-slate-600">
        <IoLocationOutline size={20} />
        <p>{location}</p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap items-center gap-2">
        {normalizedSkills.map((skill, index) => (
          <Pill key={index} title={skill} variant="default" />
        ))}
      </div>

      {/* Description */}
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default JobPosterFeedCard;

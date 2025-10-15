import React from "react";
import Image from "next/image";
import { Star, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import Pill from "./Pill";
import Button from "./Button";
import { ApplicantCardProps } from "@/interfaces";

const ApplicantCard = ({
  applicant,
  onAccept,
  onReject,
}: ApplicantCardProps) => {
  const {
    id,
    userName,
    userImage,
    rating,
    reviewCount,
    location,
    appliedDate,
    skills,
    experience,
    hourlyRate,
    status,
  } = applicant;

  return (
    <div className="card  flex  gap-1  md:flex-row  p-8 items-center md:gap-4 justify-around  bg-gray-300/30 shadow-md hover:shadow-lg transition-shadow  rounded-xl ">
      <div className=" flex flex-col gap-2">
        <div className="flex  items-center   justify-center md:items-center">
          <Image
            src={userImage || "/default-profile.png"}
            alt={userName ? `${userName}'s profile picture` : "Profile picture"}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex items-start justify-around md:justify-between">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg items-center font-semibold text-[#111827]">
              {userName}
            </h3>
            <div className="flex flex-col gap-0 items-center  md:flex-row md:items-center md:gap-3 text-sm text-[#64748B] mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span>({reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col gap-0 items-center md:flex-row md:items-center md:gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#64748B] block-none" />
                <span className="text-[#64748B]">Applied {appliedDate}</span>
                <span className="text-[#6]">•</span>
                <span className="text-[#64748B]">{experience}</span>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                {skills &&
                  skills.map((skill, index) => (
                    <Pill key={index} title={skill} variant="topRated" />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center  justify-center  md:w-full self-start mt-4">
          {status === "pending" && (
            <div className="flex flex-row-reverse  md:flex-row-reverse gap-3 w-full h-5 ">
              <Button
                title="Reject"
                variant="cancel"
                onClick={() => onReject(id)}
                className="flex-1 border-destructive/20 hover:bg-destructive hover:text-destructive-foreground"
              />

              <Button
                title="Accept"
                variant="default"
                onClick={() => onAccept(id)}
                className="flex-1"
              />
            </div>
          )}

          {status === "accepted" && (
            <div className="bg-green-100 self-start  text-green-800 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Accepted
            </div>
          )}

          {status === "rejected" && (
            <div className="bg-red-100 self-start text-red-800 border-red-200">
              <XCircle className="w-3 h-3 mr-1" />
              Rejected
            </div>
          )}
        </div>
      </div>
      <div className="items-center self-start  md:text-right md:self-start">
        <div className="text-2xl font-bold text-[#1D4ED8]"> R{hourlyRate}</div>
        <div className="text-sm text-[#64748B]"></div>
      </div>
    </div>
  );
};

export default ApplicantCard;

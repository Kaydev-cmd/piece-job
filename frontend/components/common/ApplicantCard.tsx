import React from "react";
import Image from "next/image";
import { Star, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import Pill from "./Pill";
import Button from "./Button";
import { ApplicationCardProps } from "@/interfaces";

const ApplicantCard = ({
  application,
  onAccept,
  onReject,
}: ApplicationCardProps) => {
  const {
    id,
    jobApplicant,
    status,
  } = application;

  return (
    <div className="card flex gap-4 md:flex-row items-center justify-around bg-gray-300/30 shadow-md hover:shadow-lg transition-shadow rounded-xl">
      <div className=" flex flex-col gap-2">
        <div className="flex items-center justify-center">
          <Image
            src={jobApplicant.userImage || "/default-profile.png"}
            alt={jobApplicant.lastName ? `${jobApplicant.lastName}'s profile picture` : "Profile picture"}
            width={80}
            height={80}
            className="rounded-full object-cover w-1/4"
          />
        </div>

        <div className="flex items-start justify-around md:justify-between">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-2xl items-center font-bold text-[#111827]">
              {jobApplicant.firstName} {jobApplicant.lastName}
            </h3>

            <div className="flex flex-col gap-3 items-center md:flex-row md:items-center text-[#64748B]">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>{0}</span>
                <span>({0} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{"location"}</span>
              </div>
            </div>

            <div
              className="flex flex-col items-center gap-4"
              style={{ marginTop: "4px" }}
            >
              <div className="flex flex-col items-center md:flex-row md:gap-2">
                <div className="flex gap-1 items-center">
                  <Clock size={16} className="text-[#64748B]" />
                  <span className="text-[#64748B]">Applied {application.applicationDate? 
                  application.applicationDate: "Date"}</span>
                </div>
                <span className="text-xl text-slate-500">•</span>
                <span className="text-[#64748B]">{0}"+ years experience"</span>
              </div>

              <div
                className="flex items-center justify-center flex-wrap gap-2"
                style={{ marginTop: "8px" }}
              >
                {jobApplicant.skillSet &&
                  jobApplicant.skillSet.map((skill, index) => (
                    <Pill key={index} title={skill.skillName} variant="topRated" />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex gap-4 items-center justify-center"
          style={{ marginTop: "16px" }}
        >
          {/* {status === "pending" && (
            <div className="flex flex-row-reverse md:flex-row-reverse gap-3 w-full">
              <Button
                title="Reject"
                variant="cancel"
                onClick={() => onReject(id)}
                className="flex-1"
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
            <div
              className="flex gap-2 items-center bg-green-200 text-green-800 border-1 border-green-300 rounded-lg"
              style={{ padding: "16px" }}
            >
              <CheckCircle size={16} />
              Accepted
            </div>
          )}

          {status === "rejected" && (
            <div
              className="flex gap-2 items-center bg-red-200 text-red-800 border-1 border-red-300 rounded-lg"
              style={{ padding: "16px" }}
            >
              <XCircle size={16} />
              Rejected
            </div>
          )} */}
          <Button
            title="Reject"
            variant="cancel"
            onClick={() => onReject(id)}
            className="flex-1"
          />

          <Button
            title="Accept"
            variant="default"
            onClick={() => onAccept(id)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;

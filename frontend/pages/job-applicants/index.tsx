import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";

import ApplicantCard from "@/components/common/ApplicantCard";
import { mockApplicants } from "@/constants";

import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const JobApplicants = () => {
  const router = useRouter();
  const [applicants, setApplicants] = useState(mockApplicants);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAccept = (id: string) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id
          ? { ...applicant, status: "accepted" as const }
          : applicant
      )
    );
  };
  const handleReject = (id: string) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id
          ? { ...applicant, status: "rejected" as const }
          : applicant
      )
    );
  };
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      filterStatus === "all" || applicant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const pendingCount = applicants.filter((a) => a.status === "pending").length;
  const acceptedCount = applicants.filter(
    (a) => a.status === "accepted"
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section
        className="container mx-auto px-4 py-8 max-w-6xl"
        style={{ paddingBottom: "0", marginTop: "0px" }}
      >
        {/* Header */}
        <div className="flex  flex-col items-center gap-4 mb-6">
          <button
            className="flex items-center gap-2 text-blue-500"
            style={{ padding: "24px" }}
            onClick={() => router.push("/job-poster")}
          >
            {/* Icon here... */}
            <FaArrowLeft size={12} />
            Back to Profile
          </button>

          <div className="flex flex-col items-center  gap-2 ">
            <h1 className="text-4xl font-bold  text-[#111827]">
              Job{" "}
              <span className="bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent">
                Applicants
              </span>
            </h1>
            <p className="text-[#64748B]  font-medium">
              Frontend Developer - React & TypeScript
            </p>
          </div>
        </div>
        {/* Stats and Filters */}
        <div
          className="flex flex-col gap-4 mt-4 md:flex-row items-center justify-between mb-6"
          style={{ marginBottom: "24px", marginTop: "18px" }}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#1D4ED8]" />
              <span className="text-sm font-medium">
                {filteredApplicants.length} applicants
              </span>
            </div>
            <div className="text-sm text-[#64748B]">
              {pendingCount} pending • {acceptedCount} accepted
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className=" flex relative gap-4 ">
              <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-90  w-64"
                style={{ paddingLeft: "24px" }}
              />
            </div>
          </div>
        </div>
        {/* Applicant List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))
          ) : (
            <div
              className="flex flex-col text-center relative items-center  py-12"
              style={{ marginBottom: "34px" }}
            >
              <div className="flex flex-col relative text-center md:self-end items-center">
                <Users className="w-16 h-16 text-[#64748B]  mx-auto mb-4" />
                <h3 className="text-lg font-medium  text-[#111827] mb-2">
                  No applicants found
                </h3>
                <p className="text-[#64748B] ">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No one has applied to this job yet. Share your job posting to attract more applicants."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default JobApplicants;

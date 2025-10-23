import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";

import ApplicantCard from "@/components/common/ApplicantCard";
import { mockApplicants } from "@/constants";

import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { Applicant } from "@/interfaces";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const JobApplicants = () => {
  const router = useRouter();
  const {baseUrl,loggedInToken} = useAuth()
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(()=>{
    const fetchJobApplicants = async () => {
    try{
        const response = await axios.get(baseUrl+"/jobs/1",{
          headers:{Authorization: `Bearer ${loggedInToken}`}
        }) ;
        console.log("res: ",response)
        if (response.data){
          setApplicants(response.data)
        }
    }
    catch(err:any){
      console.log("error occ: ",err)
    }
  }
  fetchJobApplicants() ;
  },[])

  const handleAccept = (id: string) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === parseInt(id)
          ? { ...applicant, status: "accepted" as const }
          : applicant
      )
    );
  };
  const handleReject = (id: string) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === parseInt(id)
          ? { ...applicant, status: "rejected" as const }
          : applicant
      )
    );
  };
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skillSet.some((skill) =>
        skill.skillName.toLowerCase().includes(searchTerm.toLowerCase())
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
        className="container"
        style={{ paddingTop: "16px", paddingBottom: "0" }}
      >
        {/* Header */}
        <div className="flex flex-col items-center">
          <button
            className="flex items-center gap-2 text-blue-500"
            style={{ padding: "24px" }}
            onClick={() => router.push("/")}
          >
            {/* Icon here... */}
            <FaArrowLeft size={12} />
            Back to Home
          </button>

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-[#111827]">
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
          className="flex flex-col gap-4 md:flex-row items-center justify-between "
          style={{ marginBottom: "24px", marginTop: "18px" }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="text-[#1D4ED8]" />
              <span className="font-medium">
                {filteredApplicants.length} applicants
              </span>
            </div>
            <div className="text-[#64748B]">
              {pendingCount} pending • {acceptedCount} accepted
            </div>
          </div>

          <div className="flex items-center gap-3" style={{marginTop: "8px"}}>
            <div className="flex relative">
              <Search
                size={16}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#64748B]"
              />
              <input
                type="text"
                placeholder="Search by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              className="flex flex-col text-center relative items-center"
              style={{ marginBottom: "34px" }}
            >
              <div className="flex flex-col relative text-center md:self-end items-center">
                <Users className="w-16 h-16 text-[#64748B]  mx-auto " />
                <h3 className="text-lg font-medium  text-[#111827] ">
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

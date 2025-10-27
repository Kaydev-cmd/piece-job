import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import ApplicantCard from "@/components/common/ApplicantCard";
import { useRouter } from "next/router";
import { Application, JobInApplicationContext } from "@/interfaces";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Pill from "@/components/common/Pill";
import Back from "@/components/common/Back";

const JobApplicants = () => {
  const router = useRouter();
  const { id } = router.query;
  const { baseUrl, loggedInToken } = useAuth();
  const [jobInApplicantContext, setJobInApplicantContext] = useState<JobInApplicationContext>(
    {job:{}} as JobInApplicationContext
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus] = useState("all");

  useEffect(() => {
    const fetchJobApplicants = async () => {
      try {
        const response = await axios.get(baseUrl + `/jobApplicants/${id}`, {
          headers: { Authorization: `Bearer ${loggedInToken}` },
        });
        console.log("res: ", response);
        if (response.data) {
          setJobInApplicantContext(response.data.data);
        }
      } catch (err: unknown) {
        console.log("error occ: ", err);
      }
    };
    fetchJobApplicants();
  }, [loggedInToken, baseUrl, id]);

  const handleAccept = (id: number) => {
    const accepted = { ...jobInApplicantContext };
    accepted.jobApplications.map((applicant) =>
      applicant.id === id
        ? { ...applicant, status: "accepted" as const }
        : applicant
    );
    setJobInApplicantContext(accepted);
  };

  const handleReject = (id: number) => {
    const newJob = { ...jobInApplicantContext };
    newJob.jobApplications = jobInApplicantContext
    .jobApplications.map((applicant) =>
      applicant.id === id
        ? { ...applicant, status: "rejected" as const }
        : applicant
    );
    setJobInApplicantContext(newJob);
  };
  const filteredApplicants = !jobInApplicantContext.jobApplications
    ? []
    : jobInApplicantContext.jobApplications.filter((application) => {
        const applicant = application.jobApplicant 
        const matchesSearch =
          applicant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.skillSet.some((skill) =>
            skill.skillName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        const matchesStatus =
          filterStatus === "all" || application.status === filterStatus;
        return matchesSearch && matchesStatus;
      });
  const pendingCount = !jobInApplicantContext.jobApplications
    ? []
    : jobInApplicantContext.jobApplications.filter((a) => a.status === "pending").length;
  const acceptedCount = !jobInApplicantContext.jobApplications
    ? []
    : jobInApplicantContext.jobApplications.filter((a) => a.status === "accepted").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section
        className="container"
        style={{ paddingTop: "32px", paddingBottom: "0" }}
      >
        <div
          className="flex justify-center lg:justify-start"
          style={{ marginBottom: "18px" }}
        >
          {/* Back */}
          <Back />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-[#111827]">
              Job{" "}
              <span className="bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent">
                Applicants
              </span>
            </h1>
            <div className="flex flex-col items-center gap-4 mb-4">
              <h3 className="text-xl font-semibold">
                {jobInApplicantContext.job.title
                  ? jobInApplicantContext.job.title
                  : "Frontend Developer - React & TypeScript"}
              </h3>
              <p className="text-center">{jobInApplicantContext.job.description ? 
              jobInApplicantContext.job.description : "Description"}</p>
            </div>
            <div
              className="flex items-center justify-center flex-wrap gap-2"
              style={{ marginTop: "8px" }}
            >
              {jobInApplicantContext.job.skills &&
                jobInApplicantContext.job.skills.map((skill, index) => (
                  <Pill
                    key={index}
                    title={skill.skillName}
                    variant="topRated"
                  />
                ))}
            </div>
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

          <div className="flex items-center gap-3" style={{ marginTop: "8px" }}>
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
            filteredApplicants.map((application) => (
              <ApplicantCard
                key={application.id}
                application={application}
                // onAccept={handleAccept}
                onAccept={()=>{}}
                // onReject={handleReject}
                onReject={()=>{}}
              />
            ))
          ) : (
            <div
              className="flex flex-col text-center relative items-center"
              style={{ marginBottom: "34px" }}
            >
              <div className="flex flex-col relative text-center md:self-end items-center lg:left-[300]">
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

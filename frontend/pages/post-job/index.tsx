import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import JobDetailsForm from "@/components/common/JobDetailsForm";
import TipsForSuccess from "@/components/common/TipsForSuccess";

const PostJobPage = () => {
  const router = useRouter();

  return (
    <section className="container flex flex-col" style={{ paddingTop: "0" }}>
      {/* Back to Home here... */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 text-blue-500"
          style={{ padding: "24px" }}
          onClick={() => router.push("/")}
        >
          {/* Icon here... */}
          <FaArrowLeft size={12} />
          Back to Home
        </button>
      </div>

      {/* Heading here... */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center">
          Post a{" "}
          <span className="bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent">
            Job
          </span>
        </h1>
        <p className="text-center text-slate-500">
          Find the right person for your task in minutes
        </p>
      </div>

      {/* Page tracker here... */}

      {/* Job Details component here... */}
      <div style={{ marginTop: "32px" }}>
        <JobDetailsForm />
      </div>

      {/* Tips For Success here... */}
      <div style={{ marginTop: "32px" }}>
        <TipsForSuccess />
      </div>
    </section>
  );
};

export default PostJobPage;

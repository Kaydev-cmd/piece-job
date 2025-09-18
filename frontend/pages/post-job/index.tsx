import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import JobDetailsForm from "@/components/common/JobDetailsForm";
import TipsForSuccess from "@/components/common/TipsForSuccess";
import InstantPaymentsCard from "@/components/common/InstantPaymentsCard";
import PaymentAndTimelineForm from "@/components/common/PaymentAndTimelineForm";
import RequirementsAndReviewForm from "@/components/common/RequirementsAndReviewForm";
import { JobPostProvider } from "@/context/JobPostContext";

const PostJobPage = () => {
  const router = useRouter();
  const [pageTracker, setPageTracker] = useState(1);

  const totalSteps = 3;

  const handleNext = () => {
    if (pageTracker < totalSteps) {
      setPageTracker(pageTracker + 1);
    }
  };

  const handlePrev = () => {
    if (pageTracker > 1) {
      setPageTracker(pageTracker - 1);
    }
  };

  return (
    <section
      className="container flex flex-col"
      style={{ paddingTop: "0", paddingBottom: "0" }}
    >
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
      <div
        className="flex items-center justify-around"
        style={{ marginTop: "16px" }}
      >
        {/* Page Tracker */}
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`rounded-full flex items-center justify-center w-12 h-12 text-white
              ${
                pageTracker === step
                  ? "bg-[linear-gradient(135deg,#1D4ED8,#10B981)]"
                  : "bg-gray-400"
              }`}
          >
            <p>{step}</p>
          </div>
        ))}
      </div>

      {/* Job Details component here... */}
      <JobPostProvider>
      {pageTracker === 1 && (
        <div style={{ marginTop: "32px" }}>
          <JobDetailsForm
            pageTracker={pageTracker}
            onNext={handleNext}
            onBack={handlePrev}
          />
        </div>
      )}

      {/* Payment and Timeline Form */}
      {pageTracker === 2 && (
        <div style={{ marginTop: "32px" }}>
          <PaymentAndTimelineForm
            pageTracker={pageTracker}
            onNext={handleNext}
            onBack={handlePrev}
          />
        </div>
      )}

      {/* Requirements and Review Form */}
      {pageTracker === 3 && (
        <div style={{ marginTop: "32px" }}>
          <RequirementsAndReviewForm
            pageTracker={pageTracker}
            onNext={handleNext}
            onBack={handlePrev}
          />
        </div>
      )}
      </JobPostProvider>

      {/* Tips For Success here... */}
      <div style={{ marginTop: "32px" }}>
        <TipsForSuccess />
      </div>

      {/* Instant Payments component here... */}
      <div style={{ marginTop: "32px" }}>
        <InstantPaymentsCard />
      </div>
    </section>
  );
};

export default PostJobPage;

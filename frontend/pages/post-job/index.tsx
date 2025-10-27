import React, { useState } from "react";
import JobDetailsForm from "@/components/common/JobDetailsForm";
import TipsForSuccess from "@/components/common/TipsForSuccess";
import InstantPaymentsCard from "@/components/common/InstantPaymentsCard";
import PaymentAndTimelineForm from "@/components/common/PaymentAndTimelineForm";
import RequirementsAndReviewForm from "@/components/common/RequirementsAndReviewForm";
import { JobPostProvider } from "@/context/JobPostContext";
import Back from "@/components/common/Back";

const PostJobPage = () => {
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
      style={{ paddingTop: "32px", paddingBottom: "0" }}
    >
      <div
        className="flex justify-center lg:justify-start"
        style={{ marginBottom: "18px" }}
      >
        {/* Back */}
        <Back />
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

      <div className="lg:grid grid-cols-2 gap-6">
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

        <div>
          {/* Tips For Success here... */}
          <div style={{ marginTop: "32px" }}>
            <TipsForSuccess />
          </div>

          {/* Instant Payments component here... */}
          <div style={{ marginTop: "32px" }}>
            <InstantPaymentsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostJobPage;

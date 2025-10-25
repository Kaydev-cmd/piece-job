import React, { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import JobFeedCard from "@/components/common/JobFeedCard";
import Button from "@/components/common/Button";
import Filter from "@/components/common/JobFeedFilter";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ApplicationFormValues } from "@/interfaces";
import { useJobPost } from "@/context/JobPostContext";
import { useAPIRequster } from "@/components/api-reuse/ApiRequester";

const JobFeedPage = () => {
  const { jobFeed, setJobFeed, requesting } = useJobPost();
  const { loadingScreen } = useAPIRequster();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      location: "",
      resume: "",
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: ApplicationFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post("/api/application/application", data);
      setSuccess("Application sent successfully!");
      reset();
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setSuccess("");
      setError("");
      setShowForm(false);
    }, 3000);
  };

  const returnJobFeed = () => {
    if (requesting) {
      console.log("loading");
      return <p>{loadingScreen}</p>;
    } else
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobFeed.length ? (
            jobFeed.map((job) => (
              <JobFeedCard
                key={job.id}
                id={job.id}
                postedBy={job.postedBy || "Anonymous"} // fallback
                timePosted={job.timePosted || "Just now"} // fallback
                rating={job.rating || 0} // fallback
                title={job.title}
                payRate={job.payRate}
                duration={job.duration}
                location={job.location}
                skills={job.skills || []}
                description={job.description}
                onApply={() => setShowForm(true)}
              />
            ))
          ) : (
            <p>Could not fetch jobs</p>
          )}
        </div>
      );
  };
  return (
    <section
      className="container"
      style={{ paddingTop: "0", paddingBottom: "0" }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex flex-col gap-2"
          style={{ marginBottom: "16px", marginTop: "16px" }}
        >
          <h1 className="text-blue-900 font-bold text-3xl cursor-pointer">
            <Link href="/job-feed">Available Jobs</Link>
          </h1>
          {jobFeed.length > 0 ? (
            <p className="text-slate-600 font-semibold">
              {jobFeed.length} job(s) available
            </p>
          ) : (
            <p className="text-slate-600 font-semibold">0 job(s) available</p>
          )}
        </div>

        {/* Filter */}
        <Filter
          onApplyFilters={(filters) => {
            const { title = "", location = "", skills = [] } = filters;

            setJobFeed((prevJobs) =>
              prevJobs.filter((job) => {
                const matchesTitle = job.title
                  .toLowerCase()
                  .includes(title.toLowerCase());
                const matchesLocation = job.location
                  .toLowerCase()
                  .includes(location.toLowerCase());
                const matchesSkills = skills.some((s) =>
                  job.skills.some((skill) =>
                    skill.skillName.toLowerCase().includes(s.toLowerCase())
                  )
                );
                return matchesTitle && matchesLocation && matchesSkills;
              })
            );
          }}
        />
      </div>

      {/* Search box here.... */}
      <div style={{ marginBottom: "16px" }}>
        <SearchBar />
      </div>

      {/* Job Feed */}
      {returnJobFeed()}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm overflow-y-auto">
          <div className="flex flex-col justify-center items-center">
            <div
              className="container w-full max-w-lg"
              style={{ padding: "16px" }}
            >
              <h2
                className="text-4xl text-center font-bold"
                style={{ marginBottom: "16px" }}
              >
                Apply for Job
              </h2>
              {/* Form goes here... */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* First and Last names */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="firstName" className="font-semibold">
                      First Name:
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                    />
                    <p className="text-center text-red-500">
                      {errors.firstName?.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="lastName" className="font-semibold">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                    />
                    <p className="text-center text-red-500">
                      {errors.lastName?.message}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-semibold">
                    Email:
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  <p className="text-center text-red-500">
                    {errors.email?.message}
                  </p>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="location" className="font-semibold">
                    Location:
                  </label>
                  <input
                    type="text"
                    placeholder="Pretoria"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  <p className="text-center text-red-500">
                    {errors.location?.message}
                  </p>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="phoneNumber" className="font-semibold">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    placeholder="+27 XX XXX XXXX"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^(?:\+27|0)\d{9}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                  />
                  <p className="text-center text-red-500">
                    {errors.phoneNumber?.message}
                  </p>
                </div>

                {/* Resume Upload */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="resume" className="font-semibold">
                    Upload Resume:
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register("resume", {
                      required: "Resume is required",
                    })}
                  />
                  <p className="text-center text-red-500">
                    {errors.resume?.message}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    title={loading ? "Processing" : "Apply"}
                    variant="subscribe"
                  />
                  <Button
                    type="button"
                    title="Cancel"
                    variant="cancel"
                    onClick={() => setShowForm(false)}
                  />
                </div>

                {/* Feedback Messages */}
                {error && (
                  <p className="text-red-600 text-center font-semibold">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-green-600 text-center font-semibold">
                    {success}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center" style={{ marginTop: "16px" }}>
        {jobFeed.length >= 6 ? (
          <Button title="See more jobs" variant="seeMore" />
        ) : null}
      </div>
    </section>
  );
};

export default JobFeedPage;

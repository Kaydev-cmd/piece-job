import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobFeedCard from "@/components/common/JobFeedCard";
import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ApplicationFormValues, JobPostData } from "@/interfaces";
import Button from "@/components/common/Button";

const SearchPage = () => {
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

  const router = useRouter();
  const { query: queryParam } = router.query;
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<JobPostData[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchJobs = async (searchQuery: string) => {
    try {
      setLoadingJobs(true);
      const response = await axios.get<JobPostData[]>("/api/jobs/jobs", {
        params: { q: searchQuery },
      });
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    if (typeof queryParam === "string") {
      setQuery(queryParam);
      fetchJobs(queryParam);
    }
  }, [queryParam]);

  const onSubmit = async (data: ApplicationFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post("/api/application/application", data);
      setSuccess("Application sent successfully!");
      reset();
    } catch (err) {
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

  return (
    <section className="container" style={{ paddingTop: "0" }}>
      <div
        className="flex flex-col gap-2"
        style={{ marginBottom: "16px", marginTop: "16px" }}
      >
        <h1 className="text-blue-900 font-bold text-3xl cursor-pointer">
          <Link href="/job-feed">Available Jobs</Link>
        </h1>
        <p className="text-slate-600 font-semibold">{jobs.length} jobs found</p>
      </div>

      {/* Search Bar here... */}
      <div>
        <SearchBar />
      </div>

      {/* Cards here... */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        style={{ marginTop: "16px" }}
      >
        {loadingJobs ? (
          <p>Loading jobs...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <JobFeedCard
              key={job.id}
              id={job.id}
              userName={job.userName}
              timePosted={job.timePosted}
              rating={job.rating}
              jobTitle={job.jobTitle}
              payRate={job.payRate}
              duration={job.duration}
              location={job.location}
              skills={job.skills}
              description={job.description}
              onApply={() => setShowForm(true)}
            />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {/* Application Form */}
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
    </section>
  );
};

export default SearchPage;

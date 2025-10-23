import React, { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import Button from "@/components/common/Button";
import Filter from "@/components/common/JobFeedFilter";
import Link from "next/link";
import { useJobPost } from "@/context/JobPostContext";
import JobPosterFeedCard from "@/components/common/JobPosterFeedCard";
import EditJobModal from "@/components/common/EditJobModal";
import DeleteJobModal from "@/components/common/DeleteJobModal";
import { Job } from "@/interfaces";

const JobPosterFeedPage: React.FC<Job> = () => {
  const { jobFeed, editJob, deleteJob, setJobFeed } = useJobPost();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  const handleSave = async (updatedJob: Job) => {
    const updatedJobData = {
      ...updatedJob,
      payRate: Number(updatedJob.payRate),
    };
    await editJob(updatedJob.id, updatedJobData);
    setEditingJob(null);
  };

  const handleConfirmDelete = async (id: number) => {
    await deleteJob(id);
    setDeletingJob(null);
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
            <Link href="/job-poster-feed">Jobs Posted</Link>
          </h1>
          {jobFeed.length > 0 ? (
            <p className="text-slate-600 font-semibold">
              {jobFeed.length} job(s) posted
            </p>
          ) : (
            <p className="text-slate-600 font-semibold">0 job(s) posted</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {jobFeed.length ? (
          jobFeed.map((job) => {
            const normalizedSkills =
              Array.isArray(job.skills) && job.skills.length > 0
                ? job.skills.map((skill: any) =>
                    typeof skill === "string" ? skill : skill.skillName
                  )
                : [];

            return (
              <JobPosterFeedCard
                key={job.id}
                id={job.id}
                postedBy={job.postedBy || "Anonymous"} // fallback
                timePosted={job.timePosted || "Just now"} // fallback
                rating={job.rating || 0} // fallback
                title={job.title}
                payRate={job.payRate}
                duration={job.duration}
                location={job.location}
                skills={normalizedSkills}
                description={job.description}
                onEdit={() =>
                  setEditingJob({
                    ...job,
                    jobTitle: job.title ?? job.title,
                    payRate: job.payRate.toString(),
                  })
                }
                onDelete={() =>
                  setDeletingJob({
                    ...job,
                    jobTitle: job.title ?? job.title,
                    payRate: job.payRate.toString(),
                  })
                }
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Edit Modal */}
      {editingJob && (
        <EditJobModal
          job={{
            ...editingJob,
            title: editingJob.jobTitle ?? "",
            description: editingJob.description ?? "",
            skills: editingJob.skills ?? [],
            payRate: Number(editingJob.payRate),
          }}
          onClose={() => setEditingJob(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {deletingJob && (
        <DeleteJobModal
          title={deletingJob.jobTitle}
          onClose={() => setDeletingJob(null)}
          onConfirm={() => handleConfirmDelete(deletingJob.id)}
        />
      )}

      <div className="flex justify-center" style={{ marginTop: "16px" }}>
        {jobFeed.length >= 6 ? (
          <Button title="See more jobs" variant="seeMore" />
        ) : null}
      </div>
    </section>
  );
};

export default JobPosterFeedPage;

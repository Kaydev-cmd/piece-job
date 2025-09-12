import React from "react";
import SearchBar from "@/components/common/SearchBar";
import { JOB_FEED_DATA } from "@/constants";
import JobFeedCard from "@/components/common/JobFeedCard";
import Button from "@/components/common/Button";
import Filter from "@/components/common/JobFeedFilter";

const JobFeedPage = () => {
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
          <h1 className="text-blue-900 font-bold text-3xl">Available Jobs</h1>
          <p className="text-slate-600 font-semibold">5 jobs near you</p>
        </div>

        {/* Filter */}
        <Filter />
      </div>

      {/* Search box here.... */}
      <div style={{ marginBottom: "16px" }}>
        <SearchBar />
      </div>

      {/* Cards here... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {JOB_FEED_DATA.map((job) => (
          <JobFeedCard
            key={job.id}
            id={job.id}
            image={job.image}
            userName={job.userName}
            timePosted={job.timePosted}
            rating={job.rating}
            jobTitle={job.jobTitle}
            price={job.price}
            duration={job.duration}
            location={job.location}
            distance={job.distance}
            skills={job.skills}
            description={job.description}
          />
        ))}
      </div>

      <div className="flex justify-center" style={{ marginTop: "16px" }}>
        <Button title="See more jobs" variant="seeMore" />
      </div>
    </section>
  );
};

export default JobFeedPage;

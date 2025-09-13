import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { JOB_FEED_DATA } from "@/constants";
import JobFeedCard from "@/components/common/JobFeedCard";
import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";

const SearchPage = () => {
  const router = useRouter();
  const { query: queryParam } = router.query;
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof queryParam === "string") {
      setQuery(queryParam);
    }
  }, [queryParam]);

  const filteredJobs = JOB_FEED_DATA.filter((job) => {
    const lowerQuery = query.toLowerCase();

    // Searching for jobTitle
    const matchesTitle = job.jobTitle.toLowerCase().includes(lowerQuery);

    // Searching for location
    const matchesLocation = job.location.toLowerCase().includes(lowerQuery);

    // Searching for skills
    const matchesSkills = job.skills.some((skill) =>
      skill.toLowerCase().includes(lowerQuery)
    );

    return matchesTitle || matchesLocation || matchesSkills;
  });

  console.log(filteredJobs);

  return (
    <section className="container" style={{ paddingTop: "0" }}>
      <div
        className="flex flex-col gap-2"
        style={{ marginBottom: "16px", marginTop: "16px" }}
      >
        <h1 className="text-blue-900 font-bold text-3xl cursor-pointer">
          <Link href="/job-feed">Available Jobs</Link>
        </h1>
        <p className="text-slate-600 font-semibold">5 jobs near you</p>
      </div>
      <SearchBar />

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        style={{ marginTop: "16px" }}
      >
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
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
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;

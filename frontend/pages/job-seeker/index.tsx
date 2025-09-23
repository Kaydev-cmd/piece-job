import React from "react";
import JobSeekerProfileCard from "@/components/common/JobSeekerProfileCard";
import { JOB_SEEKER_PROFILE_DATA } from "@/constants";
import JobSeekerSkillsCard from "@/components/common/JobSeekerSkillsCard";

const JobSeekerProfilePage = () => {
  return (
    <section className="container">
      {/* User Profile component here... */}
      <div>
        {JOB_SEEKER_PROFILE_DATA.map((user) => (
          <JobSeekerProfileCard
            key={user.id}
            id={user.id}
            userImage={user.userImage}
            userName={user.userName}
            userAge={user.userAge}
            userLocation={user.userLocation}
            userRating={user.userRating}
            numberOfReviews={user.numberOfReviews}
          />
        ))}
      </div>

      {/* Skills cards here... */}
      <div style={{ marginTop: "32px" }}>
        {JOB_SEEKER_PROFILE_DATA.map((user) => (
          <JobSeekerSkillsCard
            key={user.id}
            id={user.id}
            skills={user.skills}
            description={user.description}
          />
        ))}
      </div>
    </section>
  );
};

export default JobSeekerProfilePage;

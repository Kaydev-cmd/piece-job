import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { JobSeekerProfileCardProps } from "@/interfaces";
import { useAPIRequster } from "@/components/api-reuse/ApiRequester";
import Back from "@/components/common/Back";
import JobSeekerReviewsAndRatingsCard from "@/components/common/JobSeekerReviewsAndRatingsCard";
import JobSeekerProfileCard from "@/components/common/JobSeekerProfileCard";
import JobSeekerRecentJobsCard from "@/components/common/JobSeekerRecentJobsCard";
import JobSeekerSkillsCard from "@/components/common/JobSeekerSkillsCard";
import {
  JOB_SEEEKER_RECENT_JOBS_DATA,
  JOB_SEEKER_REVIEWS_AND_RATINGS_DATA,
} from "@/constants";
import { IoMdTrendingUp } from "react-icons/io";
import { SlSpeech } from "react-icons/sl";

const JobSeekerProfilePage = () => {
  const { baseUrl, loggedInToken } = useAuth();
  const { loading, setLoading, loadingScreen } = useAPIRequster();
  const [user, setUser] = useState({} as JobSeekerProfileCardProps);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    fetchSeeker();
  }, [id, loggedInToken]);

  // Find the seeker by id
  const fetchSeeker = async () => {
    try {
      setLoading(true);
      const apiRes = await axios.get(`${baseUrl}/seeker/${id}`, {
        headers: {
          Authorization: "Bearer " + loggedInToken,
        },
      });
      console.log("res: ", apiRes);
      setUser(apiRes.data.data);
    } catch (error: unknown) {
      console.log("error occured: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return loadingScreen;
  } else if (!user.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <section
      className="container"
      style={{ paddingBottom: "0", paddingTop: "32px" }}
    >
      <div
        className="flex justify-center md:justify-start"
        style={{ marginBottom: "32px" }}
      >
        {/* Back */}
        <Back />
      </div>

      <div className="lg:grid grid-cols-2 gap-4">
        {/* User Profile component h... */}
        <div>
          <JobSeekerProfileCard
            key={user.id}
            id={user.id}
            userImage={user.userImage}
            lastName={user.lastName}
            firstName={user.firstName}
            userAge={user.userAge}
            userLocation={user.userLocation}
            userRating={user.userRating}
            numberOfReviews={user.numberOfReviews}
            skillSet={user.skillSet}
          />
        </div>

        {/* Skills cards h... */}
        <div style={{ marginTop: "32px" }}>
          <JobSeekerSkillsCard
            key={user.id}
            id={user.id}
            skills={user.skillSet}
          />
        </div>
      </div>

      {/* Recent Jobs h... */}
      <div
        className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
        style={{ marginTop: "32px" }}
      >
        <div className="flex items-center gap-2">
          {/* Icon h... */}
          <IoMdTrendingUp size={22} color="#1D4ED8" />
          <h1 className="text-3xl font-bold">Recent Jobs</h1>
        </div>

        {/* Recent Jobs Card h... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JOB_SEEEKER_RECENT_JOBS_DATA.map((job) => (
            <div
              key={job.id}
              className="bg-blue-300/20 rounded-xl"
              style={{ padding: "16px" }}
            >
              <JobSeekerRecentJobsCard
                id={job.id}
                jobTitle={job.jobTitle}
                client={job.client}
                description={job.description}
                date={job.date}
                rating={job.rating}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews and Ratings h... */}
      <div
        className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
        style={{ marginTop: "32px" }}
      >
        <div className="flex items-center gap-2">
          {/* Icon h... */}
          <SlSpeech size={20} color="#1D4ED8" />
          <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JOB_SEEKER_REVIEWS_AND_RATINGS_DATA.map((data) => (
            <div
              key={data.id}
              className="bg-blue-300/20 rounded-xl"
              style={{ padding: "16px" }}
            >
              <JobSeekerReviewsAndRatingsCard
                id={data.id}
                userImage={data.userImage}
                userName={data.userName}
                rating={data.rating}
                description={data.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobSeekerProfilePage;

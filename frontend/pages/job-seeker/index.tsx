import React, { useEffect, useState } from "react";
import JobSeekerProfileCard from "@/components/common/JobSeekerProfileCard";
import {
  JOB_SEEEKER_RECENT_JOBS_DATA,
  JOB_SEEKER_PROFILE_DATA,
  JOB_SEEKER_REVIEWS_AND_RATINGS_DATA,
} from "@/constants";
import JobSeekerSkillsCard from "@/components/common/JobSeekerSkillsCard";
import JobSeekerReviewsAndRatingsCard from "@/components/common/JobSeekerReviewsAndRatingsCard";
import { SlSpeech } from "react-icons/sl";
import { IoMdTrendingUp } from "react-icons/io";
import JobSeekerRecentJobsCard from "@/components/common/JobSeekerRecentJobsCard";
import { useAPIRequster } from "@/components/api-reuse/ApiRequester";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { JobSeekerProfileCardProps } from "@/interfaces";

const JobSeekerProfilePage = () => {
  const {baseUrl,loggedInToken} = useAuth()
  const [seeker,setSeeker] = useState<JobSeekerProfileCardProps>(JOB_SEEKER_PROFILE_DATA)
  const {loading, setLoading,loadingScreen} = useAPIRequster()
  const fetchSeekerProfile =async ()=>{
      setLoading(true);
    try{
      const apiRes = await axios.get(`${baseUrl}/seeker-profile/s11`,{
        headers:{
          Authorization: "Bearer "+loggedInToken 
        }
      })
      console.log("res: ", apiRes) ; 
      setLoading(false);
      setSeeker(apiRes.data.data)
    }
    catch(error: unknown){
      console.log("error occured: ",error)
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchSeekerProfile()
  },[])
  var user = seeker
  if (loading) return loadingScreen
  return (
    <section className="container" style={{ paddingBottom: "0" }}>
      <div className="lg:grid grid-cols-2 gap-4">
        {/* User Profile component here... */}
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

        {/* Skills cards here... */}
        <div style={{ marginTop: "32px" }}>
          <JobSeekerSkillsCard
              key={user.id}
              id={user.id}
              skills={user.skillSet}
              // description={user.description}
            />
        </div>
      </div>

      {/* Recent Jobs here... */}
      <div
        className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
        style={{ marginTop: "32px" }}
      >
        <div className="flex items-center gap-2">
          {/* Icon here... */}
          <IoMdTrendingUp size={22} color="#1D4ED8" />
          <h1 className="text-3xl font-bold">Recent Jobs</h1>
        </div>

        {/* Recent Jobs Card here... */}
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

      {/* Reviews and Ratings here... */}
      <div
        className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
        style={{ marginTop: "32px" }}
      >
        <div className="flex items-center gap-2">
          {/* Icon here... */}
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

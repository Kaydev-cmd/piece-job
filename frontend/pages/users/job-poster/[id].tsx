import React, { useEffect, useState } from "react";
import JobPosterProfileCard from "@/components/common/JobPosterProfileCard";
import { JOB_POSTER_PROFILE_DATA } from "@/constants";
import BusinessInfoCard from "@/components/common/BusinessInfoCard";
import { JOB_SEEKER_REVIEWS_AND_RATINGS_DATA } from "@/constants";
import { FaStar } from "react-icons/fa";
import { SlSpeech } from "react-icons/sl";
import Button from "@/components/common/Button";
import { IoMdTrendingUp } from "react-icons/io";
import { motion } from "framer-motion";
import Pill from "@/components/common/Pill";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { APIRequester, JobPosterProfileCardProps } from "@/interfaces";

const JobPosterProfilePage :React.FC<APIRequester> = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  // Find the user by username
  const {baseUrl,loggedInToken} = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const fetchBusiness = async ()=>{
    setLoading(true);
    try{
      const apiRes = await axios.get(`${baseUrl}/business/${id}`,{
        headers:{
          Authorization: "Bearer "+loggedInToken 
        }
      })
      console.log("res: ", apiRes) ; 
      setUser(apiRes.data.data)
      setLoading(false);
    }
    catch(error: unknown){
      console.log("error occured: ",error)
      setLoading(false);
    }
  }
  const [user, setUser] = useState({} as JobPosterProfileCardProps) 
  // = JOB_POSTER_PROFILE_DATA.find(
  //   (user) => user.username.toLowerCase() === (username as string).toLowerCase()
  // );
  useEffect(()=>
  {
    // const run = ()=>{
      fetchBusiness()
    // }
    // run();
  } 
    ,[])
if (loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }
  else if (!user.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section className="container" style={{ paddingBottom: "0" }}>
        <div className="lg:grid grid-cols-1 gap-4">
          {/* User Profile component here... */}
          <div className="grid grid-cols-1  lg:grid-cols-2  gap-4">
            {/* JobPosterProfileCard component here...  */}
            <JobPosterProfileCard
              key={user.id}
              id={user.id}
              userImage={user.userImage}
              lastName={user.lastName}
              firstName={user.firstName}
              companyAddress={user.companyAddress}
              userRating={user.userRating}
              numberOfReviews={user.numberOfReviews}
            />
            {/* Additional components added here */}
            <div>
              <BusinessInfoCard
                key={user.id}
                id={user.id}              
                companyName={user.companyName}
                biography={user.biography}
                jobsPosted={user.jobsPosted}
                activeJobs={user.activeJobs}
              />
            </div>
          </div>

          {/* Recent Job Postings here... */}
          <div
            style={{ marginTop: "32px" }}
            className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
          >
            <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold">
              <IoMdTrendingUp size={22} color="#1D4ED8" /> Recent Job Postings
            </h1>
            <div className="w-full">
              <div
                style={{ padding: "16px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4"
              >
                {user.jobsPosted?.map((job, index) => (
                  <div
                    key={index}
                    style={{ padding: "16px" }}
                    className="card flex flex-col gap-4 bg-blue-300/20 rounded-xl"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{job.title}</h2>
                        <p className="text-gray-900 font-semibold">
                          {job.jobApplicants.length} applicants
                        </p>
                        <p className="text-sm text-slate-600">{job.timePosted}</p>
                      </div>
                      <div className="flex justify-center">
                        <Pill title={"status"} variant={"active"} />
                      </div>
                    </div>

                    <div
                      className="flex items-center text-lg"
                      style={{ marginTop: "8px" }}
                    >
                      <span className="font-semibold">Budget</span> : R
                      {job.payRate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews and Ratings here.. */}
          <div
            style={{ marginTop: "32px" }}
            className="card flex flex-col justify-center gap-4 bg-gray-300/30 rounded-xl"
          >
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              <SlSpeech size={20} color="#1D4ED8" /> Reviews & Ratings
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {JOB_SEEKER_REVIEWS_AND_RATINGS_DATA.filter(
                (review) => review.userName === user.companyName
              ).map((review) => (
                <div
                  key={review.id}
                  style={{ marginBottom: "24px", padding: "16px" }}
                  className="bg-blue-300/20 rounded-xl shadow-md hover:shadow-lg w-full"
                >
                  <h2 className="text-lg font-bold">{review.description}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-900">{review.userName}</p>
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 fill-warning text-warning" />
                      {review.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button title="View More Reviews" variant="seeMore" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default JobPosterProfilePage;

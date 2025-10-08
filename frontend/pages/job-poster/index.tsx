import React from "react";
import JobPosterProfileCard from "@/components/common/JobPosterProfileCard";
import { JOB_POSTER_PROFILE_DATA } from "@/constants";
import BusinessInfoCard from "@/components/common/BusinessInfoCard";
import { JOB_SEEKER_REVIEWS_AND_RATINGS_DATA } from "@/constants";
import { FaStar } from "react-icons/fa";
import { SlSpeech } from "react-icons/sl";
import Button from "@/components/common/Button";
import Image from "next/image";
import { IoMdTrendingUp } from "react-icons/io";
import { motion } from "framer-motion";
import Pill from "@/components/common/Pill";
const JobPosterProfilePage = () => {
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
            {
              /* JobPosterProfileCard component here... */
              JOB_POSTER_PROFILE_DATA.map((user) => (
                <JobPosterProfileCard
                  key={user.id}
                  id={user.id}
                  userImage={user.userImage}
                  userName={user.username}
                  userLocation={user.userlocation}
                  userRating={user.userRating}
                  numberOfReviews={user.numberOfReviews}
                />
              ))
            }

            {/* Additional components added here */}
            <div>
              {JOB_POSTER_PROFILE_DATA.map((user) => (
                <BusinessInfoCard
                  key={user.id}
                  id={user.id}
                  businessName={user.businessName}
                  biography={user.bio}
                  postedJobs={user.postedJobs}
                  activeJobs={user.activeJobs}
                />
              ))}
            </div>
          </div>
          {/* Recent Job Postings here... */}
          <div
            style={{ marginTop: "32px" }}
            className="card flex flex-col  items-center w-full gap-4 bg-gray-300/30 shadow-md hover:shadow-lg transition-shadow rounded-xl"
          >
            <h1 className=" flex items-center gap-2 self-start text-2xl md:text-3xl font-bold ">
              <IoMdTrendingUp size={22} color="#1D4ED8" /> Recent Job Postings
            </h1>
            <div className="w-full">
              {JOB_POSTER_PROFILE_DATA.map((user, index) => (
                <div
                  key={index}
                  style={{ padding: "16px" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4"
                >
                  {user.recentJobs.map((job, index) => (
                    <div
                      key={index}
                      style={{ padding: "16px" }}
                      className="flex flex-col gap-4 md:flex-row items-center w-full  bg-blue-300/20 justify-between  p-10 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col gap-2 p-4 ">
                        <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                        <p className="text-mediam text-gray-900">
                          {job.applicants} applicants
                        </p>
                        <p className="text-sm text-gray-900">{job.date}</p>
                      </div>

                      <div className="flex flex-col items-center gap-2 p-4 ">
                        {/* <div className="border-2 border-black w-full bg-white text-center rounded-md p-1">
                          {job.status}
                        </div> */}
                        <Pill title={job.status} variant={job.status} />
                        <div className="flex items-center">
                          Budget:{job.budget}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Reviews and Ratings here.. */}
          <div
            style={{ marginTop: "32px" }}
            className="card flex flex-col  items-center w-full gap-8 bg-gray-300/30 shadow-md hover:shadow-lg transition-shadow rounded-xl"
          >
            <h1 className=" flex items-center gap-2 text-2xl md:text-3xl self-start font-bold ">
              <SlSpeech size={20} color="#1D4ED8" /> Reviews & Ratings
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4   w-full">
              {JOB_SEEKER_REVIEWS_AND_RATINGS_DATA.map((review) => (
                <div
                  key={review.id}
                  style={{ marginBottom: "24px", padding: "16px" }}
                  className=" p-4  bg-blue-300/20 mb-8 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full"
                >
                  <Image
                    src={review.userImage}
                    alt={review.userName}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <h2 className="text-lg font-bold">{review.description}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-900">{review.userName}</p>
                    <div className="flex items-center gap-1 ">
                      {[1].map((star) => (
                        <div key={star} className="flex gap-1">
                          <FaStar
                            className="w-4 h-4 fill-warning text-warning"
                            color="yellow"
                          />
                        </div>
                      ))}
                      {review.rating}
                      {/* {review.rating.length} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              title="view More Reviews"
              variant="secondary"
              className=" border-2 border-black mb-4"
              onClick={() => {}}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default JobPosterProfilePage;

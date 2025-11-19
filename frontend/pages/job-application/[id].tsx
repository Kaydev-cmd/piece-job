import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users} from "lucide-react";
import Back from "@/components/common/Back";
import { JobInApplicationContext } from "@/interfaces";
import { useAPIRequster } from "@/components/api-reuse/ApiRequester";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ApplicantCard from "@/components/common/ApplicantCard";


const Application = () => { 
  const router = useRouter();
  const { id } = router.query;
  const { loggedInToken, baseUrl } = useAuth(); 
  const [applicationData, setApplicationData] = useState<JobInApplicationContext[]>([]);
  const { loading, loadingScreen, setLoading } = useAPIRequster();

  useEffect(() => {
    // Fetch application data based on the job ID
    const fetchApplicationData = async () => {
      try {
          const response = await axios.get(`${baseUrl}/job-applications?j${id}`,{ headers: { Authorization: `Bearer ${loggedInToken}` }});
          console.log("Application data:", response.data);
          setApplicationData(response.data.data);
      } catch(error) {
        console.error("Error fetching application data:", error);
      } finally {
        setLoading(false);
      }
 
    }
    fetchApplicationData();
  }, [id, loggedInToken, baseUrl, setLoading]);
  const applicationFunc = () => {
    if (loading) {
      return loadingScreen;
    }
    return (
        <>
         {/* Heading */}
         <div className=" items-center" >
            <div className="flex flex-col items-center mb-4">
                <h1 className="text-4xl font-bold text-[#111827]">
                    Job{" "}
                    <span className="bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent">
                        Applications
                    </span>
                </h1>
                <div className="flex flex-col items-center gap-4">

                </div>
            </div>
         {/* Apllication list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    applicationData.length > 0 ? (
                        applicationData.map((application: unknown ) => (
                        //    data card goes here!
                        // <ApplicantCard
                        //  key={application.id}
                        //  application={application}
                        //   onAccept={() => {}}

                        //  />
                        ))
                    ): (
                        <div className="flex flex-col text-center relative  md:self-end items-center lg:left-[300]">
                           <Users className="w-16 h-16 text-[#647488] mx-auto"/>
                           <h3 className="text-lg font-medium text-[#111827]">
                              No applications yet
                           </h3>
                        </div>
                    )
                }
            </div>
        </div>
        </>
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <section
        className="container"
        style={{ paddingTop: "32px", paddingBottom: "0" }}
      >
        <div>
          {/* back yo the sender */}
          <Back />
        </div>
        {applicationFunc()}
      </section>
    </motion.div>
  );
};

export default Application;

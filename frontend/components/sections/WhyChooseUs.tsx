import React from "react";
import Image from "next/image";
import Button from "../common/Button";
import { SERVICES_STATS, WHY_CHOOSE_US_STATS } from "@/constants";
import WhyChooseUsStatsCard from "../common/WhyChooseUsStatsCard";
import ServicesCard from "../common/ServicesCard";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <section className="container">
        <div className="flex flex-col items-center text-center gap-2">
          <div
            className="bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded-full"
            style={{ padding: "12px" }}
          >
            ✨ Why Choose PieceJob
          </div>

          <h1
            className="text-6xl font-semibold lg:text-7xl"
            style={{ margin: "16px 0" }}
          >
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
              Succeed
            </span>
          </h1>
          <p className="text-slate-500 font-semibold lg:text-lg ">
            Our platform is designed specifically for South African job seekers
            who want flexibility, reliability, and instant earnings
          </p>
        </div>

        <div
          className="flex flex-col-reverse gap-4 text-center lg:flex-row lg:justify-between lg:text-start lg:items-center"
          style={{ marginTop: "32px" }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-blue-950">
              Your Skills, Your Schedule, Your Success
            </h1>
            <p className="text-slate-500 font-semibold lg:text-lg">
              Whether you're great at tutoring, gardening, delivery or any other
              skill, PieceJob connects you with people who need exactly what you
              offer.
            </p>

            <div
              className="flex justify-around text-start lg:justify-start lg:gap-12"
              style={{ marginTop: "16px" }}
            >
              {WHY_CHOOSE_US_STATS.map((stat) => (
                <WhyChooseUsStatsCard
                  key={stat.id}
                  id={stat.id}
                  statDetails={stat.statDetails}
                  statDescription={stat.statDescription}
                  variant={stat.variant}
                />
              ))}
            </div>

            <div
              className="flex justify-center lg:justify-start"
              style={{ marginTop: "22px" }}
            >
              <Button title="Download App" variant="tertiary" />
            </div>
          </div>
          <Image
            src="/assets/why_choose_us/appMockup.jpg"
            alt="Phone"
            width={500}
            height={500}
            className="w-full rounded-xl lg:w-1/3"
          />
        </div>

        <motion.div
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
        >
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            style={{ marginTop: "32px" }}
          >
            {SERVICES_STATS.map((service) => (
              <ServicesCard
                key={service.id}
                id={service.id}
                serviceTitle={service.serviceTitle}
                serviceDescription={service.serviceDescription}
                variant={service.variant}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default WhyChooseUs;

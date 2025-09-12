import React from "react";
import { motion } from "framer-motion";
import JobExpertiseCard from "../common/JobExpertiseCard";
import { JOB_CATEGORIES } from "@/constants";

const JobExpertise: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <section className="container" style={{ paddingTop: "0px" }}>
        <div className="flex flex-col items-center text-center gap-2">
          <div
            className="bg-orange-500 text-white font-semibold rounded-full"
            style={{ padding: "12px" }}
          >
            🎯 Popular Categories
          </div>
          <h1
            className="text-6xl font-semibold lg:text-7xl"
            style={{ margin: "16px 0" }}
          >
            Find Work in Your{" "}
            <span className="bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent">
              Expertise
            </span>
          </h1>
          <p className="text-slate-500 font-semibold lg:text-2xl">
            Browse jobs across various categories and discover opportunities
            that match your skills perfectly.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
            style={{ marginTop: "32px" }}
          >
            {JOB_CATEGORIES.map((category, index) => (
              <JobExpertiseCard
                key={index}
                variant={category.variant}
                title={category.title}
                count={category.count}
                rate={category.rate}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default JobExpertise;

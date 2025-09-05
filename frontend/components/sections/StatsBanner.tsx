import React from "react";
import { BANNER_STATS } from "@/constants";
import BannerStatsCard from "../common/BannerStatsCard";
import { motion } from "framer-motion";

const StatsBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section className="bg-gradient-to-r from-blue-200 via-green-200 to-orange-200">
        <div className="container flex flex-wrap justify-around gap-4">
          {BANNER_STATS.map((stat) => (
            <BannerStatsCard
              key={stat.id}
              id={stat.id}
              statNumber={stat.statNumber}
              statTitle={stat.statTitle}
              statDescription={stat.statDescription}
              variant={stat.variant}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default StatsBanner;

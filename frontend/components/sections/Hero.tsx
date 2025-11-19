import React from "react";
import HeroStatsCard from "../common/HeroStatsCard";
import { HERO_STATS } from "@/constants";
import Button from "../common/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <section className="relative bg-[url('/assets/hero/heroImage.jpg')] bg-cover bg-no-repeat bg-center">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative container z-10 text-center flex flex-col items-center gap-2 xl:w-1/3">
          <div
            className="bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded-full"
            style={{ padding: "12px" }}
          >
            🚀 Now Live in South Africa
          </div>

          <h1
            className="text-6xl font-semibold lg:text-7xl"
            style={{ margin: "16px 0" }}
          >
            Where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
              Skills
            </span>{" "}
            Meet <span className="text-orange-500">Opportunity</span>
          </h1>
          <p className="text-slate-300 lg:text-lg">
            Turn your skills into income with flexible, short-term work
            opportunities. Get hired fast, work on your terms, and earn money
            instantly through FNB.
          </p>

          <div className="grid grid-cols-3">
            {HERO_STATS.map((stat, index) => (
              <HeroStatsCard
                key={index}
                id={stat.id}
                statNumber={stat.statNumber}
                statDescription={stat.statDescription}
                variant={stat.variant}
              />
            ))}
          </div>

          {/* Call to action goes here... */}
          <div
            className="flex flex-col justify-center items-center gap-4 lg:flex-row"
            style={{ marginBottom: "16px" }}
          >
            <Button
              title="Start Earning Today"
              variant="primary"
              onClick={() => router.push("/register")}
            />
            <Button title="Play Demo Video" variant="secondary" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-slate-300">Trusted payment partner</p>
            <div
              className="bg-slate-400/50 rounded-lg text-slate-300 flex items-center justify-center gap-4 lg:text-lg"
              style={{ padding: "16px" }}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-blue-700 font-bold text-xl">FNB</h3>
              </div>
              Secure Instant Payments
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hero;
